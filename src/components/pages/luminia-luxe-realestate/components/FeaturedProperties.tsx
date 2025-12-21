
import React from 'react';
import { PROPERTIES } from '../constants';
import { MapPin, BedDouble, Bath, Square, ArrowUpRight } from 'lucide-react';

const FeaturedProperties: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
            Featured Listings
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl leading-tight">
            DISCOVER RESIDENCES TAILORED TO YOUR AMBITION
          </h2>
        </div>
        <button className="px-8 py-4 border border-zinc-200 rounded-full font-medium hover:bg-black hover:text-white transition-all flex items-center gap-2 w-fit">
          View All Listings
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROPERTIES.map((property) => (
          <div key={property.id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6">
              <img 
                src={property.image} 
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 right-6">
                <span className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                  {property.tag}
                </span>
              </div>
            </div>
            
            <div className="px-2">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs uppercase tracking-widest font-semibold">{property.location}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-zinc-600 transition-colors">{property.name}</h3>
              
              <div className="flex items-center gap-6 text-zinc-500 text-sm mb-6 pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4" />
                  <span>{property.beds}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4" />
                  <span>{property.baths}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  <span>{property.sqft} sqft</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{property.price}</p>
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
