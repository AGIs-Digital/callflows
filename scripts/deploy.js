const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// Bestimme das richtige Deployment-Ziel basierend auf der Umgebung
const isProduction = process.env.NODE_ENV === 'production';
const targetFolder = isProduction ? 'callflows.de' : 'staging.callflows.de';


const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_SERVER,
  port: 22,
  localRoot: __dirname + '/../out/',
  remoteRoot: `/`,
  include: [
    '*',
    '**/*',
    '.htaccess'
  ],
  exclude: [
    '.git/**',
    '.github/**',
    'node_modules/**',
    'tests/**',
    '*.map',
    '*.ts',
    '*.tsx',
    '.next/**',
    'backups/**',
    'README.md',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    '.env.local',
    '.env.development',
    'public/videos/**'
  ],
  sftp: true,
  
  // 🎯 SMART SYNC STRATEGY (Einzelentwickler-optimiert)
  deleteRemote: true, // WICHTIG: Verwaiste Dateien löschen!
  backupDir: 'backups',
  
  // 🚀 MAXIMALE GESCHWINDIGKEIT
  skipIfOlderModDate: true, // Nur geänderte Dateien
  preserveTimestamps: true, // Für präzise Vergleiche
  forcePasv: true,
  
  // Aggressive Performance
  concurrency: 16, // Noch mehr parallele Uploads
  parallelReads: true,
  
  // Smart File Handling
  sizeThreshold: 512 * 1024, // 512KB - Kleinere Batches für bessere Kontrolle
  
  sftpConfig: {
    algorithms: {
      kex: ['diffie-hellman-group-exchange-sha256'],
      cipher: ['aes128-ctr'], // Schnellster Cipher
      hmac: ['hmac-sha2-256']
    },
    compress: true,
    keepaliveInterval: 15000, // Kürzere Intervalle
    keepaliveCountMax: 3,
    
    // 🎯 SPEED OPTIMIZATION
    highWaterMark: 128 * 1024, // 128KB Buffer (größer = schneller)
    readyTimeout: 15000, // 15s Timeout
    strictVendor: false,
    
    // Minimal Retries für Speed
    retries: 1, // Nur 1 Retry für Geschwindigkeit
    retryDelay: 500, // 0.5s zwischen Retries
  }
};

console.log('🚀 Starte Deployment...');
console.log('📁 Zielordner:', targetFolder);

// Performance-Tracking
const startTime = Date.now();
let uploadCount = 0;
let totalFiles = 0;
let totalBytes = 0;
let uploadedBytes = 0;
let failedUploads = [];
let lastProgressUpdate = 0;
let compressionEnabled = false;

// Sammle zunächst alle Dateien um die Gesamtzahl zu ermitteln
const fs = require('fs');
const path = require('path');

function countFiles(dir) {
  let count = 0;
  let bytes = 0;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subResult = countFiles(fullPath);
      count += subResult.count;
      bytes += subResult.bytes;
    } else {
      count++;
      bytes += stat.size;
    }
  }
  return { count, bytes };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

const fileStats = countFiles(config.localRoot);
totalFiles = fileStats.count;
totalBytes = fileStats.bytes;

console.log(`📊 Deployment-Übersicht:`);
console.log(`   📁 Dateien: ${totalFiles}`);
console.log(`   💾 Größe: ${formatBytes(totalBytes)}`);

// Prüfe Kompression-Status
if (process.env.FTP_COMPRESSION !== 'false') {
  compressionEnabled = true;
  console.log(`   🗜️ Kompression: Aktiviert`);
} else {
  console.log(`   🗜️ Kompression: Deaktiviert`);
}

// Reduzierte Logs - nur Fehler anzeigen
ftpDeploy.on('log', function(data) {
  if (data.includes('error') || data.includes('Error') || data.includes('failed')) {
    console.log('⚠️', data);
  }
});

