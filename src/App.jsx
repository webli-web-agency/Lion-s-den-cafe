import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Navbar from './components/Navbar'
import TastyPicks from './pages/TastyPicks'
import Preloader from './components/Preloader'

function App() {

  return (
 
   <main className="relative w-screen overflow-x-hidden bg-black text-white pt-[12vh]">
    <Preloader />
     <Navbar />
    <Home />
    <TastyPicks />
    <Service />
    <About />
    <Contact />
   </main>
 
  )
}

export default App
