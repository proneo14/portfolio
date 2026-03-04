'use client'

import { useState, useCallback } from 'react'

interface DisplayPropertiesProps {
  crtEnabled: boolean
  onToggleCrt: () => void
  wallpaper: string
  onChangeWallpaper: (wp: string) => void
}

const wallpapers = [
  { id: 'teal', name: '(Default Teal)', color: '#008080' },
  { id: 'forest', name: 'Forest Green', color: '#254117' },
  { id: 'midnight', name: 'Midnight Blue', color: '#191970' },
  { id: 'burgundy', name: 'Burgundy', color: '#800020' },
  { id: 'slate', name: 'Slate Gray', color: '#708090' },
  { id: 'black', name: 'Black', color: '#0c0c0c' },
  { id: 'tiled', name: 'Tiled Pattern', color: 'pattern' },
]

export function DisplayPropertiesContent({ crtEnabled, onToggleCrt, wallpaper, onChangeWallpaper }: DisplayPropertiesProps) {
  const [activeTab, setActiveTab] = useState<'background' | 'screensaver' | 'appearance'>('background')
  const [selectedWp, setSelectedWp] = useState(wallpaper)
  const [localCrt, setLocalCrt] = useState(crtEnabled)

  const handleApply = useCallback(() => {
    onChangeWallpaper(selectedWp)
    if (localCrt !== crtEnabled) onToggleCrt()
  }, [selectedWp, localCrt, crtEnabled, onChangeWallpaper, onToggleCrt])

  const tabs = [
    { id: 'background' as const, label: 'Background' },
    { id: 'screensaver' as const, label: 'Screen Saver' },
    { id: 'appearance' as const, label: 'Appearance' },
  ]

  return (
    <div className="h-full flex flex-col bg-[var(--win-bg)]">
      {/* Tabs */}
      <div className="flex px-2 pt-2 gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 py-1 text-[12px] font-sans text-[#000000] border border-b-0 ${
              activeTab === tab.id
                ? 'bg-[var(--win-bg)] border-[var(--win-shadow)] -mb-[1px] z-10'
                : 'bg-[#b0b0b0] border-[var(--win-shadow)]'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 mx-2 mb-2 p-3 border border-[var(--win-shadow)] bg-[var(--win-bg)] overflow-auto">
        {activeTab === 'background' && (
          <div className="flex flex-col gap-3">
            {/* Preview */}
            <div className="flex justify-center">
              <div className="win-border-sunken w-[180px] h-[120px] relative overflow-hidden"
                style={{
                  backgroundColor: wallpapers.find(w => w.id === selectedWp)?.color === 'pattern'
                    ? '#008080'
                    : wallpapers.find(w => w.id === selectedWp)?.color || '#008080',
                  backgroundImage: wallpapers.find(w => w.id === selectedWp)?.color === 'pattern'
                    ? 'repeating-conic-gradient(#008080 0% 25%, #006060 0% 50%) 0 0/20px 20px'
                    : 'none',
                }}
              >
                {/* Mini taskbar */}
                <div className="absolute bottom-0 left-0 right-0 h-[8px] bg-[var(--win-bg)]" />
                {/* Mini window */}
                <div className="absolute top-[15px] left-[30px] w-[80px] h-[50px] bg-[var(--win-bg)] border border-[#000000]">
                  <div className="h-[6px] bg-[#000080]" />
                </div>
              </div>
            </div>

            {/* Wallpaper list */}
            <div>
              <div className="text-[12px] font-sans text-[#000000] mb-1">Wallpaper:</div>
              <div className="win-border-field bg-[#ffffff] h-[100px] overflow-auto p-1">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    className={`w-full text-left px-2 py-[2px] text-[12px] font-sans flex items-center gap-2 ${
                      selectedWp === wp.id ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)]' : 'text-[#000000] hover:bg-[#e0e0e0]'
                    }`}
                    onClick={() => setSelectedWp(wp.id)}
                  >
                    <div
                      className="w-[12px] h-[12px] border border-[#000000] shrink-0"
                      style={{
                        backgroundColor: wp.color === 'pattern' ? '#008080' : wp.color,
                        backgroundImage: wp.color === 'pattern' ? 'repeating-conic-gradient(#008080 0% 25%, #006060 0% 50%) 0 0/4px 4px' : 'none'
                      }}
                    />
                    {wp.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'screensaver' && (
          <div className="flex flex-col gap-3">
            <div className="text-[12px] font-sans text-[#000000] mb-2">Screen Saver:</div>
            <div className="win-border-field bg-[#ffffff] px-2 h-[20px] flex items-center">
              <span className="text-[12px] font-sans text-[#808080]">(None)</span>
            </div>
            <div className="text-[11px] font-sans text-[#808080] mt-2">
              Screen savers are so 1995. Your monitor is an LCD now.
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="flex flex-col gap-3">
            {/* CRT toggle */}
            <div className="flex items-center gap-2">
              <button
                className={`w-[14px] h-[14px] win-border-field bg-[#ffffff] flex items-center justify-center text-[10px] font-bold text-[#000000]`}
                onClick={() => setLocalCrt(!localCrt)}
              >
                {localCrt ? 'X' : ''}
              </button>
              <span className="text-[12px] font-sans text-[#000000]">Enable CRT Scanline Effect</span>
            </div>
            <div className="text-[11px] font-sans text-[#808080] ml-5">
              Adds horizontal scanlines over the entire desktop for authentic retro feel.
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-end gap-2 px-3 pb-2">
        <button className="win-button text-[12px] px-4" onClick={handleApply}>OK</button>
        <button className="win-button text-[12px] px-4" onClick={handleApply}>Apply</button>
        <button className="win-button text-[12px] px-4">Cancel</button>
      </div>
    </div>
  )
}
