import React, { useState, useEffect, useRef } from 'react';
import '../csscomponents/Sculptures.css';
import img1 from '..//assets/aboutusimage1-removebg-preview.png';
import img2 from '..//assets/aboutusimage2-removebg-preview.png';
import img3 from '..//assets/aboutusimage3-removebg-preview.png';
import img4 from '..//assets/aboutusimage4-removebg-preview.png';

const images = [img1, img2, img3, img4];

const Sculptures = ({ onNavigate }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && scrollContainer.children.length <= images.length) {
      images.forEach((img, index) => {
        const clone = scrollContainer.children[index].cloneNode(true);
        scrollContainer.appendChild(clone);
      });
    }

    let scrollAmount = 0;
    const scrollStep = 1;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount -= scrollStep;
        if (Math.abs(scrollAmount) >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0; // reset scroll
        }
        scrollContainer.scrollLeft = -scrollAmount;
      }
    };

    const scrollInterval = setInterval(scroll, 30); // Adjust speed here

    return () => clearInterval(scrollInterval);
  }, []);

  return (<>
  <div className="sculptures-background">
 <div className="sculptures-title">Sculptures</div>
      <p className="sculptures-description">
        Discover everything you need to know about your plants, treat them with kindness and they will take care of you.
      </p>
      <button className="explore-button" onClick={() => onNavigate['Shop']()}>Explore More</button>
  </div>
<div className="scroll-wrapper">
  <div className="scroll-container" ref={scrollRef}>
    <div className="scroll-content">
      {images.concat(images).map((img, index) => (
        <div className="card" key={index}>
          <img src={img} alt={`Sculpture ${index + 1}`} />
        </div>
      ))}
    </div>
  </div>
  <div className="gallery-preview">
    <img
      src={images[selectedImageIndex]}
      alt="Selected Sculpture"
      className="preview-image"
    />
  </div>
</div>

  </>);
};

export default Sculptures;