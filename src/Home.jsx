import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './styles/Home.css';
import Crousal from './componants/crousal';
import Navbar from './Navbar';
import StandOut from './componants/StandOut';
import Products from './componants/Products';
import Faqs from './componants/Faqs';
import Footer from './componants/Footer';

export default function Home() {
  // Refs for each section
  const crousalRef = useRef(null);
  const standOutRef = useRef(null);
  const productsRef = useRef(null);

  // In-view hooks
  const isCrousalInView = useInView(crousalRef, { once: true });
  const isStandOutInView = useInView(standOutRef, { once: true });
  const isProductsInView = useInView(productsRef, { once: true });

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div>
      <Navbar />

      <motion.div
        ref={crousalRef}
        className="crousal"
        variants={sectionVariants}
        initial="hidden"
        animate={isCrousalInView ? 'visible' : 'hidden'}
      >
        <Crousal />
      </motion.div>

      <motion.div
        ref={standOutRef}
        className="standOut"
        variants={sectionVariants}
        initial="hidden"
        animate={isStandOutInView ? 'visible' : 'hidden'}
      >
        <StandOut />
      </motion.div>

      <motion.div
        ref={productsRef}
        className="prodCategory"
        variants={sectionVariants}
        initial="hidden"
        animate={isProductsInView ? 'visible' : 'hidden'}
      >
        <Products />

        <div className="map">
          <div className="map-txt">
            <h2>Where to find Us?</h2>
            <p>JN Traders, Ghalora, Himachal Pradesh 176031</p>
          </div>
          <div className="map-img">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d271.88899032725935!2d76.29451654463089!3d31.831955403169447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b3105012d0b7f%3A0x3109838ed685bf95!2sJ%20N%20TRADERS!5e0!3m2!1sen!2sin!4v1695810181353!5m2!1sen!2sin"
              width="40%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

        <div className="faqs">
          <Faqs />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}
