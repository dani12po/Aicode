const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction
} = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

class SolanaDevnetTrader {
  constructor(walletPath = '.solana/devnet-wallet.json') {
    const secret = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
    this.keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    this.address = this.keypair.publicKey.toBase58();
    this.trades = [];
  }

  async getBalance() {
    const balance = await this.connection.getBalance(this.keypair.publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  async simulateTrade(action, amount, simulatedPrice) {
    /**
     * Simulate a trade without actual execution
     * action: 'buy' | 'sell'
     * amount: amount in SOL
     * simulatedPrice: meme coin price (in lamports per token)
     */
    const tradeId = Date.now();
    const priceFluctuation = (Math.random() - 0.5) * 0.1; // ±5% random fluctuation
    const executedPrice = simulatedPrice * (1 + priceFluctuation);

    const trade = {
      id: tradeId,
      timestamp: new Date().toISOString(),
      action,
      amount,
      entryPrice: simulatedPrice,
      executedPrice,
      priceFluctuation: (priceFluctuation * 100).toFixed(2),
      simulatedCost: (amount * executedPrice / LAMPORTS_PER_SOL).toFixed(4),
      status: 'simulated'
    };

    this.trades.push(trade);
    return trade;
  }

  async practiceSequence() {
    console.log('\n🎯 Starting Practice Trading Sequence (Simulated)\n');

    const balance = await this.getBalance();
    console.log(`📊 Wallet: ${this.address}`);
    console.log(`💰 Balance: ${balance.toFixed(4)} SOL\n`);

    // Simulate trading scenarios
    const scenarios = [
      { action: 'buy', amount: 0.5, price: 1000, name: 'BONK' },
      { action: 'buy', amount: 0.3, price: 5000, name: 'WIF' },
      { action: 'buy', amount: 0.2, price: 2000, name: 'MOG' },
      { action: 'sell', amount: 0.5, price: 1050, name: 'BONK (profit!)' },
      { action: 'sell', amount: 0.3, price: 4800, name: 'WIF (loss)' },
    ];

    for (const scenario of scenarios) {
      const trade = await this.simulateTrade(
        scenario.action,
        scenario.amount,
        scenario.price
      );

      const emoji = scenario.action === 'buy' ? '📈' : '📉';
      console.log(`${emoji} ${scenario.name}`);
      console.log(`   ${scenario.action.toUpperCase()} ${scenario.amount} SOL @ ${scenario.price} lamports`);
      console.log(`   Executed @ ${trade.executedPrice.toFixed(0)} (${trade.priceFluctuation}%)`);
      console.log(`   Cost: ~${trade.simulatedCost} SOL\n`);

      await new Promise(r => setTimeout(r, 500)); // Simulate execution delay
    }

    this.generateReport();
  }

  generateReport() {
    console.log('\n📋 === TRADING REPORT ===\n');

    let totalIn = 0, totalOut = 0;
    this.trades.forEach(t => {
      const cost = t.amount * t.executedPrice / LAMPORTS_PER_SOL;
      if (t.action === 'buy') totalIn += cost;
      else totalOut += cost;
    });

    const pnl = totalOut - totalIn;
    const roi = ((pnl / totalIn) * 100).toFixed(2);

    console.log(`Total Spent: ${totalIn.toFixed(4)} SOL`);
    console.log(`Total Received: ${totalOut.toFixed(4)} SOL`);
    console.log(`P&L: ${pnl.toFixed(4)} SOL (${roi}%)`);
    console.log(`Trades: ${this.trades.length}`);
    console.log('\n✅ Practice complete!');

    // Save trades history
    fs.writeFileSync(
      '.solana/trades-history.json',
      JSON.stringify(this.trades, null, 2)
    );
  }

  async interactiveMode() {
    console.log('\n🤖 Interactive Trading Practice Mode\n');
    console.log('Commands:');
    console.log('  balance    - Check wallet balance');
    console.log('  buy <SOL>  - Simulate buying meme coin with SOL');
    console.log('  sell <SOL> - Simulate selling meme coin');
    console.log('  history    - Show trade history');
    console.log('  report     - Generate P&L report');
    console.log('  exit       - Exit trading mode\n');
  }
}

// Main execution
async function main() {
  const trader = new SolanaDevnetTrader();
  await trader.practiceSequence();
  await trader.interactiveMode();
}

main().catch(console.error);

module.exports = SolanaDevnetTrader;
