'use client'

import { useState } from 'react'

interface RecycleItem {
  name: string
  type: 'log' | 'txt' | 'bak'
  originalLocation: string
  dateDeleted: string
  content: string[]
}

const recycleItems: RecycleItem[] = [
  {
    name: 'failed_audio_drivers.log',
    type: 'log',
    originalLocation: 'C:\\Users\\Admin\\Debug',
    dateDeleted: '11/15/24',
    content: [
      '=== AUDIO DRIVER DEBUG LOG ===',
      'Date: 2024-11-15',
      '',
      '[ERROR] 5.1 surround sound driver init failed',
      '[INFO]  Attempted Realtek ALC1220 on Win Server 2025',
      '[ERROR] IRQ conflict detected on channel 7',
      '[WARN]  Falling back to stereo output',
      '[INFO]  Tried manually injecting INF file...',
      '[ERROR] BSOD: IRQL_NOT_LESS_OR_EQUAL',
      '[INFO]  Reverted to previous driver version',
      '',
      'Resolution: Used generic HD Audio driver instead.',
      'Sometimes you gotta pick your battles.',
    ],
  },
  {
    name: 'dam_v1_deprecated.txt',
    type: 'txt',
    originalLocation: 'C:\\Users\\Admin\\Projects\\Office_DAM',
    dateDeleted: '10/22/24',
    content: [
      '=== DAM Integration v1.0 (DEPRECATED) ===',
      '',
      'Original approach: Direct file system watcher',
      'with polling-based sync to SharePoint.',
      '',
      'Problems:',
      '- Race conditions on concurrent file edits',
      '- API rate limiting from MS Graph (429 errors)',
      '- No delta sync = re-uploading entire folders',
      '- Memory leak in the file watcher daemon',
      '',
      'Lesson learned: Use webhooks + delta queries',
      'instead of polling. v2.0 is 10x more reliable.',
    ],
  },
  {
    name: 'arm_servo_burnout_notes.txt',
    type: 'txt',
    originalLocation: 'C:\\Users\\Admin\\Projects\\Robotic_Arm',
    dateDeleted: '09/05/24',
    content: [
      '=== Servo Burnout Incident Report ===',
      '',
      'Date: 2024-09-03',
      'Affected: Joint 3 (elbow) MG996R servo',
      '',
      'Root cause: Continuous stall torque for 45+ sec',
      'while testing max payload (exceeded 2kg spec).',
      '',
      'The servo literally started smoking.',
      'Current limiting was insufficient.',
      '',
      'Fix: Added software torque limits and a',
      'thermal timeout (max 15s continuous under load).',
      'Also upgraded joint 3 to a 35kg servo.',
    ],
  },
  {
    name: 'npu_driver_hack.log',
    type: 'log',
    originalLocation: 'C:\\Users\\Admin\\Drivers',
    dateDeleted: '12/01/24',
    content: [
      '=== NPU Driver Workaround Log ===',
      '',
      'AMD Ryzen AI Max+ 395 NPU Configuration',
      '',
      '[ATTEMPT 1] Official AMD installer - FAILED',
      '  Error: "Unsupported OS configuration"',
      '  (Windows Server 2025 not in supported list)',
      '',
      '[ATTEMPT 2] Extract .inf from Ryzen AI website',
      '  Downloaded: amd_npu_driver_win11_24h2.exe',
      '  Extracted using 7-Zip, found npu_amd.inf',
      '  Ran: pnputil /add-driver npu_amd.inf /install',
      '  Result: SUCCESS (with warnings)',
      '',
      '[ATTEMPT 3] Verify with ryzen-ai-sw toolkit',
      '  NPU detected: AMD XDNA(TM) 2 (Phoenix)',
      '  ONNX runtime acceleration: WORKING',
      '',
      'Note: This workaround may break on Windows Update.',
      'Filed feedback with AMD for official Server support.',
    ],
  },
  {
    name: 'gofish_matchmaking_v0.bak',
    type: 'bak',
    originalLocation: 'C:\\Users\\Admin\\Projects\\GoFish',
    dateDeleted: '01/10/25',
    content: [
      '=== GoFish Matchmaking v0 (Scrapped) ===',
      '',
      'Original design: Round-robin matchmaking',
      'with ELO-based skill ratings.',
      '',
      'Why it was scrapped:',
      '- Overcomplicated for a card game',
      '- ELO calculations added 200ms latency',
      '- Players just wanted to play with friends',
      '',
      'Replaced with simple room codes.',
      'Sometimes simpler is better.',
    ],
  },
]

export function RecycleContent() {
  const [selected, setSelected] = useState<string | null>(null)
  const [viewing, setViewing] = useState<RecycleItem | null>(null)

  if (viewing) {
    return (
      <div className="h-full flex flex-col bg-[#ffffff]">
        <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
          <button className="win-button text-[11px] h-[18px] px-2" onClick={() => setViewing(null)}>Back</button>
          <span className="text-[12px] font-sans text-[#000000] ml-2">{viewing.name}</span>
        </div>
        <div className="flex-1 overflow-auto p-3 font-mono text-[13px] text-[#000000] leading-relaxed whitespace-pre-wrap bg-[#ffffee]">
          {viewing.content.map((line, i) => (
            <div key={i} className={`${
              line.includes('[ERROR]') ? 'text-[#cc0000]' :
              line.includes('[WARN]') ? 'text-[#cc8800]' :
              line.includes('[INFO]') || line.includes('[ATTEMPT') ? 'text-[#006600]' :
              line.includes('===') ? 'text-[#000080] font-bold' :
              'text-[#000000]'
            }`}>
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Header row */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)] text-[11px] font-sans text-[#000000]">
        <span className="w-[200px]">Name</span>
        <span className="w-[200px]">Original Location</span>
        <span className="w-[80px]">Date Deleted</span>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-auto">
        {recycleItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center px-2 py-[3px] w-full text-left text-[12px] font-sans ${
              selected === item.name ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)]' : 'text-[#000000] hover:bg-[#e0e0e0]'
            }`}
            onClick={() => setSelected(item.name)}
            onDoubleClick={() => setViewing(item)}
          >
            <span className="w-[200px] truncate flex items-center gap-2">
              <span className="text-[10px]">
                {item.type === 'log' ? '[LOG]' : item.type === 'bak' ? '[BAK]' : '[TXT]'}
              </span>
              {item.name}
            </span>
            <span className="w-[200px] truncate text-[#808080]">{item.originalLocation}</span>
            <span className="w-[80px]">{item.dateDeleted}</span>
          </button>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">
          {selected
            ? `Double-click to view: ${selected}`
            : `${recycleItems.length} object(s) - Engineering lessons & scrapped iterations`}
        </span>
      </div>
    </div>
  )
}
