import React, { useState, useEffect } from "react";
import "../csscomponents/cart.css";
import useCartStore from "../stores/cartStore";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const [isVisible, setIsVisible] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const unlikeItem = useCartStore((state) => state.unlikeItem);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const createWhatsAppMessage = () => {
    if (cartItems.length === 0) return "Your liked products list is empty.";
    let message = "Hello, I am interested in the following statues:%0A";
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.title} - Qty: ${item.quantity || 1}, Price: Rs. ${(item.price * (item.quantity || 1)).toFixed(2)}%0A`;
    });
    message += `Subtotal: Rs. ${subtotal.toFixed(2)}`;
    return message;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowAlert(true);
      return;
    }

    const phoneNumber = "919360652355";
    const text = createWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  const closeAlert = () => setShowAlert(false);

  // Lock background scroll on mobile
  useEffect(() => {
    if (isVisible && window.innerWidth <= 480) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className="cart-container">
        <button
          className="close-btn"
          onClick={() => setIsVisible(false)}
          aria-label="Close Cart"
        >
          ×
        </button>

        <h2>Liked Products</h2>
        <hr />
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <span>{item.title}</span>
                  <span>
                    {item.quantity || 1} ×{" "}
                    <span className="price">Rs. {item.price.toFixed(2)}</span>
                  </span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.id);
                    unlikeItem(item.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <span>Subtotal</span>
          <span className="total-price">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout through WhatsApp
        </button>
      </div>

      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-modal">
            <h3><FaShoppingCart /> Oops!</h3>
            <p>Your cart is empty. Please add products before proceeding.</p>
            <button className="alert-close-btn" onClick={closeAlert}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

