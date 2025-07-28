import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Menu = ({ menuData }) => {
  const sectionRef = useRef(null);

  const allItems = useMemo(() => {
    return menuData.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.category,
        text: category.text,
        image: item.image,
      }))
    );
  }, [menuData]);

  useEffect(() => {
    if (allItems.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.menu-item').forEach((card) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.from(sectionRef.current.querySelector('h2'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'circ.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'top 80%',
          scrub: 2,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [allItems]);

  return (
    <section
      ref={sectionRef}
      id="Menu"
      className="w-full relative min-h-screen bg-black text-white px-[4vw] py-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Our Menu 📋
      </h2>

      {allItems.length === 0 ? (
        <p className="text-center text-gray-400">No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="menu-item bg-[#111111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:opacity-80"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold flex justify-between items-center text-yellow-300">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{item.category}</p>

                <div className="mt-2 text-sm text-white">
                  {item.price !== undefined ? (
                    <p>Price: ₹ {item.price}</p>
                  ) : (
                    <>
                      <p>Half Price: ₹ {item.half}</p>
                      <p>Full Price: ₹ {item.full}</p>
                    </>
                  )}
                </div>

                {!item.isAvailable && (
                  <p className="mt-2 text-red-500 font-semibold text-sm">Unavailable</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Menu;
