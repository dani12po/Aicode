---
name: feedback-trading-skill-development
description: Every auto-run must include active trading practice to sharpen skills, not just passive monitoring
metadata:
  type: feedback
---

**Rule:** Every scheduled trading run should execute actual trades (not just monitoring/reporting). The goal is continuous skill improvement.

**Why:** Dani wants the agent to actively learn and improve trading strategy through practice, not just maintain status quo with automation.

**How to apply:** 
- Each 2h cron job runs devnet-trader.js with active trade execution (buy/sell logic)
- Vary strategies slightly each run to test different approaches (entry points, exit triggers, token mix)
- Track win/loss patterns and adapt next session
- Use the devnet environment as a practice ground—treat each run as a learning iteration
- Report not just P&L but also what strategy adjustments worked/didn't work
