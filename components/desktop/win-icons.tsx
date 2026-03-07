'use client'

interface IconProps {
  size?: number
  className?: string
}

export function MyComputerIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Monitor body */}
      <rect x="4" y="2" width="24" height="18" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="6" y="4" width="20" height="14" fill="#000080" stroke="#808080" strokeWidth="1" />
      {/* Screen content */}
      <rect x="8" y="6" width="6" height="5" fill="#008080" />
      <rect x="16" y="6" width="6" height="5" fill="#c0c0c0" />
      <rect x="10" y="13" width="8" height="2" fill="#ffffff" />
      {/* Monitor stand */}
      <rect x="12" y="20" width="8" height="2" fill="#c0c0c0" stroke="#808080" strokeWidth="0.5" />
      <rect x="10" y="22" width="12" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      {/* Power light */}
      <rect x="15" y="18" width="2" height="1" fill="#00ff00" />
    </svg>
  )
}

export function RecycleBinIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Bin body */}
      <path d="M8 10 L10 28 L22 28 L24 10 Z" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      {/* Lid */}
      <rect x="7" y="8" width="18" height="3" rx="0" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="13" y="6" width="6" height="3" rx="0" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      {/* Lines on bin */}
      <line x1="12" y1="13" x2="12" y2="25" stroke="#808080" strokeWidth="1" />
      <line x1="16" y1="13" x2="16" y2="25" stroke="#808080" strokeWidth="1" />
      <line x1="20" y1="13" x2="20" y2="25" stroke="#808080" strokeWidth="1" />
    </svg>
  )
}

export function InternetExplorerIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Globe */}
      <circle cx="16" cy="16" r="12" fill="#0078d4" stroke="#000" strokeWidth="1" />
      <ellipse cx="16" cy="16" rx="6" ry="12" fill="none" stroke="#ffffff" strokeWidth="1" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="#ffffff" strokeWidth="1" />
      <line x1="6" y1="10" x2="26" y2="10" stroke="#ffffff" strokeWidth="0.7" />
      <line x1="6" y1="22" x2="26" y2="22" stroke="#ffffff" strokeWidth="0.7" />
      {/* e swoosh */}
      <path d="M8 14 Q16 8 26 14" stroke="#ffdd00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function NotepadIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Page */}
      <rect x="6" y="2" width="20" height="28" fill="#ffffcc" stroke="#000" strokeWidth="1" />
      {/* Fold corner */}
      <path d="M20 2 L26 8 L20 8 Z" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      {/* Blue header bar */}
      <rect x="6" y="2" width="14" height="3" fill="#000080" />
      {/* Lines of text */}
      <line x1="9" y1="10" x2="22" y2="10" stroke="#808080" strokeWidth="1" />
      <line x1="9" y1="14" x2="20" y2="14" stroke="#808080" strokeWidth="1" />
      <line x1="9" y1="18" x2="22" y2="18" stroke="#808080" strokeWidth="1" />
      <line x1="9" y1="22" x2="18" y2="22" stroke="#808080" strokeWidth="1" />
      <line x1="9" y1="26" x2="21" y2="26" stroke="#808080" strokeWidth="1" />
    </svg>
  )
}

export function FolderIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Folder tab */}
      <path d="M3 8 L3 6 L13 6 L15 8 Z" fill="#e8b230" stroke="#000" strokeWidth="0.5" />
      {/* Folder body */}
      <rect x="3" y="8" width="26" height="18" rx="0" fill="#e8b230" stroke="#000" strokeWidth="1" />
      {/* Folder front face */}
      <rect x="3" y="12" width="26" height="14" rx="0" fill="#ffdd55" stroke="#000" strokeWidth="0.5" />
    </svg>
  )
}

