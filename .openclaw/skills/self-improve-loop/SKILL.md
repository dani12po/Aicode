---
name: self-improve-loop
description: "Record lessons, create reusable skills, and reflect on what worked each session — closes the learning loop."
---

# Self-Improvement Loop

Hermes grows through every conversation. This skill operationalizes that.

## When to Trigger

- At end of complex session (5+ tool calls or novel problem solved)
- After user corrects approach (capture the correction)
- After workflow pattern emerges (codify it)
- After error recovery (document the fix)
- On heartbeat or session reflection checkpoint

## Steps

### 1. **Remember** — Capture This Session

Document what happened:
- Task completed and outcome
- Approach taken (what worked, what didn't)
- User corrections or preferences learned
- Environment facts discovered (APIs, quirks, configs)
- Time investment (was this efficient?)

File: `memory/YYYY-MM-DD.md` (raw daily notes)

### 2. **Identify** — What's Worth Keeping?

Scan the session for:
- **Reusable procedures** → Candidate for new skill
- **User preferences** → Update MEMORY.md or USER.md
- **Lessons** → Update SOUL.md if it's about boundaries/tone
- **Environment** → Update TOOLS.md if it's infrastructure-specific

### 3. **Create or Update** — Codify Learnings

**New skill if:**
- Complex workflow (5+ steps, multiple tools)
- Solved unusual problem with specific technique
- User wants it remembered for next time

**Update memory if:**
- User preference about communication/approach
- Environment setup fact
- Lesson from debugging

**Update SOUL.md only if:**
- New boundary or hard stop discovered
- Better Mirror Question formulated
- Trait adjustment needed

### 4. **Delegate** — Parallelize Future Work

If pattern repeats:
- Schedule cron job for recurring task
- Create subagent spawn template
- Document in HEARTBEAT.md for periodic checks

### 5. **Reflect** — What Worked?

Before closing session:
- Did approach match SOUL.md traits?
- Did I respect user's communication style?
- Were there unnecessary tool calls?
- Did I learn something new?

## Pitfalls

- **Over-documenting.** Capture only what prevents repeating.
- **Siloing learnings.** Share patterns across skills, don't duplicate.
- **Forgetting the why.** Always note *why* something mattered.
- **Creating duplicate skills.** Check existing skills before new ones.

## Validation

- Daily notes exist: `memory/YYYY-MM-DD.md`
- MEMORY.md updated with durable learnings
- New skills have clear trigger conditions
- Skills avoid redundancy with existing ones
- SOUL.md reflects boundaries actually observed
