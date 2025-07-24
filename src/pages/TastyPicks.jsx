import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// images -->
import WhiteSaucePasta from '../assets/images/white-sauce-pasta.jpg';
import PaneerCheeseBurger from '../assets/images/paneer-cheese-burger.jpg';
import PeriPeriFries from '../assets/images/peri-peri-fries.jpg';
import TandooriPaneerSandwich from '../assets/images/tandoori-paneer-sandwich.jpg';
import SchezwanFriedRice from '../assets/images/schezwan-rice.jpg';
import ChilliPaneerDry from '../assets/images/chillie-paneer-dry.jpg';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    name: "White Sauce Pasta",
    price: 150,
    emoji: "🍝",
    image: WhiteSaucePasta,
  },
  {
    name: "Paneer Cheese Burger",
    price: 80,
    emoji: "🍔",
    image: PaneerCheeseBurger,
  },
  {
    name: "Peri Peri Fries",
    price: 60,
    emoji: "🍟",
    image: PeriPeriFries,
  },
  {
    name: "Tandoori Paneer Sandwich",
    price: 80,
    emoji: "🥪",
    image: TandooriPaneerSandwich,
  },
  {
    name: "Schezwan Fried Rice",
    price: 140,
    emoji: "🍛",
    image: SchezwanFriedRice,
  },
  {
    name: "Chilli Paneer Dry",
    price: 160,
    emoji: "🌶️",
    image: ChilliPaneerDry,
  },
];

const TastyPicks = () => {
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
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'linear',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'top 85%',
        toggleActions: 'play none none reverse',
        scrub: true
      },
    });
  });
}, { scope: sectionRef });



  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black text-white px-[4vw] py-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Tasty Picks 🍽️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(({ name, price, emoji, image }) => (
          <div
            key={name}
            className="card bg-[#111111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover group-hover:opacity-80"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                {name} <span className="text-2xl">{emoji}</span>
              </h3>
              <p className="text-yellow-400 mt-2 font-medium">₹{price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TastyPicks;
