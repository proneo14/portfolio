'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

type Cell = {
  mine: boolean
  revealed: boolean
  flagged: boolean
  adjacent: number
}

const ROWS = 9
const COLS = 9
const MINES = 10

function createBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  )

  let placed = 0
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    if (!board[r][c].mine) {
      board[r][c].mine = true
      placed++
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
            count++
          }
        }
      }
      board[r][c].adjacent = count
    }
  }

  return board
}

const ADJ_COLORS: Record<number, string> = {
  1: '#0000ff',
  2: '#008000',
  3: '#ff0000',
  4: '#000080',
  5: '#800000',
  6: '#008080',
  7: '#000000',
  8: '#808080',
}

export function MinesweeperContent() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard())
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [faceState, setFaceState] = useState<'smile' | 'dead' | 'cool' | 'scared'>('smile')
  const [time, setTime] = useState(0)
  const [started, setStarted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const flagCount = board.flat().filter((c) => c.flagged).length

  useEffect(() => {
    if (started && !gameOver && !won) {
      timerRef.current = setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [started, gameOver, won])

  const revealCell = useCallback((board: Cell[][], r: number, c: number): Cell[][] => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return board
    if (board[r][c].revealed || board[r][c].flagged) return board

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
    const queue: [number, number][] = [[r, c]]

    while (queue.length > 0) {
      const [cr, cc] = queue.shift()!
      if (newBoard[cr][cc].revealed || newBoard[cr][cc].flagged) continue
      newBoard[cr][cc].revealed = true
      if (newBoard[cr][cc].adjacent === 0 && !newBoard[cr][cc].mine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr, nc = cc + dc
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !newBoard[nr][nc].revealed) {
              queue.push([nr, nc])
            }
          }
        }
      }
    }
    return newBoard
  }, [])

  const checkWin = useCallback((b: Cell[][]) => {
    const allNonMinesRevealed = b.flat().every((c) => c.mine || c.revealed)
    if (allNonMinesRevealed) {
      setWon(true)
      setFaceState('cool')
    }
  }, [])

  const handleClick = useCallback((r: number, c: number) => {
    if (gameOver || won) return
    if (board[r][c].flagged || board[r][c].revealed) return

    if (!started) setStarted(true)

    if (board[r][c].mine) {
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
      newBoard[r][c].revealed = true
      // Reveal all mines
      newBoard.forEach((row) => row.forEach((cell) => { if (cell.mine) cell.revealed = true }))
      setBoard(newBoard)
      setGameOver(true)
      setFaceState('dead')
      return
    }

    const newBoard = revealCell(board, r, c)
    setBoard(newBoard)
    checkWin(newBoard)
  }, [board, gameOver, won, started, revealCell, checkWin])

  const handleRightClick = useCallback((e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault()
    if (gameOver || won || board[r][c].revealed) return
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })))
    newBoard[r][c].flagged = !newBoard[r][c].flagged
    setBoard(newBoard)
  }, [board, gameOver, won])

  const reset = useCallback(() => {
    setBoard(createBoard())
    setGameOver(false)
    setWon(false)
    setFaceState('smile')
    setTime(0)
    setStarted(false)
  }, [])

  const formatNum = (n: number) => String(n).padStart(3, '0')

  return (
    <div className="h-full flex flex-col bg-[var(--win-bg)]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">Game</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      <div className="p-2">
        {/* Header: mine counter, face, timer */}
        <div className="win-border-sunken bg-[var(--win-bg)] flex items-center justify-between px-2 py-1 mb-2">
          {/* Mine counter */}
          <div className="bg-[#000000] text-[#ff0000] font-mono text-[20px] px-1 leading-none tracking-wider tabular-nums w-[50px] text-center">
            {formatNum(MINES - flagCount)}
          </div>

          {/* Face button */}
          <button
            className="win-button w-[28px] h-[28px] !p-0 flex items-center justify-center text-[18px]"
            onClick={reset}
            onMouseDown={() => { if (!gameOver && !won) setFaceState('scared') }}
            onMouseUp={() => { if (!gameOver && !won) setFaceState('smile') }}
          >
            {faceState === 'smile' && ':)'}
            {faceState === 'dead' && 'X('}
            {faceState === 'cool' && 'B)'}
            {faceState === 'scared' && ':O'}
          </button>

          {/* Timer */}
          <div className="bg-[#000000] text-[#ff0000] font-mono text-[20px] px-1 leading-none tracking-wider tabular-nums w-[50px] text-center">
            {formatNum(time)}
          </div>
        </div>

        {/* Board */}
        <div className="win-border-sunken inline-block">
          {board.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => (
                <button
                  key={c}
                  className={`w-[20px] h-[20px] text-[13px] font-sans font-bold flex items-center justify-center leading-none ${
                    cell.revealed
                      ? 'bg-[#c0c0c0] border border-[#808080]'
                      : 'win-border-raised'
                  }`}
                  style={{
                    color: cell.revealed && !cell.mine ? (ADJ_COLORS[cell.adjacent] || 'transparent') : undefined,
                  }}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                  onMouseDown={() => { if (!gameOver && !won && !cell.revealed) setFaceState('scared') }}
                  onMouseUp={() => { if (!gameOver && !won) setFaceState('smile') }}
                >
                  {cell.revealed && cell.mine && (
                    <span className="text-[#000000]">*</span>
                  )}
                  {cell.revealed && !cell.mine && cell.adjacent > 0 && (
                    <span>{cell.adjacent}</span>
                  )}
                  {!cell.revealed && cell.flagged && (
                    <span className="text-[#ff0000]">F</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-auto flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">
          {won ? 'You win! Congratulations!' : gameOver ? 'Game Over! Click the face to restart.' : 'Left-click to reveal, right-click to flag'}
        </span>
      </div>
    </div>
  )
}
