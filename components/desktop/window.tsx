'use client'

import { useRef, useCallback } from 'react'
import type { WindowData, WindowAction } from '@/lib/desktop-store'
import { playClick, playWindowClose, playMinimize, playWindowOpen } from '@/lib/sounds'
import {
  MyComputerIcon,
  RecycleBinIcon,
  InternetExplorerIcon,
  NotepadIcon,
  FolderIcon,
  TerminalIcon,
  PaintIcon,
  CalculatorIcon,
  NetworkIcon,
  InboxIcon,
  FileTextIcon,
  MinesweeperIcon,
  ResumeIcon,
  DisplayPropertiesIcon,
  PicturesIcon,
} from './win-icons'

const titleIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  mycomputer: MyComputerIcon,
  recycle: RecycleBinIcon,
  ie: InternetExplorerIcon,
  notepad: NotepadIcon,
  folder: FolderIcon,
  terminal: TerminalIcon,
  paint: PaintIcon,
  calculator: CalculatorIcon,
  network: NetworkIcon,
  inbox: InboxIcon,
  'file-text': FileTextIcon,
  minesweeper: MinesweeperIcon,
  resume: ResumeIcon,
  displayprops: DisplayPropertiesIcon,
  pictures: PicturesIcon,
}

interface WindowProps {
  data: WindowData
  dispatch: React.Dispatch<WindowAction>
  children: React.ReactNode
  highestZ: number
}

export function Window({ data, dispatch, children, highestZ }: WindowProps) {
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      dispatch({ type: 'FOCUS_WINDOW', id: data.id })
      const el = e.currentTarget as HTMLElement
      el.setPointerCapture(e.pointerId)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: data.position.x,
        origY: data.position.y,
      }
    },
    [data.id, data.position, dispatch]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      dispatch({
        type: 'MOVE_WINDOW',
        id: data.id,
        position: {
          x: dragRef.current.origX + dx,
          y: dragRef.current.origY + dy,
        },
      })
    },
    [data.id, dispatch]
  )

  const handlePointerUp = useCallback(() => {
    dragRef.current = null
  }, [])

  if (!data.isOpen || data.isMinimized) return null

  const isMaximized = data.isMaximized
  const isFocused = data.zIndex === highestZ

  const TitleIcon = titleIconMap[data.icon] || FileTextIcon

  const style: React.CSSProperties = isMaximized
    ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 36, zIndex: data.zIndex }
    : {
        position: 'absolute',
        left: data.position.x,
        top: data.position.y,
        width: data.size.width,
        height: data.size.height,
        zIndex: data.zIndex,
      }

  return (
    <div
      style={style}
      className="flex flex-col"
      onPointerDown={() => dispatch({ type: 'FOCUS_WINDOW', id: data.id })}
    >
      <div className="flex flex-col h-full win-border-raised bg-[var(--win-bg)]">
        {/* Title bar */}
        <div
          className={`flex items-center h-[22px] px-[3px] shrink-0 select-none gap-[3px] ${
            isFocused
              ? 'bg-[var(--win-titlebar)]'
              : 'bg-[var(--win-titlebar-inactive)]'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ touchAction: 'none', cursor: 'grab' }}
        >
          {/* Window icon */}
          <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
            <TitleIcon size={16} />
          </div>

          {/* Title text */}
          <span className="text-[var(--win-titlebar-text)] text-[14px] font-sans truncate flex-1 leading-none tracking-wide">
            {data.title}
          </span>

          {/* Window controls */}
          <div className="flex gap-[2px] ml-1 shrink-0">
            <button
              className="win-button !p-0 w-[16px] h-[14px] flex items-center justify-center"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                playMinimize()
                dispatch({ type: 'MINIMIZE_WINDOW', id: data.id })
              }}
              aria-label="Minimize"
            >
              <svg width="8" height="7" viewBox="0 0 8 7">
                <rect x="0" y="5" width="7" height="2" fill="#000000" />
              </svg>
            </button>
            <button
              className="win-button !p-0 w-[16px] h-[14px] flex items-center justify-center"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                playWindowOpen()
                dispatch({ type: 'TOGGLE_MAXIMIZE', id: data.id })
              }}
              aria-label="Maximize"
            >
              <svg width="9" height="9" viewBox="0 0 9 9">
                <rect x="0" y="0" width="9" height="9" fill="none" stroke="#000000" strokeWidth="1" />
                <rect x="0" y="0" width="9" height="2" fill="#000000" />
              </svg>
            </button>
            <button
              className="win-button !p-0 w-[16px] h-[14px] flex items-center justify-center"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                playWindowClose()
                dispatch({ type: 'CLOSE_WINDOW', id: data.id })
              }}
              aria-label="Close"
            >
              <svg width="8" height="7" viewBox="0 0 8 7">
                <line x1="0" y1="0" x2="8" y2="7" stroke="#000000" strokeWidth="1.5" />
                <line x1="8" y1="0" x2="0" y2="7" stroke="#000000" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden m-[2px] win-border-field">
          {children}
        </div>
      </div>
    </div>
  )
}
