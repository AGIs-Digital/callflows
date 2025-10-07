# Microsoft SMTP Setup für E-Mail-Versand

Diese Anleitung zeigt dir, wie du die benötigten Microsoft SMTP-Credentials findest und konfigurierst.

## 📋 Benötigte Secrets

Folgende Umgebungsvariablen müssen konfiguriert werden:

```env
MICROSOFT_SMTP_HOST=smtp.office365.com
MICROSOFT_SMTP_PORT=587
MICROSOFT_SMTP_USER=deine-email@callflows.de
MICROSOFT_SMTP_PASS=dein-app-passwort
CONTACT_EMAIL=info@callflows.de
```

## 🔐 Wo finde ich die Microsoft SMTP-Credentials?

### Schritt 1: Microsoft 365 Admin Center öffnen

1. Öffne [https://admin.microsoft.com](https://admin.microsoft.com)
2. Melde dich mit deinem Admin-Account an
3. Navigiere zu **„Einstellungen"** → **„Domänen"** oder **„Exchange Admin Center"**

### Schritt 2: SMTP-Einstellungen prüfen

Die Standard-Einstellungen für Microsoft 365 / Outlook SMTP sind:

- **Server:** `smtp.office365.com`
- **Port:** `587` (TLS/STARTTLS) oder `25` (für manche Setups)
- **Verschlüsselung:** STARTTLS
- **Authentifizierung:** Erforderlich

### Schritt 3: App-Passwort erstellen (Empfohlen für MFA)

Wenn dein Account **Multi-Faktor-Authentifizierung (MFA)** aktiviert hat, benötigst du ein **App-Passwort**:

1. Gehe zu [https://account.microsoft.com/security](https://account.microsoft.com/security)
2. Wähle **„Erweiterte Sicherheitsoptionen"**
3. Klicke auf **„App-Passwörter erstellen"**
4. Benenne das Passwort (z.B. "callflows-contact-form")
5. Kopiere das generierte Passwort → Das ist dein `MICROSOFT_SMTP_PASS`

**Wichtig:** Dieses Passwort wird nur einmal angezeigt! Speichere es sicher.

### Schritt 4: Alternatives Szenario - Normales Passwort verwenden

Falls **kein MFA** aktiv ist, kannst du das normale Account-Passwort verwenden:

- **User:** Die vollständige E-Mail-Adresse (z.B. `info@callflows.de`)
- **Pass:** Das normale Account-Passwort

**⚠️ Sicherheitshinweis:** Wir empfehlen MFA + App-Passwort für höhere Sicherheit!

### Schritt 5: SMTP-Authentifizierung aktivieren

Prüfe, ob SMTP-Authentifizierung für dein Postfach aktiviert ist:

1. Öffne [Exchange Admin Center](https://admin.exchange.microsoft.com)
2. Gehe zu **„Empfänger"** → **„Postfächer"**
3. Wähle das Postfach aus (z.B. `info@callflows.de`)
4. Klicke auf **„Postfacheinstellungen"** → **„E-Mail-Apps"**
5. Stelle sicher, dass **„Authentifiziertes SMTP"** aktiviert ist

---

## 🚀 GitHub Secrets konfigurieren

### Schritt 1: GitHub Repository öffnen

1. Gehe zu deinem Repository: `https://github.com/DEIN-USERNAME/callflows`
2. Klicke auf **„Settings"** (Einstellungen)
3. Wähle im linken Menü **„Secrets and variables"** → **„Actions"**

### Schritt 2: Secrets hinzufügen

Klicke auf **„New repository secret"** und füge folgende Secrets hinzu:

| Secret Name | Wert | Beispiel |
|------------|------|----------|
| `MICROSOFT_SMTP_HOST` | `smtp.office365.com` | `smtp.office365.com` |
| `MICROSOFT_SMTP_PORT` | `587` | `587` |
| `MICROSOFT_SMTP_USER` | Deine E-Mail-Adresse | `info@callflows.de` |
| `MICROSOFT_SMTP_PASS` | App-Passwort oder Account-Passwort | `abcd1234efgh5678` |
| `CONTACT_EMAIL` | Empfänger-E-Mail | `info@callflows.de` |

### Schritt 3: Secrets testen

Nach dem Hinzufügen der Secrets:

1. Starte einen neuen Deployment-Workflow (Push auf `main` Branch)
2. Oder teste lokal mit `.env`-Datei:

```bash
# .env (nur lokal, NICHT committen!)
MICROSOFT_SMTP_HOST=smtp.office365.com
MICROSOFT_SMTP_PORT=587
MICROSOFT_SMTP_USER=info@callflows.de
MICROSOFT_SMTP_PASS=dein-app-passwort
CONTACT_EMAIL=info@callflows.de
```

3. Starte die Entwicklungsumgebung: `npm run dev`
4. Teste das Kontaktformular auf `http://localhost:3000/kontakt`

---

## 🧪 Fehlerbehebung

### Problem: "Authentication failed"

**Ursachen:**
- Falsches Passwort oder falsche E-Mail-Adresse
- MFA ist aktiv, aber kein App-Passwort verwendet
- SMTP-Authentifizierung ist im Exchange Admin Center deaktiviert

**Lösung:**
1. Prüfe die Credentials in GitHub Secrets
2. Erstelle ein neues App-Passwort (wenn MFA aktiv)
3. Aktiviere "Authentifiziertes SMTP" im Exchange Admin Center

### Problem: "Connection timeout"

**Ursachen:**
- Falscher Port (587 statt 25 oder umgekehrt)
- Firewall blockiert SMTP-Verkehr
- Server ist nicht erreichbar

**Lösung:**
1. Prüfe `MICROSOFT_SMTP_PORT` → sollte `587` sein
2. Teste mit `telnet smtp.office365.com 587`
3. Prüfe Firewall-Einstellungen auf dem Hosting-Server

### Problem: "Relay access denied"

**Ursachen:**
- Die Absender-E-Mail-Adresse ist nicht autorisiert
- SMTP-Relay ist nicht konfiguriert

**Lösung:**
1. Verwende eine echte E-Mail-Adresse deiner Domain als `MICROSOFT_SMTP_USER`
2. Prüfe die Exchange Relay-Einstellungen

---

## 📚 Weiterführende Links

- [Microsoft 365 SMTP-Einstellungen (Offiziell)](https://learn.microsoft.com/de-de/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365)
- [App-Passwörter erstellen](https://support.microsoft.com/de-de/account-billing/erstellen-eines-app-kennworts-f%C3%BCr-microsoft-365-3e9dbd0f-8c9d-4f0b-a5ae-c4bd0d4a40db)
- [Exchange Admin Center](https://admin.exchange.microsoft.com)

---

## ✅ Checkliste

- [ ] Microsoft 365 Admin-Zugang vorhanden
- [ ] SMTP-Einstellungen geprüft (`smtp.office365.com:587`)
- [ ] App-Passwort erstellt (falls MFA aktiv)
- [ ] "Authentifiziertes SMTP" aktiviert im Exchange Admin Center
- [ ] GitHub Secrets konfiguriert
- [ ] Kontaktformular getestet
- [ ] E-Mail erfolgreich empfangen

---

**Hinweis:** Nach dem Konfigurieren der Secrets muss die Anwendung neu deployt werden, damit die Änderungen wirksam werden. Der nächste Deployment-Workflow (GitHub Actions) übernimmt die neuen Secrets automatisch.

