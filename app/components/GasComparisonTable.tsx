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
    <div className="w-full max-w-4xl mt-10 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-x-auto transition-colors duration-300">
      <table className="min-w-[600px] text-sm text-left border-collapse text-gray-800 dark:text-white">
        <thead className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-white transition-colors">
          <tr>
            <th className="px-4 py-2 border-b">Chain</th>
            <th className="px-4 py-2 border-b">Base Fee (Gwei)</th>
            <th className="px-4 py-2 border-b">Priority Fee (Gwei)</th>
            <th className="px-4 py-2 border-b">Gas Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {CHAINS.map((chain) => {
            const { baseFee, priorityFee } = chains[chain]
            const gasCost = (baseFee + priorityFee) * 21000
            const totalCost = mode === 'live'
              ? gasCost * usdPrice
              : (gasCost + simulatedValue * 1e9) * usdPrice

            return (
              <tr
                key={chain}
                className="border-t hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <td className="px-4 py-2 font-medium">{CHAIN_LABELS[chain]}</td>
                <td className="px-4 py-2">{baseFee.toFixed(2)}</td>
                <td className="px-4 py-2">{priorityFee.toFixed(2)}</td>
                <td className="px-4 py-2 font-semibold">${totalCost.toFixed(4)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
