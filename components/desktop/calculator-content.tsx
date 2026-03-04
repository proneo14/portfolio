'use client'

import { useState, useCallback } from 'react'

export function CalculatorContent() {
  const [display, setDisplay] = useState('0.')
  const [current, setCurrent] = useState('0')
  const [prev, setPrev] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [resetNext, setResetNext] = useState(false)

  const handleNumber = useCallback((num: string) => {
    if (resetNext) {
      setCurrent(num)
      setDisplay(num + '.')
      setResetNext(false)
    } else {
      const newVal = current === '0' ? num : current + num
      setCurrent(newVal)
      setDisplay(newVal + '.')
    }
  }, [current, resetNext])

  const handleOperator = useCallback((op: string) => {
    if (prev !== null && operator && !resetNext) {
      const result = calculate(parseFloat(prev), parseFloat(current), operator)
      const resultStr = String(result)
      setPrev(resultStr)
      setCurrent(resultStr)
      setDisplay(resultStr + '.')
    } else {
      setPrev(current)
    }
    setOperator(op)
    setResetNext(true)
  }, [prev, current, operator, resetNext])

  const handleEquals = useCallback(() => {
    if (prev === null || !operator) return
    const result = calculate(parseFloat(prev), parseFloat(current), operator)
    const resultStr = String(result)
    setDisplay(resultStr + '.')
    setCurrent(resultStr)
    setPrev(null)
    setOperator(null)
    setResetNext(true)
  }, [prev, current, operator])

  const handleClear = useCallback(() => {
    setDisplay('0.')
    setCurrent('0')
    setPrev(null)
    setOperator(null)
    setResetNext(false)
  }, [])

  const handleClearEntry = useCallback(() => {
    setCurrent('0')
    setDisplay('0.')
  }, [])

  const handleBackspace = useCallback(() => {
    if (current.length > 1) {
      const newVal = current.slice(0, -1)
      setCurrent(newVal)
      setDisplay(newVal + '.')
    } else {
      setCurrent('0')
      setDisplay('0.')
    }
  }, [current])

  const handlePlusMinus = useCallback(() => {
    const newVal = String(-parseFloat(current))
    setCurrent(newVal)
    setDisplay(newVal + '.')
  }, [current])

  const handleSqrt = useCallback(() => {
    const result = Math.sqrt(parseFloat(current))
    const resultStr = String(result)
    setCurrent(resultStr)
    setDisplay(resultStr + '.')
  }, [current])

  const handlePercent = useCallback(() => {
    if (prev && operator) {
      const result = (parseFloat(prev) * parseFloat(current)) / 100
      const resultStr = String(result)
      setCurrent(resultStr)
      setDisplay(resultStr + '.')
    }
  }, [prev, current, operator])

  const handleInverse = useCallback(() => {
    const val = parseFloat(current)
    if (val !== 0) {
      const result = String(1 / val)
      setCurrent(result)
      setDisplay(result + '.')
    }
  }, [current])

  return (
    <div className="h-full flex flex-col bg-[var(--win-bg)]">
      {/* Menu bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      <div className="p-2 flex flex-col gap-[4px]">
        {/* Display */}
        <div className="win-border-field bg-[#ffffff] px-2 h-[28px] flex items-center justify-end mb-1">
          <span className="text-[16px] font-sans text-[#000000] tabular-nums">{display}</span>
        </div>

        {/* Row 1: Back, CE, C */}
        <div className="flex gap-[3px]">
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={handleBackspace}>Back</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={handleClearEntry}>CE</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={handleClear}>C</button>
        </div>

        {/* Row 2: MC, 7, 8, 9, /, sqrt */}
        <div className="flex gap-[3px]">
          <button className="win-button w-[36px] h-[26px] text-[12px] text-[#ff0000] font-sans">MC</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('7')}>7</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('8')}>8</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('9')}>9</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={() => handleOperator('/')}>/</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={handleSqrt}>sqrt</button>
        </div>

        {/* Row 3: MR, 4, 5, 6, *, % */}
        <div className="flex gap-[3px]">
          <button className="win-button w-[36px] h-[26px] text-[12px] text-[#ff0000] font-sans">MR</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('4')}>4</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('5')}>5</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('6')}>6</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={() => handleOperator('*')}>*</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={handlePercent}>%</button>
        </div>

        {/* Row 4: MS, 1, 2, 3, -, 1/x */}
        <div className="flex gap-[3px]">
          <button className="win-button w-[36px] h-[26px] text-[12px] text-[#ff0000] font-sans">MS</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('1')}>1</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('2')}>2</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('3')}>3</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={() => handleOperator('-')}>-</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={handleInverse}>1/x</button>
        </div>

        {/* Row 5: M+, 0, +/-, ., +, = */}
        <div className="flex gap-[3px]">
          <button className="win-button w-[36px] h-[26px] text-[12px] text-[#ff0000] font-sans">M+</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => handleNumber('0')}>0</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={handlePlusMinus}>+/-</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#0000ff] font-sans" onClick={() => {
            if (!current.includes('.')) {
              const newVal = current + '.'
              setCurrent(newVal)
              setDisplay(newVal)
            }
          }}>.</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={() => handleOperator('+')}>+</button>
          <button className="win-button flex-1 h-[26px] text-[12px] text-[#ff0000] font-sans" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b !== 0 ? a / b : 0
    default: return b
  }
}
