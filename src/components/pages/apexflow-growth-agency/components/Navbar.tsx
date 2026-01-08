
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center">
      <div className="max-w-7xl w-full glass-card rounded-full px-6 py-2.5 flex items-center justify-between border-emerald-900/20">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
            <span className="text-slate-900 font-black text-xl -rotate-12 group-hover:rotate-0 transition-transform">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">ApexFlow</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 group"
          aria-label="Toggle mobile menu"
        >
          <div className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
        
        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-2.5 hidden md:block rounded-full font-bold text-sm transition-all transform hover:scale-105">
          Get Started
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-slate-900/95 backdrop-blur-md z-40">
          <div className="flex flex-col items-center justify-start pt-12 space-y-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold uppercase tracking-widest text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 mt-8"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
