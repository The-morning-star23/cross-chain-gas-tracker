// Component to toggle between live/simulation mode and set simulated transaction value

'use client'
import { useGasStore } from '@/store/useGasStore'

export default function SimulationControls() {
  const mode = useGasStore((s) => s.mode)
  const simulatedValue = useGasStore((s) => s.simulatedValue)
  const setMode = useGasStore((s) => s.setMode)
  const setSimulatedValue = useGasStore((s) => s.setSimulatedValue)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 w-full max-w-2xl">
      <button
        onClick={() => setMode(mode === 'live' ? 'simulation' : 'live')}
        className={`px-5 py-2 rounded-full font-medium shadow transition-colors ${
          mode === 'live'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-600 text-white hover:bg-gray-700'
        }`}
      >
        Mode: {mode === 'live' ? 'Live' : 'Simulation'}
      </button>

      {mode === 'simulation' && (
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="value" className="font-medium">
            Tx Value:
          </label>
          <input
            id="value"
            type="number"
            step="0.01"
            className="border px-2 py-1 rounded-md w-24 dark:bg-black dark:border-gray-700"
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
          />
          <span className="text-gray-700 dark:text-gray-300">ETH / MATIC</span>
        </div>
      )}
    </div>
  )
}
