import { useRef } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Home = () => {
  const welcomeRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const btnRef = useRef()

 useGSAP(() => {
  const ctx = gsap.context(() => {
    // SET initial state
    gsap.set(".float-emoji", { opacity: 0, y: 40 })

    // ENTRANCE: show emojis once (fade + rise)
    gsap.to(".float-emoji", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 1,
      stagger: 0.2,
      onComplete: () => {
        // LOOP FLOAT after entrance
        gsap.to(".float-emoji", {
          y: "-=10",
          rotate: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          stagger: 0.3,
        })
      }
    })

    // Hero text animation
    gsap.set([welcomeRef.current, titleRef.current, descRef.current, btnRef.current], {
      opacity: 0,
      y: 40,
    })

    gsap.to(welcomeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.3,
    })

    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.6,
      ease: "power2.out",
    })

    gsap.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.9,
      ease: "power2.out",
    })

    gsap.to(btnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 2.2,
      ease: "power2.out",
    })
  })

  return () => ctx.revert()
}, [])


  return (
    <section
      id="home"
      className="relative w-full h-[86vh] flex items-center justify-center text-white px-[4vw] overflow-hidden"
    >
      {/* Floating Emojis including 🦁 */}
      <span className="float-emoji absolute top-[20%] left-[10%] text-[2rem]">☕</span>
      <span className="float-emoji absolute top-[30%] right-[15%] text-[2rem]">🍩</span>
      <span className="float-emoji absolute bottom-[20%] left-[20%] text-[2rem]">🥐</span>
      <span className="float-emoji absolute bottom-[15%] right-[25%] text-[2rem]">🍪</span>
      <span className="float-emoji absolute top-[10%] left-[45%] text-[2.2rem]">🦁</span>

      {/* Hero Content */}
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

        <button
          ref={btnRef}
          className="mt-6 px-8 py-3 rounded-full border border-white text-white transition duration-300 hover:bg-white hover:text-black hover:shadow-lg opacity-0"
        >
          Download Menu
        </button>
      </div>
    </section>
  )
}

export default Home
