'use client'

export function AboutContent() {
  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Notepad menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Search</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Text content */}
      <div className="flex-1 overflow-auto p-3 font-mono text-[14px] text-[#000000] leading-relaxed whitespace-pre-wrap">
{`===================================
        ABOUT ME
===================================

Name:       Portfolio Admin
Title:      Full-Stack Developer & Maker
Location:   United States

-----------------------------------
        SUMMARY
-----------------------------------

Passionate developer with a love for
building things that work -- both in
code and in the physical world.

I specialize in full-stack web dev,
embedded systems, and creative
problem solving.

-----------------------------------
        SKILLS
-----------------------------------

Languages:  JavaScript/TypeScript,
            Python, Go, C/C++
Frontend:   React, Next.js, Tailwind
Backend:    Node.js, FastAPI, Go
Hardware:   Arduino, Raspberry Pi,
            3D Printing (Bambu Lab)
Tools:      Git, Docker, Linux

-----------------------------------
        CONTACT
-----------------------------------

GitHub:     github.com/admin
Email:      hello@portfolio.dev

===================================
  "rm -rf / just kidding... unless?"
===================================`}
      </div>
    </div>
  )
}
