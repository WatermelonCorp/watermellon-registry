import React from 'react';
import { Twitter, Linkedin, Github, Dribbble, Globe, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SocialIconType = 'twitter' | 'linkedin' | 'github' | 'dribbble' | 'website' | 'email';

export interface SocialLink {
  icon: SocialIconType;
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: SocialLink[];
}

export interface Team1Props {
  badge?: string;
  heading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const IconMap: Record<SocialIconType, React.ElementType> = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  dribbble: Dribbble,
  website: Globe,
  email: Mail,
};

const defaultMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Eleanor Pena',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    bio: 'Eleanor is a visionary leader with over a decade of experience designing intuitive and engaging user experiences for global brands.',
    socials: [
      { icon: 'twitter', url: '#' },
      { icon: 'linkedin', url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Cody Fisher',
    role: 'Head of Engineering',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop',
    bio: 'A technical mastermind, Cody specializes in building robust, scalable architectures and leading high-performing engineering teams.',
    socials: [
      { icon: 'github', url: '#' },
      { icon: 'linkedin', url: '#' },
      { icon: 'twitter', url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Courtney Henry',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    bio: 'Courtney crafts pixel-perfect designs with a relentless focus on user-centric principles and modern aesthetic trends.',
    socials: [
      { icon: 'dribbble', url: '#' },
      { icon: 'website', url: '#' }
    ]
  },
  {
    id: '4',
    name: 'Albert Flores',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    bio: 'Albert excels at connecting complex user needs with technical execution, driving product strategy from concept to launch.',
    socials: [
      { icon: 'linkedin', url: '#' },
      { icon: 'email', url: 'mailto:#' }
    ]
  }
];

export default function Team1({
  badge = "Our Team",
  heading = "Meet the minds behind the magic",
  description = "Our team of passionate designers, engineers, and strategists are dedicated to building the best products in the world.",
  members = defaultMembers,
  className,
}: Team1Props) {
  return (
    <section className={cn('bg-background py-24 md:py-32', className)}>
      <div className="container mx-auto px-4 md:px-6">

        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center md:mb-24">
          {badge && (
            <div className="border-border bg-muted text-muted-foreground mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              {badge}
            </div>
          )}
          {heading && (
            <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
              {description}
            </p>
          )}
        </div>


        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="group bg-muted focus-within:ring-ring border-zinc-100 dark:border-zinc-900 relative aspect-[4/5] overflow-hidden rounded-4xl border-6 focus-within:ring-2 focus-within:ring-offset-2 sm:aspect-[3/4] "
              tabIndex={0}
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:mask-b-from-100%"
                loading="lazy"
              />

              <div
                className="absolute inset-0 rounded-4xl opacity-0 backdrop-blur-md transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to top, black 10%, transparent 70%)',
                  maskImage:
                    'linear-gradient(to top, black 10%, transparent 70%)',
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 transition-opacity duration-500 group-focus-within:opacity-90 group-hover:opacity-90" />


              <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                <div className="z-10">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium tracking-wider text-zinc-200">
                    {member.role}
                  </p>

                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-hover:grid-rows-[1fr] group-hover:opacity-100 ">
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-2 pt-2">
                        {member.bio && (
                          <p className="line-clamp-3 text-sm leading-tight text-white/80">
                            {member.bio}
                          </p>
                        )}
                        {member.socials && member.socials.length > 0 && (
                          <div className="flex items-center gap-3 mb-1">
                            {member.socials.map((social, idx) => {
                              const Icon = IconMap[social.icon];
                              return (
                                <a
                                  key={idx}
                                  href={social.url}
                                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all  hover:bg-white hover:text-zinc-950 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950 focus:outline-none"
                                  aria-label={`Visit ${member.name}'s ${social.icon}`}
                                >
                                  <Icon className="h-4 w-4" />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
