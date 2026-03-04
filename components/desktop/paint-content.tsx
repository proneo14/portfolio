'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080ff', '#004080', '#4000ff', '#804000', '#ffffff', '#c0c0c0',
  '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80',
  '#80ffff', '#8080ff', '#ff0080', '#ff8040',
]

type Tool = 'pencil' | 'brush' | 'eraser' | 'fill' | 'line' | 'rect' | 'ellipse'

export function PaintContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentTool, setCurrentTool] = useState<Tool>('pencil')
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)
  const [brushSize] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const draw = useCallback((from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor
    ctx.lineWidth = currentTool === 'eraser' ? 10 : currentTool === 'brush' ? brushSize * 3 : brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }, [currentColor, currentTool, brushSize])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e)
    setIsDrawing(true)
    setLastPos(pos)
    if (currentTool === 'fill') {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = currentColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [getPos, currentTool, currentColor])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return
    if (currentTool === 'fill') return
    const pos = getPos(e)
    draw(lastPos, pos)
    setLastPos(pos)
  }, [isDrawing, lastPos, getPos, draw, currentTool])

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
    setLastPos(null)
  }, [])

  const tools: { id: Tool; label: string }[] = [
    { id: 'pencil', label: 'Pencil' },
    { id: 'brush', label: 'Brush' },
    { id: 'eraser', label: 'Eraser' },
    { id: 'fill', label: 'Fill' },
  ]

  return (
    <div className="h-full flex flex-col bg-[var(--win-bg)]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Image</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Options</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tool palette - left side */}
        <div className="w-[52px] bg-[var(--win-bg)] border-r border-r-[var(--win-shadow)] p-1 flex flex-col gap-[2px]">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`w-full h-[24px] text-[10px] font-sans ${
                currentTool === tool.id
                  ? 'win-border-sunken bg-[#d0d0d0]'
                  : 'win-border-raised'
              } flex items-center justify-center text-[#000000]`}
              onClick={() => setCurrentTool(tool.id)}
              title={tool.label}
            >
              {tool.label.charAt(0)}
            </button>
          ))}
        </div>

        {/* Canvas area */}
        <div className="flex-1 overflow-auto p-1">
          <div className="win-border-field bg-[#ffffff] inline-block">
            <canvas
              ref={canvasRef}
              width={400}
              height={280}
              className="block cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>
      </div>

      {/* Color palette - bottom */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        {/* Current color preview */}
        <div className="win-border-field w-[24px] h-[24px] p-[2px]">
          <div className="w-full h-full" style={{ backgroundColor: currentColor }} />
        </div>
        <div className="flex flex-wrap gap-[1px] ml-2">
          {COLORS.map((color) => (
            <button
              key={color}
              className={`w-[14px] h-[14px] border ${
                currentColor === color ? 'border-[#000000] border-2' : 'border-[#808080]'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">For Help, click Help Topics on the Help Menu.</span>
      </div>
    </div>
  )
}
