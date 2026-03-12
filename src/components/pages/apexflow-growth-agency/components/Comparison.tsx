
import React from 'react';

const Comparison: React.FC = () => {
  const others = [
    "One-size-fits-all generic templates",
    "Reliance on vanity metrics (likes, views)",
    "Opaque communication & delayed response",
    "Post-launch abandonment",
    "Lagging behind industry trends"
  ];
  
  const apex = [
    "Surgical, custom-tailored growth blueprints",
    "Focus on hard KPIs (CPA, LTV, ROAS)",
    "Proactive 24/7 dedicated support loop",
    "Continuous post-launch optimization",
    "Cutting-edge AI and data modeling"
  ];

  return (
    <section className="py-24 px-6 bg-[#011616] grid-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">The ApexFlow Advantage</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Others */}
          <div className="glass-card p-10 rounded-[2rem] border-slate-800">
            <h3 className="text-2xl font-bold text-slate-400 mb-8 flex items-center gap-3">
              Typical Agencies
            </h3>
            <ul className="space-y-6">
              {others.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-slate-500">
                  <div className="mt-1 w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px]">✕</span>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* ApexFlow */}
          <div className="relative p-[1px] rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-900 animate-gradient"></div>
            <div className="relative bg-[#022c22] p-10 rounded-[2rem] h-full">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-500 text-slate-900 rounded-lg flex items-center justify-center font-black">A</span>
                ApexFlow Protocol
              </h3>
              <ul className="space-y-6">
                {apex.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-emerald-50">
                    <div className="mt-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-slate-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
