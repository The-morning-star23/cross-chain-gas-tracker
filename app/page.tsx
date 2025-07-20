import ChainWidget from './components/ChainWidget'
import PriceWidget from './components/PriceWidget'
import SimulationControls from './components/SimulationControls'
import GasChartTabs from './components/GasChartTabs'
import GasComparisonTable from './components/GasComparisonTable'
import ThemeToggle from './components/ThemeToggle'
import LiveTransferSimulator from './components/LiveTransferSimulator'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-6 gap-6">
      <div className="flex justify-between w-full max-w-4xl">
        <h1 className="text-2xl font-bold">Cross-Chain Gas Tracker</h1>
        <ThemeToggle />
      </div>
      <PriceWidget />
      <SimulationControls />
      <LiveTransferSimulator />

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        <ChainWidget chain="ethereum" />
        <ChainWidget chain="polygon" />
        <ChainWidget chain="arbitrum" />
      </div>

      {/* Chart Tabs */}
      <div className="w-full mt-10">
        <GasChartTabs />
        <GasComparisonTable />
      </div>
    </main>
  )
}
