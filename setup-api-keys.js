#!/usr/bin/env node
/**
 * HERMES API KEY SETUP ASSISTANT
 * Guided setup untuk critical APIs
 * Run ini once untuk populate .env dengan keys
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (question) => new Promise(resolve => {
  rl.question(question, resolve)
})

const APIs = [
  {
    name: 'GitHub Token',
    env: 'GITHUB_TOKEN',
    url: 'https://github.com/settings/tokens/new',
    scope: 'public_repo,gist (for commit logs and repo stats)',
    required: false
  },
  {
    name: 'Supabase',
    env: ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_KEY'],
    url: 'https://supabase.com',
    scope: 'Create new project → copy API keys from Settings',
    required: false
  },
  {
    name: 'Sentry',
    env: 'SENTRY_DSN',
    url: 'https://sentry.io',
    scope: 'Create project → copy DSN',
    required: false
  },
  {
    name: 'NewsAPI',
    env: 'NEWSAPI_KEY',
    url: 'https://newsapi.org',
    scope: 'Sign up → get free tier key',
    required: false
  }
]

async function setup() {
  console.log('\n🔑 HERMES API KEY SETUP\n' + '='.repeat(40))
  console.log('Setup critical APIs untuk self-improvement\n')

  const envFile = path.join(__dirname, '.env')
  let envContent = fs.existsSync(envFile) ? fs.readFileSync(envFile, 'utf-8') : ''

  for (const api of APIs) {
    console.log(`\n📌 ${api.name}`)
    console.log(`   Scope: ${api.scope}`)
    console.log(`   Signup: ${api.url}`)

    if (Array.isArray(api.env)) {
      for (const key of api.env) {
        const value = await ask(`   ${key}: `)
        if (value) {
          envContent = setEnvValue(envContent, key, value)
        }
      }
    } else {
      const value = await ask(`   ${api.env}: `)
      if (value) {
        envContent = setEnvValue(envContent, api.env, value)
      }
    }
  }

  fs.writeFileSync(envFile, envContent)
  console.log('\n✅ API keys saved to .env')
  console.log('⚠️  NEVER commit .env — it\'s in .gitignore\n')

  rl.close()
}

function setEnvValue(content, key, value) {
  const pattern = new RegExp(`^${key}=.*$`, 'm')
  if (pattern.test(content)) {
    return content.replace(pattern, `${key}=${value}`)
  } else {
    return content + `\n${key}=${value}`
  }
}

setup().catch(console.error)
