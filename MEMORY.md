# MEMORY.md — Hermes Long-Term Memory

Curated memories dari conversations dengan Dani. Ini adalah konteks persistent yang inform setiap interaction.

## User Profile

- **Name:** Dani (Dani.xyz / Dani12po)
- **Timezone:** Asia/Jakarta (GMT+7)
- **Preferences:** Kasual, professional, always to-the-point. No unnecessary words.
- **Communication:** Indonesian sebagai default, direct dan action-oriented

## Ongoing Projects & Context

- **Agent identity:** Hermes — self-improving agent (setup 2026-06-04)
- **Repository references:** 
  - https://github.com/nousresearch/hermes-agent (Hermes agent reference)
  - https://github.com/dhimaszs/How-To-Make-Create-Your-AI-Agent-Smart (smart agent guide applied)

## Learned Preferences

- Direct application preferred — skip planning, just execute
- Indonesian casual language (gue/lo) sebagai default
- Preference untuk automation dan parallelization
- Interest di crypto/Web3 (meme coins, DeFi)

## Active Skills & Systems

- Self-improving loop: remember → explore → create → delegate → schedule → reflect
- Operational rails for security (no key logging, user-funds-only, etc.)
- Cross-session memory persistence
- Subagent parallelization untuk complex tasks

## Solana Devnet Trading Practice

- **Wallet:** `8YbQfaX4iZJo6qy2Nwbv3WM9mECD895YR4yCQfgU61ud` (devnet)
- **Setup:** 2026-06-04 — created solana-setup.js + devnet-trader.js
- **Purpose:** Practice trading on testnet (zero risk, real Solana mechanics)
- **Tools:** simulated trading with buy/sell/P&L tracking
- **Status:** Ready for practice; awaiting devnet SOL faucet

## Autonomous Infrastructure (2026-06-04)

**Deployed Systems:**
- `.env` — environment variables template (API keys, credentials)
- `.gitignore` — secure secrets management (never commit keys)
- `self-improvement-loop.js` — main autonomous loop (trading → analysis → learning → GitHub commit)
- `self-monitoring.js` — continuous health checks & metrics collection
- `autonomy-config.js` — strategy versioning, skill creation, learning management
- `setup-api-keys.js` — interactive API key setup wizard

**Cron Automation (via OpenClaw):**
1. **hermes-auto-trading-session** — every 2h (0 */2 * * * Asia/Jakarta)
   - Execute trading session with strategy testing
   - Analyze performance & record learnings
   - Commit results to GitHub
   
2. **hermes-health-check** — every 30m (*/30 * * * * Asia/Jakarta)
   - Collect system metrics (memory, uptime, performance)
   - Log to `memory/metrics.json`
   
3. **hermes-daily-summary** — daily 20:00 (0 20 * * * Asia/Jakarta)
   - Generate trading statistics & cumulative P&L
   - Update MEMORY.md with insights
   - Report to Telegram

**API Keys (Free Tier):**
- ✅ CoinGecko — public API (no key needed)
- ⏳ GitHub — for commit logs & automation
- ⏳ Supabase — PostgreSQL for trading history persistence
- ⏳ Sentry — error tracking & monitoring
- ⏳ NewsAPI — market sentiment & monitoring

**Memory System:**
- `memory/session_YYYY-MM-DD.md` — daily session logs
- `memory/learnings.json` — recorded insights (auto-generated from trading analysis)
- `memory/metrics.json` — performance metrics (1000 data points rolling)
- `memory/autonomy-config.json` — strategy versions & learning config

**Learning Loop:**
1. Trading session executes (real strategy testing, risk management)
2. Performance analyzed (P&L %, win rate, token correlation)
3. Insights recorded (pattern recognition, strategy adjustments)
4. Results committed to GitHub (durable record of improvement)
5. Health metrics collected (uptime, resource usage, performance trends)
6. Daily summary updates MEMORY.md (curated learnings)
