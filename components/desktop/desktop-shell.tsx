'use client'

import { useReducer, useMemo, useState, useCallback } from 'react'
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
import { MinesweeperContent } from '@/components/desktop/minesweeper-content'
import { ResumeContent } from '@/components/desktop/resume-content'
import { DisplayPropertiesContent } from '@/components/desktop/display-properties-content'
import { PicturesContent } from '@/components/desktop/pictures-content'

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
  { id: 'resume', label: 'Resume.pdf', icon: 'resume' },
  { id: 'pictures', label: 'My Pictures', icon: 'pictures' },
]

const wallpaperColors: Record<string, string> = {
  teal: '#008080',
  forest: '#254117',
  midnight: '#191970',
  burgundy: '#800020',
  slate: '#708090',
  black: '#0c0c0c',
  tiled: '#008080',
}

export function DesktopShell() {
  const [windows, dispatch] = useReducer(windowReducer, initialWindows)
  const [crtEnabled, setCrtEnabled] = useState(true)
  const [wallpaper, setWallpaper] = useState('teal')

  const toggleCrt = useCallback(() => setCrtEnabled(prev => !prev), [])
  const changeWallpaper = useCallback((wp: string) => setWallpaper(wp), [])

  const highestZ = useMemo(() => {
    return Math.max(...windows.filter(w => w.isOpen && !w.isMinimized).map(w => w.zIndex), 0)
  }, [windows])

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
    minesweeper: <MinesweeperContent />,
    resume: <ResumeContent />,
    displayprops: <DisplayPropertiesContent crtEnabled={crtEnabled} onToggleCrt={toggleCrt} wallpaper={wallpaper} onChangeWallpaper={changeWallpaper} />,
    pictures: <PicturesContent />,
  }

  const wpColor = wallpaperColors[wallpaper] || '#008080'
  const bgStyle: React.CSSProperties = wallpaper === 'tiled'
    ? { backgroundImage: 'repeating-conic-gradient(#008080 0% 25%, #006060 0% 50%)', backgroundSize: '20px 20px' }
    : { backgroundColor: wpColor }

  return (
    <div className="h-screen w-screen relative overflow-hidden" style={bgStyle}>
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
      {crtEnabled && <div className="crt-overlay" />}
    </div>
  )
}
