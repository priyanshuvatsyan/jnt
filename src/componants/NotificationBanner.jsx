// src/components/NotificationBanner.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NotificationBanner.css';

export default function NotificationBanner() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // hides after 5 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!visible) return null;

  return (
    <div className="notification-banner">
      <p>Create account and get 5% off on next order</p>
      <button onClick={handleClick}>Okay</button>
    </div>
  );
}
