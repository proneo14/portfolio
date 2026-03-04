'use client'

import { useState, useCallback } from 'react'
import { BootScreen } from '@/components/desktop/boot-screen'
import { DesktopShell } from '@/components/desktop/desktop-shell'

export default function Page() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <main className="h-screen w-screen overflow-hidden">
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      {booted && <DesktopShell />}
    </main>
  )
}
