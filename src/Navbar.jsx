import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import { Link } from 'react-router-dom';
import {
  auth,
} from './firebase';

import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedin, setisLoggedin] = useState(false);
  const navigate = useNavigate();


  // Check the authentication state
  useEffect(() => {
    
  const unsubscribe = auth.onAuthStateChanged((user)=>{
    setisLoggedin(!!user);
  })
    return () => unsubscribe();
  }, [])

  const handleLogout = async ()=>{
    try {
      await auth.signOut();
     // Force page reload to reflect the changes
     window.location.href = '/login';
    } catch (error) {
      alert(`Error logging out: ${error.message}`);
    }
  }
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="web-navbar">
      <h1 className="title">JN Traders</h1>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
      <ul className={`nav-icons ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to={'/'} >Home</Link>
        </li>
        <li>
           
           <Link to={'/shop'} >Shop</Link>
        </li>
        <li>
          <Link to={'/'} >Contact</Link>
        </li>
        { isLoggedin ? (
  <button className="login-btn" onClick={handleLogout}>
    Log Out
  </button>
) : (
  <button className="login-btn">
    <Link to={'/login'}>Login</Link>
  </button>
)}

      </ul>
    </div>
  );
}
