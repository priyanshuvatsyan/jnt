import React, { useState } from "react";
import "./styles/AdminNav.css";
import { Link } from "react-router-dom";

export default function AdminNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Menu Button for Small Screens */}
      <button
        className={`menu-button ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Navigation Menu */}
      <div className={`nav-container ${isMenuOpen ? "open" : ""}`}>
        <nav className="nav-elements">
          <ul>
            <li>
             
              <Link to={'/allProducts'} >
              <i className="fa-solid fa-house"></i>
              </Link>
            </li>
            <li>
              
              <Link to={'/addProduct'} >
              <i className="fa-solid fa-circle-plus"></i>
              </Link>
            </li>
            <li>
             
              <Link to={'/notifications'} >
              <i className="fa-solid fa-bell"></i>
              </Link>
            </li>
            <li className="nav-logout">
              <a href="/">
                <i className="fa-solid fa-right-from-bracket"></i>
              </a>
              <Link to={''} ></Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
