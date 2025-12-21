
import React, { useState } from 'react';
import { SERVICES, SERVICE_GRID } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <span className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
          What We Offer
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight max-w-2xl">
          ELEVATED REAL ESTATE ADVISORY
        </h2>
        <p className="text-zinc-500 max-w-lg leading-relaxed">
          From residential acquisitions to large-scale portfolio management, we provide data-driven solutions tailored for the discerning investor.
        </p>
      </div>

      {/* Service Featured Accordion/Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-7 relative">
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden group">
            <img 
              src={SERVICES[activeService].image} 
              alt={SERVICES[activeService].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-10 right-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-6">
               <span className="text-5xl font-light text-zinc-300">{SERVICES[activeService].id}</span>
               <p className="font-bold text-lg text-zinc-900">{SERVICES[activeService].title}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group">
            <div className="mb-6 p-3 bg-zinc-50 w-fit rounded-xl">
              {SERVICES[activeService].icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{SERVICES[activeService].title}</h3>
            <p className="text-zinc-500 leading-relaxed mb-8">
              {SERVICES[activeService].description}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveService((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1))}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveService((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0))}
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            {SERVICES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveService(idx)}
                className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                  activeService === idx ? 'bg-black text-white border-black' : 'bg-transparent text-zinc-400 border-zinc-100 hover:border-zinc-300'
                }`}
              >
                <span className="font-bold uppercase tracking-widest text-sm">{s.id} {s.title}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${activeService === idx ? 'rotate-[-45deg]' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div className="text-center mb-16">
        <span className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
          Why Choose Us
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          A SUITE OF EXPERT SERVICES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {SERVICE_GRID.map((item, idx) => (
          <div key={idx} className="p-8 bg-zinc-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-zinc-100 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-black group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-3">{item.title}</h4>
            <p className="text-zinc-500 leading-relaxed text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
