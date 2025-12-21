
import React from 'react';
import type { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, avatar }) => (
  <div className="bg-[#f8fafc] p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-slate-600 text-lg italic leading-relaxed mb-8">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
      <div>
        <div className="font-bold text-slate-900">{author}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "The ApexFlow team rebuilt our entire lead engine from scratch. Within 3 months, our CAC dropped by 60% while volume tripled.",
      author: "Marcus Thorne",
      role: "CEO, NexaVentures",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Never worked with an agency that cares so much about the bottom line. They speak the language of profit, not just traffic.",
      author: "Elena Rossi",
      role: "Founder, Velvet & Sage",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Their data mapping revealed massive gaps in our retention strategy. They didn't just find new customers; they fixed the leaky bucket.",
      author: "Julian Vance",
      role: "Growth Director, FinTech Pro",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Partner Voices</h2>
          <p className="text-slate-500 text-lg">Results are loud. Our clients are louder.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
