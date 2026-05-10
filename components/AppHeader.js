'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  )
}

export default function AppHeader() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    try {
      const s = parseInt(localStorage.getItem('srb_streak') || '0', 10)
      setStreak(s)
    } catch {}
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-20">
      <div className="max-w-lg mx-auto h-12 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-gray-80">
          🔥 {streak} {streakLabel(streak)}
        </span>
        <Link href="/profil" className="text-gray-60 hover:text-gray-100 transition-colors" aria-label="Настройки">
          <GearIcon />
        </Link>
      </div>
    </header>
  )
}

function streakLabel(n) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'дней'
  if (n % 10 === 1) return 'день'
  if (n % 10 >= 2 && n % 10 <= 4) return 'дня'
  return 'дней'
}
