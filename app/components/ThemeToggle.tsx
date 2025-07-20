// Toggles between light and dark theme using Zustand and system preference fallback

'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initial =
      saved ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')

    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors shadow-md border
        ${theme === 'dark'
          ? 'bg-gray-900 text-white border-gray-700 hover:bg-gray-800'
          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
        }`}
    >
      {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}
