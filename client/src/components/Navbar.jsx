import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Logo from '../assets/logo/1000078386.png'; // ✅ Your logo
import 'remixicon/fonts/remixicon.css';

const sections = ['home', 'services', 'menu', 'about', 'contact'];

const Navbar = () => {
  const navRef = useRef();
  const [active, setActive] = useState('home');
  const [showNav, setShowNav] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  // GSAP animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    tl.from(
      '#logo',
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'back.out(1.7)',
      },
      '-=0.6'
    );

    tl.from(
      '.nav-link',
      {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      },
      '-=0.4'
    );
  }, []);

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
      setMobileOpen(false);
    }
  };

  // Track current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.toLowerCase());
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Nav link render
  const renderLink = (label) => (
    <li
      key={label}
      className={`nav-link relative cursor-pointer pb-1 ${active === label.toLowerCase() ? 'text-white' : 'text-gray-300'
        }`}
      onClick={() => {
        handleClick(label);      // ✅ scroll to section
        setIsOpen(false);        // ✅ close mobile menu
      }}
    >
      {label}
      {active === label.toLowerCase() && (
        <span className="absolute bottom-0 left-0 w-full h-[1.5px]"></span>
      )}
    </li>
  );

  return (
    <nav
      ref={navRef}
      className={`fixed w-full h-[14vh] md:h-[18vh] top-0 left-0 px-4 z-50 transition-transform duration-500 ${showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      {/* Background blur + gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 backdrop-blur-md z-[-1]" />

      <div className="max-w-[1280px] mx-auto w-full h-full flex justify-between items-center flex-wrap">
        {/* ✅ Logo left */}
        <div
          onClick={() => handleClick('Home')}
          id="logo"
          className="w-[70px] h-[70px] md:w-[6vw] md:h-[6vw] rounded-full overflow-hidden cursor-pointer drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          <img className="w-full h-full object-cover" src={Logo} alt="Lion's Den Logo" />
        </div>

        {/* ✅ Desktop links right */}
        <ul className="hidden md:flex gap-[1.5vw] items-center text-sm md:text-[1.2vw]">
          {['Home', 'Services', 'Menu', 'About', 'Contact'].map((item) => renderLink(item))}
        </ul>

        {/* ✅ Mobile hamburger icon */}
        <div className="md:hidden text-3xl text-white ml-auto " onClick={() => setMobileOpen(!mobileOpen)}>
          <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line cursor-pointer`}></i>
        </div>
      </div>

      {/* ✅ Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-6 py-4 z-40 bg-gradient-to-b from-black/30 to-black/60 backdrop-blur-md transition-all duration-500 ease-in-out">
          <ul className="flex flex-col gap-4 text-white text-lg">
            {['Home', 'Services', 'Menu', 'About', 'Contact'].map((item) => renderLink(item))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
