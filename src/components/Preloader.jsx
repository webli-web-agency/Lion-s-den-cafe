// Preloader.jsx
import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000); // Adjust time or use real loading condition

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[#111] text-white z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${
        loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <h1 className="text-4xl md:text-6xl font-bold tracking-widest animate-pulse">
        Lion’s Den Cafe 🦁
      </h1>
      <div className="mt-6 flex space-x-1 text-sm text-gray-400">
        <span className="animate-bounce delay-0">L</span>
        <span className="animate-bounce delay-100">o</span>
        <span className="animate-bounce delay-200">a</span>
        <span className="animate-bounce delay-300">d</span>
        <span className="animate-bounce delay-400">i</span>
        <span className="animate-bounce delay-500">n</span>
        <span className="animate-bounce delay-600">g</span>
        <span className="animate-bounce delay-700">.</span>
        <span className="animate-bounce delay-800">.</span>
        <span className="animate-bounce delay-900">.</span>
      </div>
    </div>
  );
};

export default Preloader;
