export interface WindowData {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  icon: string
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; id: string }
  | { type: 'CLOSE_WINDOW'; id: string }
  | { type: 'MINIMIZE_WINDOW'; id: string }
  | { type: 'TOGGLE_MAXIMIZE'; id: string }
  | { type: 'FOCUS_WINDOW'; id: string }
  | { type: 'MOVE_WINDOW'; id: string; position: { x: number; y: number } }
  | { type: 'SET_ALL'; windows: WindowData[] }

let topZ = 10

export function windowReducer(state: WindowData[], action: WindowAction): WindowData[] {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      topZ += 1
      return state.map((w) =>
        w.id === action.id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: topZ }
          : w
      )
    }
    case 'CLOSE_WINDOW':
      return state.map((w) =>
        w.id === action.id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
      )
    case 'MINIMIZE_WINDOW':
      return state.map((w) =>
        w.id === action.id ? { ...w, isMinimized: true } : w
      )
    case 'TOGGLE_MAXIMIZE': {
      topZ += 1
      return state.map((w) =>
        w.id === action.id
          ? { ...w, isMaximized: !w.isMaximized, zIndex: topZ }
          : w
      )
    }
    case 'FOCUS_WINDOW': {
      topZ += 1
      return state.map((w) =>
        w.id === action.id ? { ...w, zIndex: topZ, isMinimized: false } : w
      )
    }
    case 'MOVE_WINDOW':
      return state.map((w) =>
        w.id === action.id ? { ...w, position: action.position } : w
      )
    case 'SET_ALL':
      return action.windows
    default:
      return state
  }
}

export const initialWindows: WindowData[] = [
  {
    id: 'mycomputer',
    title: 'My Computer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 50 },
    size: { width: 480, height: 360 },
    icon: 'mycomputer',
  },
  {
    id: 'terminal',
    title: 'MS-DOS Prompt',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 80, y: 40 },
    size: { width: 600, height: 380 },
    icon: 'terminal',
  },
  {
    id: 'projects',
    title: 'C:\\Users\\Admin\\Projects',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 220, y: 100 },
    size: { width: 560, height: 400 },
    icon: 'folder',
  },
  {
    id: 'about',
    title: 'About.txt - Notepad',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 60 },
    size: { width: 480, height: 360 },
    icon: 'notepad',
  },
  {
    id: 'recycle',
    title: 'Recycle Bin',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 300, y: 120 },
    size: { width: 400, height: 300 },
    icon: 'recycle',
  },
  {
    id: 'ie',
    title: 'Microsoft Internet Explorer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 60, y: 30 },
    size: { width: 640, height: 440 },
    icon: 'ie',
  },
  {
    id: 'paint',
    title: 'untitled - Paint',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 180, y: 50 },
    size: { width: 520, height: 420 },
    icon: 'paint',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 400, y: 140 },
    size: { width: 260, height: 290 },
    icon: 'calculator',
  },
  {
    id: 'network',
    title: 'Network Neighborhood',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 80 },
    size: { width: 460, height: 340 },
    icon: 'network',
  },
  {
    id: 'inbox',
    title: 'Inbox - Outlook Express',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 140, y: 70 },
    size: { width: 520, height: 380 },
    icon: 'inbox',
  },
]
