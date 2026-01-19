# SwapLab 🌈

A decentralized exchange (DEX) interface for token swaps on Ethereum Sepolia testnet. SwapLab provides an educational, user-friendly platform to learn and experiment with DeFi token swaps in a safe testnet environment.

![SwapLab Banner](https://img.shields.io/badge/Network-Sepolia%20Testnet-yellow) ![React](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Wagmi](https://img.shields.io/badge/Wagmi-2.x-purple) ![Viem](https://img.shields.io/badge/Viem-2.x-green)

## ⚠️ Testnet Only

**SwapLab operates exclusively on Ethereum Sepolia testnet.** All tokens and transactions use test ETH and have no real-world value. This is an educational project designed for learning DeFi mechanics safely.

## ✨ Features

- **🔗 Wallet Integration**: Connect with MetaMask, WalletConnect, Coinbase Wallet, and more via Wagmi
- **🔄 Token Swaps**: Execute real token swaps on Sepolia using Uniswap V2/V3 protocols
- **💱 Swap Modes**: Toggle between "Exact In" (you specify input) and "Exact Out" (you specify output)
- **📊 Live Quotes**: Real-time price quotes from on-chain liquidity pools
- **⚙️ Advanced Settings**: Customize slippage tolerance, transaction deadline, and gas settings
- **📜 Transaction History**: Track all your swaps with Etherscan integration
- **🎯 Smart State Management**: Automatic detection of wallet state, network, and approval requirements
- **🔐 Security**: Token approval management with recommended allowance limits

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm/yarn/pnpm
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** - Get free testnet ETH from [Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- **Test Tokens** - RUMBA and PYUSD test tokens (addresses provided below)

### Installation

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

## 🏗️ Architecture

### Smart Contracts

SwapLab interacts with the following Sepolia contracts:

| Contract | Address | Purpose |
|----------|---------|---------|
| RUMBA Token | `0x...` | ERC-20 test token |
| PYUSD Token | `0x...` | ERC-20 test token |
| Uniswap V2 Router | `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D` | DEX protocol |
| Uniswap V3 Router | `0xE592427A0AEce92De3Edee1F18E0157C05861564` | DEX protocol |

### Tech Stack

#### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library

#### Web3 Integration
- **Wagmi v2** - React hooks for Ethereum
- **Viem v2** - TypeScript Ethereum library
- **@tanstack/react-query** - Async state management
- **@rainbow-me/rainbowkit** (optional) - Enhanced wallet connection UI

#### Data & State
- **Zustand** - Client state management
- **React Query** - Server state & caching
- **Local Storage** - Settings persistence

## 📁 Project Structure
```
swaplab/
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   ├── layout/           # Layout structure
│   │   └── swap/             # Swap-specific components
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SwapPage.tsx
│   │   └── HistoryPage.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useSwap.ts        # Swap execution logic
│   │   ├── useQuote.ts       # Price quote fetching
│   │   ├── useTokenBalance.ts
│   │   ├── useTokenApproval.ts
│   │   └── useTransactionHistory.ts
│   ├── lib/                  # Utility functions
│   │   ├── contracts.ts      # Contract ABIs and addresses
│   │   ├── tokens.ts         # Token definitions
│   │   ├── swap.ts           # Swap calculation logic
│   │   └── formatting.ts     # Number/address formatting
│   ├── types/
│   │   └── swap.ts
│   ├── config/
│   │   └── wagmi.ts          # Wagmi configuration
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── contracts/                # Smart contract ABIs
│   ├── ERC20.json
│   ├── UniswapV2Router.json
│   └── UniswapV3Router.json
├── .env.example
├── .env
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🔐 Security Considerations

- ✅ **Unlimited Approvals**: By default, approves MAX_UINT256 for gas efficiency. Users can modify in settings.
- ✅ **Slippage Protection**: Configurable slippage tolerance (default 0.5%)
- ✅ **Deadline Protection**: Transactions expire after deadline (default 20 minutes)
- ✅ **Front-running Protection**: MEV protection through private RPCs (optional)
- ✅ **Contract Verification**: All contracts verified on Etherscan
- ⚠️ **Testnet Only**: Not audited for mainnet use

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables (Production)

Ensure all environment variables are set in your hosting platform:
- `VITE_SEPOLIA_RPC_URL`
- `VITE_WALLETCONNECT_PROJECT_ID`
- Contract addresses
- Analytics IDs

## 🛣️ Roadmap

- [x] Basic swap UI
- [x] Wallet connection
- [x] Token approval flow
- [x] Swap execution
- [ ] Multi-hop swaps (routing through multiple pairs)
- [ ] Liquidity pool information
- [ ] Advanced charts (TradingView integration)
- [ ] Portfolio tracking
- [ ] Gas price optimization
- [ ] Limit orders
- [ ] Cross-chain swaps (future)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

SwapLab is an educational project built for learning purposes on Ethereum's Sepolia testnet. It is not audited and should not be used with real funds on mainnet. The developers are not responsible for any losses incurred through use of this software.


## 🙏 Acknowledgments

- [Uniswap](https://uniswap.org/) - DEX protocol inspiration
- [Wagmi](https://wagmi.sh/) - Excellent Web3 React hooks
- [Viem](https://viem.sh/) - TypeScript Ethereum library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

**Built with ❤️ for the Ethereum community**

*Sepolia Testnet • Educational Use Only • Not Financial Advice*