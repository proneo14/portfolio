'use client'

import { useState } from 'react'

type Page = 'home' | 'links' | 'github' | 'linkedin'

export function IEContent() {
  const [url, setUrl] = useState('http://www.portfolio-links.com/')
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [historyStack, setHistoryStack] = useState<Page[]>([])

  const navigate = (page: Page, newUrl: string) => {
    setHistoryStack((h) => [...h, currentPage])
    setCurrentPage(page)
    setUrl(newUrl)
  }

  const goBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1]
      setHistoryStack((h) => h.slice(0, -1))
      setCurrentPage(prev)
      setUrl('http://www.portfolio-links.com/')
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Favorites</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <button
          className="win-button text-[11px] h-[20px] px-2"
          onClick={goBack}
          disabled={historyStack.length === 0}
        >
          Back
        </button>
        <button className="win-button text-[11px] h-[20px] px-2" disabled>Forward</button>
        <button className="win-button text-[11px] h-[20px] px-2">Stop</button>
        <button
          className="win-button text-[11px] h-[20px] px-2"
          onClick={() => { setCurrentPage('home'); setUrl('http://www.portfolio-links.com/'); setHistoryStack([]) }}
        >
          Home
        </button>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000] shrink-0">Address:</span>
        <div className="flex-1 win-border-field bg-[#ffffff] px-2 h-[20px] flex items-center">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setCurrentPage('home')
            }}
            className="w-full text-[12px] font-sans text-[#000000] bg-transparent outline-none"
          />
        </div>
        <button className="win-button text-[11px] h-[20px] px-3">Go</button>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto p-4 bg-[#ffffff]">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'github' && <GitHubPage />}
        {currentPage === 'linkedin' && <LinkedInPage />}
      </div>

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">Done</span>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-sans text-[#808080]">Internet zone</span>
        </div>
      </div>
    </div>
  )
}

