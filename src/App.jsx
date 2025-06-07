import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sculptures from './components/Sculptures';
import AboutUs from './components/AboutUs'; 
import TopSculptures from './components/TopSculptures';
import ContactUs from './components/ContactUs';
import Shop from './pages/Shop';
import Cart from './components/Cart';
import AdminPage from './pages/AdminPage';
import GDPRDialog from './components/GDPRDialog';
import { getUserData } from './utils/tracker';
import api from './services/api';
import WorkArchitecture from './pages/WorkArchitecture';

const App = () => {
  const sculpturesRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const hasSentUserData = useRef(localStorage.getItem('userDataSent') === 'true');

  const [currentPage, setCurrentPage] = useState('home');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(localStorage.getItem('gdprAccepted') === 'true');
  const [gdprDeclined, setGdprDeclined] = useState(localStorage.getItem('gdprAccepted') === 'false');
  const [userInfo, setUserInfo] = useState(null);
  
  

useEffect(() => {
  if (gdprAccepted && !hasSentUserData.current) {
    getUserData().then(data => {
      setUserInfo(data);
      try {
        api.postUserData(data);
        console.log('User data sent to backend');
        hasSentUserData.current = true;
        localStorage.setItem('userDataSent', 'true');
      } catch (err) {
        console.error('Failed to send user data:', err);
      }
    });
  }
}, [gdprAccepted]);
const handleAcceptGDPR = () => {
  localStorage.setItem('gdprAccepted', 'true');
  setGdprAccepted(true);
  setGdprDeclined(false);
};

const handleDeclineGDPR = () => {
  localStorage.setItem('gdprAccepted', 'false');
  setGdprAccepted(false);
  setGdprDeclined(true);
};

  const toggleCartVisibility = () => setIsCartVisible(prev => !prev);

  const scrollToSection = (ref) => {
    setCurrentPage('home');
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

return (
  <div className="flex flex-col min-h-screen relative">
    {currentPage.startsWith('admin') ? (
  <AdminPage
    activePage={currentPage}
    setActivePage={setCurrentPage}
    onLogout={() => setCurrentPage('home')}
    userInfo={userInfo}
  />
    ) : (
      <>
        <Header
          onNavigate={{
            Home: () => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            About: () => scrollToSection(aboutUsRef),
            Sculptures: () => scrollToSection(sculpturesRef),
            Shop: () => setCurrentPage('shop'),
            'Work & Architecture': () => setCurrentPage('work'), 
            Contact: () => scrollToSection(contactUsRef),
          }}
          onCartClick={toggleCartVisibility}
          onAdminLoginSuccess={() => setCurrentPage('admin-dashboard')}
        />

        {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
        <main className="flex-grow p-6">
            {currentPage === 'shop' && <Shop />}
            {currentPage === 'work' && <WorkArchitecture />} {/* ✅ New route */}
            {currentPage === 'home' && (
              <>
                <div ref={sculpturesRef}>
                  <Sculptures onNavigate={{ Shop: () => setCurrentPage('shop') }} />
                </div>
                <div ref={aboutUsRef}><AboutUs /></div>
                <div><TopSculptures onNavigate={{ Shop: () => setCurrentPage('shop') }} /></div>
                <div ref={contactUsRef}><ContactUs /></div>
              </>
            )}
          </main>

        <Footer />

        {!gdprAccepted && !gdprDeclined && (
          <GDPRDialog onAccept={handleAcceptGDPR} onDecline={handleDeclineGDPR} />
        )}
      </>
    )}
  </div>
);

};

export default App;
