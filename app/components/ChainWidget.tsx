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
    bg: 'bg-[#F3F4F6] dark:bg-[#1a1a1a]',
    text: 'text-[#3C3C3D] dark:text-white',
  },
  polygon: {
    label: 'Polygon',
    icon: '/icons/polygon.svg',
    bg: 'bg-[#F5F0FF] dark:bg-[#2e1a47]',
    text: 'text-[#8247E5] dark:text-white',
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: '/icons/arbitrum.svg',
    bg: 'bg-[#EFFAFF] dark:bg-[#102331]',
    text: 'text-[#28A0F0] dark:text-white',
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
      className={`rounded-2xl p-5 shadow-sm transition duration-300 ${bg} ${text} flex flex-col gap-2`}
    >
      <div className="flex items-center gap-3">
        <Image src={icon} alt={`${label} icon`} width={28} height={28} />
        <h2 className="text-xl font-bold">{label}</h2>
      </div>

      <div className="text-sm font-medium">Base Fee: {baseFee.toFixed(2)} Gwei</div>
      <div className="text-sm font-medium">Priority Fee: {priorityFee.toFixed(2)} Gwei</div>

      {mode === 'simulation' && (
        <div className="text-sm font-medium">
          Simulated Tx: {simulatedValue} tokens
        </div>
      )}

      <div className="text-sm font-semibold mt-1">
        Total Cost (USD): ${totalCost.toFixed(4)}
      </div>
    </div>
  )
}
