import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>Hello, Braude!</h1>
      <Header name="Avigdor" />
    </div>
  )
}

export default App
