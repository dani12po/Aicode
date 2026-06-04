# AI Code Chan - Complete Setup & Deployment Guide

## 📋 Pre-Flight Checklist

Before starting, make sure you have:

- [ ] Telegram account (for testing bot)
- [ ] GitHub account (for Railway deployment)
- [ ] Anthropic account (for Claude API)
- [ ] Node.js 18+ installed locally

---

## 🚀 Step 1: Local Setup (5 minutes)

### 1.1 Clone/Open Project

```bash
cd ai-code-chan
```

### 1.2 Run Setup Wizard

```bash
npm run setup
```

This wizard akan:
1. Ask untuk `BOT_TOKEN` (dari @BotFather)
2. Ask untuk `CLAUDE_API_KEY` (dari Anthropic)
3. Create `.env` file dengan credentials

**Getting BOT_TOKEN:**
- Open Telegram
- Search `@BotFather`
- Send `/newbot`
- Follow prompts (choose name + username)
- Copy the token

**Getting CLAUDE_API_KEY:**
- Go to https://console.anthropic.com/account/keys
- Login dengan akun Anthropic
- Click "Create Key"
- Copy the key

### 1.3 Test API Connection

```bash
npm test
```

Output harus `✅ All tests passed!`. Jika error, check keys di `.env`.

### 1.4 Run Locally

```bash
npm start
```

Bot siap! Open Telegram → find your bot → send `/start`.

**Stop bot:** Press `Ctrl+C`

---

## 🚢 Step 2: Deploy to Railway (5 minutes)

### 2.1 Push Code to GitHub

Make sure git is configured:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

Push code:

```bash
git add .
git commit -m "AI Code Chan - Ready for production"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-code-chan
git push -u origin main
```

### 2.2 Connect Railway

1. Go to **https://railway.app**
2. Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose `ai-code-chan` repository
6. Railway auto-detects Node.js ✅

### 2.3 Add Environment Variables

Railway dashboard → your project → **"Variables"**

Add these 2 variables:

| Key | Value | From |
|-----|-------|------|
| `BOT_TOKEN` | `123456:ABCdef...` | @BotFather |
| `CLAUDE_API_KEY` | `sk-ant-...` | console.anthropic.com |

**DO NOT add** `WEBHOOK_URL` — Railway sets it automatically.

### 2.4 Deploy

Click **"Deploy"** button. Railway builds and deploys automatically.

Wait for green "✅ Deployment successful" message.

**Your bot is live!** 🎉

---

## ✅ Verify Bot is Working

### Local (Polling)

```bash
npm start
# In Telegram: send /code write hello world
# Should get code in response within 2 seconds
```

### Railway (Webhook)

Bot now receives updates **instantly** via webhook (no polling).

In Telegram:
- Send `/start` → should get intro message
- Send `/code create function to add two numbers` → should get code
- Send `/debug undefined is not a function` → should get fix

**If bot doesn't reply:**

1. Check Railway logs:
   - Railway dashboard → your project → **"Logs"**
   - Should see "🤖 AI Code Chan starting..."

2. Check environment variables are set:
   - Railway dashboard → **"Variables"**
   - Both `BOT_TOKEN` and `CLAUDE_API_KEY` must be there

3. Test locally:
   - Update `.env` file
   - Run `npm start`
   - If works locally but not on Railway, likely env vars issue

---

## 📊 Comparison: Local vs Railway

| Feature | Local (Polling) | Railway (Webhook) |
|---------|-------------------|------------------|
| **Speed** | 1-3 sec delay | <100ms response |
| **Cost** | Free (local machine) | Free tier available |
| **Uptime** | Your machine must run | 24/7 guaranteed |
| **Scale** | Manual (you manage) | Auto-scaling |
| **Setup** | `npm start` | Push + deploy |
| **Best for** | Testing | Production |

**Use Local for:** Development, testing new features.
**Use Railway for:** Live 24/7 bot, sharing with friends.

---

## 🛠️ Troubleshooting

### "API Key invalid" Error

```
CLAUDE_API_KEY=sk-ant-...
```

Check:
1. Key starts with `sk-ant-`?
2. No extra spaces or newlines in `.env`?
3. Key not expired? Check console.anthropic.com

**Fix:** Re-run `npm run setup`

### "BOT_TOKEN invalid" Error

```
BOT_TOKEN=123456:ABCdef...
```

Check:
1. Token format correct? (number:string)
2. You copied from @BotFather?
3. No extra spaces?

**Fix:** Re-run `npm run setup` or get new token from @BotFather

### Bot doesn't reply to commands

**If running locally:**
- Run `npm test` first
- Check `.env` has both keys
- Restart bot: Ctrl+C, then `npm start`

**If on Railway:**
- Check Railway logs for errors
- Verify variables are set (Railway dashboard)
- Redeploy: Push to GitHub again

### "Port already in use" Error

```
Error: listen EADDRINUSE :::3000
```

Another process using port 3000. Fix:

```bash
# Change port in .env
PORT=3001

# Or kill process on port 3000
# (Windows) taskkill /PID <pid> /F
# (Mac/Linux) lsof -ti:3000 | xargs kill -9
```

---

## 📦 Update & Maintenance

### Update Bot Code

1. Edit `bot.js` or other files
2. Test locally: `npm start`
3. Commit & push:
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
4. Railway auto-deploys 🚀

### Update Dependencies

```bash
npm update
npm install new-package
git add package*.json
git commit -m "Update dependencies"
git push
```

### Check Logs

**Local:**
```bash
npm start
# Logs appear in terminal
```

**Railway:**
- Dashboard → Project → **"Logs"** tab

---

## 🎯 Next Steps

- [ ] Test all commands: `/code`, `/debug`, `/review`, `/explain`
- [ ] Invite friends to test
- [ ] Setup backup keys in case one expires
- [ ] Monitor Railway dashboard for usage

---

## 📚 Resources

- **Telegram Bot API:** https://core.telegram.org/bots
- **Claude API Docs:** https://docs.anthropic.com
- **Railway Docs:** https://docs.railway.app
- **Node.js Guide:** https://nodejs.org/docs

---

## 💡 Tips & Tricks

**Make bot respond faster:**
- Use Railway webhook (not local polling)
- Keep Claude model as `claude-opus-4-8` (fastest)

**Get more API quota:**
- Upgrade Anthropic plan
- Monitor usage in console.anthropic.com

**Share bot with others:**
- Give them bot username from @BotFather
- They can use it on Telegram directly

**Add new commands:**
- Edit `bot.js`
- Add new `.command("name", handler)`
- Restart bot or redeploy

---

**Ready?** Start with `npm run setup` 🚀
