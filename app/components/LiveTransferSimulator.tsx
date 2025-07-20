// Component: LiveTransferSimulator - Compares simulated ETH transfer costs across chains visually
'use client'

import { useGasStore } from '@/store/useGasStore'
import Image from 'next/image'

const CHAINS = ['ethereum', 'polygon', 'arbitrum'] as const

const CHAIN_INFO = {
  ethereum: {
    label: 'Ethereum',
    icon: '/icons/ethereum.svg',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    bar: 'bg-blue-500',
  },
  polygon: {
    label: 'Polygon',
    icon: '/icons/polygon.svg',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    bar: 'bg-purple-500',
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: '/icons/arbitrum.svg',
    color: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
    bar: 'bg-sky-500',
  },
}

export default function LiveTransferSimulator() {
  const usdPrice = useGasStore((s) => s.usdPrice)
  const chains = useGasStore((s) => s.chains)
  const simulatedValue = useGasStore((s) => s.simulatedValue)
  const setSimulatedValue = useGasStore((s) => s.setSimulatedValue)

  const gasCosts = CHAINS.map((chain) => {
    const { baseFee, priorityFee } = chains[chain]
    const gasCost = (baseFee + priorityFee) * 21000
    const total = gasCost * usdPrice
    return { chain, total }
  })

  const maxCost = Math.max(...gasCosts.map((c) => c.total), 1)

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-lg font-semibold dark:text-white">🔁 Simulate ETH Transfer</h2>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <input
            type="range"
            min={0.01}
            max={2}
            step={0.01}
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
            className="w-40"
          />
          <input
            type="number"
            min={0.01}
            max={2}
            step={0.01}
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20 dark:bg-gray-700 dark:text-white"
          />
          <span className="text-sm dark:text-gray-300">ETH</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CHAINS.map((chain) => {
          const { baseFee, priorityFee } = chains[chain]
          const total = ((baseFee + priorityFee) * 21000 + simulatedValue * 1e9) * usdPrice
          const height = `${(total / maxCost) * 100}%`

          const { label, icon, color, bar } = CHAIN_INFO[chain]

          return (
            <div key={chain} className={`p-4 rounded-lg ${color}`}>
              <div className="flex items-center gap-2 mb-2">
                <Image src={icon} alt={label} width={24} height={24} />
                <h3 className="font-semibold">{label}</h3>
              </div>
              <div className="text-sm mb-1">Gas + Tx Cost:</div>
              <div className="font-bold text-md">${total.toFixed(4)}</div>

              <div className="h-24 flex items-end mt-3">
                <div
                  className={`w-full rounded ${bar}`}
                  style={{ height }}
                  title={`$${total.toFixed(4)}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
