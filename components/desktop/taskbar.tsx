'use client'

import { useState, useEffect, useRef } from 'react'
import type { WindowData, WindowAction } from '@/lib/desktop-store'
import {
  WindowsLogoIcon,
  StartMenuProgramsIcon,
  StartMenuDocumentsIcon,
  StartMenuSettingsIcon,
  StartMenuFindIcon,
  StartMenuHelpIcon,
  StartMenuRunIcon,
  ShutDownIcon,
  TerminalIcon,
  FolderIcon,
  NotepadIcon,
  InternetExplorerIcon,
  PaintIcon,
  CalculatorIcon,
  MyComputerIcon,
  InboxIcon,
} from './win-icons'

interface TaskbarProps {
  windows: WindowData[]
  dispatch: React.Dispatch<WindowAction>
}

function Clock() {
  const [time, setTime] = useState('')
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    update()
    interval.current = setInterval(update, 1000)
    return () => { if (interval.current) clearInterval(interval.current) }
  }, [])

  return (
    <div className="win-border-field px-3 h-[22px] flex items-center text-[13px] text-[#000000] font-sans tabular-nums">
      {time}
    </div>
  )
}

const programItems = [
  { id: 'ie', label: 'Internet Explorer', icon: InternetExplorerIcon },
  { id: 'about', label: 'Notepad', icon: NotepadIcon },
  { id: 'paint', label: 'Paint', icon: PaintIcon },
  { id: 'calculator', label: 'Calculator', icon: CalculatorIcon },
  { id: 'terminal', label: 'MS-DOS Prompt', icon: TerminalIcon },
  { id: 'inbox', label: 'Outlook Express', icon: InboxIcon },
]

