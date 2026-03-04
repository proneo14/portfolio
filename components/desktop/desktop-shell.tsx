'use client'

import { useReducer, useMemo } from 'react'
import { windowReducer, initialWindows } from '@/lib/desktop-store'
import { Window } from '@/components/desktop/window'
import { DesktopIcon } from '@/components/desktop/desktop-icon'
import { Taskbar } from '@/components/desktop/taskbar'
import { TerminalContent } from '@/components/desktop/terminal-content'
import { ProjectsContent } from '@/components/desktop/projects-content'
import { AboutContent } from '@/components/desktop/about-content'
import { RecycleContent } from '@/components/desktop/recycle-content'
import { IEContent } from '@/components/desktop/ie-content'
import { PaintContent } from '@/components/desktop/paint-content'
import { CalculatorContent } from '@/components/desktop/calculator-content'
import { MyComputerContent } from '@/components/desktop/mycomputer-content'
import { NetworkContent } from '@/components/desktop/network-content'
import { InboxContent } from '@/components/desktop/inbox-content'

const desktopIcons = [
  { id: 'mycomputer', label: 'My Computer', icon: 'mycomputer' },
  { id: 'network', label: 'Network Neighborhood', icon: 'network' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox' },
  { id: 'recycle', label: 'Recycle Bin', icon: 'recycle' },
  { id: 'ie', label: 'Internet Explorer', icon: 'ie' },
  { id: 'about', label: 'Notepad', icon: 'notepad' },
  { id: 'projects', label: 'My Files', icon: 'folder' },
  { id: 'terminal', label: 'MS-DOS Prompt', icon: 'terminal' },
  { id: 'paint', label: 'Paint', icon: 'paint' },
  { id: 'calculator', label: 'Calculator', icon: 'calculator' },
]

const windowContent: Record<string, React.ReactNode> = {
  mycomputer: <MyComputerContent />,
  terminal: <TerminalContent />,
  projects: <ProjectsContent />,
  about: <AboutContent />,
  recycle: <RecycleContent />,
  ie: <IEContent />,
  paint: <PaintContent />,
  calculator: <CalculatorContent />,
  network: <NetworkContent />,
  inbox: <InboxContent />,
}

export function DesktopShell() {
  const [windows, dispatch] = useReducer(windowReducer, initialWindows)

  const highestZ = useMemo(() => {
    return Math.max(...windows.filter(w => w.isOpen && !w.isMinimized).map(w => w.zIndex), 0)
  }, [windows])

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[var(--win-desktop)]">
      {/* Desktop icons - arranged in a column on the left like Win95 */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-[1]">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((w) => (
        <Window key={w.id} data={w} dispatch={dispatch} highestZ={highestZ}>
          {windowContent[w.id]}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar windows={windows} dispatch={dispatch} />

      {/* CRT scanline overlay */}
      <div className="crt-overlay" />
    </div>
  )
}
