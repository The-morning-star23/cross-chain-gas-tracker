'use client'

import './globals.css'
import { ReactNode, useEffect } from 'react'
import { startGasTracking } from '@/lib/gasEngine'
import { startEthUsdTracking } from '@/lib/uniswapPrice'

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    startGasTracking()
    startEthUsdTracking()

    // Set initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = savedTheme ?? (prefersDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
