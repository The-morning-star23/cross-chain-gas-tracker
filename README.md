# ⛽ Cross-Chain Gas Tracker

A real-time dashboard that visualizes gas fees and transaction costs across **Ethereum**, **Polygon**, and **Arbitrum**. Built with **Next.js**, **Zustand**, **Ethers.js**, and **Lightweight Charts** — using native RPC endpoints and Uniswap V3 price data (no third-party APIs).

## 🔧 Features

- 📡 Real-time gas tracking via WebSocket RPC (Infura)
- 💰 ETH → USD calculation using Uniswap V3's on-chain Swap events
- 📊 Interactive candlestick charts (15-minute intervals)
- 🔁 Simulation Mode: Calculate gas + tx cost for any value
- 🌓 Dark Mode toggle (global)
- 🧮 Cross-chain USD comparison table
- 📱 Fully responsive layout
- 🎨 Chain-specific icons, colors, and themes

## 🧠 Architecture

```mermaid
graph LR
  A[User] --> B[Next.js Frontend]
  B --> C[Zustand State Store]
  C --> D{Mode}
  D -->|Live| E[WebSocket Providers]
  D -->|Simulate| F[Transaction Calculator]
  E --> G[Ethereum RPC]
  E --> H[Polygon RPC]
  E --> I[Arbitrum RPC]
  F --> J[Uniswap V3 ETH/USDC Pool]
  J --> K[Parse Swap Events]
  K --> L[Calculate ETH/USD]
  L --> M[Gas Cost USD]
  G --> N[Base/Priority Fees]
  H --> N
  I --> N
  N --> O[Candlestick Chart]
  O --> P[Lightweight Charts]
  M --> P

🚀 Getting Started

1. Clone and install dependencies

git clone https://github.com/The-morning-star23/cross-chain-gas-tracker.git
cd cross-chain-gas-tracker
npm install

2. Add .env.local

NEXT_PUBLIC_ETHEREUM_RPC=wss://mainnet.infura.io/ws/v3/YOUR_KEY
NEXT_PUBLIC_POLYGON_RPC=wss://polygon-mainnet.infura.io/ws/v3/YOUR_KEY
NEXT_PUBLIC_ARBITRUM_RPC=wss://arbitrum-mainnet.infura.io/ws/v3/YOUR_KEY
NEXT_PUBLIC_UNISWAP_POOL=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640

3. Run the app

npm run dev

## 🛠 Tech Stack

Next.js 15

React 19

Ethers.js 6

Zustand (global state)

Tailwind CSS 4

Lightweight Charts (candlestick rendering)

Infura (WebSocket RPC)


📝 License

MIT License © 2025
Made with 💙 by [Shubh Kumar]