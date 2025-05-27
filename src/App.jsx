import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sculptures from './components/Sculptures';
import AboutUs from './components/AboutUs'; 
import TopSculptures from './components/TopSculptures';
import ContactUs from './components/ContactUs';
import Shop from './pages/Shop';
import Cart from './components/Cart';
const App = () => {
  const sculpturesRef = useRef(null);
  const aboutUsRef = useRef(null);
  const topSculpturesRef = useRef(null);
  const contactUsRef = useRef(null);

  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToSection = (ref) => {
    setCurrentPage('home');
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Optional: Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const cart = document.getElementById('cart-popup');
      if (cart && !cart.contains(e.target) && !e.target.closest('.icon-cart')) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header
        onNavigate={{
          Home: () => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          About: () => scrollToSection(aboutUsRef),
          Sculptures: () => scrollToSection(sculpturesRef),
          Shop: () => setCurrentPage('shop'),
          Contact: () => scrollToSection(contactUsRef),
        }}
        onCartClick={() => setIsCartOpen((prev) => !prev)}
      />

      {/* Cart Popup */}
      {isCartOpen && (
        <div
          id="cart-popup"
          className="absolute top-16 right-6 z-50"
        >
          <Cart />
        </div>
      )}

      <main className="flex-grow p-6">
        {currentPage === 'shop' ? (
          <Shop />
        ) : (
          <>
            <div ref={sculpturesRef}><Sculptures /></div>
            <div ref={aboutUsRef}><AboutUs /></div>
            <div ref={topSculpturesRef}><TopSculptures /></div>
            <div ref={contactUsRef}><ContactUs /></div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
