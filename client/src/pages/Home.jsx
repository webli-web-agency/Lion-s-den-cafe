import React, { useRef, useEffect, useState } from 'react';
import gsap from "gsap";
import LionsDenPdf from "../assets/menu-pdf/lionsDenMenu.pdf";
import heroImage from "../assets/images/heroImage.webp";

const Home = ({ startAnimation }) => {
  const welcomeRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const btnRef = useRef();

  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  // ✅ Run GSAP animation only after both startAnimation & imageLoaded are true
  useEffect(() => {
    if (!startAnimation || !imageLoaded) return;

    const ctx = gsap.context(() => {
      gsap.set(".float-emoji", { opacity: 0, y: 40 });

      gsap.to(".float-emoji", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.5,
        stagger: 0.2,
        onComplete: () => {
          gsap.to(".float-emoji", {
            y: "-=10",
            rotate: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            stagger: 0.3,
          });
        }
      });

      gsap.set([welcomeRef.current, titleRef.current, descRef.current, btnRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.to(welcomeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.8,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.1,
        ease: "power2.out",
      });

      gsap.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.4,
        ease: "power2.out",
      });

      gsap.to(btnRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.7,
        ease: "circ.out",
      });
    });

    return () => ctx.revert();
  }, [startAnimation, imageLoaded]);

  return (
    <section
      id="Home"
      className={`relative w-full h-screen flex items-center justify-center text-white px-[4vw] md:pt-[20vh] overflow-hidden ${!imageLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}`}
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Floating Emojis */}
      <span className="float-emoji absolute top-[30%] left-[13%] text-[2rem] z-10">☕</span>
      <span className="float-emoji absolute top-[30%] right-[15%] text-[2rem] z-10">🍩</span>
      <span className="float-emoji absolute bottom-[15%] left-[20%] text-[2rem] z-10">🥐</span>
      <span className="float-emoji absolute bottom-[25%] right-[25%] text-[2rem] z-10">🍪</span>
      <span className="float-emoji absolute top-[20%] left-[45%] text-[2.2rem] z-10">🦁</span>

      {/* Content */}
      <div className="text-center z-10">
        <h1
          ref={welcomeRef}
          className="text-[4vw] sm:text-[3.5vw] md:text-[3vw] font-light tracking-wide"
        >
          Welcome to
        </h1>

        <h2
          ref={titleRef}
          className="text-[10vw] sm:text-[8vw] md:text-[7vw] font-bold leading-none mt-2 tracking-tight"
        >
          Lion's Den Cafe
        </h2>

        <p
          ref={descRef}
          className="text-gray-300 mt-4 text-sm sm:text-base max-w-xl mx-auto"
        >
          A cozy escape where bold flavors meet a warm ambiance. Let your taste buds roar.
        </p>

        <a
          download="LionsDenMenu.pdf"
          href={LionsDenPdf}
          ref={btnRef}
          className="inline-block mt-6 px-8 py-3 cursor-pointer rounded-full border border-white text-white transition duration-300 hover:bg-white hover:text-black hover:shadow-lg opacity-0"
        >
          Download Menu
        </a>
      </div>
    </section>
  );
};

export default Home;
