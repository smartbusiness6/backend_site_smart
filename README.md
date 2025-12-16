# 📧 API Contact Simple

API minimaliste pour envoyer des emails de contact depuis un site web ou une application.

## 🚀 Installation rapide

### 1. Installer les dépendances
```bash
npm install

### 2. Editer .env
# Port du serveur
PORT=3000
NOM_DU_SITE="Mon Site Web"

# Configuration SMTP (exemple pour Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Email qui reçoit les messages
MAIL_CONTACT=votre-email@gmail.com

### API
POST http://localhost:3000/contact

{
  "email": "client@example.com",
  "name": "Jean Dupont",
  "subject": "Demande d'information",
  "text": "Bonjour, je souhaiterais obtenir plus d'informations...",
  "phone": "0123456789"
}
