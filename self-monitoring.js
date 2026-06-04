#!/usr/bin/env node
/**
 * HERMES SELF-MONITORING
 * Continuous health checks, performance metrics, and system state
 */

require('dotenv').config()
const fs = require('fs')
const path = require('path')

class SelfMonitor {
  constructor() {
    this.stateFile = path.join(__dirname, '.openclaw', 'workspace-state.json')
    this.metricsFile = path.join(__dirname, 'memory', 'metrics.json')
  }

  getSystemState() {
    const stats = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid,
      nodejs: process.version,
    }

    // Trading stats
    const tradingLog = path.join(__dirname, 'trading-log.json')
    if (fs.existsSync(tradingLog)) {
      try {
        const log = JSON.parse(fs.readFileSync(tradingLog))
        const latest = log[log.length - 1]
        stats.trading = {
          sessions: log.length,
          latestPnL: latest?.pnl,
          latestWinRate: latest?.winRate,
          totalPnL: log.reduce((sum, s) => sum + (s.pnl || 0), 0)
        }
      } catch (e) {
        // Ignore parse errors
      }
    }

    // Learnings count
    const learningsFile = path.join(__dirname, 'memory', 'learnings.json')
    if (fs.existsSync(learningsFile)) {
      try {
        const learnings = JSON.parse(fs.readFileSync(learningsFile))
        stats.learnings = learnings.length
      } catch (e) {
        // Ignore
      }
    }

    return stats
  }

  saveMetrics() {
    const state = this.getSystemState()

    const metricsDir = path.dirname(this.metricsFile)
    if (!fs.existsSync(metricsDir)) {
      fs.mkdirSync(metricsDir, { recursive: true })
    }

    let metrics = []
    if (fs.existsSync(this.metricsFile)) {
      try {
        metrics = JSON.parse(fs.readFileSync(this.metricsFile))
      } catch (e) {
        // Start fresh
      }
    }

    // Keep last 1000 data points (manageable size)
    metrics.push(state)
    if (metrics.length > 1000) {
      metrics = metrics.slice(-1000)
    }

    fs.writeFileSync(this.metricsFile, JSON.stringify(metrics, null, 2))
    return state
  }

  reportHealth() {
    const state = this.getSystemState()

    console.log('\n📊 HERMES HEALTH CHECK\n' + '='.repeat(40))
    console.log(`⏰ Time: ${state.timestamp}`)
    console.log(`🔌 PID: ${state.pid}`)
    console.log(`📦 Memory: ${(state.memory.heapUsed / 1024 / 1024).toFixed(2)}MB`)
    console.log(`⏱️  Uptime: ${(state.uptime / 60).toFixed(1)}m`)

    if (state.trading) {
      console.log(`\n🎯 Trading Stats:`)
      console.log(`  • Sessions: ${state.trading.sessions}`)
      console.log(`  • Cumulative PnL: ${(state.trading.totalPnL * 100).toFixed(2)}%`)
      console.log(`  • Latest: ${(state.trading.latestPnL * 100).toFixed(2)}% (${(state.trading.latestWinRate * 100).toFixed(0)}% win)`)
    }

    if (state.learnings) {
      console.log(`\n🧠 Learning:`)
      console.log(`  • Recorded insights: ${state.learnings}`)
    }

    console.log('\n' + '='.repeat(40) + '\n')
  }
}

// === EXECUTE ===
if (require.main === module) {
  const monitor = new SelfMonitor()
  monitor.saveMetrics()
  monitor.reportHealth()
}

module.exports = { SelfMonitor }
