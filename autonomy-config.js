#!/usr/bin/env node
/**
 * HERMES AUTONOMY CONFIG
 * Self-hosted automation + skill templates
 *
 * Usage:
 * - Import in self-improvement-loop.js
 * - Auto-create skills dari learnings
 * - Manage strategy versioning
 */

const fs = require('fs')
const path = require('path')

class AutonomyConfig {
  constructor() {
    this.configPath = path.join(__dirname, 'memory', 'autonomy-config.json')
    this.config = this.load()
  }

  load() {
    if (fs.existsSync(this.configPath)) {
      return JSON.parse(fs.readFileSync(this.configPath))
    }

    return {
      version: '1.0.0',
      trading: {
        enabled: true,
        runInterval: '2h',
        riskPerTrade: 0.01, // 1% of balance
        tokens: ['BONK', 'WIF', 'MOG'],
        strategies: [
          {
            name: 'basic_momentum',
            description: 'Simple momentum-based entry/exit',
            entrySignal: 'price increase >2%',
            exitSignal: 'profit 5% or loss 2%',
            version: 1,
            active: true
          }
        ]
      },
      learning: {
        enabled: true,
        autoCreateSkills: true,
        minSessions: 3, // Create skill after N sessions with pattern
        skillTemplate: 'memory/skill-template.md'
      },
      reporting: {
        enabled: true,
        frequency: 'every_session',
        channels: ['telegram', 'github'],
        metrics: ['pnl', 'winrate', 'ddrawdown', 'trades_executed']
      },
      monitoring: {
        enabled: true,
        healthCheckInterval: '30m',
        metricsRetention: 1000 // data points
      }
    }
  }

  save() {
    const dir = path.dirname(this.configPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2))
  }

  updateStrategy(strategyName, updates) {
    const strategy = this.config.trading.strategies.find(s => s.name === strategyName)
    if (strategy) {
      Object.assign(strategy, updates)
      this.save()
    }
  }

  addLearningSkill(skillData) {
    // Create skill from learning
    const skillPath = path.join(__dirname, 'memory', `skill-${skillData.name}.md`)

    const skillContent = `# ${skillData.name}

**Description:** ${skillData.description}

**When to use:** ${skillData.whenToUse}

**Steps:**
${skillData.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Result:** ${skillData.result}

**Created:** ${new Date().toISOString()}
**Sessions:** ${skillData.sessions}
`

    fs.writeFileSync(skillPath, skillContent)
    return skillPath
  }
}

module.exports = { AutonomyConfig }
