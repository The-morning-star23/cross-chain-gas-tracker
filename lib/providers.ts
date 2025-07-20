import { WebSocketProvider } from 'ethers'

export const ethereumProvider = new WebSocketProvider(
  process.env.NEXT_PUBLIC_ETHEREUM_RPC!
)

export const polygonProvider = new WebSocketProvider(
  process.env.NEXT_PUBLIC_POLYGON_RPC!
)

export const arbitrumProvider = new WebSocketProvider(
  process.env.NEXT_PUBLIC_ARBITRUM_RPC!
)
