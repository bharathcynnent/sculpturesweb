import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../csscomponents/ContactUs.css';
import api from '../services/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    reason: 'General Inquiry',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');


  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter a valid phone number (at least 10 digits)';
    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    setSubmitStatus('loading');
    api.post('contact/submit', formData)
      .then(() => {
        setSubmitStatus('success');

        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully. We will get back to you soon!',
          showConfirmButton: false,
          timer: 2500,
          background: '#f0f9ff',
          color: '#333',
          timerProgressBar: true,
        });

        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            reason: 'General Inquiry',
          });
        }, 1500);
      })
      .catch(err => {
        console.error(err);
        setSubmitStatus('idle');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      });
  }
};

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
            <a href="https://twitter.com/yourUsername" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/yourUsername" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/919533556733" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name <span className='mandatory'>*</span></label>
                <input type="text" name="firstName" placeholder="Vamsi" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="Krish" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="kandalavamsikrish@gmail.com" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number <span className='mandatory'>*</span></label>
<input
  type="text"
  name="phone"
  placeholder="9533556733"
  value={formData.phone}
  onChange={handleChange}
  maxLength="10"
  pattern="\d*"
  inputMode="numeric"
/>
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Select Reason?</label>
              <div className="radio-options">
                {['General Inquiry', 'Pricing', 'Bulk Order', 'Offers'].map(option => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="reason"
                      value={option}
                      checked={formData.reason === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Message <span className='mandatory'>*</span></label>
              <textarea name="message" placeholder="Write your message.." value={formData.message} onChange={handleChange}></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

<button type="submit" className="send-button" disabled={submitStatus === 'loading'}>
  {submitStatus === 'loading' ? (
    <span className="loader"></span>
  ) : submitStatus === 'success' ? (
    <span className="tick">&#10003;</span>
  ) : (
    'Send Message'
  )}
</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
