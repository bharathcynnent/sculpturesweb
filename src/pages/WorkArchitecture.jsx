import React, { useState } from 'react';
import '../csscomponents/WorkArchitecture.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import video1 from '../assets/workvideo1.mp4';
import video2 from '../assets/workvideo2.mp4';
import img1 from '../assets/work1.jpg';
import img2 from '../assets/work2.jpg';
import img3 from '../assets/work3.jpg';

const WorkArchitecture = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => setSelectedImage(img);
  const closePopup = () => setSelectedImage(null);

  return (
    <div className="work-architecture-page">
      <h1 className="title">Work and Architecture</h1>

      {/* Videos Section */}
      <section className="section video-section">
        <h2>Our Work in Action</h2>
        <div className="video-gallery">
          <video controls src={video1} />
          <video controls src={video2} />
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="section architecture-section">
        <h2>Our Architectural Creations</h2>
        <div className="image-gallery">
          {[img1, img2, img3].map((img, idx) => (
            <LazyLoadImage
              key={idx}
              src={img}
              alt={`Architecture ${idx + 1}`}
              effect="blur"
              onClick={() => handleImageClick(img)}
              className="lazy-gallery-image"
            />
          ))}
        </div>
      </section>

      {/* Popup Modal */}
      {selectedImage && (
        <div className="image-popup-overlay" onClick={closePopup}>
          <div className="image-popup" onClick={(e) => e.stopPropagation()}>
            <button className="arch-close-btn" onClick={closePopup}>×</button>
            <LazyLoadImage
              src={selectedImage}
              alt="Enlarged architecture"
              effect="blur"
              className="popup-image"
            />
          </div>
        </div>
      )}

      {/* Process Steps Section */}
      <section className="section process-section">
        <h2>How We Create</h2>
        <p>
          From sketches to structure – our products go through a meticulous process that combines
          traditional craftsmanship with modern design. Every sculpture is handcrafted, ensuring uniqueness and precision.
        </p>
        <div className="steps-flow">
          <div className="step-box appear step-1">
            <h3>1. Concept Design</h3>
            <p>Initial sketches and digital modeling to plan dimensions and style.</p>
          </div>
          <div className="arrow">➔</div>

          <div className="step-box appear step-2">
            <h3>2. Material Selection</h3>
            <p>Choosing high-quality materials suited to form and durability.</p>
          </div>
          <div className="arrow">➔</div>

          <div className="step-box appear step-3">
            <h3>3. Crafting</h3>
            <p>Hands-on sculpting and assembly by our skilled artisans.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkArchitecture;
