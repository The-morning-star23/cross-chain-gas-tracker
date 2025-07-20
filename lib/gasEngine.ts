import { WebSocketProvider } from 'ethers'
import { ethereumProvider, polygonProvider, arbitrumProvider } from './providers'
import { useGasStore } from '@/store/useGasStore'

type ChainName = 'ethereum' | 'polygon' | 'arbitrum'

type ChainConfig = {
  name: ChainName
  provider: WebSocketProvider
}

const chains: ChainConfig[] = [
  { name: 'ethereum', provider: ethereumProvider },
  { name: 'polygon', provider: polygonProvider },
  { name: 'arbitrum', provider: arbitrumProvider },
]

export function startGasTracking() {
  const { setGas } = useGasStore.getState()

  chains.forEach(({ name, provider }) => {
    const subscribe = () => {
      try {
        provider.on('block', async (blockNumber) => {
          if (useGasStore.getState().mode !== 'live') return

          try {
            const block = await provider.getBlock(blockNumber)
            if (!block || !block.baseFeePerGas) return

            const baseFee = Number(block.baseFeePerGas) / 1e9
            const priorityFee = 2 // fallback (or fetch real if needed)

            setGas(name, baseFee, priorityFee)
          } catch (err) {
            console.error(`[${name.toUpperCase()}] ❌ Failed to process block ${blockNumber}:`, err)
          }
        })

        const ws = provider.websocket as WebSocket

        ws.onclose = () => {
          console.warn(`[${name.toUpperCase()}] 🔌 WebSocket closed. Reconnecting in 5s...`)
          setTimeout(() => subscribe(), 5000)
        }

        ws.onerror = (err: Event) => {
          console.error(`[${name.toUpperCase()}] ❗ WebSocket error:`, err)
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`[${name.toUpperCase()}] ✅ Subscribed to blocks`)
        }
      } catch (err) {
        console.error(`[${name.toUpperCase()}] ❌ Initial subscription failed:`, err)
      }
    }

    subscribe()
  })

  console.log('[GasEngine] 🟢 Real-time gas tracking initialized')
}
