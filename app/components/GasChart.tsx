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
      height: 300,
      layout: {
        textColor: isDark ? '#eee' : '#000',
        background: { color: isDark ? '#1e1e1e' : '#fff' },
      },
      grid: {
        vertLines: { color: isDark ? '#444' : '#eee' },
        horzLines: { color: isDark ? '#444' : '#eee' },
      },
      timeScale: { timeVisible: true, secondsVisible: false },
    })

    const candleSeries = chart.addCandlestickSeries()

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
    <div className="p-4 bg-white dark:bg-zinc-900 text-black dark:text-white shadow rounded-xl w-full max-w-4xl transition-colors">
      <h2 className="text-lg font-semibold mb-2 capitalize">{chain} Gas Price Chart</h2>
      <div ref={containerRef} className="w-full h-[300px]" />
    </div>
  )
}
