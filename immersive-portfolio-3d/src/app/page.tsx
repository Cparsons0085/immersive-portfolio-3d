'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import HomePage from '@/components/HomePage'

// Dynamically import the 3D portfolio to avoid SSR issues
const ImmersivePortfolio = dynamic(() => import('@/components/ImmersivePortfolio'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
})

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  const handleExploreStart = () => {
    setHasStarted(true)
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-black relative">
      {!hasStarted ? (
        <HomePage onExploreStart={handleExploreStart} />
      ) : (
        <ImmersivePortfolio />
      )}
    </main>
  )
}
