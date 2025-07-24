import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = ({startAnimation}) => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from('.contact-heading', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact-heading',
        start: 'top 80%',
        scrub: true
      },
    });

    gsap.from('.contact-item', {
      y: 10,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-item',
        start: 'top 75%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse', 
        scrub: true
      },
    });
  }, [{ scope: containerRef }, startAnimation]);

  return (
    <section
    id='Contact'
      ref={containerRef}
      className="relative w-full min-h-screen px-[6vw] pt-[14vh] pb-[5vh] text-white flex flex-col justify-between "
    >
      {/* Heading */}
      <div>
        <h1 className="contact-heading text-[7.5vw] md:text-[5.5vw] tracking-[0.3vw] font-bold mb-10">
          GET IN TOUCH
        </h1>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1000px]">
          {/* Phone */}
          <div className="contact-item flex flex-col items-start gap-2">
            <i className="ri-phone-line text-2xl "></i>
            <span className="text-sm">+91 9876543210</span>
          </div>

          {/* Email */}
          <div className="contact-item flex flex-col items-start gap-2">
            <i className="ri-mail-line text-2xl"></i>
            <span className="text-sm">contact@lionsdencafe.com</span>
          </div>

          {/* Instagram */}
          <div className="contact-item flex flex-col items-start gap-2">
            <i className="ri-instagram-line text-2xl"></i>
            <a
              href="https://instagram.com/lions_den_cafe24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              @lions_den_cafe24
            </a>
          </div>

          {/* Map */}
          <div className="contact-item flex flex-col items-start gap-2">
            <i className="ri-map-pin-line text-2xl"></i>
            <a
              href="https://www.google.com/maps?q=Lion's+Den+Cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              Find us on Maps
            </a>
          </div>
        </div>

        
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-14">
        © 2025 Lion’s Den Cafe. All rights reserved.
      </div>
    </section>
  );
};

export default Contact;
