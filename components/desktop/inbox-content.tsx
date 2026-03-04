'use client'

import { useState } from 'react'

const emails = [
  {
    from: 'admin@microsoft.com',
    subject: 'Welcome to Windows 95!',
    date: '01/01/95',
    read: true,
    body: 'Congratulations on your new Windows 95 installation!\n\nEnjoy exploring the desktop and all the new features we\'ve built for you. Remember to check out the Start menu for quick access to all your programs.\n\nBest regards,\nThe Windows Team',
  },
  {
    from: 'bill@microsoft.com',
    subject: 'Start Me Up',
    date: '08/24/95',
    read: true,
    body: 'Have you heard the new Rolling Stones track we licensed for the launch? Pretty cool, right?\n\nWindows 95 - Where do you want to go today?',
  },
  {
    from: 'webmaster@geocities.com',
    subject: 'Your GeoCities page is ready',
    date: '03/15/96',
    read: false,
    body: 'Your new homepage at geocities.com/SiliconValley/Park/1234 is now live!\n\nDon\'t forget to add a visitor counter and an "under construction" GIF.',
  },
  {
    from: 'noreply@aol.com',
    subject: 'You\'ve Got Mail!',
    date: '06/01/96',
    read: false,
    body: 'Welcome to AOL! You have 500 free hours of internet access.\n\nJust dial in using your 28.8k modem and you\'ll be surfing the information superhighway in no time!',
  },
]

export function InboxContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [composing, setComposing] = useState(false)
  const [composeData, setComposeData] = useState({ name: '', email: '', subject: '', body: '' })
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (composeData.name && composeData.email && composeData.body) {
      setSent(true)
      setTimeout(() => {
        setComposing(false)
        setSent(false)
        setComposeData({ name: '', email: '', subject: '', body: '' })
      }, 2000)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Message</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <button
          className="win-button text-[11px] h-[20px] px-3"
          onClick={() => { setComposing(true); setSelected(null) }}
        >
          New Message
        </button>
        <button className="win-button text-[11px] h-[20px] px-3" disabled>Reply</button>
        <button className="win-button text-[11px] h-[20px] px-3" disabled>Forward</button>
        <div className="flex-1" />
        {composing && (
          <button
            className="win-button text-[11px] h-[20px] px-3"
            onClick={() => setComposing(false)}
          >
            Back to Inbox
          </button>
        )}
      </div>

      {composing ? (
        /* Compose view */
        <div className="flex-1 flex flex-col p-2 gap-1">
          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <div className="text-[18px] font-sans text-[#008000] font-bold">Message Sent!</div>
              <div className="text-[13px] font-sans text-[#808080]">
                {'Thanks for reaching out. I\'ll get back to you soon!'}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-sans text-[#000000] w-[60px] shrink-0">To:</span>
                <div className="flex-1 win-border-field bg-[#e0e0e0] px-2 h-[20px] flex items-center">
                  <span className="text-[12px] font-sans text-[#808080]">Portfolio Admin</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-sans text-[#000000] w-[60px] shrink-0">Your Name:</span>
                <div className="flex-1 win-border-field bg-[#ffffff] h-[20px] flex items-center">
                  <input
                    value={composeData.name}
                    onChange={(e) => setComposeData({ ...composeData, name: e.target.value })}
                    className="w-full px-2 text-[12px] font-sans text-[#000000] bg-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-sans text-[#000000] w-[60px] shrink-0">Your Email:</span>
                <div className="flex-1 win-border-field bg-[#ffffff] h-[20px] flex items-center">
                  <input
                    value={composeData.email}
                    onChange={(e) => setComposeData({ ...composeData, email: e.target.value })}
                    className="w-full px-2 text-[12px] font-sans text-[#000000] bg-transparent outline-none"
                    placeholder="you@company.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-sans text-[#000000] w-[60px] shrink-0">Subject:</span>
                <div className="flex-1 win-border-field bg-[#ffffff] h-[20px] flex items-center">
                  <input
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="w-full px-2 text-[12px] font-sans text-[#000000] bg-transparent outline-none"
                    placeholder="Let's connect!"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1 mt-1">
                <div className="flex-1 win-border-field bg-[#ffffff]">
                  <textarea
                    value={composeData.body}
                    onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                    className="w-full h-full p-2 text-[13px] font-sans text-[#000000] bg-transparent outline-none resize-none"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button className="win-button text-[12px] px-4" onClick={handleSend}>
                  Send
                </button>
                <button className="win-button text-[12px] px-4" onClick={() => setComposing(false)}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Email list */}
          <div className={`${selected !== null ? 'h-[120px]' : 'flex-1'} overflow-auto`}>
            <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)] text-[11px] font-sans text-[#000000]">
              <span className="w-[24px]" />
              <span className="w-[160px]">From</span>
              <span className="flex-1">Subject</span>
              <span className="w-[80px]">Date</span>
            </div>
            {emails.map((email, i) => (
              <button
                key={i}
                className={`flex items-center px-2 py-[3px] w-full text-left text-[12px] font-sans ${
                  selected === i ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)]' : 'text-[#000000] hover:bg-[#e0e0e0]'
                } ${!email.read ? 'font-bold' : ''}`}
                onClick={() => setSelected(i)}
              >
                <span className="w-[24px] text-center">{email.read ? '' : '*'}</span>
                <span className="w-[160px] truncate">{email.from}</span>
                <span className="flex-1 truncate">{email.subject}</span>
                <span className="w-[80px]">{email.date}</span>
              </button>
            ))}
          </div>

          {/* Preview pane */}
          {selected !== null && (
            <>
              <div className="h-[2px] bg-[var(--win-shadow)]" />
              <div className="flex-1 overflow-auto p-3">
                <div className="text-[13px] font-sans text-[#000080] font-bold mb-1">{emails[selected].subject}</div>
                <div className="text-[11px] font-sans text-[#808080] mb-2">From: {emails[selected].from} | Date: {emails[selected].date}</div>
                <div className="text-[13px] font-sans text-[#000000] leading-relaxed whitespace-pre-wrap">{emails[selected].body}</div>
              </div>
            </>
          )}
        </>
      )}

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">
          {composing ? 'Composing new message...' : `${emails.length} message(s), ${emails.filter(e => !e.read).length} unread`}
        </span>
      </div>
    </div>
  )
}
