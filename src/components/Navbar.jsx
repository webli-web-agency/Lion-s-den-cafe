import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Logo from "../assets/logo/1000078386.png"

const Navbar = () => {
  const navRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline()

    // Navbar container animation (slide in from top)
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })

    // Logo appears first
    tl.from("#logo", {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.6") // overlap a bit with nav slide

    // Then nav links one by one
    tl.from(".nav-link", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    }, "-=0.4")

    // Emoji fade in at the end
    tl.to("#emoji", {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    }, "-=0.3")
  }, [])

  return (
    <nav ref={navRef} className="fixed w-full h-[12vh] top-0 left-0 px-4 z-50 text-white">
      <div className="max-w-[1280px] mx-auto w-full h-full flex justify-between items-center flex-wrap gap-4 md:gap-[3vw]">
        
        {/* Left Links */}
        <ul className="flex gap-4 md:gap-[1.5vw] items-center text-sm md:text-[1.2vw]">
          <li className="nav-link">Home</li>
          <li className="nav-link">Services</li>
        </ul>

        {/* Logo */}
        <div id="logo" className="w-[40px] h-[40px] md:w-[4vw] md:h-[4vw] rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={Logo} alt="Lion's Den Logo" />
        </div>

        {/* Right Links */}
        <ul className="flex gap-4 md:gap-[1.5vw] items-center text-sm md:text-[1.2vw]">
          <li className="nav-link">About</li>
          <li className="nav-link">Contact</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
