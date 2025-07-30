import { useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import TastyPicks from './pages/TastyPicks';
import Menu from './pages/Menu';
import Navbar from './components/Navbar';
import FloatingIcons from './components/FloatingIcons';
import Preloader from './components/Preloader';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const [progress, setProgress] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [responseReceived, setResponseReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    let interval;

    const updateProgress = () => {
      setProgress((prev) => {
        if (responseReceived) {
          // 🟢 Speed up if response received
          if (prev < 100) return prev + 5;
          return 100;
        } else {
          // 🟡 Normal speed until 99%
          if (prev < 99) return prev + 1;
          return prev;
        }
      });
    };

    interval = setInterval(updateProgress, responseReceived ? 20 : 55);

    return () => clearInterval(interval);
  }, [responseReceived]);

  // Fetch API data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('https://lionsdencafe.onrender.com/get-menu');
        if (res.data.success) {
          setMenuData(res.data.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setResponseReceived(true);
      }
    };

    fetchMenu();
  }, []);

  // Hide preloader after 100%
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // wait for exit animation
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (isLoading) return <Preloader progress={progress} />;

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <FloatingIcons />
      <Home startAnimation={!isLoading} />
      <TastyPicks />
      <Menu menuData={menuData} />
      <About />
      <Service />
      <Contact />
    </>
  );
}

export default App;
