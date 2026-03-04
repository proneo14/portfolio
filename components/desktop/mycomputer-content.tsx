'use client'

import { useState } from 'react'
import { MyComputerIcon, FolderIcon, NotepadIcon } from './win-icons'

interface FileItem {
  name: string
  type: 'drive' | 'folder' | 'file'
  size?: string
  icon: 'drive-a' | 'drive-c' | 'drive-d' | 'folder' | 'control-panel' | 'printers' | 'dialup'
}

const items: FileItem[] = [
  { name: '3\u00BD Floppy (A:)', type: 'drive', icon: 'drive-a' },
  { name: '(C:)', type: 'drive', icon: 'drive-c' },
  { name: '(D:)', type: 'drive', icon: 'drive-d' },
  { name: 'Control Panel', type: 'folder', icon: 'control-panel' },
  { name: 'Printers', type: 'folder', icon: 'printers' },
  { name: 'Dial-Up Networking', type: 'folder', icon: 'dialup' },
]

export function MyComputerContent() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Content grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <button
              key={item.name}
              className={`flex flex-col items-center gap-1 p-3 cursor-pointer focus:outline-none ${
                selected === item.name ? 'bg-[var(--win-titlebar)] bg-opacity-20' : ''
              }`}
              onClick={() => setSelected(item.name)}
              onDoubleClick={() => setSelected(item.name)}
            >
              {item.icon === 'drive-c' || item.icon === 'drive-d' ? (
                <MyComputerIcon size={40} />
              ) : item.icon === 'folder' || item.icon === 'control-panel' || item.icon === 'printers' || item.icon === 'dialup' ? (
                <FolderIcon size={40} />
              ) : (
                <NotepadIcon size={40} />
              )}
              <span className={`text-[12px] font-sans text-center leading-tight ${
                selected === item.name ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)] px-1' : 'text-[#000000]'
              }`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">{items.length} object(s)</span>
      </div>
    </div>
  )
}
