import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherApp from './components/WeatherApp'
import GeminiChat from './components/geminiChat.jsx'
//import GeminiChat from './components/geminiChat.jsx'

function App() {

  return (
    <div>
     <WeatherApp /> 
     {/*<GeminiChat />*/}
     <GeminiChat />
    </div>
  )
}

export default App
