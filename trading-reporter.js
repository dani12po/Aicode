const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'trading-log.json');

// Token contract addresses (Solana Devnet)
const TOKEN_CONTRACTS = {
  'BONK': 'DezXAZ8z7PnrnRJjz3wXBoRgixVpdZuvXAfqLLjKXD1',
  'WIF': 'EKpQGSAYeCEf4A8sSYaRA2sqKzsGW6je68GJNWmic5w',
  'MOG': 'JAN3ilMUAtpgyrtwKzap3zuNwVtjRBRnP5EScbxAcT1',
  'COPE': 'CNPonpgAQwwZQEZC6K7NQCXFxq4c6sNQdivzNQmM486U',
  'SAMO': 'Jeo4wQSCeoNZeRBbU3S6za3CE4TmWMVg1snLHVrVg8j',
  'SOL': 'So11111111111111111111111111111111111111112'
};

function generateReport() {
  if (!fs.existsSync(LOG_FILE)) {
    return '⚠️ No trading data yet.';
  }

  const data = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  const sessions = data.sessions;

  if (sessions.length === 0) {
    return '⚠️ No trading sessions recorded.';
  }

  const lastSession = sessions[sessions.length - 1];
  const totalPnL = sessions.reduce((sum, s) => sum + s.pnl, 0);
  const totalTrades = sessions.reduce((sum, s) => sum + s.trades.length, 0);
  const winSessions = sessions.filter(s => s.pnl > 0).length;
  const lossSessions = sessions.filter(s => s.pnl < 0).length;
  const winRate = (winSessions / sessions.length * 100).toFixed(1);

  // Analisis per token
  const tokenStats = analyzeTokens(sessions);

  // Performance trend
  const recentSessions = sessions.slice(-3);
  const performanceTrend = recentSessions.map(s => s.pnlPercent);

  let report = `═══════════════════════════════════\n`;
  report += `📊 *TRADING PERFORMANCE DASHBOARD*\n`;
  report += `═══════════════════════════════════\n\n`;

  // Balance section
  report += `💰 *BALANCE STATUS*\n`;
  report += `├─ Start: <code>${lastSession.startBalance.toFixed(6)}</code> SOL\n`;
  report += `├─ Current: <code>${lastSession.endBalance.toFixed(6)}</code> SOL\n`;
  const balanceChange = lastSession.endBalance - lastSession.startBalance;
  const changeIndicator = balanceChange >= 0 ? '📈 ↗' : '📉 ↘';
  report += `└─ ${changeIndicator} ${balanceChange >= 0 ? '+' : ''}${balanceChange.toFixed(6)} SOL\n\n`;

  // Session PnL
  report += `📍 *SESSION #${sessions.length}*\n`;
  const pnlColor = lastSession.pnl >= 0 ? '🟢' : '🔴';
  report += `├─ PnL: ${pnlColor} <code>${lastSession.pnl >= 0 ? '+' : ''}${lastSession.pnl.toFixed(6)}</code> SOL\n`;
  report += `├─ Return: ${lastSession.pnlPercent >= 0 ? '📗' : '📕'} ${lastSession.pnlPercent.toFixed(2)}%\n`;
  report += `├─ Trades: <code>${lastSession.trades.length}</code>\n`;
  report += `└─ Duration: ${getSessionDuration(lastSession)}\n\n`;

  // Cumulative stats
  report += `📊 *CUMULATIVE STATS*\n`;
  report += `├─ Sessions: <code>${sessions.length}</code>\n`;
  report += `├─ Total Trades: <code>${totalTrades}</code>\n`;
  report += `├─ Win Rate: ${getWinRateBar(winRate)} ${winRate}%\n`;
  report += `├─ W/L: <code>${winSessions}W / ${lossSessions}L</code>\n`;
  const totalColor = totalPnL >= 0 ? '🟢' : '🔴';
  report += `├─ Total PnL: ${totalColor} <code>${totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(6)}</code> SOL\n`;
  report += `└─ Avg/Session: <code>${(totalPnL / sessions.length).toFixed(6)}</code> SOL\n\n`;

  // Token allocation with contracts
  report += `🎲 *TOKEN ALLOCATION*\n`;
  Object.entries(tokenStats).forEach(([token, stats]) => {
    const profitColor = stats.totalPnL >= 0 ? '🟢' : '🔴';
    const contract = TOKEN_CONTRACTS[token] || 'N/A';
    report += `├─ ${token}: ${profitColor} ${stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(6)} SOL (${stats.trades}x)\n`;
    report += `│  └─ <code>${contract.substring(0, 10)}...${contract.substring(contract.length - 10)}</code>\n`;
  });
  report += '\n';

  // Recent trades
  report += `🔄 *LATEST 5 TRADES*\n`;
  const recentTrades = lastSession.trades.slice(-5);
  recentTrades.forEach((t, i) => {
    const symbol = t.side === 'BUY' ? '📥' : '📤';
    const pnlIndicator = t.side === 'SELL' ? (t.value >= t.quantity * 0.00095 ? '✅' : '⚠️') : '⏳';
    report += `${i + 1}. ${symbol} ${t.side.padEnd(4)} <code>${parseFloat(t.quantity).toFixed(2).padStart(10)}</code> ${t.pair.padEnd(7)} @ <code>${t.price}</code> ${pnlIndicator}\n`;
  });
  report += '\n';

  // Performance trend
  report += `📈 *TREND (Last 3)*\n`;
  report += `${performanceTrend.map((p, i) => {
    const arrow = i === performanceTrend.length - 1 ? '→' : '·';
    const emoji = p >= 0 ? '🟢' : '🔴';
    return `${emoji} ${p.toFixed(2)}% ${arrow}`;
  }).join(' ')}\n\n`;

  report += `═══════════════════════════════════\n`;
  report += `🎯 Next session in 2h\n\n`;

  // Contract reference
  report += `*🔗 CONTRACT REFERENCE*\n`;
  report += `Solana Devnet Program: <code>TokenkegQfeZyiNwAJsyFbPVwwQQfg5bgvFYJJoK2PK</code>\n`;
  report += `View on Explorer: <code>https://explorer.solana.com/?cluster=devnet</code>\n`;

  return report;
}

function analyzeTokens(sessions) {
  const tokenStats = {};
  sessions.forEach(session => {
    session.trades.forEach(trade => {
      if (!tokenStats[trade.pair]) {
        tokenStats[trade.pair] = { totalPnL: 0, trades: 0 };
      }
      tokenStats[trade.pair].trades++;
      if (trade.side === 'SELL') {
        const buyTrade = session.trades.find(t => t.pair === trade.pair && t.side === 'BUY');
        if (buyTrade) {
          const pnl = (trade.value - buyTrade.value);
          tokenStats[trade.pair].totalPnL += pnl;
        }
      }
    });
  });
  return tokenStats;
}

function getSessionDuration(session) {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  const diff = Math.floor((end - start) / 1000);
  return `${diff}s`;
}

function getWinRateBar(rate) {
  const percent = parseFloat(rate);
  if (percent >= 70) return '█████ ';
  if (percent >= 50) return '███░░ ';
  if (percent >= 30) return '██░░░ ';
  return '█░░░░ ';
}

module.exports = { generateReport };
