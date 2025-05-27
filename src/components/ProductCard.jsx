// import { useState } from 'react';
// import { FaWhatsapp, FaHeart } from 'react-icons/fa';
// import '../csscomponents/ProductCard.css';

// const ProductCard = ({ product }) => {
//   const { title, image, price, oldPrice, badge } = product;
//   const [hovered, setHovered] = useState(false);

//   const handleBuyNow = () => {
//     const message = `Hi, I'm interested in "${title}" priced at ₹${price.toLocaleString()}`;
//     const whatsappUrl = `https://wa.me/919360652355?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const handleLike = () => {
//     // Replace this with your cart logic (e.g., addToCart(product))
//     alert(`Added "${title}" to cart.`);
//   };

//   return (
//     <div
//       className="product-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="image-wrapper">
//         <img src={image} alt={title} className="product-img" />
//         {hovered && (
//           <div className="action-buttons">
//             <button className="buy-btn" onClick={handleBuyNow}>
//               <FaWhatsapp /> Buy Now
//             </button>
//             <button className="like-btn" onClick={handleLike}>
//               <FaHeart /> Like
//             </button>
//           </div>
//         )}
//         {badge && <span className={`badge ${badge.type}`}>{badge.text}</span>}
//       </div>
//       <h3>{title}</h3>
//       <div className="price">
//         <span>₹ {price.toLocaleString()}</span>
//         {oldPrice && <del>₹ {oldPrice.toLocaleString()}</del>}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import { useState } from 'react';
import { FaWhatsapp, FaHeart } from 'react-icons/fa';
import '../csscomponents/ProductCard.css';

const ProductCard = ({ product, onLike }) => {
  const { title, image, price, oldPrice, badge } = product;
  const [hovered, setHovered] = useState(false);

  const handleBuyNow = () => {
    const message = `Hi, I'm interested in "${title}" priced at ₹${price.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/919360652355?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLike = () => {
    onLike(product); // Send to parent (Shop.jsx)
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="image-wrapper">
        <img src={image} alt={title} className="product-img" />
        {hovered && (
          <div className="action-buttons">
            <button className="buy-btn" onClick={handleBuyNow}>
              <FaWhatsapp /> Buy Now
            </button>
            <button className="like-btn" onClick={handleLike}>
              <FaHeart /> Like
            </button>
          </div>
        )}
        {badge && <span className={`badge ${badge.type}`}>{badge.text}</span>}
      </div>
      <h3>{title}</h3>
      <div className="price">
        <span>₹ {price.toLocaleString()}</span>
        {oldPrice && <del>₹ {oldPrice.toLocaleString()}</del>}
      </div>
    </div>
  );
};

export default ProductCard;

