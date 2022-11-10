import { useState } from 'react'
import './App.css'

const useStack = <T,>(initialStack: T[] = []) => {
  const [fullStack, setStack] = useState<T[]>(initialStack);
  const [pointer, { increment, decrement }] = useCount(fullStack.length);

  const add = (obj: T) => {
    const newStack = stack.slice(0, pointer)
    setStack([...newStack, obj])
    increment();
  }

  const stack = fullStack.slice(0, pointer)
  const canUndo = pointer > 0;
  const canRedo = pointer < fullStack.length

  return {
    stack,
    add,
    undo: decrement,
    redo: increment,
    canUndo,
    canRedo
  }
}

const useCount = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(n => n + 1);
  }

  const decrement = () => {
    setCount(n => n - 1);
  }
  
  return [count, { increment, decrement }] as const
}

type Points = {
  x: number,
  y: number
}

function App() {

  const { stack, add, undo, redo, canUndo, canRedo } = useStack<Points>()

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;
    add({
      x: clientX - 8,
      y: clientY - 8
    })
  }

  return (
    <>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <div className="App" onClick={handleClick}>
        {stack.map(({ x, y }, index) => (
          <div key={`${x}_${y}_${index}`} className="node" style={{ left: x, top: y }} />
        ))}
      </div>
    </>
  )
}

export default App
