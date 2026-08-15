# TonStory Deployment Guide

## Overview
TonStory এ দুটি অংশ আছে:
1. **Frontend** - GitHub Pages এ deploy হবে (Automatic)
2. **Backend** - Firebase Cloud Functions এ deploy হবে (Manual)

---

## Frontend Deployment (GitHub Pages)

### স্বয়ংক্রিয় ডিপ্লয়মেন্ট কীভাবে কাজ করে?

GitHub Actions workflow (``.github/workflows/deploy.yml``) এর মাধ্যমে:
- যখনই আপনি `main` branch এ push করবেন, এটি automatic চলবে
- Code build হবে
- GitHub Pages এ deploy হবে

### Prerequisites

1. **GitHub Pages সক্ষম করুন:**
   - Repository Settings → Pages
   - Source: `GitHub Actions` নির্বাচন করুন

2. **Repository Settings চেক করুন:**
   - Settings → Actions → General
   - Ensure "Read and write permissions" enabled

### ডিপ্লয়মেন্ট করতে কমান্ড

```bash
# Local environment setup
cp .env.example .env.local

# Edit .env.local - Firebase URL দিয়ে আপডেট করুন
# VITE_API_BASE_URL=your_firebase_url_here

# Build locally (test করার জন্য)
yarn build

# GitHub এ push করুন
git add .
git commit -m "Setup: Configure GitHub Pages deployment"
git push origin setup/production-deployment
```

তারপর Pull Request খুলুন এবং merge করুন `main` এ।

**আপনার app এখানে পাওয়া যাবে:**
```
https://yourusername.github.io/TonStory
```

---

## Backend Deployment (Firebase Cloud Functions)

### Prerequisites

```bash
# Firebase CLI install করুন
npm install -g firebase-tools

# Firebase এ login করুন
firebase login
```

### Firebase Project Setup

1. [firebase.google.com](https://firebase.google.com) যান
2. নতুন project তৈরি করুন
3. Firestore Database তৈরি করুন
4. Cloud Functions enable করুন

### Configuration

**`.firebaserc` update করুন:**
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

**Firebase Config সেট করুন:**
```bash
cd functions
firebase functions:config:set tgbot.key="your_telegram_bot_token"
```

### Deployment

```bash
# Functions folder এ যান
cd functions

# Dependencies install করুন
yarn install

# Firebase এ deploy করুন
firebase deploy --only functions
```

**Deploy হওয়ার পর আপনার URL পাবেন:**
```
https://us-central1-your-project-id.cloudfunctions.net/api
```

---

## Telegram Mini App Setup

### Bot তৈরি করুন

1. [@BotFather](https://t.me/botfather) এ যান
2. `/newbot` command দিন
3. Bot এর নাম এবং username দিন
4. **Bot Token কপি করুন** (এটি গুরুত্বপূর্ণ!)

### Mini App যোগ করুন

1. @BotFather এ `/mybots` বলুন
2. আপনার bot নির্বাচন করুন
3. "Bot Settings" → "Menu Button" → "Web App"
4. URL দিন: `https://yourusername.github.io/TonStory`

### Webhook Setup

```bash
# Firebase deploy করার পর, webhook সেট করুন
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://us-central1-your-project-id.cloudfunctions.net/api/telegram-bot-update"
```

---

## Environment Variables

### Frontend (`.env.local`)
```
VITE_API_BASE_URL=https://us-central1-your-project-id.cloudfunctions.net/api
VITE_FRONTEND_URL=https://yourusername.github.io/TonStory
```

### Backend (Firebase Config)
```bash
firebase functions:config:set tgbot.key="YOUR_TELEGRAM_BOT_TOKEN"
```

---

## TONConnect Manifest

**`tonconnect-manifest.json` update করুন:**
```json
{
  "url": "https://yourusername.github.io/TonStory",
  "name": "TonStory",
  "iconUrl": "https://yourusername.github.io/TonStory/icon.png",
  "termsOfUseUrl": "https://yourusername.github.io/TonStory",
  "privacyPolicyUrl": "https://yourusername.github.io/TonStory"
}
```

---

## Complete Checklist

### Frontend
- [ ] `.github/workflows/deploy.yml` আছে
- [ ] `vite.config.js` এ base path সঠিক (`'/TonStory/'`)
- [ ] GitHub Pages Settings এ Source = GitHub Actions
- [ ] `.env.example` আছে
- [ ] Code main branch এ push হয়েছে

### Backend
- [ ] Firebase project তৈরি হয়েছে
- [ ] Firestore Database সক্ষম
- [ ] Cloud Functions সক্ষম
- [ ] Service Account key downloaded
- [ ] `functions/credentials/service-account.json` saved
- [ ] Telegram bot token সেট করা হয়েছে
- [ ] `firebase deploy --only functions` করা হয়েছে

### Telegram
- [ ] Bot তৈরি হয়েছে
- [ ] Bot Token পেয়েছেন
- [ ] Mini App URL সেট করেছেন
- [ ] Webhook URL সেট করেছেন

---

## Troubleshooting

### GitHub Actions Deployment Fails
```
✗ Action fails to build?
- Repository → Actions tab এ logs দেখুন
- Node.js version 20 ব্যবহার হচ্ছে কিনা চেক করুন
- yarn.lock file commit করেছেন কিনা দেখুন
```

### Firebase Deployment Fails
```
✗ firebase deploy command কাজ করছে না?
- firebase login আবার করুন
- .firebaserc এ project ID সঠিক কিনা চেক করুন
- Service account key valid কিনা দেখুন
```

### App Load হচ্ছে না
```
✗ 404 error পাচ্ছেন?
- vite.config.js এ base path '/TonStory/' আছে কিনা দেখুন
- GitHub Pages Settings এ Pages enabled কিনা চেক করুন
- Wait 1-2 minutes for deployment to complete
```

### API Calls Failing (401 Unauthorized)
```
✗ Backend call fail হচ্ছে?
- Telegram bot token valid কিনা চেক করুন
- Authorization header format check করুন: "tma <initDataRaw>"
- Firebase config সঠিক কিনা verify করুন
- initDataRaw token expired না হয়েছে কিনা দেখুন (3600s)
```

### CORS Issues
```
✗ CORS error আসছে?
- firebase.json এ CORS configured আছে কিনা দেখুন
- Backend API request থেকে Authorization header পাঠানো হচ্ছে কিনা চেক করুন
```

---

## Local Development

```bash
# 1. Clone repository
git clone https://github.com/yourusername/TonStory.git
cd TonStory

# 2. Install dependencies
yarn install
cd functions && yarn install && cd ..

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local

# 4. Run frontend locally
yarn dev

# 5. In another terminal, run backend locally
cd functions
firebase serve --only functions

# 6. Open http://localhost:5173
```

---

## Quick Commands

```bash
# Frontend build
yarn build

# Frontend preview
yarn preview

# Backend deploy
cd functions && firebase deploy --only functions

# Check Firebase config
firebase functions:config:get

# Check Firebase logs
firebase functions:log --region us-central1
```

---

## Support Links

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [TON Documentation](https://docs.ton.org)
- [TONConnect UI](https://github.com/ton-connect/tonconnect-ui)
