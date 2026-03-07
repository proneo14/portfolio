'use client'

import { useState, useEffect, useCallback } from 'react'
import { playStartup, playHDDSeek } from '@/lib/sounds'

const BIOS_LINES = [
  'Award Modular BIOS v6.00PG, An Energy Star Ally',
  'Copyright (C) 1984-95, Award Software, Inc.',
  '',
  'PORTFOLIO BIOS (C) 2025 - Custom Build',
  '',
  'Main Processor : Intel Pentium 133MHz',
  'Memory Test :    32768K OK',
  '',
  'Detecting Primary Master ... HDD - 2.1GB',
  'Detecting Primary Slave  ... CD-ROM',
  'Detecting Secondary       ... None',
  '',
  'PnP Init Completed',
  '',
  'Starting Portfolio OS...',
  '',
  'Loading kernel modules...       [OK]',
  'Mounting file systems...        [OK]',
  'Starting network services...    [OK]',
  'Initializing display server...  [OK]',
  '',
  '',
]

interface BootScreenProps {
  onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [phase, setPhase] = useState<'bios' | 'prompt' | 'done'>('bios')
  const [showCursor, setShowCursor] = useState(true)

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 500)
    return () => clearInterval(id)
  }, [])

  // Display BIOS lines sequentially
  useEffect(() => {
    if (phase !== 'bios') return
    const timers: ReturnType<typeof setTimeout>[] = []

    BIOS_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1)
          // Play HDD seek sound every few lines
          if (i % 3 === 0) playHDDSeek()
          if (i === BIOS_LINES.length - 1) {
            setTimeout(() => setPhase('prompt'), 400)
          }
        }, i * 80)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [phase])

  const handleKeyDown = useCallback(() => {
    if (phase === 'prompt') {
      playStartup()
      setPhase('done')
      onComplete()
    }
  }, [phase, onComplete])

  const handleClick = useCallback(() => {
    if (phase === 'prompt') {
      playStartup()
      setPhase('done')
      onComplete()
    }
  }, [phase, onComplete])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[10000] bg-[#0c0c0c] flex flex-col cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Press any key to start the desktop"
    >
      <div className="flex-1 p-6 font-mono overflow-hidden">
        {BIOS_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`text-[15px] leading-[1.6] whitespace-pre ${
              line.includes('[OK]')
                ? 'text-[#33ff33]'
                : line.includes('PORTFOLIO')
                ? 'text-[#ffff55]'
                : 'text-[#aaaaaa]'
            }`}
          >
            {line || '\u00A0'}
          </div>
        ))}

        {phase === 'prompt' && (
          <div className="mt-4">
            <div className="text-[#ffffff] text-[18px] font-mono animate-pulse">
              {'Press any key to continue...'}
            </div>
            <div className="text-[#808080] text-[13px] font-mono mt-1">
              {'Press F1 to continue, DEL to enter SETUP'}
            </div>
            <div className="mt-2 text-[#33ff33] text-[15px] font-mono">
              {'> '}
              <span className={showCursor ? 'opacity-100' : 'opacity-0'}>{'_'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
