import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ progress }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !exit) {
      setExit(true);
      gsap.to(".preloader", {
        y: "-100%",
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  }, [progress, exit]);

  return (
    <div className="preloader fixed top-0 left-0 w-full h-full bg-yellow-500 text-zinc-800 z-[9999] flex flex-col items-center justify-center overflow-hidden">
      <h1 className="md:text-4xl text-2xl md:text-6xl font-bold tracking-widest animate-pulse text-center whitespace-nowrap">
        Are you hungry? 🍽️
      </h1>

      <div className="absolute bottom-6 right-8 text-[8vw] md:text-lg font-mono text-gray-600">
        {progress}%
      </div>
    </div>
  );
};

export default Preloader;
