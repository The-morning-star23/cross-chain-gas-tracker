// Renders a table comparing base fee, priority fee, and USD gas cost across chains

'use client'
import { useGasStore } from '@/store/useGasStore'

const CHAINS = ['ethereum', 'polygon', 'arbitrum'] as const
const CHAIN_LABELS: Record<string, string> = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  arbitrum: 'Arbitrum',
}

export default function GasComparisonTable() {
  const usdPrice = useGasStore((s) => s.usdPrice)
  const mode = useGasStore((s) => s.mode)
  const simulatedValue = useGasStore((s) => s.simulatedValue)
  const chains = useGasStore((s) => s.chains)

  return (
    <div className="w-full max-w-4xl mt-10 bg-white dark:bg-zinc-900 shadow-lg rounded-2xl overflow-x-auto transition-colors">
      <table className="min-w-[600px] w-full text-sm text-left border-separate border-spacing-0 text-gray-800 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-white">
            <th className="px-6 py-3 font-semibold text-sm rounded-tl-2xl">Chain</th>
            <th className="px-6 py-3 font-semibold text-sm">Base Fee (Gwei)</th>
            <th className="px-6 py-3 font-semibold text-sm">Priority Fee (Gwei)</th>
            <th className="px-6 py-3 font-semibold text-sm rounded-tr-2xl">Gas Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {CHAINS.map((chain, i) => {
            const { baseFee, priorityFee } = chains[chain]
            const gasCost = (baseFee + priorityFee) * 21000
            const totalCost =
              mode === 'live'
                ? gasCost * usdPrice
                : (gasCost + simulatedValue * 1e9) * usdPrice

            return (
              <tr
                key={chain}
                className={`transition-colors duration-200 ${
                  i % 2 === 0
                    ? 'bg-white dark:bg-zinc-900'
                    : 'bg-gray-50 dark:bg-zinc-800'
                } hover:bg-gray-100 dark:hover:bg-zinc-700`}
              >
                <td className="px-6 py-3 font-medium">{CHAIN_LABELS[chain]}</td>
                <td className="px-6 py-3">{baseFee.toFixed(2)}</td>
                <td className="px-6 py-3">{priorityFee.toFixed(2)}</td>
                <td className="px-6 py-3 font-semibold">${totalCost.toFixed(4)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
