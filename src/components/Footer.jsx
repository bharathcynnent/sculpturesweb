import React, { useState } from 'react';
import '../csscomponents/Footer.css';
import { FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import api from '../services/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

const handleSubscribe = async () => {
  if (!email && !phone) {
    setError("Please provide either an email or phone number.");
    return;
  }

  const emailValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : true;
  const phoneValid = phone ? /^[0-9]{10}$/.test(phone) : true;

  if (!emailValid) {
    setError("Invalid email address.");
    return;
  }

  if (!phoneValid) {
    setError("Invalid 10-digit phone number.");
    return;
  }

  try {
    await api.postSubscription({ email, phone });

    Swal.fire({
      icon: 'success',
      title: 'Subscribed!',
      text: 'You’ve successfully subscribed to offers.',
      background: '#f0fdf4',
      color: '#14532d',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    // Reset inputs after 1.5 sec
    setTimeout(() => {
      setEmail('');
      setPhone('');
      setError('');
    }, 1500);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Subscription Failed',
      text: err.message || 'Something went wrong. Please try again later.',
      confirmButtonColor: '#ef4444',
    });
  }
 };

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
          <p>Address: 1234 Main St<br />Moonstone City, Stardust State 12345</p>
        </div>

        <div className="footer-right">
          <div className="newsletter">
            <input
              type="email"
              placeholder="kandalavamsikrish@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="9533556733"
              maxLength="10"
              pattern="\d*"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe to Offers</button>
            {error && <p className="error-message">{error}</p>}
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

