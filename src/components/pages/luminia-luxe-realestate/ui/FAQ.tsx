
import React, { useState } from 'react';
import { FAQS } from '../Constants';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <span className="bg-zinc-200 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
            Support Center
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-zinc-200">
            {FAQS.map((faq, idx) => (
              <div key={faq.id} className="py-8 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h4 className="text-xl md:text-2xl font-bold text-zinc-800 group-hover:text-black transition-colors">
                    {faq.question}
                  </h4>
                  <div className={`p-2 rounded-full border transition-all ${
                    openIndex === idx ? 'bg-black text-white border-black' : 'border-zinc-200'
                  }`}>
                    {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-zinc-500 leading-relaxed text-lg font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
