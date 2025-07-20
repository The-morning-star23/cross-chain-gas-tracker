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
    bg: 'bg-[#EDF4FF] dark:bg-[#1a1a1a]',
    text: 'text-[#3C3C3D] dark:text-white',
  },
  polygon: {
    label: 'Polygon',
    icon: '/icons/polygon.svg',
    bg: 'bg-[#F3F0FF] dark:bg-[#2e1a47]',
    text: 'text-[#8247E5] dark:text-white',
  },
  arbitrum: {
    label: 'Arbitrum',
    icon: '/icons/arbitrum.svg',
    bg: 'bg-[#F0F8FF] dark:bg-[#102331]',
    text: 'text-[#28A0F0] dark:text-white',
  },
}

export default function ChainWidget({ chain }: Props) {
  const { baseFee, priorityFee } = useGasStore((s) => s.chains[chain])
  const usdPrice = useGasStore((s) => s.usdPrice)
  const mode = useGasStore((s) => s.mode)
  const simulatedValue = useGasStore((s) => s.simulatedValue)

  const gasCost = (baseFee + priorityFee) * 21000
  const totalCost = mode === 'live'
    ? gasCost * usdPrice
    : (gasCost + simulatedValue * 1e9) * usdPrice

  const { label, icon, bg, text } = CHAIN_INFO[chain]

  return (
    <div className={`p-4 rounded-xl shadow-md w-full max-w-sm transition-colors duration-300 ${bg} ${text}`}>
      <div className="flex items-center gap-2 mb-2">
        <Image src={icon} alt={label} width={24} height={24} />
        <h2 className="text-lg font-semibold">{label}</h2>
      </div>
      <div className="text-sm">Base Fee: {baseFee.toFixed(2)} Gwei</div>
      <div className="text-sm">Priority Fee: {priorityFee.toFixed(2)} Gwei</div>
      {mode === 'simulation' && (
        <div className="text-sm">
          Simulated Tx: {simulatedValue} tokens
        </div>
      )}
      <div className="text-sm mt-1 font-semibold">
        Total Cost (USD): ${totalCost.toFixed(2)}
      </div>
    </div>
  )
}
