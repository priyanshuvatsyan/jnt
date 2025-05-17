import React, { useState } from 'react';
import './styles/Faqs.css';

export default function Faqs() {
  const faqs = [
    {
      question: 'What does JN Traders specialize in?',
      answer: 'JN Traders specializes in wholesale distribution of snacks, biscuits, edible oils, and other related products.',
    },
    {
      question: 'How can I contact JN Traders for inquiries?',
      answer: 'You can reach us at 8219004499 or 9816705857.',
    },
    {
      question: 'Is there a minimum order requirement?',
      answer: 'Yes, the minimum order value is 3000. This ensures efficient processing and delivery.',
    },
    {
      question: 'Can I get credit for bulk orders?',
      answer: 'Yes, credit facilities are available for trusted clients. Please contact us to discuss terms and conditions.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <h2 className="faqs-title">FAQs</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
          onClick={() => toggleFaq(index)}
        >
          <div className="faq-question">
            <span>{faq.question}</span>
            <i
              className={`fa-solid fa-chevron-down ${
                openIndex === index ? 'rotated' : ''
              }`}
            ></i>
          </div>
          {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
}
