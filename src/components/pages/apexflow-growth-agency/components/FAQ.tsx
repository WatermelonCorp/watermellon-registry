
import React, { useState } from 'react';
import type { FAQItemProps } from '../types';

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{question}</span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-emerald-500' : 'text-slate-400'}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 text-lg leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const items = [
    {
      question: "How does your approach differ from standard marketing?",
      answer: "Most agencies focus on front-end metrics like clicks. We focus on 'Unit Economics' – the relationship between acquisition cost and lifetime value. Our strategy is built on engineering profit, not just visibility."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have deep expertise in D2C E-commerce, B2B SaaS, and Premium Service sectors. If you have a high-value offer and need scale, we can help."
    },
    {
      question: "How long does it take to see tangible results?",
      answer: "While infrastructure setup takes 2-4 weeks, most clients see measurable shifts in efficiency within the first 60 days. True scaling typically hits peak momentum by month 4-6."
    },
    {
      question: "Do you offer localized market strategies?",
      answer: "Yes, our team can develop specific sub-strategies for different geographic markets, ensuring cultural and behavioral alignment for global brands."
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Deep Insights</h2>
          <p className="text-slate-500 text-lg">Clear answers to our most common strategic queries.</p>
        </div>
        
        <div className="bg-[#f8fafc] px-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          {items.map((item, idx) => (
            <FAQItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
