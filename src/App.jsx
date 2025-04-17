import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MenuPopup from './components/menupopup';
import HomePage from './components/home';
import RegPage from './components/reg';
import UsersPage from './components/logs';


function App() {
  
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (error) return <div className="error">Error: {error.message}</div>;

  const pageVariants = {
    initial: { y: 30, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: -30, opacity: 0 }
  };
  
  const pageTransition = {
    type: "spring",
    mass: 0.5,
    damping: 15,
    stiffness: 100
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <nav>
            <a href="#" className="logo">&#128223; temporary logo idk</a>
            <ul className="nav-links">
              <li><MenuPopup /></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <HomePage />
              </motion.div>
            } />
            <Route path="/register" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <RegPage />
              </motion.div>
            } />
            <Route path="/users" element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <UsersPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Group 1 | Time Log Box w/ SMS Broadcasting | BSIT - 3A</p>
        </div>
      </footer>
    </div>
  );
}

export default App;