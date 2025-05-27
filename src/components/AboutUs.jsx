import React from 'react';
import '../csscomponents/AboutUs.css';

const AboutUs = () => {
  return ( <>
   <h1 className='aboutus-header'>About Us</h1>
    <div className="about-container">
      {/* Top Image */}
      <div className="top-image">
        <img src="../../public/assets/test.svg" alt="Top" />
      </div>

      <div className="content-section">
        {/* Left Images */}
        <div className="side-images left">
          <img src="../../public/assets/aboutusimage2.jpg" alt="Left 1" />
          <img src="../../public/assets/aboutusimage3.jpg" alt="Left 2" />
        </div>

        {/* Center Text Content */}
        <div className="center-content">
          <h2>Every line has a purpose.<br></br>Every shape holds power</h2>
          <div className="stats">
            <div>
              <div className="number">10000+</div>
              <div className="label">Sculptures</div>
            </div>
            <div>
              <div className="number">10+ Years</div>
              <div className="label">Experience</div>
            </div>
            <div>
              <div className="number">8000+</div>
              <div className="label">Customers</div>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="side-images right">
          <img src="../../public/assets/aboutusimage4.jpg" alt="Right 1" />
          <img src="../../public/assets/aboutusimage1.jpg" alt="Right 2" />
        </div>
      </div>
    </div>
    </>);
};

export default AboutUs;
