'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 border rounded-md text-sm shadow bg-white dark:bg-gray-800 dark:text-white transition-colors"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
