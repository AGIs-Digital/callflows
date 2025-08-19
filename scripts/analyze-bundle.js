#!/usr/bin/env node

// Bundle Analyzer für statische Exports (Next.js 14)
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analysiere JavaScript Bundle...');

try {
  // Temp Next.js Config mit Bundle Analyzer
  const originalConfig = fs.readFileSync('next.config.js', 'utf8');
  
  // Bundle Analyzer Config hinzufügen
  const withBundleAnalyzer = `
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const originalConfig = ${originalConfig.replace('module.exports = nextConfig', 'nextConfig')};

module.exports = withBundleAnalyzer(originalConfig);
`;

  fs.writeFileSync('next.config.js', withBundleAnalyzer);
  
  console.log('📊 Erstelle Bundle-Analyse...');
  process.env.ANALYZE = 'true';
  execSync('npm run build', { 
    stdio: 'inherit',
    env: process.env
  });
  
  // Original config wiederherstellen
  fs.writeFileSync('next.config.js', originalConfig);
  
  console.log('\n✅ Bundle-Analyse abgeschlossen!');
  console.log('🌐 Browser sollte automatisch öffnen...');
  
} catch (error) {
  console.error('❌ Fehler bei Bundle-Analyse:', error.message);
  
  // Config wiederherstellen bei Fehler
  try {
    const originalConfig = fs.readFileSync('next.config.js.bak', 'utf8');
    fs.writeFileSync('next.config.js', originalConfig);
  } catch {}
  
  process.exit(1);
}
