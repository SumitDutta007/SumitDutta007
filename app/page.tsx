'use client';
import React, { useState } from 'react';
import './App.css';
import TerminalLoader from './components/TerminalLoader';
import MacOSDesktop from './components/MacOSDesktop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="App">
      {isLoading ? (
        <TerminalLoader onLoadComplete={handleLoadComplete} />
      ) : (
        <MacOSDesktop />
      )}
    </div>
  );
}

export default App;