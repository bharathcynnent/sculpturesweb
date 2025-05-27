import React from "react";
import "../csscomponents/cart.css";

export default function Cart({ cartItems, setCartItems }) {
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Create WhatsApp message text
  const createWhatsAppMessage = () => {
    if (cartItems.length === 0) return "Your liked products list is empty.";

    let message = "Hello, I am interested in the following products:%0A";

    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.title} - Qty: ${item.quantity || 1}, Price: Rs. ${(item.price * (item.quantity || 1)).toFixed(2)}%0A`;
    });

    message += `Subtotal: Rs. ${subtotal.toFixed(2)}`;
    return message;
  };

  const handleCheckout = () => {
    const phoneNumber = "919360652355"; // Replace with your WhatsApp number (country code + number, no + or 00)
    const text = createWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="cart-container">
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
                onClick={() => removeItem(item.id)}
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
  );
}

