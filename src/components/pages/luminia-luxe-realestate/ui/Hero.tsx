
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center p-6 lg:p-12 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0    overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg" 
          alt="Luxury Architecture"
          className="w-full h-full object-cover brightness-[0.7] scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 flex flex-col justify-end h-full pb-20 lg:pb-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            DISCOVER YOUR <br /> LUXURY SANCTUARY
          </h1>
          <p className="text-lg text-white/80 mb-10 leading-relaxed font-light">
            Curating the world’s most exclusive real estate opportunities with unparalleled precision, dedication, and a commitment to timeless elegance.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-white text-black px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-zinc-100 transition-all">
              View Portfolios
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-20 border-t border-white/20 pt-10">
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-white mb-1">450+</p>
              <p className="text-xs lg:text-sm text-white/60 uppercase tracking-widest font-medium">Assets Managed</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-white mb-1">120+</p>
              <p className="text-xs lg:text-sm text-white/60 uppercase tracking-widest font-medium">Global Partners</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-white mb-1">$4B+</p>
              <p className="text-xs lg:text-sm text-white/60 uppercase tracking-widest font-medium">Portfolio Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
