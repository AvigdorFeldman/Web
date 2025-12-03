import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/logo.png'
import Footer from './Components/Footer'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import Navbar from './Components/Navbar.jsx'
import { Routes, Route } from "react-router-dom";
function App() {
  const [theme, setTheme] = useState("");
  const changeTheme = () => {
      if (theme === "") {
        setTheme("dark");
      } else {
        setTheme("");
      }
  };

  return (
    <div className={`${theme ? "dark" : ""} w-full min-h-screen bg-linear-to-r from-blue-400 to-emerald-400 dark:from-zinc-900 dark:to-zinc-800 dark:text-white`}>
      <Navbar onClick={() => changeTheme()} theme={theme}></Navbar>
      <div className='flex h-screen w-screen justify-center items-center'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
