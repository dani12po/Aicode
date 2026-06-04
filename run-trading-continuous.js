const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { generateReport } = require('./trading-reporter.js');
const { message } = require('./api-client.js');

const LOG_FILE = path.join(__dirname, 'trading-log.json');
const SESSION_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours

function runTradingSession() {
  console.log(`[${new Date().toISOString()}] Starting trading session...`);

  exec('node devnet-trader.js', (err, stdout, stderr) => {
    if (err) {
      console.error('Trading error:', err);
      return;
    }

    console.log('✅ Trading session completed');

    // Generate report
    const report = generateReport();
    console.log(report);

    // Send to Telegram
    sendReport(report);
  });
}

function sendReport(report) {
  // Send via OpenClaw message tool to Telegram
  console.log('[SEND] Reporting to Telegram...');
  console.log(report);
  // This would be called by OpenClaw's messaging system
}

// Start immediately and then every 2 hours
console.log('🚀 Trading automation started');
console.log(`📍 Interval: every 2 hours`);
console.log(`📝 Log: ${LOG_FILE}`);

runTradingSession();

setInterval(() => {
  runTradingSession();
}, SESSION_INTERVAL);
