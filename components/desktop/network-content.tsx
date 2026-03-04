'use client'

import { NetworkIcon } from './win-icons'

export function NetworkContent() {
  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <NetworkIcon size={48} />
        <span className="text-[14px] font-sans text-[#000000]">No computers found on the network.</span>
        <span className="text-[12px] font-sans text-[#808080]">{'(Check your TCP/IP settings)'}</span>
      </div>
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">0 object(s)</span>
      </div>
    </div>
  )
}
