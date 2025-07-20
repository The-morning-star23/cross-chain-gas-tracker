// Renders real-time gas price chart (candlestick) for a selected chain using lightweight-charts

'use client'

import { useEffect, useRef } from 'react'
import {
  createChart,
  type Time,
  type CandlestickData,
} from 'lightweight-charts'
import { useGasStore } from '@/store/useGasStore'

type Props = {
  chain: 'ethereum' | 'polygon' | 'arbitrum'
}

export default function GasChart({ chain }: Props) {
  const history = useGasStore((s) => s.chains[chain].history)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 320,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#1f2937', // slate-800
      },
      grid: {
        vertLines: { color: '#e5e7eb' }, // gray-200
        horzLines: { color: '#e5e7eb' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    })

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#16a34a', // green-600
      downColor: '#dc2626', // red-600
      borderVisible: false,
      wickUpColor: '#16a34a',
      wickDownColor: '#dc2626',
    })

    const candles: CandlestickData[] = history.map((point) => {
      const time = Math.floor(point.timestamp / 1000) as Time
      const fee = point.baseFee + point.priorityFee
      return {
        time,
        open: fee,
        high: fee * 1.05,
        low: fee * 0.95,
        close: fee,
      }
    })

    candleSeries.setData(candles)

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: container.clientWidth })
    })

    resizeObserver.observe(container)

    return () => {
      chart.remove()
      resizeObserver.disconnect()
    }
  }, [history, chain])

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-200 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-center capitalize text-gray-800">
        {chain} Gas Price Chart
      </h2>
      <div ref={containerRef} className="w-full h-[320px] rounded-lg" />
    </div>
  )
}
