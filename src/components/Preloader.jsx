import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let interval;

    if (percent < 100) {
      interval = setInterval(() => {
        setPercent((prev) => Math.min(prev + 1, 100));
      }, 25); // ~2.5 seconds to reach 100%
    } else {
      // Preloader exit animation
      setTimeout(() => {
        setExit(true);
        gsap.to(".preloader", {
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
          onComplete: onComplete,
        });
      }, 300); // small pause before exit
    }

    return () => clearInterval(interval);
  }, [percent, onComplete]);

  return (
    <div className="preloader fixed top-0 left-0 w-full h-full bg-white text-black z-[9999] flex flex-col items-center justify-center overflow-hidden">
      <h1 className="md:text-4xl text-2xl md:text-6xl font-bold tracking-widest animate-pulse text-center whitespace-nowrap">
        Are you hungry? 🍽️
      </h1>

      <div className="absolute bottom-6 right-8 text-[16px] md:text-lg font-mono text-gray-600">
        {percent}%
      </div>
    </div>
  );
};

export default Preloader;
