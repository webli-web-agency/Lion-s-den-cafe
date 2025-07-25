import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// images -->
import WhiteSaucePasta from '../assets/images/whiteSaucePasta.webp';
import PaneerCheeseBurger from '../assets/images/cheeseSliceBurger.webp';
import Coffee from '../assets/images/Coffee.webp';
import SchezwanNoodles from '../assets/images/schezwanNoodle.webp';
import ChilliPaneerDry from '../assets/images/chilliPaneerDry.webp';
import CrispyCorn from '../assets/images/crispyCorn.webp';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    name: "White Sauce Pasta",
    price: '80-100',
    emoji: "🍝",
    image: WhiteSaucePasta,
    text: "Starting Price"
  },
  {
    name: "Paneer Cheese Burger",
    price: '80',
    emoji: "🍔",
    image: PaneerCheeseBurger,
    text: "Price"
  },
  {
    name: "Hot Beverages",
    price:'10-40',
    emoji: "☕",
    image: Coffee,
    text: "Starting Price"
  },
  {
    name: "Schezwan Noodles",
    price: '60-120',
    emoji: "🍜",
    image: SchezwanNoodles,
    text: "Starting Price"
  },
  {
    name: "Chilli Paneer Dry",
    price: '80-160',
    emoji: "🌶️",
    image: ChilliPaneerDry,
    text: "Starting Price"
  },
  {
    name: "Crispy Corn",
    price: '90-170',
    emoji: "🌽",
    image: CrispyCorn,
    text: "Starting Price"
  },
];

const TastyPicks = ({startAnimation}) => {
  const sectionRef = useRef(null);

 useGSAP(() => {
  // Animate heading
  gsap.from(sectionRef.current.querySelector('h2'), {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'circ.out',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 90%',
    },
  });

  // Animate each card independently
  const cards = gsap.utils.toArray('.card');

  cards.forEach((card) => {
    gsap.from(card, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'linear',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
        scrub: true
      },
    });
  });
}, [{ scope: sectionRef }, startAnimation]);



  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black text-white px-[4vw] py-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Tasty Picks 🍽️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(({ name, price, emoji, image, text }) => (
          <div
            key={name}
            className="card bg-[#111111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group"
          >
            <img
            loading='lazy'
              src={image}
              alt={name}
              className="w-full h-48 object-cover group-hover:opacity-80"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                {name} <span className="text-2xl">{emoji}</span>
              </h3>
              <p className="text-yellow-400 mt-2 font-medium"><span>{text}</span> ₹{price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TastyPicks;
