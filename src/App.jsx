import React, { useRef, useState } from 'react';
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
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => setIsCartVisible(prev => !prev);

  const scrollToSection = (ref) => {
    setCurrentPage('home');
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };


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
        onCartClick={toggleCartVisibility}
      />

 {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}

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