function HomePage({ onNavigate }: { onNavigate: (page: Page, url: string) => void }) {
  return (
    <div>
      {/* Yahoo-style header */}
      <div className="text-center mb-3 pb-3 border-b-2 border-b-[#808080]">
        <div className="text-[28px] font-sans text-[#ff0000] font-bold tracking-wider">
          {'Portfolio Links!'}
        </div>
        <div className="text-[12px] font-sans text-[#808080] mt-1">
          Your guide to the World Wide Web - est. 1995
        </div>
      </div>

      {/* Animated under construction */}
      <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-[#ffff00] border border-[#000000]">
        <span className="text-[14px] font-sans text-[#ff0000] font-bold animate-pulse">
          {'*** UNDER CONSTRUCTION ***'}
        </span>
      </div>

      {/* Hit counter */}
      <div className="text-center mb-4">
        <span className="text-[11px] font-sans text-[#808080]">
          You are visitor #
        </span>
        <span className="text-[11px] font-mono bg-[#000000] text-[#00ff00] px-2 py-[1px]">
          004,271
        </span>
        <span className="text-[11px] font-sans text-[#808080]"> since 01/01/1995</span>
      </div>

      {/* Directory - styled like Yahoo circa 1996 */}
      <div className="space-y-4">
        <div>
          <div className="text-[16px] font-sans text-[#000080] font-bold mb-2 border-b border-b-[#c0c0c0] pb-1">
            Code Repositories
          </div>
          <div className="flex flex-col gap-1 ml-4">
            <button
              className="text-[14px] font-sans text-[#0000ff] underline text-left hover:text-[#ff0000] cursor-pointer"
              onClick={() => onNavigate('github', 'https://github.com/admin')}
            >
              {'> GitHub Profile - github.com/admin'}
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-sans text-[#0000ff] underline text-left hover:text-[#ff0000] cursor-pointer"
            >
              {'> GitHub Repository (GoFish Collab)'}
            </a>
            <a
              href="https://devpost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-sans text-[#0000ff] underline text-left hover:text-[#ff0000] cursor-pointer"
            >
              {'> DevPost - uOttaHack 8 Submission'}
            </a>
          </div>
        </div>

        <div>
          <div className="text-[16px] font-sans text-[#000080] font-bold mb-2 border-b border-b-[#c0c0c0] pb-1">
            Professional Network
          </div>
          <div className="flex flex-col gap-1 ml-4">
            <button
              className="text-[14px] font-sans text-[#0000ff] underline text-left hover:text-[#ff0000] cursor-pointer"
              onClick={() => onNavigate('linkedin', 'https://linkedin.com/in/admin')}
            >
              {'> LinkedIn - Connect with me'}
            </button>
          </div>
        </div>

        <div>
          <div className="text-[16px] font-sans text-[#000080] font-bold mb-2 border-b border-b-[#c0c0c0] pb-1">
            Bookmarks
          </div>
          <div className="flex flex-col gap-1 ml-4">
            {[
              { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
              { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
              { name: 'Hacker News', url: 'https://news.ycombinator.com' },
              { name: 'Arduino.cc', url: 'https://arduino.cc' },
              { name: 'AMD Ryzen AI Developer Hub', url: 'https://www.amd.com/en/developer/ryzen-ai.html' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-sans text-[#0000ff] underline hover:text-[#ff0000] cursor-pointer"
              >
                {'> '}{link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Retro badges */}
      <div className="mt-6 flex items-center gap-2 flex-wrap">
        <div className="w-[88px] h-[31px] bg-[#000080] flex items-center justify-center border border-[#000000]">
          <span className="text-[9px] text-[#ffffff] font-sans text-center leading-tight">Best viewed with IE 5.5</span>
        </div>
        <div className="w-[88px] h-[31px] bg-[#008000] flex items-center justify-center border border-[#000000]">
          <span className="text-[9px] text-[#ffffff] font-sans text-center leading-tight">Netscape NOW!</span>
        </div>
        <div className="w-[88px] h-[31px] bg-[#800000] flex items-center justify-center border border-[#000000]">
          <span className="text-[9px] text-[#ffffff] font-sans text-center leading-tight">HTML 3.2</span>
        </div>
        <div className="w-[88px] h-[31px] bg-[#808080] flex items-center justify-center border border-[#000000]">
          <span className="text-[9px] text-[#ffffff] font-sans text-center leading-tight">800x600</span>
        </div>
      </div>

      {/* Guestbook CTA */}
      <div className="mt-4 p-3 bg-[#ffffcc] border border-[#808080]">
        <div className="text-[12px] font-sans text-[#000000]">
          {'Tip: Use the Inbox (Outlook Express) on the desktop to sign my guestbook or send me a message!'}
        </div>
      </div>
    </div>
  )
}

function GitHubPage() {
  return (
    <div>
      <div className="text-[20px] font-sans text-[#000000] font-bold mb-3">GitHub Profile</div>
      <div className="win-border-field bg-[#f6f8fa] p-3 mb-3">
        <div className="text-[14px] font-sans text-[#000000] font-bold">admin</div>
        <div className="text-[12px] font-sans text-[#808080] mt-1">MechE Student & Full-Stack Developer</div>
        <div className="text-[12px] font-sans text-[#808080]">Ottawa, ON</div>
      </div>
      <div className="text-[14px] font-sans text-[#000080] font-bold mb-2">Pinned Repositories</div>
      {[
        { name: 'GoFish', desc: 'Multiplayer card game in Go + React', lang: 'Go', stars: 12 },
        { name: 'robotic-arm-ik', desc: '6-DOF inverse kinematics solver', lang: 'C++', stars: 8 },
        { name: 'bambu-cv-monitor', desc: '3D print monitoring with YOLO', lang: 'Python', stars: 23 },
        { name: 'portfolio-os', desc: 'This website! Win95 retro desktop', lang: 'TypeScript', stars: 42 },
      ].map((repo) => (
        <div key={repo.name} className="win-border-field bg-[#ffffff] p-2 mb-2">
          <div className="text-[13px] font-sans text-[#0000ff] font-bold">{repo.name}</div>
          <div className="text-[11px] font-sans text-[#808080] mt-1">{repo.desc}</div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-sans text-[#000000]">{repo.lang}</span>
            <span className="text-[10px] font-sans text-[#808080]">{'*'} {repo.stars}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function LinkedInPage() {
  return (
    <div>
      <div className="bg-[#006097] p-3 mb-3">
        <div className="text-[20px] font-sans text-[#ffffff] font-bold">LinkedIn</div>
      </div>
      <div className="win-border-field bg-[#ffffff] p-3">
        <div className="text-[16px] font-sans text-[#000000] font-bold">Portfolio Admin</div>
        <div className="text-[13px] font-sans text-[#808080] mt-1">MechE Student at uOttawa | Full-Stack Developer</div>
        <div className="text-[12px] font-sans text-[#808080]">Ottawa, Ontario, Canada</div>
        <hr className="my-3 border-[#c0c0c0]" />
        <div className="text-[13px] font-sans text-[#000000]">
          Passionate about bridging mechanical engineering with software. Currently working on
          robotic arm control systems, 3D print monitoring via computer vision, and building
          full-stack web applications. Open to internship and collaboration opportunities.
        </div>
      </div>
    </div>
  )
}
