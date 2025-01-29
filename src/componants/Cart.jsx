import React from 'react';
import './styles/Cart.css';

export default function Cart({ cartItems }) {
  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>
      <div className="cart-body">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.imageUrl} // Corrected here
                alt="Product"
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <p className='order' >Online order feature coming soon!!</p>
    </div>
  );
}
