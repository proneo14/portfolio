'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const NEOFETCH = [
  '        ################        admin@lanc-serv-01',
  '      ##              ##      ----------------------',
  '    ##   ############   ##    OS: Portfolio OS 95 x86_64',
  '   ##   ##          ##   ##   Host: Custom Build (AMD Ryzen AI Max+ 395)',
  '  ##   ##    ####    ##   ##  Kernel: 2.0.36-portfolio',
  '  ##   ##   ##  ##   ##   ##  Uptime: since 1995',
  '  ##   ##   ##  ##   ##   ##  Shell: portfolio-sh 1.0',
  '  ##   ##    ####    ##   ##  Resolution: 800x600',
  '   ##   ##          ##   ##   CPU: AMD Ryzen AI Max+ 395 (16c/32t)',
  '    ##   ############   ##    GPU: AMD Radeon RX 9070 XT (x2 Cluster)',
  '      ##              ##      Memory: 256MB / 64GB',
  '        ################      Disk: 2.1GB / 4TB NVMe',
]

const HELP_TEXT = [
  'Available commands:',
  '',
  '  help          - Show this help message',
  '  whoami        - Display user info',
  '  neofetch      - Show system specs',
  '  ls            - List files in current directory',
  '  cat <file>    - Read a file',
  '  cd <dir>      - Change directory',
  '  clear         - Clear the terminal',
  '  skills        - List technical skills',
  '  projects      - List portfolio projects',
  '  contact       - Show contact info',
  '  secret        - ???',
  '',
]

interface FSEntry {
  type: 'file' | 'dir'
  content?: string[]
  children?: Record<string, FSEntry>
}

const filesystem: Record<string, FSEntry> = {
  'about.txt': {
    type: 'file',
    content: [
      'Name:       Portfolio Admin',
      'Title:      MechE Student & Full-Stack Developer',
      'University: uOttawa (Mechanical Engineering)',
      '',
      'Bridging mechanical engineering with software & AI.',
      'Specializing in rigid body dynamics, kinematics,',
      'computer vision, and quantizing LLMs for edge devices.',
    ],
  },
  'resume.txt': {
    type: 'file',
    content: [
      '=== RESUME ===',
      '',
      'EDUCATION',
      '  B.Eng Mechanical Engineering - uOttawa',
      '  Focus: Rigid Body Dynamics, Materials Science',
      '',
      'EXPERIENCE',
      '  Full-Stack Developer & Systems Engineer',
      '  - Built GoFish multiplayer card game',
      '  - Designed 6-DOF robotic arm with inverse kinematics',
      '  - Developed Bambu Lab computer vision monitoring',
      '  - Created Office DAM Integration system',
      '',
      'SKILLS',
      '  Languages: JS/TS, Python, Go, C/C++, Rust',
      '  Hardware:  AMD Ryzen AI Max+ 395, RX 9070 XT x2',
      '  Tools:     Docker, Linux, 3D Printing, SolidWorks',
    ],
  },
  'projects': {
    type: 'dir',
    children: {
      'GoFish': {
        type: 'dir',
        children: {
          'README.txt': { type: 'file', content: ['GoFish - Multiplayer card game', 'Stack: Go backend, WebSocket, React frontend', 'Built for uOttaHack 8'] },
          'tech_stack.txt': { type: 'file', content: ['Backend: Go 1.22, gorilla/websocket', 'Frontend: React 19, TypeScript', 'Deploy: Docker Compose, Nginx'] },
        },
      },
      'Robotic_Arm': {
        type: 'dir',
        children: {
          'README.txt': { type: 'file', content: ['6-DOF Robotic Arm Build', 'Custom inverse kinematics solver', 'Servo control via Arduino Mega'] },
          'specs.txt': { type: 'file', content: ['Motors: 6x MG996R servos', 'Controller: Arduino Mega 2560', 'Framework: ROS2 (partial)', 'Material: 3D Printed PLA+, aluminum joints'] },
          'kinematics.txt': { type: 'file', content: ['Denavit-Hartenberg parameters configured', 'Jacobian-based IK solver (iterative)', 'Workspace envelope: ~400mm radius sphere'] },
        },
      },
      'Bambu_CV': {
        type: 'dir',
        children: {
          'README.txt': { type: 'file', content: ['Bambu Lab Computer Vision Monitor', 'Real-time print defect detection', 'Uses OpenCV + YOLO for anomaly flagging'] },
        },
      },
      'Office_DAM': {
        type: 'dir',
        children: {
          'README.txt': { type: 'file', content: ['Office Digital Asset Management Integration', 'Enterprise-grade file workflow system', 'Integrates with SharePoint & OneDrive APIs'] },
        },
      },
    },
  },
  'Windows': {
    type: 'dir',
    children: {
      'System32': {
        type: 'dir',
        children: {
          'minesweeper.exe': { type: 'file', content: ['[EXECUTABLE] Launch Minesweeper from the desktop!', 'Hint: it\'s hidden in the Start > Programs menu.'] },
          'config.sys': { type: 'file', content: ['DEVICE=C:\\WINDOWS\\HIMEM.SYS', 'DOS=HIGH,UMB', 'FILES=40', 'BUFFERS=20'] },
          'secret.txt': { type: 'file', content: ['You found the Easter egg!', '', 'IDDQD IDKFA', '', '"The cake is a lie."', '', '  - Built with love and too much caffeine'] },
        },
      },
    },
  },
}

