import React, { useState } from 'react';
import '../csscomponents/Header.css';
import logo from '../../public/assets/react.svg';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';

const Header = ({ onNavigate  }) => {
  const [flippedLink, setFlippedLink] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  const handleClick = (label, index) => {
    setFlippedLink(index);
    onNavigate[label]();
    setTimeout(() => setFlippedLink(null), 800);
    setNavOpen(false); // close menu on click
  };

  

  const links = ['Home', 'About', 'Sculptures', 'Shop', 'Contact'];

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="hamburger" onClick={() => setNavOpen(!navOpen)}>
          <FaBars />
        </span>
      </div>

      <nav className={`nav-center ${navOpen ? 'open' : ''}`}>
        {links.map((label, index) => (
          <span
            key={label}
            className={`nav-link ${flippedLink === index ? 'flip-link' : ''}`}
            onClick={() => handleClick(label, index)}
          >
            {label}
          </span>
        ))}
      </nav>

      <div className="header-right">
        <span className="icon" title="Search"><FaSearch /></span>
        <span className="icon" title="Cart" ><FaShoppingCart /></span>
        <span className="icon" title="Admin"><FaUser /></span>
      </div>
    </header>
  );
};

export default Header;
