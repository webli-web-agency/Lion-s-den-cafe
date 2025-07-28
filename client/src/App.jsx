import { useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import TastyPicks from './pages/TastyPicks';
import Menu from './pages/Menu';
import Navbar from './components/Navbar';
import FloatingIcons from './components/FloatingIcons'
import Preloader from './components/Preloader';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('https://lionsdencafe.onrender.com/get-menu');
        if (response.data.success) {
          setMenuData(response.data?.data);
        } else {
          console.error('Failed to fetch menu data.');
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // delay ends, preloader gone
        }, 1500); // ⏱️ adjust to match your preloader animation
      }
    };

    fetchMenu();
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <FloatingIcons />
      <Home startAnimation={!isLoading} /> {/* ✅ Pass prop here */}
      <TastyPicks />
      <Menu menuData={menuData} />
      <About />
      <Service />
      <Contact />
    </>
  );
}

export default App;
