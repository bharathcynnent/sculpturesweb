import React from 'react';
import '../csscomponents/AboutUs.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import topImage from '../assets/test.svg';
import leftImage1 from '../assets/aboutusimage2.jpg';
import leftImage2 from '../assets/aboutusimage3.jpg';
import rightImage1 from '../assets/aboutusimage4.jpg';
import rightImage2 from '../assets/aboutusimage1.jpg';

const AboutUs = () => {
  return (
    <>
      <h1 className='aboutus-header'>About Us</h1>
      <div className="about-container">
        {/* Top Image */}
        <div className="top-image">
          <LazyLoadImage src={topImage} alt="Top" effect="blur" />
        </div>

        <div className="content-section">
          {/* Left Images */}
          <div className="side-images left">
            <LazyLoadImage src={leftImage1} alt="Left 1" effect="blur" />
            <LazyLoadImage src={leftImage2} alt="Left 2" effect="blur" />
          </div>

          {/* Center Text Content */}
          <div className="center-content">
            <h2>Every line has a purpose.<br />Every shape holds power</h2>
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
            <LazyLoadImage src={rightImage1} alt="Right 1" effect="blur" />
            <LazyLoadImage src={rightImage2} alt="Right 2" effect="blur" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

