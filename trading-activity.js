const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'trading-log.json');

class TradingLogger {
  constructor() {
    this.session = {
      startTime: new Date().toISOString(),
      walletAddress: '8YbQfaX4iZJo6qy2Nwbv3WM9mECD895YR4yCQfgU61ud',
      startBalance: 0,
      trades: [],
      endBalance: 0,
      pnl: 0,
      pnlPercent: 0
    };
    this.loadLog();
  }

  loadLog() {
    if (fs.existsSync(LOG_FILE)) {
      const data = fs.readFileSync(LOG_FILE, 'utf8');
      this.data = JSON.parse(data);
    } else {
      this.data = { sessions: [] };
    }
  }

  saveLog() {
    fs.writeFileSync(LOG_FILE, JSON.stringify(this.data, null, 2));
  }

  recordTrade(trade) {
    const tradeRecord = {
      timestamp: new Date().toISOString(),
      pair: trade.pair,
      side: trade.side, // BUY/SELL
      quantity: trade.quantity,
      price: trade.price,
      value: trade.quantity * trade.price,
      fee: trade.fee || 0,
      status: 'EXECUTED'
    };
    this.session.trades.push(tradeRecord);
    return tradeRecord;
  }

  finalizeSession(startBalance, endBalance) {
    this.session.startBalance = startBalance;
    this.session.endBalance = endBalance;
    this.session.pnl = endBalance - startBalance;
    this.session.pnlPercent = ((endBalance - startBalance) / startBalance) * 100;
    this.session.endTime = new Date().toISOString();
    this.data.sessions.push(this.session);
    this.saveLog();
  }

  getStats() {
    const sessions = this.data.sessions;
    if (sessions.length === 0) return null;

    const totalPnL = sessions.reduce((sum, s) => sum + s.pnl, 0);
    const totalTrades = sessions.reduce((sum, s) => sum + s.trades.length, 0);
    const avgPnLPercent = sessions.reduce((sum, s) => sum + s.pnlPercent, 0) / sessions.length;

    return {
      totalSessions: sessions.length,
      totalTrades,
      totalPnL,
      avgPnLPercent: avgPnLPercent.toFixed(2),
      lastSession: sessions[sessions.length - 1]
    };
  }
}

module.exports = TradingLogger;
