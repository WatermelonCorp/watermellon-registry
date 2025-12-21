
import React from 'react';
import type { Property, Agent, Testimonial, FAQ } from './types';
import { 
  Building2, 
  Leaf, 
  Palmtree, 
  LineChart, 
  Scale, 
  Settings, 
  Briefcase, 
  Users, 
  Key 
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#services' },
  { name: 'Properties', href: '#properties' },
  { name: 'About', href: '#about' },
  { name: 'Agents', href: '#agents' },
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'The Obsidian Pavilion',
    location: 'Malibu, CA',
    price: '$2,450,000',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    tag: 'Investment',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '2',
    name: 'Celestial Heights',
    location: 'Aspen, CO',
    price: '$1,800,000',
    beds: 4,
    baths: 3,
    sqft: '3,100',
    tag: 'For Sale',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '3',
    name: 'Azure Cove Manor',
    location: 'Miami, FL',
    price: '$980,000',
    beds: 3,
    baths: 2,
    sqft: '2,400',
    tag: 'For Rent',
    image: 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg'
  },
  {
    id: '4',
    name: 'Villa Seraphina',
    location: 'Tuscany, IT',
    price: '$3,200,000',
    beds: 6,
    baths: 5,
    sqft: '5,600',
    tag: 'For Sale',
    image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg'
  },
  {
    id: '5',
    name: 'The Quartz Loft',
    location: 'SoHo, NY',
    price: '$1,200,000',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    tag: 'Investment',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '6',
    name: 'Mistral Estate',
    location: 'Provence, FR',
    price: '$4,100,000',
    beds: 7,
    baths: 6,
    sqft: '6,800',
    tag: 'For Sale',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200'
  },
];

export const SERVICES = [
  {
    id: '01',
    title: 'Luxury Residences',
    description: 'Bespoke living experiences in the world’s most coveted locations, featuring architectural masterpieces and state-of-the-art amenities.',
    icon: <Building2 className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '02',
    title: 'Sustainable Assets',
    description: 'Ethical and eco-conscious property developments that combine modern luxury with cutting-edge green technology and efficiency.',
    icon: <Leaf className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/10785841/pexels-photo-10785841.jpeg'
  },
  {
    id: '03',
    title: 'Elite Retreats',
    description: 'Exclusive seasonal rentals and vacation homes curated for travelers who seek privacy, luxury, and unparalleled service.',
    icon: <Palmtree className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200'
  }
];

export const SERVICE_GRID = [
  { title: 'Asset Liquidation', desc: 'Maximizing returns through strategic positioning and high-velocity marketing campaigns.', icon: <Briefcase className="w-6 h-6" /> },
  { title: 'Investor Relations', desc: 'Navigating complex acquisitions with data-driven insights and meticulous due diligence.', icon: <Users className="w-6 h-6" /> },
  { title: 'Estate Management', desc: 'Preserving value through comprehensive oversight of facilities, staff, and operations.', icon: <Key className="w-6 h-6" /> },
  { title: 'Capital Advisory', desc: 'Tailored financial structuring to leverage global real estate opportunities.', icon: <LineChart className="w-6 h-6" /> },
  { title: 'Legal Compliance', desc: 'Ensuring seamless transactions through rigorous adherence to international standards.', icon: <Scale className="w-6 h-6" /> },
  { title: 'Digital Solutions', desc: 'Proprietary virtual touring and blockchain-integrated contracting systems.', icon: <Settings className="w-6 h-6" /> },
];

export const AGENTS: Agent[] = [
  { id: '1', name: 'Elena Vance', role: 'Principal Advisor', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Marcus Thorne', role: 'Senior Acquisition Lead', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Sophie Laurent', role: 'Luxury Portfolio Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'David Chen', role: 'Commercial Strategist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Isabella Rossi', role: 'Eco-Living Consultant', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400' },
  { id: '6', name: 'Julian Banks', role: 'Investment Analyst', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
  
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    text: "Lumina Luxe redefined what it means to find a home. Their attention to detail and market insight were indispensable in securing our hillside estate.",
    author: "Christopher Nolan",
    role: "Tech Entrepreneur",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    text: "The transition from our city loft to a sustainable coastal villa was effortless. Elena and her team are true masters of their craft.",
    author: "Amara Okeke",
    role: "Creative Director",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    text: "Professional, discreet, and highly effective. They understood our requirements before we even voiced them. Truly world-class.",
    author: "Richard Sterling",
    role: "Hedge Fund Manager",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '4',
    text: "Investing in European real estate felt daunting until we partnered with Marcus. His expertise turned a complex deal into a success.",
    author: "Sarah Jenkins",
    role: "Private Investor",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

export const FAQS: FAQ[] = [
  { id: '1', question: "How do you evaluate potential investment returns?", answer: "We utilize proprietary algorithmic modeling combined with historical trend analysis and local zoning insights to provide high-probability projections." },
  { id: '2', question: "What documents are necessary for international buyers?", answer: "The requirements vary by jurisdiction, but generally include proof of funds, KYC documentation, and local legal representation, all of which we facilitate." },
  { id: '3', question: "Can I manage my property remotely through your platform?", answer: "Yes, our digital dashboard provides real-time updates on maintenance, occupancy, and financial performance for global property owners." },
  { id: '4', question: "What sets your 'Green Living' portfolio apart?", answer: "Every property in this collection must meet certified carbon-neutral or LEED standards, ensuring long-term sustainability and resale value." }
];
