// Displays the live ETH/USD price using Zustand state from useGasStore

'use client'
import { useGasStore } from '@/store/useGasStore'

export default function PriceWidget() {
  const usdPrice = useGasStore((s) => s.usdPrice)

  return (
    <div className="p-4 rounded-2xl shadow-md w-full max-w-sm bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900 transition-colors">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200">Live ETH/USD Price</h2>
        <p className="text-3xl font-extrabold text-blue-800 dark:text-blue-300">
          ${usdPrice.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