export function TerminalIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Window */}
      <rect x="3" y="3" width="26" height="26" fill="#0c0c0c" stroke="#c0c0c0" strokeWidth="1" />
      {/* Title bar */}
      <rect x="3" y="3" width="26" height="4" fill="#000080" />
      {/* Prompt text */}
      <text x="6" y="16" fill="#33ff33" fontSize="7" fontFamily="monospace">C:\{'>'}_ </text>
      <line x1="6" y1="20" x2="22" y2="20" stroke="#33ff33" strokeWidth="0.5" opacity="0.5" />
      <line x1="6" y1="23" x2="18" y2="23" stroke="#33ff33" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function PaintIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Canvas */}
      <rect x="4" y="4" width="24" height="24" fill="#ffffff" stroke="#000" strokeWidth="1" />
      {/* Color palette */}
      <rect x="6" y="22" width="4" height="4" fill="#ff0000" />
      <rect x="10" y="22" width="4" height="4" fill="#0000ff" />
      <rect x="14" y="22" width="4" height="4" fill="#00ff00" />
      <rect x="18" y="22" width="4" height="4" fill="#ffff00" />
      <rect x="22" y="22" width="4" height="4" fill="#ff00ff" />
      {/* Paint strokes */}
      <path d="M10 8 Q14 12 18 8 Q22 4 24 10" stroke="#ff0000" strokeWidth="2" fill="none" />
      <path d="M8 14 Q12 18 20 14" stroke="#0000ff" strokeWidth="2" fill="none" />
      {/* Brush */}
      <rect x="22" y="6" width="2" height="10" fill="#8b4513" transform="rotate(-30 23 11)" />
    </svg>
  )
}

export function CalculatorIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Body */}
      <rect x="6" y="2" width="20" height="28" rx="1" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      {/* Display */}
      <rect x="8" y="4" width="16" height="6" fill="#9ead86" stroke="#808080" strokeWidth="0.5" />
      <text x="20" y="9" fill="#000" fontSize="5" fontFamily="monospace" textAnchor="end">0.</text>
      {/* Buttons */}
      <rect x="8" y="12" width="4" height="3" fill="#ff0000" stroke="#000" strokeWidth="0.3" />
      <rect x="13" y="12" width="4" height="3" fill="#808080" stroke="#000" strokeWidth="0.3" />
      <rect x="18" y="12" width="6" height="3" fill="#808080" stroke="#000" strokeWidth="0.3" />
      <rect x="8" y="16" width="4" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="13" y="16" width="4" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="18" y="16" width="4" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="8" y="20" width="4" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="13" y="20" width="4" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="18" y="20" width="4" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="8" y="24" width="9" height="3" fill="#d0d0d0" stroke="#000" strokeWidth="0.3" />
      <rect x="18" y="20" width="4" height="7" fill="#0000c0" stroke="#000" strokeWidth="0.3" />
    </svg>
  )
}

export function FileTextIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Page */}
      <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000" strokeWidth="1" />
      {/* Fold */}
      <path d="M20 2 L26 8 L20 8 Z" fill="#c0c0c0" stroke="#808080" strokeWidth="0.5" />
      {/* Lines */}
      <line x1="9" y1="10" x2="22" y2="10" stroke="#000080" strokeWidth="1" />
      <line x1="9" y1="13" x2="20" y2="13" stroke="#000" strokeWidth="0.5" />
      <line x1="9" y1="16" x2="22" y2="16" stroke="#000" strokeWidth="0.5" />
      <line x1="9" y1="19" x2="18" y2="19" stroke="#000" strokeWidth="0.5" />
      <line x1="9" y1="22" x2="21" y2="22" stroke="#000" strokeWidth="0.5" />
      <line x1="9" y1="25" x2="16" y2="25" stroke="#000" strokeWidth="0.5" />
    </svg>
  )
}

export function NetworkIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Central computer */}
      <rect x="11" y="8" width="10" height="8" fill="#c0c0c0" stroke="#000" strokeWidth="0.7" />
      <rect x="12" y="9" width="8" height="5" fill="#000080" />
      <rect x="14" y="16" width="4" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      {/* Left computer */}
      <rect x="1" y="20" width="8" height="6" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      <rect x="2" y="21" width="6" height="3" fill="#000080" />
      {/* Right computer */}
      <rect x="23" y="20" width="8" height="6" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      <rect x="24" y="21" width="6" height="3" fill="#000080" />
      {/* Wires */}
      <line x1="16" y1="18" x2="16" y2="20" stroke="#000" strokeWidth="1" />
      <line x1="5" y1="20" x2="16" y2="20" stroke="#000" strokeWidth="1" />
      <line x1="16" y1="20" x2="27" y2="20" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