export function Taskbar({ windows, dispatch }: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const startRef = useRef<HTMLDivElement>(null)

  const openWindows = windows.filter((w) => w.isOpen)

  const startBtnRef = useRef<HTMLButtonElement>(null)

  // Close start menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (
        startRef.current && !startRef.current.contains(target) &&
        startBtnRef.current && !startBtnRef.current.contains(target)
      ) {
        setStartOpen(false)
        setProgramsOpen(false)
      }
    }
    if (startOpen) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [startOpen])

  const openApp = (id: string) => {
    dispatch({ type: 'OPEN_WINDOW', id })
    setStartOpen(false)
    setProgramsOpen(false)
  }

  return (
    <>
      {/* Start Menu */}
      {startOpen && (
        <div
          ref={startRef}
          className="fixed bottom-[36px] left-0 z-[9998] start-menu-enter"
        >
          <div className="win-border-raised bg-[var(--win-bg)] flex" style={{ width: programsOpen ? 420 : 220 }}>
            {/* Left vertical banner - Windows 95 style */}
            <div className="w-[28px] bg-gradient-to-t from-[#000080] to-[#1084d0] flex items-end justify-center shrink-0">
              <span
                className="text-[#c0c0c0] text-[18px] font-sans font-bold tracking-[2px] pb-2"
                style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                Windows95
              </span>
            </div>

            {/* Menu items */}
            <div className="flex-1 py-[2px]" style={{ width: 192 }}>
              {/* Programs with arrow */}
              <button
                className={`w-full text-left px-3 py-[5px] text-[13px] font-sans flex items-center gap-3 ${
                  programsOpen ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)]' : 'text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)]'
                }`}
                onMouseEnter={() => setProgramsOpen(true)}
                onClick={() => setProgramsOpen(!programsOpen)}
              >
                <StartMenuProgramsIcon size={20} />
                <span className="flex-1 font-bold">Programs</span>
                <span className="text-[10px]">{'>'}</span>
              </button>

              {/* Documents */}
              <button
                className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                onMouseEnter={() => setProgramsOpen(false)}
                onClick={() => openApp('projects')}
              >
                <StartMenuDocumentsIcon size={20} />
                <span className="flex-1">Documents</span>
                <span className="text-[10px]">{'>'}</span>
              </button>

              {/* Settings */}
              <button
                className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                onMouseEnter={() => setProgramsOpen(false)}
              >
                <StartMenuSettingsIcon size={20} />
                <span className="flex-1">Settings</span>
                <span className="text-[10px]">{'>'}</span>
              </button>

              {/* Find */}
              <button
                className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                onMouseEnter={() => setProgramsOpen(false)}
              >
                <StartMenuFindIcon size={20} />
                <span className="flex-1">Find</span>
                <span className="text-[10px]">{'>'}</span>
              </button>

              {/* Help */}
              <button
                className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                onMouseEnter={() => setProgramsOpen(false)}
              >
                <StartMenuHelpIcon size={20} />
                <span className="flex-1">Help</span>
              </button>

              {/* Run */}
              <button
                className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                onMouseEnter={() => setProgramsOpen(false)}
              >
                <StartMenuRunIcon size={20} />
                <span className="flex-1">{'Run...'}</span>
              </button>

              {/* Separator */}
              <div className="mx-2 my-[3px] h-[1px] bg-[var(--win-shadow)]" />
              <div className="mx-2 h-[1px] bg-[var(--win-highlight)]" />

              {/* Shut Down */}
              <button
                className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                onMouseEnter={() => setProgramsOpen(false)}
                onClick={() => {
                  setStartOpen(false)
                  setProgramsOpen(false)
                }}
              >
                <ShutDownIcon size={20} />
                <span className="flex-1">{'Shut Down...'}</span>
              </button>
            </div>

            {/* Programs submenu */}
            {programsOpen && (
              <div className="win-border-raised bg-[var(--win-bg)] py-[2px]" style={{ width: 200 }}>
                {programItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      className="w-full text-left px-3 py-[5px] text-[13px] font-sans text-[#000000] hover:bg-[var(--win-titlebar)] hover:text-[var(--win-titlebar-text)] flex items-center gap-3"
                      onClick={() => openApp(item.id)}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-[36px] win-border-raised bg-[var(--win-bg)] z-[9997] flex items-center px-[2px] gap-[2px]">
        {/* Start Button */}
        <button
          ref={startBtnRef}
          className={`win-button h-[28px] px-[6px] flex items-center gap-[4px] font-sans text-[14px] font-bold text-[#000000] shrink-0 ${
            startOpen ? '!border-[var(--win-dark-shadow)] !border-t-[var(--win-dark-shadow)] !border-l-[var(--win-dark-shadow)] !border-r-[var(--win-highlight)] !border-b-[var(--win-highlight)] !shadow-[inset_1px_1px_0_var(--win-shadow)]' : ''
          }`}
          onClick={() => {
            setStartOpen(!startOpen)
            if (!startOpen) setProgramsOpen(false)
          }}
        >
          <WindowsLogoIcon size={18} />
          Start
        </button>

        {/* Separator */}
        <div className="w-[2px] h-[24px] border-l border-l-[var(--win-shadow)] border-r border-r-[var(--win-highlight)] shrink-0" />

        {/* Window tabs */}
        <div className="flex-1 flex items-center gap-[2px] overflow-hidden min-w-0">
          {openWindows.map((w) => {
            const TitleIcon = ({
              mycomputer: MyComputerIcon,
              terminal: TerminalIcon,
              folder: FolderIcon,
              notepad: NotepadIcon,
              recycle: FolderIcon,
              ie: InternetExplorerIcon,
              paint: PaintIcon,
              calculator: CalculatorIcon,
              network: FolderIcon,
              inbox: InboxIcon,
            } as Record<string, React.ComponentType<{ size?: number }>>)[w.icon] || FolderIcon

            return (
              <button
                key={w.id}
                className={`h-[24px] px-2 text-[12px] font-sans text-[#000000] truncate max-w-[160px] flex items-center gap-[4px] shrink-0 ${
                  w.isMinimized
                    ? 'win-border-raised opacity-70'
                    : 'win-border-sunken bg-[#d0d0d0]'
                }`}
                onClick={() => {
                  if (w.isMinimized) {
                    dispatch({ type: 'FOCUS_WINDOW', id: w.id })
                  } else {
                    dispatch({ type: 'MINIMIZE_WINDOW', id: w.id })
                  }
                }}
              >
                <TitleIcon size={14} />
                <span className="truncate">{w.title}</span>
              </button>
            )
          })}
        </div>

        {/* System tray / Clock */}
        <div className="flex items-center shrink-0">
          <Clock />
        </div>
      </div>
    </>
  )
}
