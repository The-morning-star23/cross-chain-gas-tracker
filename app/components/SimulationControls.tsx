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
        className={`px-5 py-2 rounded-full font-medium shadow transition-colors duration-200
          ${mode === 'live'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
      >
        Mode: {mode === 'live' ? 'Live' : 'Simulation'}
      </button>

      {mode === 'simulation' && (
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="value" className="font-medium text-gray-800">
            Tx Value:
          </label>
          <input
            id="value"
            type="number"
            step="0.01"
            className="border border-gray-300 px-2 py-1 rounded-md w-24 bg-white text-gray-800"
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
          />
          <span className="text-gray-600">ETH / MATIC</span>
        </div>
      )}
    </div>
  )
}
