// Component: LiveTransferSimulator - Compares simulated ETH transfer costs across chains visually

'use client'

import { useGasStore } from '@/store/useGasStore'
import Image from 'next/image'

const CHAINS = ['ethereum', 'polygon', 'arbitrum'] as const

const CHAIN_INFO = {
  ethereum: {
    label: 'Ethereum',
    icon: '/icons/ethereum.svg',
    color: 'bg-blue-50 text-blue-800',
    bar: 'bg-blue-600',
  },
  polygon: {
    label: 'Polygon',
    icon: '/icons/polygon.svg',
    color: 'bg-purple-50 text-purple-800',
    bar: 'bg-purple-600',
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: '/icons/arbitrum.svg',
    color: 'bg-sky-50 text-sky-800',
    bar: 'bg-sky-600',
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
    <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Header + Input Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">🔁 Simulate ETH Transfer</h2>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <input
            type="range"
            min={0.01}
            max={2}
            step={0.01}
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
            className="w-40 accent-blue-600"
          />
          <input
            type="number"
            min={0.01}
            max={2}
            step={0.01}
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1 w-20 text-gray-800"
          />
          <span className="text-sm text-gray-700">ETH</span>
        </div>
      </div>

      {/* Chart Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CHAINS.map((chain) => {
          const { baseFee, priorityFee } = chains[chain]
          const total = ((baseFee + priorityFee) * 21000 + simulatedValue * 1e9) * usdPrice
          const height = `${(total / maxCost) * 100}%`
          const { label, icon, color, bar } = CHAIN_INFO[chain]

          return (
            <div
              key={chain}
              className={`rounded-2xl p-4 shadow-sm flex flex-col justify-between ${color}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Image src={icon} alt={`${label} icon`} width={24} height={24} />
                <h3 className="text-md font-semibold">{label}</h3>
              </div>
              <div className="text-sm text-gray-700">Gas + Tx Cost:</div>
              <div className="text-lg font-bold">${total.toFixed(4)}</div>

              <div className="h-24 flex items-end mt-3">
                <div
                  className={`w-full rounded-xl ${bar}`}
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
