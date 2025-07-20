'use client'
import { useGasStore } from '@/store/useGasStore'

export default function SimulationControls() {
  const mode = useGasStore((s) => s.mode)
  const simulatedValue = useGasStore((s) => s.simulatedValue)
  const setMode = useGasStore((s) => s.setMode)
  const setSimulatedValue = useGasStore((s) => s.setSimulatedValue)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
      <button
        onClick={() => setMode(mode === 'live' ? 'simulation' : 'live')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Mode: {mode === 'live' ? 'Live' : 'Simulation'}
      </button>

      {mode === 'simulation' && (
        <div className="flex items-center gap-2">
          <label htmlFor="value">Tx Value:</label>
          <input
            id="value"
            type="number"
            step="0.01"
            className="border px-2 py-1 rounded-md w-24"
            value={simulatedValue}
            onChange={(e) => setSimulatedValue(Number(e.target.value))}
          />
          <span>ETH / MATIC</span>
        </div>
      )}
    </div>
  )
}
