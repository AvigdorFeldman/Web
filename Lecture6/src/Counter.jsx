import React, { useState, useEffect } from 'react';

function Counter({ initialCount = 0, theme }) {
  // Initialize state with useState hook
  const [count, setCount] = useState(initialCount);
  const [lastAction, setLastAction] = useState('');
  const [countHistory, setCountHistory] = useState([]);
 
    
 useEffect(() => {
    console.log('Counter component mounted');
    document.title = `Count: ${count}`;
    // Cleanup function that runs when component unmounts
    return () => {
      console.log('Counter component unmounted');
      document.title = 'React App';
    };
  }, []); // Empty dependency array means this effect runs only once on mount

    

  // useEffect to run when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    document.title = `Count: ${count}`;
    // Update count history
    setCountHistory(prevHistory => [...prevHistory, count].slice(-5));
  }, [count]); // This effect runs whenever count changes
    
// useEffect to run when theme changes
  useEffect(() => {
    console.log(`Theme changed to: ${theme}`);
  }, [theme]); // This effect runs whenever theme prop changes
// Function to increment the counter
  const increment = () => {
    setCount(count + 1);
    setLastAction('increment');
  };
 // Function to decrement the counter
  const decrement = () => {
    setCount(count - 1);
    setLastAction('decrement');
  };

  // Function to reset the counter
  const reset = () => {
    setCount(initialCount);
    setLastAction('reset');
  };
  // Button styles based on theme
  const buttonStyle = {
    backgroundColor: theme === 'light' ? '#0066cc' : '#61dafb',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 5px'
  };
return (
    <div style={{ textAlign: 'center',  margin: '20px',padding: '20px',
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#3a3a3a', borderRadius: '8px'}}>
      <h2>Count: {count}</h2>
      {lastAction && ( <p>Last action: {lastAction}</p> )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button style={buttonStyle} onClick={decrement}>-</button>
        <button style={buttonStyle} onClick={reset}>Reset</button>
        <button style={buttonStyle} onClick={increment}>+</button>
      </div>
      {countHistory.length > 0 && ( <div>
          				<h3>Count History</h3>
          				<ul style={{ listStyle: 'none', padding: 0 }}>
           					 {countHistory.map((value, index) => (<li key={index}>{value}</li> ))}
          				</ul>
        				</div>)}
    </div>); 
}
export default Counter;

