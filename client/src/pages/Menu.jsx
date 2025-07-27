import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const getEmojiByCategory = (category) => {
  const map = {
    burger: "🍔",
    pizza: "🍕",
    drinks: "🥤",
    default: "🍽️",
  };
  return map[category.toLowerCase()] || map.default;
};

const getImageURL = (name) =>
  `https://source.unsplash.com/400x300/?${encodeURIComponent(name)},food`;

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const menuRef = useRef();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("https://lionsdencafe.onrender.com/get-menu");
        const raw = res.data.data;
        const categories = Array.isArray(raw) ? raw : [raw];

        const parsed = categories.map((category) => ({
          heading: category.category,
          items: (category.items || []).map((item) => ({
            name: item.name,
            price:
              item.price !== undefined
                ? `₹${item.price}`
                : `₹${item.half || "-"} (Half) / ₹${item.full || "-"} (Full)`,
            emoji: getEmojiByCategory(category.category),
            image: getImageURL(item.name),
          })),
        }));

        setMenuData(parsed);
      } catch (error) {
        console.error("❌ Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, []);

  useGSAP(() => {
  // Kill previous triggers to avoid duplicate animations
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  const cards = gsap.utils.toArray(".menu-card");

  cards.forEach((card) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none", // <- No reverse or reset
      },
    });
  });

  // Refresh ScrollTrigger to fix layout issues
  ScrollTrigger.refresh();
}, [menuData]);


  return (
    <section
      ref={menuRef}
      className="max-w-6xl mx-auto px-4 py-16 text-white space-y-20"
    >
      {menuData.map((section, i) => (
        <div key={i}>
          {/* Category Heading */}
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2 flex items-center gap-2 capitalize">
            <span>{getEmojiByCategory(section.heading)}</span>
            {section.heading}
          </h2>

          {/* Grid of Items */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, j) => (
              <div
                key={j}
                className="menu-card bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span>{item.emoji}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Menu; 
