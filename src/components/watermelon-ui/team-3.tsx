'use client';

import type { ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { FiArrowUpRight } from 'react-icons/fi';

export type Team3SocialType =
  | 'email'
  | 'phone'
  | 'linkedin'
  | 'twitter'
  | 'website';

export interface Team3SocialLink {
  type: Team3SocialType;
  href: string;
  label?: string;
}

export interface Team3Member {
  id: string;
  name: string;
  role: string;
  image: string;
  socials?: Team3SocialLink[];
}

export interface Team3Data {
  heading: string;
  members: Team3Member[];
}

export interface Team3Props {
  data?: Team3Data;
  className?: string;
  renderSocialLink?: (props: {
    href: string;
    label: string;
    children: ReactNode;
  }) => ReactNode;
}


const defaultTeam3Data: Team3Data = {
  heading: 'Our team',
  members: [
    {
      id: 'christopher-hall',
      name: 'Christopher Hall',
      role: 'Chairman',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      socials: [
        { type: 'email', href: 'mailto:christopher@example.com' },
        { type: 'phone', href: 'tel:+1234567890' },
        { type: 'linkedin', href: '#' },
      ],
    },
    {
      id: 'gurjit-s-bedi',
      name: 'Gurjit S. Bedi',
      role: 'Managing Partner',
      image:
        'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop',
      socials: [
        { type: 'email', href: 'mailto:gurjit@example.com' },
        { type: 'phone', href: 'tel:+1234567890' },
        { type: 'linkedin', href: '#' },
      ],
    },
    {
      id: 'david-parker',
      name: 'David Parker',
      role: 'Managing Partner',
      image:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
      socials: [
        { type: 'email', href: 'mailto:david@example.com' },
        { type: 'phone', href: 'tel:+1234567890' },
        { type: 'linkedin', href: '#' },
      ],
    },
    {
      id: 'holly-bott',
      name: 'Holly Bott',
      role: 'Partner',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
      socials: [
        { type: 'email', href: 'mailto:holly@example.com' },
        { type: 'phone', href: 'tel:+1234567890' },
        { type: 'linkedin', href: '#' },
      ],
    },
  ],
};

export default function Team3({
  data = defaultTeam3Data,
  className,
}: Team3Props) {
  return (
    <section className={cn('bg-background w-full py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-medium tracking-tight sm:text-3xl">
            {data.heading}
          </h2>
          <div className="flex items-center gap-6">
            <button
              aria-label="Previous"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-6" strokeWidth={1.5} />
            </button>
            <button
              aria-label="Next"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <ChevronRight className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {data.members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({
  member,
}: {
  member: Team3Member;
}) {
  return (
    <div className="group flex flex-col gap-y-2">
      <div className="bg-muted  w-full overflow-hidden sm:aspect-[4/5] aspect-square">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="text-foreground text-lg font-medium tracking-tight">
            {member.name}
          </h3>
          <p className="text-muted-foreground  text-sm">{member.role}</p>
        </div>
        <button
          aria-label={`More info about ${member.name}`}
          className="text-foreground/70 hover:text-foreground mt-0.5 transition-colors"
        >
          <FiArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
