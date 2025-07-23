import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Service from './pages/Service'
import Navbar from './components/Navbar'

function App() {

  return (
 
   <main className="relative w-screen overflow-x-hidden bg-black text-white pt-[12vh]">
     <Navbar />
    <Home />
    <Service />
    <Gallery />
    <About />
    <Contact />
   </main>
 
  )
}

export default App
