// Renders real-time gas price chart (candlestick) for a selected chain using lightweight-charts

'use client'

import { useEffect, useRef } from 'react'
import {
  createChart,
  type Time,
  type CandlestickData,
} from 'lightweight-charts'
import { useGasStore } from '@/store/useGasStore'
import { useThemeStore } from '@/store/useThemeStore'

type Props = {
  chain: 'ethereum' | 'polygon' | 'arbitrum'
}

export default function GasChart({ chain }: Props) {
  const history = useGasStore((s) => s.chains[chain].history)
  const theme = useThemeStore((s) => s.theme)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isDark = theme === 'dark'

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 320,
      layout: {
        background: { color: isDark ? '#1a1a1a' : '#ffffff' },
        textColor: isDark ? '#d1d5db' : '#111827',
      },
      grid: {
        vertLines: { color: isDark ? '#374151' : '#e5e7eb' },
        horzLines: { color: isDark ? '#374151' : '#e5e7eb' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    })

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#16a34a',
      downColor: '#dc2626',
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
  }, [history, chain, theme])

  return (
    <div className="p-5 rounded-2xl shadow-md bg-white dark:bg-zinc-900 w-full max-w-4xl transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-center capitalize dark:text-white">
        {chain} Gas Price Chart
      </h2>
      <div ref={containerRef} className="w-full h-[320px] rounded-md" />
    </div>
  )
}
