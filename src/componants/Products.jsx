import React from 'react';
import { motion } from 'framer-motion';
import './styles/Products.css';
import { Link } from 'react-router-dom';

const products = [
  { name: 'Oil', image: '/oil-removebg-preview.png' },
  { name: 'Washing Powder', image: '/washing_power-removebg-preview.png' },
  { name: 'Biscuit', image: '/goodday-butter.png' },
  { name: 'Chocolates', image: '/dairy-milk-removebg-preview.png' },
  { name: 'Kurkure', image: '/kurkure-removebg-preview.png' },
  { name: 'Juice', image: '/lichi_j-removebg-preview.png' },
];

export default function Products() {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation for child elements
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div 
      className="Products-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="OP-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Popular Products
      </motion.h2>
      <motion.div 
        className="product-grid"
        variants={containerVariants}
      >
        {products.map((product, index) => (
          <motion.div 
            key={index}
            className="product-wrapper"
            variants={cardVariants}
            whileHover={{ scale: 1.1 }} // Hover effect for scaling
          >
            <div className="product-card">
              <motion.img 
              
                src={product.image} 
                alt={product.name} 
                className="product-card-image home-prod-img"
                whileHover={{ scale: 1.05 }} // Slight zoom on hover
              />
            </div>
            <div className="product-name">{product.name}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.button 
        className="browse-more-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        
        <Link to={'/shop'} className='browse-more' >Browse More</Link>
      </motion.button>
    </motion.div>
  );
}
