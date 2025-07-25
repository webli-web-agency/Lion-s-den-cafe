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
    <main className="relative w-screen overflow-x-hidden bg-black text-white ">
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <>
          <Navbar startAnimation={startAnimation} />
          <Home startAnimation={startAnimation} />
          <TastyPicks startAnimation={startAnimation} />
          <Service startAnimation={startAnimation} />
          <About startAnimation={startAnimation} />
          <Contact startAnimation={startAnimation} />
        </>
      )}
    </main>
  )
}

export default App
