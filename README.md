# Neo's Portfolio — Windows 95 Desktop

A retro Windows 95-themed developer portfolio built with **Next.js**, **React**, and **TypeScript**. No component libraries, no CSS frameworks beyond Tailwind — just clean, handcrafted pixel-art UI that runs entirely in the browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Features

- **Authentic Win95 Desktop** — draggable windows, taskbar with Start menu, system tray clock, desktop icons
- **BIOS Boot Sequence** — animated POST screen with HDD seek sounds before the desktop loads
- **Retro Sound Effects** — Web Audio API synthesized clicks, chimes, and startup sounds (no audio files)
- **Fully Playable Minesweeper** — 9×9 grid with flag support and mine counter
- **Projects Explorer** — drill-down file browser with folder navigation and code viewer
- **My Pictures Gallery** — ASCII-art hardware photos with thumbnail grid and full-screen viewer
- **Inbox (Outlook Express)** — contact form with Formspree integration for real email delivery
- **MS-DOS Prompt** — interactive terminal emulator
- **Paint** — basic drawing canvas
- **Calculator** — functional arithmetic calculator
- **Display Properties** — wallpaper color picker and CRT scanline overlay toggle
- **Resume Viewer** — styled PDF-like resume with "Save to Floppy" button
- **Internet Explorer** — embedded browser window
- **About.txt (Notepad)** — personal bio in classic Notepad style

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, custom Win95 CSS variables |
| Audio | Web Audio API (synthesized, zero external files) |
| Icons | Hand-drawn SVG pixel art |
| Window Management | `useReducer` + pointer event drag system |
| Contact Form | Formspree (free tier) |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation

```bash
git clone https://github.com/proneo14/portfolio.git
cd portfolio
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

## Configuration

### Contact Form (Formspree)

The Inbox uses [Formspree](https://formspree.io) to deliver contact form submissions:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. Open `components/desktop/inbox-content.tsx`
4. Replace `YOUR_FORM_ID` in the `FORMSPREE_URL` constant with your actual form ID

### Display Properties

Right-click the desktop or open **Settings** from the Start menu to:
- Change wallpaper color (Teal, Forest, Midnight, Burgundy, Slate, Black, Tiled)
- Toggle CRT scanline overlay effect

## Project Structure

```
portfolio/
├── app/                    # Next.js app router
│   ├── layout.tsx          # Root layout with font loading
│   ├── page.tsx            # Boot screen → Desktop shell
│   └── globals.css         # Win95 CSS variables & base styles
├── components/
│   ├── desktop/            # All Win95 desktop components
│   │   ├── desktop-shell.tsx       # Main desktop orchestrator
│   │   ├── window.tsx              # Draggable window container
│   │   ├── taskbar.tsx             # Taskbar + Start menu
│   │   ├── desktop-icon.tsx        # Desktop shortcut icons
│   │   ├── boot-screen.tsx         # BIOS POST boot sequence
│   │   ├── win-icons.tsx           # SVG pixel-art icon library
│   │   ├── projects-content.tsx    # File explorer with drill-down
│   │   ├── pictures-content.tsx    # ASCII-art photo gallery
│   │   ├── inbox-content.tsx       # Outlook Express + Formspree
│   │   ├── minesweeper-content.tsx # Playable Minesweeper
│   │   ├── terminal-content.tsx    # MS-DOS Prompt emulator
│   │   ├── paint-content.tsx       # Paint canvas
│   │   ├── calculator-content.tsx  # Calculator
│   │   ├── resume-content.tsx      # Resume PDF viewer
│   │   ├── display-properties-content.tsx  # Settings panel
│   │   └── ...                     # Other window contents
│   └── ui/                 # shadcn/ui components (unused/minimal)
├── lib/
│   ├── desktop-store.ts    # Window state management (useReducer)
│   ├── sounds.ts           # Web Audio API sound effects
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## Security

To report a vulnerability, please see our [Security Policy](SECURITY.md).

## Author

**Neo Prohnitchi**  
Biomedical Engineering @ University of Waterloo  
[GitHub](https://github.com/proneo14) · [LinkedIn](https://www.linkedin.com/in/neo-prohnitchi)
