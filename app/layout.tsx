'use client'

import './globals.css'
import { ReactNode, useEffect } from 'react'
import { startGasTracking } from '@/lib/gasEngine'
import { startEthUsdTracking } from '@/lib/uniswapPrice'

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    startGasTracking()
    startEthUsdTracking()
  }, [])

  return (
    <html lang="en">
      <body className="bg-white text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
