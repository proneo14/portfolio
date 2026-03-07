'use client'

import { useState } from 'react'
import { playClick } from '@/lib/sounds'

interface PictureItem {
  name: string
  desc: string
  ascii: string
  date: string
  size: string
}

const pictures: PictureItem[] = [
  {
    name: 'workstation.bmp',
    desc: 'AMD Ryzen AI Max+ 395 Build',
    date: '02/15/25',
    size: '2.4 MB',
    ascii: `
┌──────────────────────────────────────┐
│  ╔══════════════════════════════╗    │
│  ║  AMD Ryzen AI Max+ 395      ║    │
│  ║  ┌────────────────────────┐  ║    │
│  ║  │ ▓▓▓▓▓▓▓▓▓  64GB DDR5 │  ║    │
│  ║  │ ▓▓ CPU ▓▓  4TB NVMe   │  ║    │
│  ║  │ ▓▓▓▓▓▓▓▓▓  NPU XDNA2 │  ║    │
│  ║  └────────────────────────┘  ║    │
│  ║  [═══FAN═══] [═══FAN═══]    ║    │
│  ╚══════════════════════════════╝    │
│          The Workstation             │
└──────────────────────────────────────┘`,
  },
  {
    name: 'gpu_cluster.bmp',
    desc: 'Dual RX 9070 XT Setup',
    date: '01/20/25',
    size: '3.1 MB',
    ascii: `
┌──────────────────────────────────────┐
│                                      │
│   ┌──────────────────────────────┐   │
│   │ ████████████████  RX 9070 XT │   │
│   │ █ AMD RDNA 4  █  16GB VRAM  │   │
│   │ ████████████████  [FAN][FAN] │   │
│   └──────────────────────────────┘   │
│   ┌──────────────────────────────┐   │
│   │ ████████████████  RX 9070 XT │   │
│   │ █ AMD RDNA 4  █  16GB VRAM  │   │
│   │ ████████████████  [FAN][FAN] │   │
│   └──────────────────────────────┘   │
│        Dual GPU Compute Rig          │
└──────────────────────────────────────┘`,
  },
  {
    name: 'robotic_arm.bmp',
    desc: '6-DOF Robotic Arm Assembly',
    date: '12/05/24',
    size: '1.8 MB',
    ascii: `
┌──────────────────────────────────────┐
│              ╱╲                      │
│             ╱  ╲  ← End Effector     │
│            ╱    ╲                    │
│     ┌─────╱──────╲─────┐            │
│     │    (J5)    (J6)   │            │
│     └────────┬──────────┘            │
│          ┌───┴───┐                   │
│          │  J4   │  ← Wrist          │
│     ┌────┴───────┴────┐             │
│     │      LINK 2     │             │
│     └────────┬────────┘             │
│         ┌────┴────┐                  │
│         │  BASE   │  6-DOF PLA+      │
│    ═════╧═════════╧═════             │
└──────────────────────────────────────┘`,
  },
  {
    name: 'bambu_printer.bmp',
    desc: 'Bambu Lab A1 3D Printer',
    date: '11/12/24',
    size: '2.7 MB',
    ascii: `
┌──────────────────────────────────────┐
│    ╔═══════════════════════╗         │
│    ║  ┌─────────────────┐  ║         │
│    ║  │                 │  ║         │
│    ║  │   ▲ printing... │  ║         │
│    ║  │  ▲▲▲            │  ║         │
│    ║  │ ▲▲▲▲▲  Layer 42 │  ║         │
│    ║  │▲▲▲▲▲▲▲          │  ║         │
│    ║  └─────────────────┘  ║         │
│    ║  [████████░░] 68%     ║         │
│    ╚═══════════════════════╝         │
│       Bambu Lab A1 - PLA+            │
└──────────────────────────────────────┘`,
  },
  {
    name: 'server_rack.bmp',
    desc: 'Home Lab Server',
    date: '10/30/24',
    size: '1.5 MB',
    ascii: `
┌──────────────────────────────────────┐
│  ┌──────────────────────────────┐    │
│  │ ░░░ Windows Server 2025 ░░░ │    │
│  │ ┌──┐┌──┐┌──┐┌──┐  [HDD]    │    │
│  │ │AD││DC││DS││IIS│  [HDD]    │    │
│  │ └──┘└──┘└──┘└──┘  [HDD]    │    │
│  │ ──────────────────────────  │    │
│  │ Docker │ Nginx │ DNS │ VPN  │    │
│  │ ──────────────────────────  │    │
│  │ [██████████] CPU: 12%       │    │
│  │ [████░░░░░░] RAM: 43%       │    │
│  └──────────────────────────────┘    │
│        Home Lab - Always On          │
└──────────────────────────────────────┘`,
  },
  {
    name: 'desk_setup.bmp',
    desc: 'Developer Workspace',
    date: '09/15/24',
    size: '3.8 MB',
    ascii: `
┌──────────────────────────────────────┐
│                                      │
│  ┌────────────┐ ┌────────────┐       │
│  │  Monitor 1 │ │  Monitor 2 │       │
│  │  ┌──────┐  │ │  ┌──────┐  │       │
│  │  │ Code │  │ │  │ Term │  │       │
│  │  │  >>_ │  │ │  │  $>_ │  │       │
│  │  └──────┘  │ │  └──────┘  │       │
│  └─────┬──────┘ └──────┬─────┘       │
│   ┌────┴───────────────┴────┐        │
│   │  [kb] ═══════════ [mouse] │      │
│   └─────────────────────────┘        │
│       The Dev Command Center         │
└──────────────────────────────────────┘`,
  },
]

