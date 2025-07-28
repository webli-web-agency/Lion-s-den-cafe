import React from 'react';
import 'remixicon/fonts/remixicon.css';

const FloatingIcons = () => {
  return (
    <div className="fixed right-4 bottom-[20%] flex flex-col gap-4 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/917275844336"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
      >
        <i className="ri-whatsapp-line text-2xl"></i>
      </a>

      {/* Call */}
      <a
        href="tel:+916394839336"
        className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
      >
        <i className="ri-phone-line text-2xl"></i>
      </a>
    </div>
  );
};

export default FloatingIcons;
