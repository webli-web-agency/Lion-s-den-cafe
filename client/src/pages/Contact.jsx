import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { toast } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ startAnimation }) => {
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

    gsap.from('.contact-info', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    gsap.from('.booking-form', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.booking-form',
        start: 'top 90%',
      }
    });
  }, [{ scope: containerRef }, startAnimation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const bookingData = {
      name: form[0].value,
      email: form[1].value,
      phone: form[2].value,
      date: form[3].value,
      time: form[4].value,
      occasion: form[5].value,
      message: form[6].value,
    };

    try {
      const res = await fetch("https://lionsdencafe.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("🎉 Booking Submitted Successfully!");
        form.reset();
      } else {
        toast.error("❌ Failed to submit. Try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Something went wrong!");
    }
  };

  return (
    <section
      id="Contact"
      ref={containerRef}
      className="relative w-full min-h-screen px-[6vw] pt-[14vh] pb-[5vh] text-white bg-black flex flex-col justify-between"
    >
      <h1 className="contact-heading text-[7vw] md:text-[5.5vw] font-bold tracking-[0.3vw] mb-10 text-center md:text-left">
        SEE YOU AT THE CAFE
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1200px] w-full mx-auto">

        <div className="flex flex-col gap-8 text-sm contact-info">
          <div className="flex items-start md:gap-3 gap-1 md:flex-row flex-col">
            <i className="ri-phone-line text-xl text-green-400"></i>
            <div className="flex flex-col">
              <a href="tel:+917275844336" className="hover:underline text-white">+91 7275844336</a>
              <a href="tel:+917275946488" className="hover:underline text-white">+91 7275946488</a>
              <a href="tel:+916394839336" className="hover:underline text-white">+91 6394839336</a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <i className="ri-mail-line text-xl text-pink-400"></i>
            <a
              href="mailto:lionsdencafe6@gmail.com"
              className="hover:underline text-white"
            >
              lionsdencafe6@gmail.com
            </a>
          </div>

          <div className="flex items-start gap-3">
            <i className="ri-instagram-line text-xl text-red-400"></i>
            <a
              href="https://instagram.com/lions_den_cafe24"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              @lions_den_cafe24
            </a>
          </div>

          <div className="flex items-start gap-3">
            <i className="ri-map-pin-line text-xl text-yellow-400"></i>
            <a
              href="https://www.google.com/maps?q=Lion's+Den+Cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Find us on Maps
            </a>
          </div>
        </div>

        <form
          className="booking-form w-full flex flex-col gap-4 bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4">Book a Table or Occasion 🎉</h2>

          <input
            type="text"
            placeholder="Your Name"
            required
            className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          <div className="flex gap-4 flex-wrap">
            <input
              type="date"
              required
              className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              type="time"
              required
              className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <select
            required
            className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          >
            <option value="">Select Occasion</option>
            <option value="birthday">Birthday</option>
            <option value="table">Table Reservation</option>
            <option value="other">Other</option>
          </select>

          <textarea
            rows={4}
            placeholder="Message or Special Requests"
            className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition-colors"
          >
            Submit Booking
          </button>
        </form>
      </div>

      <div className="text-center text-xs text-gray-400 mt-16">
        © 2025 Lion’s Den Cafe. All rights reserved.
      </div>
    </section>
  );
};

export default Contact;