type HistoryEntry = { type: 'input' | 'output'; text: string }

export function TerminalContent() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState('C:\\Users\\Admin')
  const [showCursor, setShowCursor] = useState(true)
  const [booting, setBooting] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cmdHistory = useRef<string[]>([])
  const cmdIndex = useRef(-1)

  // Boot sequence
  useEffect(() => {
    const bootLines = [
      'Microsoft(R) Windows 95',
      '   (C)Copyright Microsoft Corp 1981-1995.',
      '',
      'C:\\>portfolio_init.exe',
      '',
      '========================================',
      '  PORTFOLIO TERMINAL v2.4.1            ',
      '========================================',
      '',
      'Type "help" for available commands.',
      'Type "neofetch" for system specs.',
      '',
    ]
    const timers: ReturnType<typeof setTimeout>[] = []
    bootLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setHistory((h) => [...h, { type: 'output', text: line }])
          if (i === bootLines.length - 1) {
            setTimeout(() => setBooting(false), 200)
          }
        }, i * 60)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history, input])

  // Resolve path to filesystem entry
  const resolvePath = useCallback((path: string): { entry: FSEntry | null; name: string } => {
    const parts = path.replace(/\\/g, '/').split('/').filter(Boolean)
    let current: FSEntry = { type: 'dir', children: filesystem }
    for (let i = 0; i < parts.length; i++) {
      if (current.type !== 'dir' || !current.children) return { entry: null, name: parts[parts.length - 1] }
      const child = current.children[parts[i]]
      if (!child) return { entry: null, name: parts[i] }
      current = child
    }
    return { entry: current, name: parts[parts.length - 1] || '' }
  }, [])

  const getCwdContents = useCallback((): Record<string, FSEntry> => {
    if (cwd === 'C:\\Users\\Admin' || cwd === 'C:\\') return filesystem
    const relative = cwd.replace('C:\\Users\\Admin\\', '').replace('C:\\', '')
    const { entry } = resolvePath(relative)
    if (entry && entry.type === 'dir' && entry.children) return entry.children
    return filesystem
  }, [cwd, resolvePath])

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    cmdHistory.current.unshift(trimmed)
    cmdIndex.current = -1

    const output: string[] = []
    const parts = trimmed.split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    switch (command) {
      case 'help':
        output.push(...HELP_TEXT)
        break

      case 'whoami':
        output.push('admin@lanc-serv-01')
        output.push('Role: MechE Student & Full-Stack Developer')
        output.push('Location: Ottawa, ON')
        break

      case 'neofetch':
        output.push(...NEOFETCH)
        break

      case 'ls': {
        const contents = getCwdContents()
        const entries = Object.entries(contents)
        if (entries.length === 0) {
          output.push('(empty directory)')
        } else {
          entries.forEach(([name, entry]) => {
            const prefix = entry.type === 'dir' ? '<DIR>  ' : '       '
            output.push(`${prefix}${name}`)
          })
          output.push('')
          output.push(`  ${entries.length} item(s)`)
        }
        break
      }

      case 'cd': {
        if (!args || args === '~') {
          setCwd('C:\\Users\\Admin')
          break
        }
        if (args === '..' || args === '..\\') {
          const parentParts = cwd.split('\\')
          if (parentParts.length > 2) {
            parentParts.pop()
            setCwd(parentParts.join('\\'))
          }
          break
        }
        const contents = getCwdContents()
        const target = Object.entries(contents).find(([name]) => name.toLowerCase() === args.toLowerCase())
        if (target && target[1].type === 'dir') {
          setCwd(cwd + '\\' + target[0])
        } else if (target) {
          output.push(`"${args}" is not a directory.`)
        } else {
          output.push(`The system cannot find the path specified: ${args}`)
        }
        break
      }

      case 'cat': {
        if (!args) {
          output.push('Usage: cat <filename>')
          break
        }
        const contents = getCwdContents()
        const file = Object.entries(contents).find(([name]) => name.toLowerCase() === args.toLowerCase())
        if (file && file[1].type === 'file' && file[1].content) {
          output.push(...file[1].content)
        } else if (file && file[1].type === 'dir') {
          output.push(`"${args}" is a directory. Use "cd ${args}" to enter it.`)
        } else {
          output.push(`File not found: ${args}`)
        }
        break
      }

      case 'clear':
        setHistory([])
        return

      case 'skills':
        output.push('=== Technical Skills ===')
        output.push('')
        output.push('Languages:    JavaScript/TypeScript, Python, Go, C/C++, Rust')
        output.push('Frontend:     React, Next.js, Tailwind CSS, Three.js')
        output.push('Backend:      Node.js, FastAPI, Go net/http, Express')
        output.push('Hardware:     Arduino, Raspberry Pi, ESP32')
        output.push('3D Printing:  Bambu Lab A1, FDM/SLA, CAD (SolidWorks)')
        output.push('AI/ML:        OpenCV, YOLO, LLM Quantization (GGUF)')
        output.push('DevOps:       Docker, Linux (Debian/Arch), Nginx')
        output.push('Networking:   Windows Server 2025, Active Directory')
        break

      case 'projects':
        output.push('=== Portfolio Projects ===')
        output.push('')
        output.push('1. GoFish          - Multiplayer card game (Go + WebSocket)')
        output.push('2. Robotic Arm     - 6-DOF arm w/ inverse kinematics')
        output.push('3. Bambu CV        - 3D print monitoring (OpenCV + YOLO)')
        output.push('4. Office DAM      - Enterprise asset management integration')
        output.push('')
        output.push('Use "cd projects" then "ls" to explore details.')
        break

      case 'contact':
        output.push('=== Contact ===')
        output.push('')
        output.push('Email:    hello@portfolio.dev')
        output.push('GitHub:   github.com/admin')
        output.push('LinkedIn: linkedin.com/in/admin')
        output.push('DevPost:  devpost.com/admin')
        output.push('')
        output.push('Or use the Inbox app on the desktop to send me a message!')
        break

      case 'secret':
        output.push('')
        output.push('  *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*')
        output.push('  *   You found the secret!       *')
        output.push('  *                               *')
        output.push('  *   Try: cd Windows             *')
        output.push('  *        cd System32            *')
        output.push('  *        cat secret.txt         *')
        output.push('  *                               *')
        output.push('  *   Also try Minesweeper from   *')
        output.push('  *   the Start menu Programs!    *')
        output.push('  *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*')
        output.push('')
        break

      case 'sudo':
        output.push('Nice try. This is Windows 95, we don\'t do that here.')
        break

      case 'rm':
        output.push('Permission denied. You can\'t delete my portfolio!')
        break

      case 'exit':
        output.push('There is no escape from this terminal.')
        break

      case 'ping':
        output.push(`Pinging ${args || 'localhost'}...`)
        output.push('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128')
        output.push('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128')
        output.push('')
        output.push('Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)')
        break

      default:
        output.push(`'${command}' is not recognized as an internal or external command,`)
        output.push('operable program or batch file.')
        output.push('')
        output.push('Type "help" for available commands.')
    }

    setHistory((h) => [
      ...h,
      { type: 'input', text: `${cwd}> ${trimmed}` },
      ...output.map((t) => ({ type: 'output' as const, text: t })),
    ])
  }, [cwd, getCwdContents, resolvePath])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.current.length > 0) {
        const newIndex = Math.min(cmdIndex.current + 1, cmdHistory.current.length - 1)
        cmdIndex.current = newIndex
        setInput(cmdHistory.current[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdIndex.current > 0) {
        cmdIndex.current -= 1
        setInput(cmdHistory.current[cmdIndex.current])
      } else {
        cmdIndex.current = -1
        setInput('')
      }
    }
  }, [input, processCommand])

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-[var(--win-terminal-bg)] p-3 overflow-y-auto font-mono cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div
          key={i}
          className={`text-[15px] leading-[1.5] whitespace-pre-wrap break-all ${
            entry.type === 'input'
              ? 'text-[#ffffff]'
              : entry.text.includes('[OK]') || entry.text.includes('===')
              ? 'text-[#33ff33]'
              : entry.text.includes('PORTFOLIO') || entry.text.includes('*~*')
              ? 'text-[#ffff55]'
              : 'text-[var(--win-terminal-text)]'
          }`}
        >
          {entry.text || '\u00A0'}
        </div>
      ))}

      {/* Input line */}
      {!booting && (
        <div className="flex items-center text-[15px] leading-[1.5]">
          <span className="text-[#ffffff] whitespace-pre shrink-0">{cwd}{'> '}</span>
          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-[var(--win-terminal-text)] outline-none font-mono text-[15px] caret-transparent"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
            {/* Custom cursor */}
            <span
              className="absolute top-0 pointer-events-none text-[var(--win-terminal-text)] text-[15px] font-mono"
              style={{ left: `${input.length}ch` }}
            >
              <span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
