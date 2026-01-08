
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-24 px-6 overflow-hidden grid-bg">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm font-semibold tracking-wide">
            EST. 2024 • DATA-DRIVEN GROWTH
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8">
            Scale your vision, <br />
            <span className="gradient-text">dominate your market.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Architecting the future of brands through precision marketing, high-performance creative assets, and ROI-focused data engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
            <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20">
              Secure a consultation
            </button>
            <button className="w-full sm:w-auto glass-card border-slate-700 hover:border-slate-500 px-8 py-4 rounded-full font-bold transition-all">
              See our playbook
            </button>
          </div>
          
          {/* Logo Cloud */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-40 grayscale contrast-125">
             <img src="https://img.logoipsum.com/243.svg" alt="Partner" className="h-6 md:h-8" />
             <img src="https://img.logoipsum.com/258.svg" alt="Partner" className="h-6 md:h-8" />
             <img src="https://img.logoipsum.com/255.svg" alt="Partner" className="h-6 md:h-8" />
             <img src="https://img.logoipsum.com/264.svg" alt="Partner" className="h-6 md:h-8" />
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-2xl">
          <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
              alt="ApexFlow Strategy Team" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
