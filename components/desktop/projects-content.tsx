'use client'

import { AppWindow, Folder, FolderCog, Cog } from 'lucide-react'
import { useState } from 'react'

interface ProjectItem {
  name: string
  icon: 'app' | 'folder' | 'exe'
  description: string
}

const projects: ProjectItem[] = [
  {
    name: 'GoFish',
    icon: 'app',
    description: 'A fun card game application built with Go and WebSockets.',
  },
  {
    name: 'Robotic_Arm_Build',
    icon: 'folder',
    description: 'Custom 6-DOF robotic arm with inverse kinematics and servo control.',
  },
  {
    name: 'Bambu_Computer_Vision',
    icon: 'folder',
    description: 'Computer vision pipeline for monitoring 3D prints using OpenCV.',
  },
  {
    name: 'Office_DAM_Integration',
    icon: 'exe',
    description: 'Digital Asset Management integration for enterprise office workflows.',
  },
]

const iconMap: Record<string, React.ElementType> = {
  app: AppWindow,
  folder: Folder,
  exe: Cog,
}

const iconColorMap: Record<string, string> = {
  app: 'text-[#0078d4]',
  folder: 'text-[#e8b230]',
  exe: 'text-[#808080]',
}

export function ProjectsContent() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000] shrink-0">Address:</span>
        <div className="flex-1 win-border-field bg-[#ffffff] px-2 h-[20px] flex items-center">
          <span className="text-[12px] font-sans text-[#000000]">
            <FolderCog size={12} className="inline mr-1 text-[#e8b230]" />
            {'C:\\Users\\Admin\\Projects'}
          </span>
        </div>
      </div>

      {/* File grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-4 gap-4">
          {projects.map((project) => {
            const Icon = iconMap[project.icon]
            return (
              <button
                key={project.name}
                className={`flex flex-col items-center gap-1 p-3 cursor-pointer group focus:outline-none ${
                  selected === project.name
                    ? 'bg-[var(--win-titlebar)] bg-opacity-20'
                    : ''
                }`}
                onClick={() => setSelected(project.name)}
                title={project.description}
              >
                <Icon
                  size={40}
                  strokeWidth={1.5}
                  className={`${iconColorMap[project.icon]} group-hover:scale-110 transition-transform`}
                />
                <span
                  className={`text-[12px] font-sans text-center leading-tight ${
                    selected === project.name
                      ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)] px-1'
                      : 'text-[#000000]'
                  }`}
                >
                  {project.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">
          {selected
            ? projects.find((p) => p.name === selected)?.description
            : `${projects.length} object(s)`}
        </span>
      </div>
    </div>
  )
}
