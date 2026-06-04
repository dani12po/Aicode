const { Keypair, Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

const WALLET_DIR = path.join(__dirname, '.solana');
const WALLET_FILE = path.join(WALLET_DIR, 'devnet-wallet.json');

// Ensure wallet directory exists
if (!fs.existsSync(WALLET_DIR)) {
  fs.mkdirSync(WALLET_DIR, { recursive: true });
}

// Create or load wallet
let keypair;
if (fs.existsSync(WALLET_FILE)) {
  console.log('📂 Loading existing wallet...');
  const secret = JSON.parse(fs.readFileSync(WALLET_FILE, 'utf8'));
  keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
} else {
  console.log('🔐 Creating new wallet keypair...');
  keypair = Keypair.generate();
  fs.writeFileSync(WALLET_FILE, JSON.stringify(Array.from(keypair.secretKey)), { mode: 0o600 });
}

const publicKey = keypair.publicKey.toBase58();
console.log(`\n✅ Wallet Address: ${publicKey}`);

// Setup devnet connection
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Check balance
async function checkBalance() {
  try {
    const balance = await connection.getBalance(keypair.publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;
    console.log(`💰 Current Balance: ${solBalance.toFixed(4)} SOL`);
    return solBalance;
  } catch (err) {
    console.error('Error checking balance:', err.message);
    return 0;
  }
}

// Request airdrop from faucet
async function requestAirdrop() {
  try {
    console.log('\n🚰 Requesting devnet faucet (2 SOL)...');
    const signature = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log(`📝 Tx Signature: ${signature}`);

    // Wait for confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));
    const balance = await checkBalance();
    return balance;
  } catch (err) {
    console.error('Airdrop failed:', err.message);
    return 0;
  }
}

// Main setup
async function setup() {
  console.log('🚀 Solana Devnet Wallet Setup\n');
  console.log(`🌐 Network: Devnet`);
  console.log(`📡 RPC: ${clusterApiUrl('devnet')}`);

  const currentBalance = await checkBalance();

  if (currentBalance < 0.1) {
    console.log('\n⚠️  Balance too low, requesting airdrop...');
    await requestAirdrop();
  }

  // Save wallet info
  const walletInfo = {
    address: publicKey,
    network: 'devnet',
    rpc: clusterApiUrl('devnet'),
    created: new Date().toISOString(),
    secretKeyPath: WALLET_FILE
  };

  fs.writeFileSync(path.join(WALLET_DIR, 'wallet-info.json'), JSON.stringify(walletInfo, null, 2));

  console.log(`\n📋 Wallet Info saved to: ${WALLET_DIR}`);
  console.log('✅ Setup complete! Ready to trade on devnet.\n');
}

setup().catch(console.error);
