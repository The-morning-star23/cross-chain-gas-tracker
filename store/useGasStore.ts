import { create } from 'zustand'

export type Chain = 'ethereum' | 'polygon' | 'arbitrum'

export type GasPoint = {
  timestamp: number
  baseFee: number
  priorityFee: number
}

type ChainGasState = {
  baseFee: number
  priorityFee: number
  history: GasPoint[]
}

type GasStore = {
  mode: 'live' | 'simulation'
  simulatedValue: number
  usdPrice: number
  chains: Record<Chain, ChainGasState>
  setGas: (chain: Chain, baseFee: number, priorityFee: number) => void
  setMode: (mode: 'live' | 'simulation') => void
  setUsdPrice: (price: number) => void
  setSimulatedValue: (value: number) => void
}

export const useGasStore = create<GasStore>((set) => ({
  mode: 'live',
  usdPrice: 0,
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },
  setGas: (chain, baseFee, priorityFee) =>
    set((state) => {
      const timestamp = Date.now()
      const newPoint = { timestamp, baseFee, priorityFee }

      return {
        chains: {
          ...state.chains,
          [chain]: {
            baseFee,
            priorityFee,
            history: [...state.chains[chain].history.slice(-60), newPoint],
          },
        },
      }
    }),
  setMode: (mode) => set(() => ({ mode })),
  setUsdPrice: (price) => set(() => ({ usdPrice: price })),
  simulatedValue: 0.5, // default to 0.5 ETH/MATIC/ETH
  setSimulatedValue: (value) => set(() => ({ simulatedValue: value })),
}))
