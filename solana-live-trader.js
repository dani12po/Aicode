const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const TradingLogger = require('./trading-activity');

const WALLET = '8YbQfaX4iZJo6qy2Nwbv3WM9mECD895YR4yCQfgU61ud';
const DEVNET = clusterApiUrl('devnet');

// Mock price data untuk devnet (simulated realistic movements)
const MOCK_PRICES = {
  'BONK/SOL': { current: 0.00001, volatility: 0.15 },
  'WIF/SOL': { current: 0.0012, volatility: 0.20 },
  'MOG/SOL': { current: 0.000008, volatility: 0.25 },
  'ORCA/SOL': { current: 0.15, volatility: 0.10 }
};

class SolanaLiveTrader {
  constructor() {
    this.connection = new Connection(DEVNET);
    this.logger = new TradingLogger();
    this.portfolio = {
      SOL: 1, // dari faucet airdrop
      BONK: 0,
      WIF: 0,
      MOG: 0,
      ORCA: 0
    };
    this.prices = { ...MOCK_PRICES };
  }

  // Simulate price movement
  updatePrices() {
    Object.keys(this.prices).forEach(pair => {
      const { current, volatility } = this.prices[pair];
      const change = (Math.random() - 0.5) * volatility;
      this.prices[pair].current = current * (1 + change);
    });
  }

  // Execute buy trade
  async buy(pair, solAmount) {
    this.updatePrices();
    const price = this.prices[pair].current;
    const quantity = solAmount / price;
    const fee = solAmount * 0.0025; // 0.25% fee
    const totalCost = solAmount + fee;

    if (this.portfolio.SOL < totalCost) {
      return { error: 'Insufficient SOL balance', balance: this.portfolio.SOL };
    }

    const [token] = pair.split('/');
    this.portfolio.SOL -= totalCost;
    this.portfolio[token] = (this.portfolio[token] || 0) + quantity;

    const trade = {
      pair,
      side: 'BUY',
      quantity: quantity.toFixed(6),
      price: price.toFixed(8),
      fee
    };

    this.logger.recordTrade(trade);
    return { success: true, trade, portfolio: this.portfolio };
  }

  // Execute sell trade
  async sell(pair, tokenAmount) {
    this.updatePrices();
    const price = this.prices[pair].current;
    const solReceived = tokenAmount * price;
    const fee = solReceived * 0.0025;
    const netProceeds = solReceived - fee;

    const [token] = pair.split('/');
    if (this.portfolio[token] < tokenAmount) {
      return { error: `Insufficient ${token} balance`, balance: this.portfolio[token] };
    }

    this.portfolio[token] -= tokenAmount;
    this.portfolio.SOL += netProceeds;

    const trade = {
      pair,
      side: 'SELL',
      quantity: tokenAmount.toFixed(6),
      price: price.toFixed(8),
      fee
    };

    this.logger.recordTrade(trade);
    return { success: true, trade, portfolio: this.portfolio };
  }

  // Get current portfolio value
  getPortfolioValue() {
    let totalValue = this.portfolio.SOL;
    Object.keys(this.prices).forEach(pair => {
      const [token] = pair.split('/');
      if (token !== 'SOL') {
        totalValue += this.portfolio[token] * this.prices[pair].current;
      }
    });
    return totalValue;
  }

  // Finalize trading session
  finalizeSession() {
    const endBalance = this.getPortfolioValue();
    const startBalance = 1; // dari faucet
    this.logger.finalizeSession(startBalance, endBalance);
    return this.logger.getStats();
  }

  getStatus() {
    return {
      portfolio: this.portfolio,
      portfolioValue: this.getPortfolioValue().toFixed(6),
      prices: Object.keys(this.prices).reduce((acc, pair) => {
        acc[pair] = this.prices[pair].current.toFixed(8);
        return acc;
      }, {}),
      trades: this.logger.session.trades.length
    };
  }
}

module.exports = SolanaLiveTrader;
