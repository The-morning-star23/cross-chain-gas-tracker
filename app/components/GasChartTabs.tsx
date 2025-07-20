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
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
        {CHAINS.map((chain) => (
          <button
            key={chain}
            onClick={() => setSelected(chain)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all
              ${
                selected === chain
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
              }`}
          >
            {chain.charAt(0).toUpperCase() + chain.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <GasChart chain={selected} />
      </div>
    </div>
  )
}
