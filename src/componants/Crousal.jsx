import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles/Crousal.css';
import { Link } from 'react-router-dom';

export default function Crousal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/heroImg.avif", "/heroImg2.jpg", "/heroImg3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div className="carousel-container">
      <div className="images">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`img${index + 1}`}
            className={index === currentIndex ? "active" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          We Supply, <br />You distribute
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Delivering a seamless connection between manufacturers and businesses.
          Focus on growth while we handle the rest.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
           <Link to={'/shop'}  >Shop</Link>
        </motion.button>
      </div>
    </div>
  );
}
