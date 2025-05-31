import { useState } from 'react';
import { TodoBox } from './components/TodoBox';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoBox />
    </>
  )
}

export default App
