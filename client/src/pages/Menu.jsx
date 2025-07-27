import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Dummy emoji and image generator
const getEmojiByCategory = (category) => {
  const map = {
    burger: "🍔",
    pizza: "🍕",
    drinks: "🥤",
    default: "🍽️",
  };
  return map[category.toLowerCase()] || map.default;
};

const getImageURL = (name) => `https://source.unsplash.com/400x300/?${name},food`;

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const menuRef = useRef();

  useGSAP(() => {
    gsap.from(menuRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, [menuData]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("https://lionsdencafe.onrender.com/get-menu");
        const raw = res.data.data;
        const categories = Array.isArray(raw) ? raw : [raw];

        const parsed = categories.map((category) => ({
          heading: category.category,
          text: category.text || "Price",
          items: (category.items || []).map((item) => ({
            name: item.name,
            price: item.price !== undefined
              ? item.price
              : `₹${item.half || ""} (Half) / ₹${item.full || ""} (Full)`,
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

  return (
    <div ref={menuRef} className="p-6 max-w-6xl mx-auto space-y-10">
      {menuData.map((section, i) => (
        <div key={i}>
          <h2 className="text-3xl font-bold mb-4 capitalize border-b pb-1 border-gray-300">
            {section.heading}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {section.items.map((item, j) => (
              <div
                key={j}
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold flex items-center justify-between">
                    {item.name}
                    <span>{item.emoji}</span>
                  </h3>
                  <p className="text-gray-600">{section.text}: {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
