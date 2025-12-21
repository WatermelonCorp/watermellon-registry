
// Fix: Added React import to resolve the 'React' namespace error.
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface StatItemProps {
  label: string;
  value: string;
}

export interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}