#!/usr/bin/env node
/**
 * HERMES SELF-IMPROVEMENT LOOP
 * Autonomous framework for continuous learning and skill upgrade
 *
 * Runs:
 * 1. Trading sessions (practice + real strategy testing)
 * 2. Analysis & strategy refinement
 * 3. Learning logging (persist insights to memory)
 * 4. Skill creation (capture reusable patterns)
 * 5. Reporting (dashboard + market analysis)
 * 6. GitHub integration (commit learnings)
 */

require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// === CONFIG ===
const SESSION_ID = `session_${Date.now()}`
const SESSION_LOG = path.join(__dirname, 'memory', `session_${new Date().toISOString().split('T')[0]}.md`)
const TRADING_LOG = path.join(__dirname, 'trading-log.json')
const MEMORY_FILE = path.join(__dirname, 'MEMORY.md')

// === MEMORY SYSTEM ===
class MemorySystem {
  constructor() {
    this.memoryDir = path.join(__dirname, 'memory')
    if (!fs.existsSync(this.memoryDir)) {
      fs.mkdirSync(this.memoryDir, { recursive: true })
    }
  }

  log(message) {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] ${message}`
    console.log(logEntry)

    // Append to session log
    if (!fs.existsSync(SESSION_LOG)) {
      fs.writeFileSync(SESSION_LOG, `# Session Log ${SESSION_ID}\n\n`)
    }
    fs.appendFileSync(SESSION_LOG, `${logEntry}\n`)
  }

  recordLearning(insight) {
    this.log(`📝 Learning: ${insight}`)

    const memory = {
      timestamp: new Date().toISOString(),
      sessionId: SESSION_ID,
      type: 'insight',
      content: insight
    }

    const learningsFile = path.join(this.memoryDir, 'learnings.json')
    const learnings = fs.existsSync(learningsFile) ? JSON.parse(fs.readFileSync(learningsFile)) : []
    learnings.push(memory)
    fs.writeFileSync(learningsFile, JSON.stringify(learnings, null, 2))
  }

  getTradingStats() {
    if (!fs.existsSync(TRADING_LOG)) return null
    const log = JSON.parse(fs.readFileSync(TRADING_LOG))
    return log[log.length - 1] || null
  }
}

const memory = new MemorySystem()

// === TRADING SESSION ===
async function runTradingSession() {
  memory.log('🚀 Starting trading session...')

  try {
    // Execute trading bot
    const output = execSync('node devnet-trader.js', { encoding: 'utf-8' })
    memory.log('✅ Trading session complete')

    return output
  } catch (error) {
    memory.log(`❌ Trading error: ${error.message}`)
    return null
  }
}

// === ANALYSIS & LEARNING ===
function analyzePerformance() {
  memory.log('📊 Analyzing trading performance...')

  const stats = memory.getTradingStats()
  if (!stats) {
    memory.log('No trading data available')
    return
  }

  const { pnl, winRate, trades } = stats

  // Record learnings
  if (pnl < -0.05) {
    memory.recordLearning(`Large loss session (${(pnl * 100).toFixed(2)}%) — review entry/exit logic`)
  } else if (pnl > 0.05) {
    memory.recordLearning(`Strong session (${(pnl * 100).toFixed(2)}%) — strategy working, scale it`)
  }

  if (winRate === 0) {
    memory.recordLearning('Zero win rate — consider stricter stop-loss or different entry signals')
  } else if (winRate > 0.5) {
    memory.recordLearning(`${(winRate * 100).toFixed(0)}% win rate — profitable strategy emerging`)
  }

  memory.recordLearning(`Session tokens: ${trades?.map(t => t.pair).join(', ')}`)
}

// === REPORTING ===
async function generateReport() {
  memory.log('📈 Generating report...')

  try {
    execSync('node trading-reporter.js', { encoding: 'utf-8' })
    memory.log('✅ Report generated')
  } catch (error) {
    memory.log(`⚠️ Report error: ${error.message}`)
  }
}

// === GITHUB INTEGRATION ===
function commitProgress() {
  memory.log('📤 Committing learnings to GitHub...')

  try {
    // Stage memory & session logs
    execSync('git add memory/ trading-log.json', { encoding: 'utf-8' })

    const stats = memory.getTradingStats()
    const pnl = stats ? (stats.pnl * 100).toFixed(2) : '0'
    const message = `🤖 Hermes auto-session: PnL ${pnl}% — strategy refinement ongoing`

    execSync(`git commit -m "${message}"`, { encoding: 'utf-8' })
    memory.log('✅ Committed')
  } catch (error) {
    memory.log(`⚠️ Git commit skipped (${error.message})`)
  }
}

// === MAIN LOOP ===
async function runImprovement() {
  memory.log(`\n${'='.repeat(50)}\n🧠 HERMES SELF-IMPROVEMENT LOOP STARTED\n${'='.repeat(50)}\n`)

  // 1. Run trading session
  await runTradingSession()

  // 2. Analyze & learn
  analyzePerformance()

  // 3. Generate report
  await generateReport()

  // 4. Commit learnings
  commitProgress()

  memory.log(`\n✨ Session complete. Next run in 2h via cron.\n`)
}

// === EXECUTE ===
if (require.main === module) {
  runImprovement().catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}

module.exports = { runImprovement, memory }