export function InboxIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Envelope */}
      <rect x="4" y="8" width="24" height="16" fill="#ffffcc" stroke="#000" strokeWidth="1" />
      {/* Flap */}
      <path d="M4 8 L16 18 L28 8" stroke="#000" strokeWidth="1" fill="#e8d888" />
      {/* Shadow lines */}
      <path d="M4 24 L14 16" stroke="#808080" strokeWidth="0.5" />
      <path d="M28 24 L18 16" stroke="#808080" strokeWidth="0.5" />
      {/* Letter peek */}
      <rect x="10" y="5" width="12" height="6" fill="#ffffff" stroke="#808080" strokeWidth="0.5" />
      <line x1="12" y1="7" x2="20" y2="7" stroke="#000080" strokeWidth="0.5" />
      <line x1="12" y1="9" x2="18" y2="9" stroke="#808080" strokeWidth="0.5" />
    </svg>
  )
}

export function BriefcaseIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Case body */}
      <rect x="3" y="10" width="26" height="18" rx="1" fill="#808040" stroke="#000" strokeWidth="1" />
      {/* Handle */}
      <rect x="11" y="6" width="10" height="5" rx="1" fill="none" stroke="#000" strokeWidth="1.5" />
      {/* Clasp */}
      <rect x="14" y="18" width="4" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      {/* Strap */}
      <line x1="3" y1="16" x2="29" y2="16" stroke="#404020" strokeWidth="1.5" />
    </svg>
  )
}

export function WindowsLogoIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <rect x="1" y="1" width="6" height="6" fill="#ff0000" />
      <rect x="9" y="1" width="6" height="6" fill="#00ff00" />
      <rect x="1" y="9" width="6" height="6" fill="#0000ff" />
      <rect x="9" y="9" width="6" height="6" fill="#ffff00" />
    </svg>
  )
}

export function StartMenuProgramsIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <rect x="1" y="2" width="14" height="12" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      <rect x="1" y="2" width="14" height="3" fill="#000080" />
      <rect x="3" y="7" width="4" height="3" fill="#008080" />
      <rect x="9" y="7" width="4" height="3" fill="#e8b230" />
    </svg>
  )
}

export function StartMenuDocumentsIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <rect x="2" y="1" width="10" height="14" fill="#ffffff" stroke="#000" strokeWidth="0.5" />
      <path d="M9 1 L12 4 L9 4 Z" fill="#c0c0c0" stroke="#808080" strokeWidth="0.3" />
      <line x1="4" y1="6" x2="10" y2="6" stroke="#000080" strokeWidth="0.5" />
      <line x1="4" y1="8" x2="9" y2="8" stroke="#808080" strokeWidth="0.5" />
      <line x1="4" y1="10" x2="10" y2="10" stroke="#808080" strokeWidth="0.5" />
      {/* Second document behind */}
      <rect x="5" y="3" width="10" height="12" fill="#ffffdd" stroke="#000" strokeWidth="0.3" />
    </svg>
  )
}

export function StartMenuSettingsIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <circle cx="8" cy="8" r="6" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      <circle cx="8" cy="8" r="2.5" fill="#808080" stroke="#000" strokeWidth="0.5" />
      {/* Gear teeth */}
      <rect x="7" y="1" width="2" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.3" />
      <rect x="7" y="12" width="2" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="0.3" />
      <rect x="1" y="7" width="3" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.3" />
      <rect x="12" y="7" width="3" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.3" />
    </svg>
  )
}

export function StartMenuFindIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <circle cx="7" cy="7" r="4" fill="#ffffff" stroke="#000" strokeWidth="1" />
      <line x1="10" y1="10" x2="14" y2="14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2" fill="none" stroke="#808080" strokeWidth="0.5" />
    </svg>
  )
}

export function StartMenuHelpIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <rect x="2" y="1" width="12" height="14" fill="#ffffcc" stroke="#000" strokeWidth="0.5" />
      <text x="8" y="11" fill="#800080" fontSize="10" fontFamily="serif" textAnchor="middle" fontWeight="bold">?</text>
    </svg>
  )
}

export function StartMenuRunIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <rect x="1" y="4" width="14" height="9" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      <rect x="1" y="4" width="14" height="3" fill="#000080" />
      <rect x="3" y="9" width="10" height="2" fill="#ffffff" stroke="#808080" strokeWidth="0.3" />
    </svg>
  )
}

