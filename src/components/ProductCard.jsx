import { useState } from 'react';
import { FaWhatsapp, FaHeart, FaRegHeart } from 'react-icons/fa';
import '../csscomponents/ProductCard.css';
import useCartStore from '../stores/cartStore';

const ProductCard = ({ product }) => {
  const { title, image, price, oldPrice, badge, id } = product;
  const [hovered, setHovered] = useState(false);

  const likeItem = useCartStore((state) => state.likeItem);
  const isLiked = useCartStore((state) => state.isLiked);
  const unlikeItem = useCartStore((state) => state.unlikeItem);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleBuyNow = () => {
    const message = `Hi, I'm interested in "${title}" statue it priced at ₹${price.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/919360652355?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLike = () => {
    if (!isLiked(id)) {
      likeItem(id);
      addToCart(product);
    } else {
      unlikeItem(id);
      removeFromCart(id); // 🧼 Ensure it's removed from cart as well
    }
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
            <button
              className={`like-btn ${isLiked(id) ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {isLiked(id) ? <FaHeart /> : <FaRegHeart />} {isLiked(id) ? 'Liked' : 'Like'}
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

