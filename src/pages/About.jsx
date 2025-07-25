import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = ({startAnimation}) => {
  const sectionRef = useRef();
  const textRefs = useRef([]);
  const headingRef = useRef();

  useGSAP(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Word-by-word scroll animation
    textRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          },
        }
      );
    });
  },[startAnimation]);

  const paragraph = `Welcome to Lion's Den Cafe 🦁, proudly founded by Aditya Sahu and Sagar Sahu on September 06, 2024. We're more than just a cafe — we’re a bold blend of flavors and vibes that roar with personality. Every sip ☕, bite 🍝, and smile 😊 is a tribute to passion, creativity, and connection. Our journey began with a simple idea — to create a space where every visitor feels the warmth of a den and the thrill of something wild.
From the moment you walk through our doors 🚪, you’re welcomed into a world of cozy lights, the aroma of freshly brewed coffee ☕, sizzling fast food 🍟, and a menu crafted to delight your senses. Whether you’re here to catch up with friends, dive into a good book 📖, or take a well-deserved break, Lion’s Den is your perfect retreat.
We take pride in handcrafting every dish with love 💛 and a hint of adventure. From refreshing coolers 🍹 to soul-satisfying snacks 🧁🍔🫖, each offering on our menu is made to spark joy and elevate everyday moments. Our team is not just about service — we’re about stories, laughter, and genuine hospitality.
So take a seat 🪑, relax, and let your taste buds explore the wild side of flavor. Welcome to the pride. Welcome to the roar. 🔥🍽️🎉`;

  const words = paragraph.split(" ");

  return (
    <section
      id="About"
      ref={sectionRef}
      className="w-full min-h-screen bg-black text-white px-[6vw] py-[8vh] flex flex-col justify-center"
    >
      <h2
        ref={headingRef}
        className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-10"
      >
        Behind the Roar of Taste 🦁
      </h2>

      <p className="text-lg sm:text-xl md:text-[1.5vw] font-thin leading-relaxed tracking-wide flex flex-wrap gap-x-2">
        {words.map((word, index) => (
          <span
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className="inline-block"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
};

export default About;
