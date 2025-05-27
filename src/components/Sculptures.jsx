import React, { useState, useEffect, useRef } from 'react';
import '../csscomponents/Sculptures.css';
import img1 from '../../public/assets/image1.jpg';
import img2 from '../../public/assets/image3.jpg';
import img3 from '../../public/assets/react.svg';
import img4 from '../../public/assets/image1.jpg';

const images = [img1, img2, img3, img4];

const Sculptures = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollRef = useRef(null);

  // Auto-change preview image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll thumbnail container to the left
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    // Duplicate thumbnails for smooth loop
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
      <button className="explore-button">Explore More</button>
  </div>
    <div className="sculptures-container">
      <div className="sculptures-gallery">
        <div className="gallery-thumbnails" ref={scrollRef}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Sculpture ${index + 1}`}
              className={`gallery-thumb ${selectedImageIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

        <div className="gallery-preview">
          <img
            src={images[selectedImageIndex]}
            alt="Selected Sculpture"
            className="preview-image"
          />
        </div>
      </div>
    </div>
  </>);
};

export default Sculptures;
