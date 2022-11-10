import { useState } from 'react'
import './App.css'

const useStack = <T,>(initialStack: T[] = []) => {
  const [fullStack, setStack] = useState<T[]>(initialStack);
  const [pointer, setPointer] = useState(fullStack.length);

  const add = (obj: T) => {
    
    setPointer(currentPointer => { 
    
      setStack(stack => {
        const newStack = stack.slice(0, currentPointer)

        return [...newStack, obj]
      })

      return currentPointer + 1
    });
  }

  const undo = () => {
    setPointer(n => n - 1);
  }

  const redo = () => {
    setPointer(n => n + 1);
  }

  const stack = fullStack.slice(0, pointer)
  const canUndo = pointer > 0;
  const canRedo = pointer < fullStack.length

  return {
    stack,
    add,
    undo,
    redo,
    canUndo,
    canRedo
  }
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
