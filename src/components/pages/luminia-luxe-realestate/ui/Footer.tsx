
import React from 'react';
import { Compass, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-white rounded-lg">
                <Compass className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold tracking-tight">LUMINA LUXE</span>
            </div>
            <p className="text-zinc-500 max-w-md leading-relaxed mb-10 text-lg font-light">
              Elevating global real estate through visionary strategy, architectural appreciation, and a relentless pursuit of excellence.
            </p>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-zinc-400">Headquarters</h5>
            <ul className="space-y-4 text-zinc-500 font-light">
              <li>101 Skyline Boulevard</li>
              <li>Beverly Hills, CA 90210</li>
              <li>United States</li>
              <li className="pt-4 text-white font-medium">+1 (800) LUXE-000</li>
              <li className="text-white font-medium underline">contact@luminaluxe.com</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8 text-zinc-400">Quick Links</h5>
            <ul className="space-y-4 text-zinc-500 font-light">
              <li><a href="#properties" className="hover:text-white transition-colors">Property Listings</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Investment Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Who We Are</a></li>
              <li><a href="#agents" className="hover:text-white transition-colors">Our Advisory Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-sm">
            &copy; 2025 Lumina Luxe Real Estate. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8 text-zinc-600 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Market Live: NYSE OPEN
            </span>
            <span>Design by Lumina Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
