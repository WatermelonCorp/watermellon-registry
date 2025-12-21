
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#011616] pt-24 pb-12 px-6 border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-12">
                <span className="text-slate-900 font-black text-xl -rotate-12">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">ApexFlow</span>
            </div>
            <p className="text-slate-400 text-lg max-w-sm mb-10">
              The premium growth engine for high-performance brands ready to scale 
              beyond their current horizons.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input 
                type="email" 
                placeholder="Secure updates @ your email" 
                className="bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors flex-grow"
              />
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-full font-bold transition-all">
                Subscribe
              </button>
            </form>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {['Services', 'Case Studies', 'Methodology', 'Our Story', 'The Journal'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Growth', 'Partner Portal', 'FAQ', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ApexFlow Intelligence. All rights reserved.
          </p>
          <div className="flex gap-8 text-slate-500">
             <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-emerald-400 transition-colors">X / Twitter</a>
             <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
