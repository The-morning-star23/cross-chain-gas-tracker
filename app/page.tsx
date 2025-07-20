// Home page layout for the Cross-Chain Gas Tracker dashboard UI

'use client'

import ChainWidget from './components/ChainWidget'
import PriceWidget from './components/PriceWidget'
import SimulationControls from './components/SimulationControls'
import GasChartTabs from './components/GasChartTabs'
import GasComparisonTable from './components/GasComparisonTable'
import ThemeToggle from './components/ThemeToggle'
import LiveTransferSimulator from './components/LiveTransferSimulator'

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full px-4 py-8 gap-10 bg-background text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Cross-Chain Gas Tracker</h1>
        <ThemeToggle />
      </div>

      {/* Price and Controls */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md text-center">
        <PriceWidget />
        <SimulationControls />
        <LiveTransferSimulator />
      </div>

      {/* Chain Widgets */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <ChainWidget chain="ethereum" />
        <ChainWidget chain="polygon" />
        <ChainWidget chain="arbitrum" />
      </div>

      {/* Charts & Table */}
      <div className="w-full max-w-6xl mt-12 space-y-6">
        <GasChartTabs />
        <GasComparisonTable />
      </div>
    </main>
  )
}
