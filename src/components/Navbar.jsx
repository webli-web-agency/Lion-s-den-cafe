import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Logo from "../assets/logo/1000078386.png"

const sections = ["home", "services", "about", "contact"];

const Navbar = () => {
  const navRef = useRef();
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  // Animate navbar entrance
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    tl.from("#logo", {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.6");

    tl.from(".nav-link", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    }, "-=0.4");

    tl.to("#emoji", {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    }, "-=0.3");
  }, []);

  // Handle scroll direction visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 100) {
        setShowNav(false); // scroll down
      } else {
        setShowNav(true); // scroll up
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section and set active
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
    }
  };

  // Highlight active section based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed w-full h-[14vh] md:h-[18vh] top-0 left-0 px-4 z-50 transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      {/* Gradient background with opacity behind content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 backdrop-blur-md z-[-1]" />

      <div className="max-w-[1280px] mx-auto w-full h-full flex justify-between items-center flex-wrap gap-4 md:gap-[3vw]">

        {/* Left Links */}
        <ul className="flex gap-4 md:gap-[1.5vw] items-center text-sm md:text-[1.2vw]">
          <li
            className={`nav-link relative cursor-pointer pb-1 ${(hovered === "Home" || active === "Home") ? "text-white" : "text-gray-300"
              }`}
            onMouseEnter={() => setHovered("Home")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick("Home")}
          >
            Home
            <span className={`absolute bottom-0 left-0 w-full transition-all duration-300 ${hovered === "Home" || active === "Home"
                ? "bg-white scale-x-100"
                : "bg-transparent scale-x-0"
              }`}></span>
          </li>

          <li
            className={`nav-link relative cursor-pointer pb-1 ${(hovered === "Services" || active === "Services") ? "text-white" : "text-gray-300"
              }`}
            onMouseEnter={() => setHovered("Services")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick("Services")}
          >
            Services
            <span className={`absolute bottom-0 left-0 w-full transition-all duration-300 ${hovered === "Services" || active === "Services"
                ? "bg-white scale-x-100"
                : "bg-transparent scale-x-0"
              }`}></span>
          </li>
        </ul>

        {/* Logo with glow */}
        <div
          onClick={() => handleClick("Home")}

          id="logo"
          className="w-[70px] h-[70px] md:w-[6vw] md:h-[6vw] rounded-full overflow-hidden glow-logo cursor-pointer opacity-full"
        >
          <img className="w-full h-full object-cover" src={Logo} alt="Lion's Den Logo" />
        </div>

        {/* Right Links */}
        <ul className="flex gap-4 md:gap-[1.5vw] items-center text-sm md:text-[1.2vw]">
          <li
            className={`nav-link relative cursor-pointer pb-1 ${(hovered === "About" || active === "About") ? "text-white" : "text-gray-300"
              }`}
            onMouseEnter={() => setHovered("About")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick("About")}
          >
            About
            <span className={`absolute bottom-0 left-0 w-full transition-all duration-300 ${hovered === "About" || active === "About"
                ? "bg-white scale-x-100"
                : "bg-transparent scale-x-0"
              }`}></span>
          </li>

          <li
            className={`nav-link relative cursor-pointer pb-1 ${(hovered === "Contact" || active === "Contact") ? "text-white" : "text-gray-300"
              }`}
            onMouseEnter={() => setHovered("Contact")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick("Contact")}
          >
            Contact
            <span className={`absolute bottom-0 left-0 w-full transition-all duration-300 ${hovered === "Contact" || active === "Contact"
                ? "bg-white scale-x-100"
                : "bg-transparent scale-x-0"
              }`}></span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
