import React from 'react';
import './styles/Footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-left">
          <h1>JN Traders</h1>
          <p>Delivering quality and trust, straight to your business with products that fuel growth and satisfaction.</p>
            <h2>Contact</h2>
            <p> <h4>Owner:</h4> +91 8219004499</p>
            <p> +91 9816705857</p>
            <p> <h4>CTO:</h4> +91 7876641139</p>

        </div>
        <div className="footer-right">
          <div className="footer-section footer-nav">
            <h3>Navigation</h3>
            <ul>
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Login</li>
              <li>SignUp</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li>Biscuits</li>
              <li>Snacks</li>
              <li>Drinks</li>
              <li>Chocolate</li>
              <li>Oil</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2025 JN Traders. All rights reserved.</p>
      </div>
    </div>
  );
}
