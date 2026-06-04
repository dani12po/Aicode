# Railway Deployment — Instant Setup (3 clicks, 2 minutes)

**Status:** Bot repo ready to deploy. Just follow these 3 steps.

---

## Step 1️⃣ — Open Railway + Create Project

1. Go to https://railway.app/dashboard
2. **Login with GitHub** (use your GitHub account)
3. Click **New Project** → **Deploy from GitHub**
4. Select repo: **`dani12po/Aicode`** (or search "Aicode")
5. Click **Deploy** ✅

Railway will auto-detect Node.js + npm install.

---

## Step 2️⃣ — Add Environment Variables

Once deployment starts, Railway will ask for environment variables.

Copy-paste these **exact values**:

```
BOT_TOKEN=8892093153:AAFsnkJrgrnRnRw0WL88e2ZUwFWFRhLUDRg
CLAUDE_API_KEY=sk-0Y0Ct0gp58LBAnm7X3PQXqSPtsgdLxTYfZS1zNl7iXc4Fkqs
API_BASE_URL=https://openrouter.io/api/v1
MODEL=deepseek/deepseek-chat
NODE_ENV=production
PORT=3000
```

**That's it.** Env variables set ✅

---

## Step 3️⃣ — Deploy + Done

1. Click **Deploy** button (Railway shows deploy progress)
2. Wait for green checkmark ✅ (~1-2 minutes)
3. Railway assigns a **public URL** (shown on dashboard)
4. Bot automatically switches to **webhook mode** — instant responses!

**Your bot is now live.** Test it:
- Open Telegram
- Message @aicodechan_bot (or your bot handle)
- Try `/code print hello`
- Watch instant response! 🚀

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **"Unauthorized" during GitHub login** | Use the GitHub account that owns `dani12po/Aicode` repo |
| **Deployment fails** | Check Railway logs (dashboard → Logs tab). Most common: missing env var |
| **Bot not responding** | Wait 30s for webhook to activate. Check bot handle in @BotFather |
| **Logs say "Cannot find module"** | Run `npm install` locally first, commit `package-lock.json` |

---

## What Happens Automatically

✅ Railway detects `package.json` + `Procfile`  
✅ Installs dependencies (`npm install`)  
✅ Runs start command: `npm start`  
✅ Bot connects to Telegram webhook  
✅ Env vars loaded from Railway dashboard  
✅ All requests forwarded to `https://[your-railway-url]`  

---

## Your Bot's Public URL

After deploy, Railway dashboard shows:

```
https://aicode-production-xxxx.railway.app
```

This is your **webhook URL**. Railway handles SSL automatically.

---

**Total time: ~3-5 minutes. Then your bot is live forever.** 🎉
