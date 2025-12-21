
import React from 'react';
import { Eye, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 inline-block">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            REDEFINING THE STANDARD OF MODERN LIVING
          </h2>
          <p className="text-zinc-500 leading-relaxed text-lg mb-12 font-light">
            Lumina Luxe is a global real estate authority specializing in ultra-luxury properties, sustainable urban developments, and bespoke portfolio advisory. Our passion is driven by an obsession with architectural integrity and client success.
          </p>

          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <p className="text-4xl font-bold mb-2">99%</p>
              <p className="text-zinc-400 text-sm uppercase tracking-widest font-semibold">Retention Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-zinc-400 text-sm uppercase tracking-widest font-semibold">Years Excellence</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-8 bg-zinc-50 rounded-3xl flex gap-6 border border-zinc-100">
              <div className="p-4 bg-white rounded-2xl h-fit shadow-sm">
                <Eye className="w-6 h-6 text-zinc-800" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  To be the primary catalyst for the world's most significant real estate transformations, setting the benchmark for luxury and sustainability.
                </p>
              </div>
            </div>
            <div className="p-8 bg-zinc-50 rounded-3xl flex gap-6 border border-zinc-100">
              <div className="p-4 bg-white rounded-2xl h-fit shadow-sm">
                <Target className="w-6 h-6 text-zinc-800" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Creating unparalleled living experiences through continuous innovation, ethical stewardship, and personalized advisor-led service.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              alt="Our Team"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block max-w-xs">
            <h5 className="text-zinc-400 uppercase tracking-widest text-xs font-bold mb-4">Core Philosophy</h5>
            <p className="text-xl font-bold italic text-zinc-800 leading-snug">
              "We don't just sell properties; we facilitate the lifestyle of the future."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
