'use client'

export function ResumeContent() {
  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Toolbar with download button */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <div className="flex-1" />
        <button className="win-button text-[11px] h-[20px] px-3 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="2" y="1" width="8" height="10" fill="#c0c0c0" stroke="#000" strokeWidth="0.5" />
            <rect x="3" y="2" width="6" height="4" fill="#808080" />
            <rect x="4" y="8" width="4" height="2" fill="#808080" />
          </svg>
          Save to Floppy
        </button>
      </div>

      {/* Resume content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-[540px] mx-auto bg-[#ffffff] border border-[#c0c0c0] p-6 shadow-[2px_2px_0_#808080]">
          {/* Header */}
          <div className="text-center mb-4 pb-3 border-b-2 border-b-[#000000]">
            <div className="text-[22px] font-sans text-[#000000] font-bold tracking-wider">PORTFOLIO ADMIN</div>
            <div className="text-[13px] font-sans text-[#808080] mt-1">
              Mechanical Engineering Student & Full-Stack Developer
            </div>
            <div className="text-[12px] font-sans text-[#808080] mt-1">
              Ottawa, ON | hello@portfolio.dev | github.com/admin
            </div>
          </div>

          {/* Summary */}
          <div className="mb-3">
            <div className="text-[14px] font-sans text-[#000080] font-bold mb-1 border-b border-b-[#000080]">SUMMARY</div>
            <div className="text-[12px] font-sans text-[#000000] leading-relaxed mt-1">
              Mechanical engineering student at the University of Ottawa with deep expertise in
              full-stack web development, embedded systems, and AI/ML. Passionate about bridging
              the physical and digital worlds through robotics, computer vision, and creative
              engineering solutions.
            </div>
          </div>

          {/* Education */}
          <div className="mb-3">
            <div className="text-[14px] font-sans text-[#000080] font-bold mb-1 border-b border-b-[#000080]">EDUCATION</div>
            <div className="mt-1">
              <div className="flex justify-between">
                <span className="text-[12px] font-sans text-[#000000] font-bold">University of Ottawa</span>
                <span className="text-[11px] font-sans text-[#808080]">Expected 2026</span>
              </div>
              <div className="text-[12px] font-sans text-[#000000]">B.Eng in Mechanical Engineering</div>
              <div className="text-[11px] font-sans text-[#808080]">Focus: Rigid Body Dynamics, Materials Science, Kinematics</div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-3">
            <div className="text-[14px] font-sans text-[#000080] font-bold mb-1 border-b border-b-[#000080]">TECHNICAL SKILLS</div>
            <div className="mt-1 text-[12px] font-sans text-[#000000] leading-relaxed">
              <div><span className="font-bold">Languages:</span> JavaScript/TypeScript, Python, Go, C/C++, Rust</div>
              <div><span className="font-bold">Frontend:</span> React, Next.js, Tailwind CSS, Three.js</div>
              <div><span className="font-bold">Backend:</span> Node.js, FastAPI, Go net/http, Express</div>
              <div><span className="font-bold">AI/ML:</span> OpenCV, YOLO, LLM Quantization (GGUF), ONNX Runtime</div>
              <div><span className="font-bold">Hardware:</span> Arduino, Raspberry Pi, ESP32, SolidWorks</div>
              <div><span className="font-bold">DevOps:</span> Docker, Linux, Nginx, Windows Server 2025</div>
              <div><span className="font-bold">3D Printing:</span> Bambu Lab A1, FDM/SLA, CAD Design</div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-3">
            <div className="text-[14px] font-sans text-[#000080] font-bold mb-1 border-b border-b-[#000080]">PROJECTS</div>
            <div className="mt-1 space-y-2">
              <div>
                <div className="text-[12px] font-sans text-[#000000] font-bold">GoFish - Multiplayer Card Game</div>
                <div className="text-[11px] font-sans text-[#000000]">
                  Real-time multiplayer card game with Go backend, WebSocket communication,
                  and React frontend. Built collaboratively for uOttaHack 8.
                </div>
              </div>
              <div>
                <div className="text-[12px] font-sans text-[#000000] font-bold">6-DOF Robotic Arm</div>
                <div className="text-[11px] font-sans text-[#000000]">
                  Custom-built robotic arm with Jacobian-based inverse kinematics solver,
                  3D printed PLA+ components, and Arduino Mega control system.
                </div>
              </div>
              <div>
                <div className="text-[12px] font-sans text-[#000000] font-bold">Bambu Lab CV Monitor</div>
                <div className="text-[11px] font-sans text-[#000000]">
                  Real-time 3D print monitoring system using OpenCV and YOLO for
                  defect detection. Automated alerts for print failures.
                </div>
              </div>
              <div>
                <div className="text-[12px] font-sans text-[#000000] font-bold">Office DAM Integration</div>
                <div className="text-[11px] font-sans text-[#000000]">
                  Enterprise digital asset management system integrated with SharePoint
                  and OneDrive APIs. Webhook-based delta sync architecture.
                </div>
              </div>
            </div>
          </div>

          {/* Hardware */}
          <div className="mb-2">
            <div className="text-[14px] font-sans text-[#000080] font-bold mb-1 border-b border-b-[#000080]">HARDWARE & SYSTEMS</div>
            <div className="mt-1 text-[12px] font-sans text-[#000000] leading-relaxed">
              <div><span className="font-bold">Workstation:</span> AMD Ryzen AI Max+ 395, 64GB DDR5, 4TB NVMe</div>
              <div><span className="font-bold">GPU Cluster:</span> 2x AMD Radeon RX 9070 XT</div>
              <div><span className="font-bold">Server:</span> Windows Server 2025, Active Directory, Docker host</div>
              <div><span className="font-bold">NPU:</span> AMD XDNA 2 (Phoenix) for local LLM inference</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">Resume.pdf - Page 1 of 1</span>
      </div>
    </div>
  )
}
