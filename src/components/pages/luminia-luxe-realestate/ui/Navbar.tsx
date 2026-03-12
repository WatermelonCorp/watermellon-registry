
import React from 'react';
import { NAV_LINKS } from '../Constants';
import { Compass, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-2 bg-black rounded-lg">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-zinc-900' : 'text-white md:text-zinc-900'}`}>
            LUMINA LUXE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-black transition-colors ${
                isScrolled ? 'text-zinc-600' : 'text-zinc-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all group">
          Contact Now
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
