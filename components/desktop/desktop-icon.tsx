'use client'

import type { WindowAction } from '@/lib/desktop-store'
import { playWindowOpen } from '@/lib/sounds'
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
  BriefcaseIcon,
  FileTextIcon,
  MinesweeperIcon,
  ResumeIcon,
  DisplayPropertiesIcon,
  PicturesIcon,
} from './win-icons'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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
  briefcase: BriefcaseIcon,
  'file-text': FileTextIcon,
  minesweeper: MinesweeperIcon,
  resume: ResumeIcon,
  displayprops: DisplayPropertiesIcon,
  pictures: PicturesIcon,
}

interface DesktopIconProps {
  id: string
  label: string
  icon: string
  dispatch: React.Dispatch<WindowAction>
}

export function DesktopIcon({ id, label, icon, dispatch }: DesktopIconProps) {
  const IconComponent = iconMap[icon] || FileTextIcon

  return (
    <button
      className="desktop-icon flex flex-col items-center gap-1 w-[75px] p-1 focus:outline-none group"
      onDoubleClick={() => { playWindowOpen(); dispatch({ type: 'OPEN_WINDOW', id }) }}
      aria-label={`Open ${label}`}
    >
      <div className="w-[40px] h-[40px] flex items-center justify-center pixel-icon">
        <IconComponent size={40} />
      </div>
      <span className="icon-label text-[12px] text-[#ffffff] text-center leading-tight px-[2px] font-sans drop-shadow-[1px_1px_0_rgba(0,0,0,0.9)]">
        {label}
      </span>
    </button>
  )
}
