import React from 'react';
import '../csscomponents/Footer.css';
import { FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h1 className="logo">Logobly</h1>
          <nav className="nav-links">
            <a href="#">About us</a>
            <a href="#">Sculptures</a>
            <a href="#">Shop</a>
            <a href="#">Contact Us</a>
          </nav>
        </div>

        <div className="footer-middle">
          <button className="contact-button">Contact us:</button>
          <p>Email: <a href="mailto:kandalavamsikrishna5@gmail.com">kandalavamsikrishna5@gmail.com</a></p>
          <p>Phone: +91 9533556733</p>
          <p>Address: 1234 Main St<br/>Moonstone City, Stardust State 12345</p>
        </div>

        <div className="footer-right">
          <div className="newsletter">
            <input type="email" placeholder="Email" />
            <button>Subscribe to news</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Logobly. All Rights Reserved.</p>
        <a href="#">Privacy Policy</a>
        <div className="socials-icons">
          <a href="https://twitter.com/yourUsername" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/yourUsername" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919533556733" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
