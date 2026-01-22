# SwapLab 🌈

**SwapLab** is a decentralized exchange (DEX) frontend for experimenting with token swaps on the **Ethereum Sepolia testnet**.

🔗 **Live Demo:** https://rumenastaneva.github.io/swaplab/

![Network](https://img.shields.io/badge/Network-Sepolia%20Testnet-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![Wagmi](https://img.shields.io/badge/Wagmi-2.x-green)

---

## ⚠️ Testnet Only
This project runs **only on Sepolia**.  
All tokens and ETH are testnet assets with **no real value**.

---

## ✨ Features
- Wallet connection (MetaMask, WalletConnect, Coinbase)
- Token swaps via Uniswap V2 / V3
- Exact In / Exact Out modes
- Live on-chain price quotes
- Slippage & deadline controls
- Transaction tracking

---

## 🧱 Tech Stack
- React + TypeScript
- Vite
- Wagmi + Viem
- React Query
- Tailwind CSS

---
## 🚀 Local Development

# Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/swaplab.git
   cd swaplab
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   # Alchemy or Infura RPC URL
   VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
   
   # WalletConnect Project ID (get from https://cloud.walletconnect.com/)
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id
   
   # Contract Addresses
   VITE_RUMBA_TOKEN_ADDRESS=0x...
   VITE_PYUSD_TOKEN_ADDRESS=0x...
   VITE_UNISWAP_V2_ROUTER=0x...
```

4. **Start the development server**
```bash
   npm run dev
```

5. **Configure MetaMask**
   - Network: Sepolia Testnet
   - Chain ID: 11155111
   - RPC: https://sepolia.infura.io/v3/YOUR_KEY
   - Currency Symbol: ETH

## 🌍 Deployment

- Deployed to **GitHub Pages** using **GitHub Actions**
- Uses **HashRouter** (required for GitHub Pages SPA routing)
- Environment variables are injected via **GitHub Repository Secrets**

---

## ✨ Features & Learnings

### Implemented Features
- Wallet connection (MetaMask, WalletConnect)
- On-chain token swaps (Uniswap V2)
- Exact In / Exact Out swap modes
- Live price quoting from liquidity pools
- Token approval flow
- Slippage tolerance & deadline handling
- Transaction status tracking

### What I Learned
- Building a production-ready Web3 frontend with **Vite + React**
- Using **Wagmi v2** and **Viem** for wallet and contract interactions
- Handling ERC-20 approvals and decimals correctly
- Reading on-chain data vs executing transactions
- Managing async blockchain state and UI feedback
- Deploying SPAs to GitHub Pages with CI/CD
- Injecting environment variables securely at build time
- Debugging differences between local and production builds

---

## ⚠️ Disclaimer

Educational project only.  
Not audited.  
Do **not** use with real funds.

---

## 🙏 A Friendly Request

This project was built while learning and experimenting with DeFi mechanics.

I **kindly pray**:
- that no critical mistakes were made 🙏
- that the liquidity pool i created does **not get accidentally drained**
- and that you treat this app gently ❤️

If you need some **amazing RUMBA tokens**:
- feel free to **DM me**, or
- wait for the **next app**, where you’ll be able to mint / claim RUMBA tokens yourself 😉

Learning in public. Breaking things (hopefully not pools).  

---

Built with ❤️ for learning Web3 development.