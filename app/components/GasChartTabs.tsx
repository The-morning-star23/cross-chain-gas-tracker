// UI component to switch between gas charts for Ethereum, Polygon, and Arbitrum

'use client'

import { useState } from 'react'
import GasChart from './GasChart'

const CHAINS = ['ethereum', 'polygon', 'arbitrum'] as const
type Chain = typeof CHAINS[number]

export default function GasChartTabs() {
  const [selected, setSelected] = useState<Chain>('ethereum')

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Chain Selector Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-5">
        {CHAINS.map((chain) => (
          <button
            key={chain}
            onClick={() => setSelected(chain)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors duration-200
              ${selected === chain
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700'
              }`}
          >
            {chain.charAt(0).toUpperCase() + chain.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm transition-colors">
        <GasChart chain={selected} />
      </div>
    </div>
  )
}
