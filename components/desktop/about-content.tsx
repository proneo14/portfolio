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

Name:       Neo Prohnitchi
Title:      Mechanical Engineering
            Student & Full-Stack Dev
Location:   Ottawa, ON

-----------------------------------
        SUMMARY
-----------------------------------

Mech-E student at uOttawa with a
passion for bridging the physical
and digital worlds.

I build full-stack apps, tinker with
embedded systems, run a home lab,
and 3D-print everything in between.

-----------------------------------
        SKILLS
-----------------------------------

Languages:  JavaScript/TypeScript,
            Python, Go, C/C++, Rust
Frontend:   React, Next.js, Tailwind
Backend:    Node.js, FastAPI, Go
AI/ML:      OpenCV, YOLO, ONNX, LLMs
Hardware:   Arduino, RPi, ESP32,
            Bambu Lab A1 (3D Print)
DevOps:     Docker, Linux, Nginx,
            Windows Server 2025

-----------------------------------
        CONTACT
-----------------------------------

GitHub:     github.com/proneo14
Email:      neoprohnitchi@gmail.com

===================================
  "rm -rf / just kidding... unless?"
===================================`}
      </div>
    </div>
  )
}
