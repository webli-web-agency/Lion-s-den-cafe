import { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Navbar from './components/Navbar'
import TastyPicks from './pages/TastyPicks'
import Preloader from './components/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const startAnimation = !isLoading;

  return (
    <main className="relative w-screen overflow-x-hidden bg-black text-white">
      {/* Preloader shown while loading */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main content after preloader */}
      {!isLoading && (
        <>
          <Navbar startAnimation={startAnimation} />
          <Home startAnimation={startAnimation} />
          <TastyPicks startAnimation={startAnimation} />
          <Service startAnimation={startAnimation} />
          <About startAnimation={startAnimation} />
          <Contact startAnimation={startAnimation} />

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/919956845473"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-4 bottom-[10%] w-12 h-12 bg-green-500 text-white text-3xl flex items-center justify-center rounded-full animate-pulse shadow-lg z-[1000] hover:scale-110 transition-transform duration-300"
            aria-label="Chat on WhatsApp"
          >
            <i className="ri-whatsapp-fill"></i>
          </a>

          {/* Call Floating Button - Mobile Only */}
          <a
            href="tel:+919956845473"
            className="fixed right-4 bottom-[20%] w-12 h-12 bg-blue-500 text-white text-2xl flex items-center justify-center rounded-full shadow-lg z-[1000] hover:scale-110 transition-transform duration-300 block md:hidden"
            aria-label="Call Now"
          >
            <i className="ri-phone-fill"></i>
          </a>
        </>
      )}
    </main>
  )
}

export default App;
