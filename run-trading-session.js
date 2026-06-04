const SolanaLiveTrader = require('./solana-live-trader');

async function runTradingSession() {
  const trader = new SolanaLiveTrader();
  
  console.log('🎯 SOLANA DEVNET TRADING SESSION START\n');
  console.log(`Wallet: 8YbQfaX4iZJo6qy2Nwbv3WM9mECD895YR4yCQfgU61ud`);
  console.log(`Start Balance: 1.0 SOL\n`);

  // Trade 1: Buy BONK
  console.log('📍 Trade 1: BUY BONK/SOL (0.3 SOL)');
  let result = await trader.buy('BONK/SOL', 0.3);
  if (result.success) {
    console.log(`✅ Bought ${result.trade.quantity} BONK @ ${result.trade.price} SOL`);
    console.log(`   Fee: ${result.trade.fee.toFixed(6)} SOL`);
  }

  // Trade 2: Buy WIF
  console.log('\n📍 Trade 2: BUY WIF/SOL (0.25 SOL)');
  result = await trader.buy('WIF/SOL', 0.25);
  if (result.success) {
    console.log(`✅ Bought ${result.trade.quantity} WIF @ ${result.trade.price} SOL`);
    console.log(`   Fee: ${result.trade.fee.toFixed(6)} SOL`);
  }

  // Trade 3: Buy MOG
  console.log('\n📍 Trade 3: BUY MOG/SOL (0.2 SOL)');
  result = await trader.buy('MOG/SOL', 0.2);
  if (result.success) {
    console.log(`✅ Bought ${result.trade.quantity} MOG @ ${result.trade.price} SOL`);
    console.log(`   Fee: ${result.trade.fee.toFixed(6)} SOL`);
  }

  // Wait a bit (simulate market movement)
  console.log('\n⏳ Waiting for market movement...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Trade 4: Sell some BONK (take profit)
  const bonkBalance = trader.portfolio.BONK / 2;
  console.log(`\n📍 Trade 4: SELL BONK/SOL (${bonkBalance.toFixed(6)} BONK)`);
  result = await trader.sell('BONK/SOL', bonkBalance);
  if (result.success) {
    console.log(`✅ Sold ${result.trade.quantity} BONK @ ${result.trade.price} SOL`);
    console.log(`   Proceeds: ${(result.trade.quantity * result.trade.price - result.trade.fee).toFixed(6)} SOL`);
  }

  // Trade 5: Sell WIF
  const wifBalance = trader.portfolio.WIF * 0.7;
  console.log(`\n📍 Trade 5: SELL WIF/SOL (${wifBalance.toFixed(6)} WIF)`);
  result = await trader.sell('WIF/SOL', wifBalance);
  if (result.success) {
    console.log(`✅ Sold ${result.trade.quantity} WIF @ ${result.trade.price} SOL`);
    console.log(`   Proceeds: ${(result.trade.quantity * result.trade.price - result.trade.fee).toFixed(6)} SOL`);
  }

  // Get final status
  console.log('\n' + '='.repeat(60));
  console.log('📊 PORTFOLIO STATUS (Session End)');
  console.log('='.repeat(60));
  const status = trader.getStatus();
  console.log(`\nCurrent Holdings:`);
  Object.entries(status.portfolio).forEach(([token, amount]) => {
    if (amount > 0) console.log(`  ${token}: ${amount.toFixed(6)}`);
  });

  console.log(`\nPortfolio Value: ${status.portfolioValue} SOL`);
  console.log(`Total Trades Executed: ${status.trades}`);

  // Finalize
  const stats = trader.finalizeSession();
  console.log('\n' + '='.repeat(60));
  console.log('📈 SESSION PERFORMANCE');
  console.log('='.repeat(60));
  console.log(`Start Balance: 1.0 SOL`);
  console.log(`End Balance: ${stats.lastSession.endBalance.toFixed(6)} SOL`);
  console.log(`PnL: ${stats.lastSession.pnl.toFixed(6)} SOL`);
  console.log(`PnL %: ${stats.lastSession.pnlPercent.toFixed(2)}%`);
  console.log(`\nCumulative Stats:`);
  console.log(`Total Sessions: ${stats.totalSessions}`);
  console.log(`Total Trades: ${stats.totalTrades}`);
  console.log(`Total PnL: ${stats.totalPnL.toFixed(6)} SOL`);
  console.log(`Average Return: ${stats.avgPnLPercent}%`);
}

runTradingSession().catch(console.error);
