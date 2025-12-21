
import React from 'react';
import { AGENTS } from '../constants';
import { Linkedin, Twitter, ArrowRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './agents-carousel.css';

const Agents: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <span className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 inline-block">
          Meet Our Experts
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          PERSONALIZED GUIDANCE, PROVEN EXPERTISE
        </h2>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {AGENTS.map((agent) => (
            <div key={agent.id} className="px-4">
              <div className="group">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-6 left-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all">
                      <Twitter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1">{agent.name}</h4>
                <p className="text-zinc-400 text-sm font-medium">{agent.role}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="text-sm font-bold flex items-center gap-2 group border-b border-black pb-1">
          Join Our Network
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Agents;
