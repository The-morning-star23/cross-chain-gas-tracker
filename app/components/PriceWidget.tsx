'use client'
import { useGasStore } from '@/store/useGasStore'

export default function PriceWidget() {
  const usdPrice = useGasStore((s) => s.usdPrice)

  return (
    <div className="p-4 rounded-2xl shadow-md w-full max-w-sm bg-gradient-to-br from-blue-100 to-blue-300 border border-blue-200">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold text-blue-900">Live ETH/USD Price</h2>
        <p className="text-3xl font-extrabold text-blue-800">
          ${usdPrice.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