ftpDeploy.on('uploaded', function(data) {
  uploadCount++;
  
  // Schätze Dateigröße (falls verfügbar)
  const filePath = path.join(config.localRoot, data.filename);
  try {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      uploadedBytes += stat.size;
    }
  } catch (e) {
    // Ignore file stat errors
  }
  
  // Nur bei wichtigen Meilensteinen ausgeben
  const progressPercent = Math.round((uploadCount / totalFiles) * 100);
  const shouldShowProgress = 
    progressPercent % 10 === 0 && progressPercent !== lastProgressUpdate || // Alle 10%
    uploadCount === totalFiles || // Fertig
    uploadCount === 1; // Start
    
  if (shouldShowProgress) {
    const elapsed = Date.now() - startTime;
    const speed = uploadedBytes > 0 ? (uploadedBytes / 1024) / (elapsed / 1000) : 0;
    
    // Kompakter Fortschrittsbalken nur für wichtige Updates
    const barLength = 20;
    const filledLength = Math.round((progressPercent / 100) * barLength);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    
    // ETA berechnen
    const eta = speed > 0 && uploadedBytes < totalBytes ? 
      Math.round(((totalBytes - uploadedBytes) / 1024) / speed) : 0;
    const etaStr = eta > 0 ? ` - ETA ${formatDuration(eta * 1000)}` : '';
    
    const speedStr = speed > 0 ? `${formatBytes(speed * 1024)}/s` : '0 B/s';
    console.log(`📤 [${bar}] ${progressPercent}% (${uploadCount}/${totalFiles}) - ${speedStr}${etaStr}`);
    
    lastProgressUpdate = progressPercent;
  }
});

ftpDeploy.on('upload-error', function(data) {
  console.log('❌ Fehler:', data.filename);
  failedUploads.push(data.filename);
});

console.log(`⏱️ Start: ${new Date().toLocaleTimeString()}`);
console.log('━'.repeat(50));

ftpDeploy.deploy(config)
  .then(() => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const avgSpeed = uploadedBytes > 0 ? (uploadedBytes / 1024) / (totalTime / 1000) : 0;
    
    console.log('━'.repeat(50));
    console.log('✨ DEPLOYMENT ERFOLGREICH ABGESCHLOSSEN');
    console.log('');
    console.log('📈 Performance-Statistiken:');
    console.log(`   ⏱️ Gesamtzeit: ${formatDuration(totalTime)}`);
    console.log(`   📁 Dateien: ${uploadCount}/${totalFiles}`);
    console.log(`   💾 Übertragen: ${formatBytes(uploadedBytes)}`);
    console.log(`   🚀 Ø-Geschwindigkeit: ${formatBytes(avgSpeed * 1024)}/s`);
    console.log(`   🗜️ Kompression: ${compressionEnabled ? 'Aktiv' : 'Inaktiv'}`);
    console.log(`   🎯 Erfolgsrate: ${Math.round((uploadCount / totalFiles) * 100)}%`);
    console.log(`   ⏰ Abgeschlossen: ${new Date().toLocaleTimeString()}`);
    
    if (failedUploads.length > 0) {
      console.log('\n⚠️ Fehlerhafte Uploads:');
      failedUploads.forEach(file => console.log('   ❌', file));
      console.log(`\n🔄 ${failedUploads.length} Datei(en) erfordern manuellen Upload.`);
      process.exit(1);
    } else {
      console.log('\n🎉 Alle Dateien erfolgreich übertragen!');
    }
  })
  .catch(err => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log('━'.repeat(50));
    console.error('🚨 DEPLOYMENT FEHLGESCHLAGEN');
    console.error('');
    console.error('📊 Fehler-Details:');
    console.error(`   ⏱️ Laufzeit: ${formatDuration(totalTime)}`);
    console.error(`   📁 Übertragen: ${uploadCount}/${totalFiles}`);
    console.error(`   💾 Daten: ${formatBytes(uploadedBytes)}`);
    console.error(`   ❌ Fehler: ${err.message || err}`);
    console.error(`   ⏰ Abgebrochen: ${new Date().toLocaleTimeString()}`);
    process.exit(1);
  });
