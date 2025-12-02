import './App.css'
import ComponentSwitcher from './components/ComponentSwitcher'
import React, { useState } from 'react';
import Counter from './Counter';
function App() {
  // Add a theme state to demonstrate props change triggering useEffect
  const [theme, setTheme] = useState('light');
  
  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  // SVG icons
  const SunIcon = (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
    </svg>
  );
  const MoonIcon = (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    </svg>
  );


    return (
    <div className="app" style={{ 
      padding: '20px', 
      backgroundColor: theme === 'light' ? '#ffffff' : '#282c34',
      color: theme === 'light' ? '#282c34' : '#ffffff',
      minHeight: '100vh',
      transition: 'background-color 300ms ease, color 400ms ease' // <-- transition works here
    }}>
      <button className='cursor-pointer' onClick={toggleTheme}>
        {theme === 'light' ? MoonIcon : SunIcon}
      </button>
      <ComponentSwitcher />
      <h1>Counter with useState and useEffect</h1>
      <Counter initialCount={0} theme={theme} />
      
    </div>
  );
}
export default App
