'use client'
import { useState } from 'react'
import GasChart from './GasChart'

const CHAINS = ['ethereum', 'polygon', 'arbitrum'] as const
type Chain = typeof CHAINS[number]

export default function GasChartTabs() {
  const [selected, setSelected] = useState<Chain>('ethereum')

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4">
        {CHAINS.map((chain) => (
          <button
            key={chain}
            onClick={() => setSelected(chain)}
            className={`px-4 py-2 rounded-md border text-sm sm:text-base font-medium
              ${selected === chain
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
          >
            {chain.charAt(0).toUpperCase() + chain.slice(1)}
          </button>
        ))}
      </div>

      <GasChart chain={selected} />
    </div>
  )
}
