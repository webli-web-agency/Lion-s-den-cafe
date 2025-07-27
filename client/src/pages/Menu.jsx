import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("https://lionsdencafe.onrender.com/get-menu");
        const data = res.data.data;

        if (!Array.isArray(data)) throw new Error("Invalid menu structure");

        const flatItems = data.flatMap((category) =>
          category.items
            .filter((item) => item.isAvailable)
            .map((item) => ({
              name: item.name,
              price: item.price !== undefined
                ? item.price
                : `₹${item.half} (Half) / ₹${item.full} (Full)`,
              emoji: getEmojiByCategory(category.category),
              image: getImageURL(item.name),
              text: category.text || "Price",
            }))
        );

        setMenuItems(flatItems);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, []);

  useGSAP(() => {
    if (cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [menuItems]);

  const getEmojiByCategory = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes("chinese")) return "🥡";
    if (lower.includes("starter")) return "🍢";
    if (lower.includes("maggi")) return "🍜";
    if (lower.includes("pasta")) return "🍝";
    if (lower.includes("burger")) return "🍔";
    if (lower.includes("soup")) return "🥣";
    if (lower.includes("sandwich")) return "🥪";
    if (lower.includes("noodle")) return "🍜";
    if (lower.includes("pizza")) return "🍕";
    if (lower.includes("chai") || lower.includes("coffee")) return "☕";
    if (lower.includes("fries")) return "🍟";
    return "🍽️";
  };

  const getImageURL = (name) => {
    const formatted = name.toLowerCase().replace(/\s+/g, "-");
    return `https://your-cdn-or-image-host.com/images/${formatted}.jpg`;
  };

  return (
    <section className="px-4 py-10 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-10">Menu</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="bg-white p-5 rounded-2xl shadow-lg border hover:shadow-xl transition duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-3"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}`;
              }}
            />
            <div className="text-3xl mb-2">{item.emoji}</div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.text}: {item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
