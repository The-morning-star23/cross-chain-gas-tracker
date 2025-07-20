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
      <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
        {CHAINS.map((chain) => (
          <button
            key={chain}
            onClick={() => setSelected(chain)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200
              ${selected === chain
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'
              }`}
          >
            {chain.charAt(0).toUpperCase() + chain.slice(1)}
          </button>
        ))}
      </div>

      {/* Selected Chain's Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm">
        <GasChart chain={selected} />
      </div>
    </div>
  )
}
