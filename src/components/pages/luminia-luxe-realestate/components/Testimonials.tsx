
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <span className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            TRUSTED BY THE VISIONARIES
          </h2>
          <p className="text-zinc-500 leading-relaxed mb-8">
            Our commitment to excellence is reflected in the journeys of our clients. We take pride in navigating complex markets to deliver exceptional results.
          </p>
          <div className="flex -space-x-3">
             {AVATAR_URLS.map((url, i) => (
               <img key={i} src={url} className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" alt="User Avatar" />
             ))}
             <div className="w-12 h-12 rounded-full border-4 border-white bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 shadow-sm">
               +1k
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-8 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-zinc-900 text-zinc-900" />
                ))}
              </div>
              <p className="text-zinc-600 leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                <div>
                  <h5 className="font-bold text-sm">{t.author}</h5>
                  <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
