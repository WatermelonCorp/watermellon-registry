
import React from 'react';
import  type { TeamMemberProps } from '../types';

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => (
  <div className="group text-center">
    <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[4/5] shadow-lg">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
    </div>
    <div className="text-xl font-bold text-slate-900 mb-1">{name}</div>
    <div className="text-emerald-600 font-bold text-xs uppercase tracking-widest">{role}</div>
  </div>
);

const Team: React.FC = () => {
  const members = [
    {
      name: "Soren Kahl",
      role: "Managing Partner",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Aria Chen",
      role: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Derek Foster",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Leila Ortiz",
      role: "Performance Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Architects of Growth</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">World-class strategists and engineers dedicated to your brand's evolution.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {members.map((m, idx) => (
            <TeamMember key={idx} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
