'use client'
import { useGasStore } from '@/store/useGasStore'

export default function PriceWidget() {
  const usdPrice = useGasStore((s) => s.usdPrice)

  return (
    <div className="p-4 rounded-xl bg-blue-100 shadow-md text-center w-full max-w-sm">
      <h2 className="text-lg font-semibold">Live ETH/USD</h2>
      <p className="text-2xl font-bold text-blue-700 mt-2">
        ${usdPrice.toFixed(2)}
      </p>
    </div>
  )
}