export function MinesweeperIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Grid background */}
      <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      {/* Grid lines */}
      <line x1="12" y1="4" x2="12" y2="28" stroke="#808080" strokeWidth="0.5" />
      <line x1="20" y1="4" x2="20" y2="28" stroke="#808080" strokeWidth="0.5" />
      <line x1="4" y1="12" x2="28" y2="12" stroke="#808080" strokeWidth="0.5" />
      <line x1="4" y1="20" x2="28" y2="20" stroke="#808080" strokeWidth="0.5" />
      {/* Mine */}
      <circle cx="16" cy="16" r="4" fill="#000000" />
      <line x1="16" y1="10" x2="16" y2="22" stroke="#000" strokeWidth="1.5" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="#000" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="20" y2="20" stroke="#000" strokeWidth="1" />
      <line x1="20" y1="12" x2="12" y2="20" stroke="#000" strokeWidth="1" />
      {/* Flag */}
      <rect x="21" y="5" width="5" height="3" fill="#ff0000" />
      <line x1="21" y1="5" x2="21" y2="11" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

export function ResumeIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Page */}
      <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000" strokeWidth="1" />
      {/* Fold corner */}
      <path d="M20 2 L26 8 L20 8 Z" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      {/* Header line */}
      <rect x="9" y="5" width="8" height="2" fill="#000080" />
      {/* Photo placeholder */}
      <rect x="9" y="9" width="5" height="6" fill="#c0c0c0" stroke="#808080" strokeWidth="0.5" />
      {/* Text lines */}
      <line x1="16" y1="10" x2="22" y2="10" stroke="#000" strokeWidth="0.7" />
      <line x1="16" y1="12" x2="21" y2="12" stroke="#808080" strokeWidth="0.5" />
      <line x1="16" y1="14" x2="22" y2="14" stroke="#808080" strokeWidth="0.5" />
      <line x1="9" y1="18" x2="22" y2="18" stroke="#000" strokeWidth="0.5" />
      <line x1="9" y1="20" x2="20" y2="20" stroke="#808080" strokeWidth="0.5" />
      <line x1="9" y1="22" x2="22" y2="22" stroke="#808080" strokeWidth="0.5" />
      <line x1="9" y1="24" x2="18" y2="24" stroke="#808080" strokeWidth="0.5" />
      <line x1="9" y1="26" x2="21" y2="26" stroke="#808080" strokeWidth="0.5" />
    </svg>
  )
}

export function DisplayPropertiesIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Monitor */}
      <rect x="4" y="2" width="24" height="18" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="6" y="4" width="20" height="14" fill="#008080" stroke="#808080" strokeWidth="1" />
      {/* Wallpaper colors */}
      <rect x="7" y="5" width="6" height="6" fill="#000080" />
      <rect x="13" y="5" width="6" height="6" fill="#800020" />
      <rect x="19" y="5" width="6" height="6" fill="#254117" />
      <rect x="7" y="11" width="6" height="6" fill="#708090" />
      <rect x="13" y="11" width="12" height="6" fill="#008080" />
      {/* Stand */}
      <rect x="12" y="20" width="8" height="2" fill="#c0c0c0" stroke="#808080" strokeWidth="0.5" />
      <rect x="10" y="22" width="12" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
      {/* Paintbrush */}
      <rect x="22" y="22" width="2" height="6" fill="#8b4513" transform="rotate(-20 23 25)" />
      <rect x="21" y="20" width="4" height="3" fill="#ff0000" transform="rotate(-20 23 21)" />
    </svg>
  )
}

export function PicturesIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      {/* Frame */}
      <rect x="4" y="4" width="24" height="24" fill="#ffffff" stroke="#000" strokeWidth="1" />
      <rect x="6" y="6" width="20" height="20" fill="#87CEEB" />
      {/* Mountain */}
      <polygon points="6,26 14,14 22,26" fill="#228B22" />
      <polygon points="16,26 22,16 28,26" fill="#2E8B57" />
      {/* Sun */}
      <circle cx="22" cy="10" r="3" fill="#FFD700" />
      {/* Bottom strip */}
      <rect x="6" y="22" width="20" height="4" fill="#228B22" />
    </svg>
  )
}

export function ShutDownIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <circle cx="8" cy="9" r="5" fill="none" stroke="#000" strokeWidth="1.5" />
      <line x1="8" y1="3" x2="8" y2="9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
