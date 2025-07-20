// Displays real-time gas fee data and USD cost for a specific blockchain network

'use client'

import { useGasStore } from '@/store/useGasStore'
import Image from 'next/image'

type Props = {
  chain: 'ethereum' | 'polygon' | 'arbitrum'
}

const CHAIN_INFO = {
  ethereum: {
    label: 'Ethereum',
    icon: '/icons/ethereum.svg',
    bg: 'bg-blue-50',
    text: 'text-blue-800',
  },
  polygon: {
    label: 'Polygon',
    icon: '/icons/polygon.svg',
    bg: 'bg-purple-50',
    text: 'text-purple-800',
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: '/icons/arbitrum.svg',
    bg: 'bg-sky-50',
    text: 'text-sky-800',
  },
}

export default function ChainWidget({ chain }: Props) {
  const { baseFee, priorityFee } = useGasStore((s) => s.chains[chain])
  const usdPrice = useGasStore((s) => s.usdPrice)
  const mode = useGasStore((s) => s.mode)
  const simulatedValue = useGasStore((s) => s.simulatedValue)

  const gasCost = (baseFee + priorityFee) * 21000
  const totalCost =
    mode === 'live'
      ? gasCost * usdPrice
      : (gasCost + simulatedValue * 1e9) * usdPrice

  const { label, icon, bg, text } = CHAIN_INFO[chain]

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm border border-gray-200 transition-colors duration-300 ${bg} ${text} flex flex-col gap-3 w-full`}
    >
      <div className="flex items-center gap-3">
        <Image src={icon} alt={`${label} icon`} width={28} height={28} />
        <h2 className="text-xl font-bold">{label}</h2>
      </div>

      <div className="text-sm sm:text-base">
        <span className="font-semibold">Base Fee:</span> {baseFee.toFixed(2)} Gwei
      </div>
      <div className="text-sm sm:text-base">
        <span className="font-semibold">Priority Fee:</span> {priorityFee.toFixed(2)} Gwei
      </div>

      {mode === 'simulation' && (
        <div className="text-sm sm:text-base">
          <span className="font-semibold">Simulated Tx:</span> {simulatedValue} tokens
        </div>
      )}

      <div className="text-base font-bold mt-2 border-t border-gray-200 pt-2">
        💰 Total Cost (USD): ${totalCost.toFixed(4)}
      </div>
    </div>
  )
}
