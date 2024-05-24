import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mainarea from './components/ui/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Mainarea></Mainarea>
    </>
  )
}

export default App