export function PicturesContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [viewing, setViewing] = useState<number | null>(null)

  if (viewing !== null) {
    const pic = pictures[viewing]
    return (
      <div className="h-full flex flex-col bg-[#ffffff]">
        {/* Viewer toolbar */}
        <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
          <button
            className="win-button text-[11px] h-[20px] px-3"
            onClick={() => { playClick(); setViewing(null) }}
          >
            ← Back
          </button>
          <button
            className="win-button text-[11px] h-[20px] px-3"
            onClick={() => { playClick(); setViewing(Math.max(0, viewing - 1)) }}
            disabled={viewing === 0}
          >
            ◄ Prev
          </button>
          <button
            className="win-button text-[11px] h-[20px] px-3"
            onClick={() => { playClick(); setViewing(Math.min(pictures.length - 1, viewing + 1)) }}
            disabled={viewing === pictures.length - 1}
          >
            Next ►
          </button>
          <div className="flex-1" />
          <span className="text-[11px] font-sans text-[#808080]">
            {viewing + 1} of {pictures.length}
          </span>
        </div>

        {/* Image viewer */}
        <div className="flex-1 overflow-auto flex flex-col items-center justify-center bg-[#000000] p-4">
          <pre className="text-[#00ff00] text-[11px] leading-[14px] font-mono select-text">
            {pic.ascii}
          </pre>
        </div>

        {/* Info bar */}
        <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
          <span className="text-[11px] font-sans text-[#000000]">
            {pic.name} — {pic.desc} — {pic.size}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">📁 C:\My Pictures</span>
        <div className="flex-1" />
        <span className="text-[11px] font-sans text-[#808080]">{pictures.length} object(s)</span>
      </div>

      {/* Thumbnail grid */}
      <div className="flex-1 overflow-auto p-3">
        <div className="grid grid-cols-3 gap-3">
          {pictures.map((pic, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-1 p-2 rounded-sm cursor-pointer ${
                selected === i
                  ? 'bg-[var(--win-titlebar)]'
                  : 'hover:bg-[#e0e0e0]'
              }`}
              onClick={() => { playClick(); setSelected(i) }}
              onDoubleClick={() => { playClick(); setViewing(i) }}
            >
              {/* Thumbnail frame */}
              <div className="w-[80px] h-[60px] bg-[#000000] border-2 border-[#808080] flex items-center justify-center overflow-hidden">
                <pre className="text-[#00ff00] text-[4px] leading-[5px] font-mono">
                  {pic.ascii.slice(0, 200)}
                </pre>
              </div>
              <span className={`text-[11px] font-sans truncate max-w-[90px] ${
                selected === i ? 'text-[var(--win-titlebar-text)]' : 'text-[#000000]'
              }`}>
                {pic.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">
          {selected !== null
            ? `${pictures[selected].name} — ${pictures[selected].desc} — ${pictures[selected].date} — ${pictures[selected].size}`
            : `${pictures.length} object(s)`}
        </span>
      </div>
    </div>
  )
}
