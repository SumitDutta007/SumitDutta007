import React, { useState, useEffect } from 'react';

const TerminalLoader = ({ onLoadComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootSequence = [
    '> Initializing system...',
    '> Loading kernel modules... [OK]',
    '> Mounting file systems... [OK]',
    '> Starting network services... [OK]',
    '> Loading resume data...',
    '  - about.txt [OK]',
    '  - experience.md [OK]',
    '  - projects.json [OK]',
    '  - skills.js [OK]',
    '  - education.pdf [OK]',
    '  - achievements.log [OK]',
    '  - contact.vcf [OK]',
    '> System ready.',
    '> Welcome to Sumit Dutta\'s Portfolio',
    '',
    '$ launching desktop environment...'
  ];

  useEffect(() => {
    if (currentLineIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        onLoadComplete();
      }, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLineIndex, isComplete, onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono">
      <div className="w-full max-w-3xl px-6">
        <div className="text-green-400 text-sm md:text-base space-y-1">
          {lines.map((line, index) => (
            <div key={index} className="animate-pulse">
              {line}
              {index === lines.length - 1 && (
                <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;