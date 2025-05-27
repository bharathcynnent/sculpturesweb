import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../csscomponents/ContactUs.css';

const ContactUs = () => {
  return (
    <>
      <div className='Contact-header'>Contact Us</div>
      <div className="contact-wrapper">
        <div className="contact-left">
          <h2>
            Contact Information <br />
            <p className="subtitle">Say something to start a live chat!</p>
          </h2>

          <div className="contact-info">
            <p><FaPhone /> +91 9533556733</p>
            <p><FaEnvelope /> kandalavamsikrish@gmail.com</p>
            <p><FaMapMarkerAlt /> Bangalore haven pg, Whitefield.</p>
          </div>

          <div className="social-icons">
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

        <div className="contact-right">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Vamsi" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Krish" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="kandalavamsikrish@gmail.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91 9533556733" />
              </div>
            </div>
            <div className="form-group">
              <label>Select Reason?</label>
              <div className="radio-options">
                <label><input type="radio" name="reason" defaultChecked /> General Inquiry</label>
                <label><input type="radio" name="reason" /> Pricing</label>
                <label><input type="radio" name="reason" /> Bulk Order</label>
                <label><input type="radio" name="reason" /> Offers</label>
              </div>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message.."></textarea>
            </div>

            <button type="submit" className="send-button">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
