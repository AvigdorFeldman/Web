import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/logo.png'
import Footer from './Components/Footer'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
function App() {
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
    { label: 'Login', path: '/login' },
]

  return (
    <div className="w-full min-h-screen absolute bg-linear-to-r from-blue-400 to-emerald-400">
      <header className="flex item-center py-6 px-8 md:px-32 bg-white text-black drop-shadow-md">
        <a href="#"><img src={logo} alt="Logo" className="w-20 hover:scale-120 transition-all"></img></a>
        <ul className="hidden md:flex items-center gap-12 font-semibold text-base">
          {menuItems.map((item, index) => ( <li key={index} className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">{item.label}</li>))}
        </ul>
      </header>
      <Login></Login>
      <Register></Register>
      <Footer />
    </div>
  )
}

export default App
