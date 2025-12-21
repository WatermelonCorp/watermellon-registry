
import React from 'react';
import type { PortfolioItemProps } from '../types';

const PortfolioCard: React.FC<PortfolioItemProps> = ({ title, description, image, metrics }) => (
  <div className="group cursor-pointer">
    <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] mb-6">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90"></div>
      
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/20 inline-flex items-center gap-2 self-start">
            <span className="text-emerald-400 font-bold text-sm">{m.value}</span>
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const SuccessStories: React.FC = () => {
  const items = [
    {
      title: "Lumina Skin",
      description: "Scale-up of premium skincare line through performance-focused creative strategy and conversion audit.",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
      metrics: [
        { label: "Rev. Growth", value: "78%" },
        { label: "Ad ROAS", value: "4.2x" }
      ]
    },
    {
      title: "Titan Gear",
      description: "Implemented a custom lead generation engine resulting in record-breaking gym equipment sales.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      metrics: [
        { label: "Leads", value: "92%" },
        { label: "CPA Cut", value: "45%" }
      ]
    },
    {
      title: "Elite Chronos",
      description: "Redefined market positioning and organic visibility for the world's leading luxury watch reseller.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      metrics: [
        { label: "Traffic", value: "115%" },
        { label: "Sales", value: "34%" }
      ]
    }
  ];

  return (
    <section id="work" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Wins that resonate</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">A selection of our most transformative partner journeys from 2024.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, idx) => (
            <PortfolioCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
