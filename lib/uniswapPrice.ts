import { Log, Interface } from 'ethers'
import { useGasStore } from '@/store/useGasStore'
import { ethereumProvider } from './providers'

const UNISWAP_POOL = process.env.NEXT_PUBLIC_UNISWAP_POOL!

const POOL_ABI = [
  'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)',
]

const iface = new Interface(POOL_ABI)
const swapEvent = iface.getEvent('Swap')
if (!swapEvent) throw new Error('[UniswapPrice] Swap event not found in ABI')
const swapTopic = swapEvent.topicHash

export function startEthUsdTracking() {
  try {
    ethereumProvider.on(
      {
        address: UNISWAP_POOL,
        topics: [swapTopic],
      },
      (log: Log) => {
        try {
          const parsed = iface.parseLog(log)
          const args = parsed?.args

          if (!args || typeof args.sqrtPriceX96 === 'undefined') return

          const sqrtPriceX96 = BigInt(args.sqrtPriceX96.toString())

          // Formula: price = (sqrtPriceX96^2 * 10^12) / 2^192
          const numerator = sqrtPriceX96 * sqrtPriceX96 * 10n ** 12n
          const denominator = 2n ** 192n
          const price = Number(numerator / denominator)

          if (!isNaN(price) && price > 0) {
            useGasStore.getState().setUsdPrice(price)
            if (process.env.NODE_ENV === 'development') {
              console.log('[UniswapPrice] Updated ETH/USD Price:', price)
            }
          }
        } catch (err) {
          console.error('[UniswapPrice] ❌ Failed to parse log:', err)
        }
      }
    )

    console.log('[UniswapPrice] 🟢 ETH/USD tracking initialized')
  } catch (err) {
    console.error('[UniswapPrice] ❌ Initialization failed:', err)
  }
}
