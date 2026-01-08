
import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="relative py-24 lg:py-32">
      {/* Background with stable Unsplash image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Contact Background"
          className="w-full h-full object-cover brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            LET’S CRAFT YOUR PROPERTY LEGACY
          </h2>
          <p className="text-white/70 text-lg leading-relaxed font-light">
            Ready to explore the finest real estate opportunities? Our advisors are standing by to guide you through every nuance of the market.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">First Name</label>
              <input 
                type="text" 
                placeholder="Elena" 
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Last Name</label>
              <input 
                type="text" 
                placeholder="Vance" 
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
              <input 
                type="email" 
                placeholder="elena@luxe.com" 
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">How Can We Assist You?</label>
              <textarea 
                rows={3} 
                placeholder="Tell us about your requirements..." 
                className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button className="w-full bg-black text-white py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1">
                Schedule a Private Briefing
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
