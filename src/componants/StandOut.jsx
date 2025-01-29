import React from 'react';
import { motion } from 'framer-motion';
import './styles/StandOut.css';

export default function StandOut() {
  const features = [
    {
      id: 1,
      title: 'Fast Delivery',
      description:
        'We ensure timely delivery of products to keep your business running.',
      image: '/delivery-truck.png', // Replace with the correct path
    },
    {
      id: 2,
      title: 'Unmatched Quality',
      description:
        'Our products are sourced and inspected to guarantee the highest standards of quality.',
      image: '/high-quality.png', // Replace with the correct path
    },
    {
      id: 3,
      title: 'Seamless Order Management',
      description:
        'With an intuitive dashboard, managing orders and tracking inventory has never been easier.',
      image: '/order.png', // Replace with the correct path
    },
    {
      id: 4,
      title: '24/7 Customer Support',
      description:
        'Our dedicated support team is always available to resolve your queries and assist you.',
      image: '/customer-service.png', // Replace with the correct path
    },
  ];

  return (
    <div className="standout-container">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        What Makes Us Stand Out?
      </motion.h2>
      <motion.div
        className="features"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="feature-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={feature.image} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
