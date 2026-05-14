"use client";

import React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FaLinkedinIn, FaGithub, FaDribbble, FaGlobe } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export type Team2SocialPlatform =
  | "instagram"
  | "twitter"
  | "linkedin"
  | "github"
  | "dribbble"
  | "website";

export interface Team2Social {
  platform: Team2SocialPlatform;
  url: string;
  label?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials?: Team2Social[];
}

export interface Team2Props {
  badge?: string;
  title?: string;
  description?: string;
  footerText?: string;
  members?: TeamMember[];
  className?: string;
  renderLink?: (props: {
    href: string;
    label: string;
    children: ReactNode;
  }) => ReactNode;
}

const socialIconMap: Record<Team2SocialPlatform, React.ElementType> = {
  instagram: FaInstagram,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  dribbble: FaDribbble,
  website: FaGlobe,
};

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sophia Williams",
    role: "Product Design Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Arthur Taylor",
    role: "Growth Strategy Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "github", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Matthew Johnson",
    role: "Experience Solutions Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "dribbble", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "4",
    name: "Emma Wright",
    role: "Creative Brand Partner",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "website", url: "#" },
    ],
  },
  {
    id: "5",
    name: "Richard Mills",
    role: "Payments Support",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "github", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
];

function MemberSocialLinks({
  member,
  renderLink,
}: {
  member: TeamMember;
  renderLink?: Team2Props["renderLink"];
}) {
  if (!member.socials || member.socials.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {member.socials.map((social) => {
        const Icon = socialIconMap[social.platform];
        if (!Icon) return null;

        const label = social.label ?? `${member.name} on ${social.platform}`;

        const content = (
          <span className="flex size-8 items-center justify-center rounded-none bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-102 hover:bg-white hover:text-zinc-900">
            <Icon className="size-3.5" />
          </span>
        );

        if (renderLink) {
          return (
            <span key={`${social.platform}-${social.url}`}>
              {renderLink({ href: social.url, label, children: content })}
            </span>
          );
        }

        return (
          <a
            key={`${social.platform}-${social.url}`}
            href={social.url}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}

function MemberCard({
  member,
  index,
  renderLink,
}: {
  member: TeamMember;
  index: number;
  renderLink?: Team2Props["renderLink"];
}) {
  return (
    <div
      className={cn(
        "group flex flex-col",
        index % 2 === 1 && "lg:translate-y-6",
      )}
    >
      <div className="bg-muted relative aspect-[3/4] overflow-hidden rounded-none">
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-300 ease-out group-hover:scale-105 group-hover:grayscale-0"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-start p-4 opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <MemberSocialLinks member={member} renderLink={renderLink} />
        </div>

        <div className="bg-foreground/20 absolute top-3 right-3 size-2.5 rounded-full transition-colors duration-300 group-hover:bg-emerald-400" />
      </div>

      <div className="flex flex-col gap-0 pt-2 pb-2">
        <h3 className="text-md text-foreground group-hover:text-foreground/80 font-medium tracking-tight transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-muted-foreground text-sm">{member.role}</p>
      </div>
    </div>
  );
}

export const Team2: React.FC<Team2Props> = ({
  badge = "Meet our leadership",
  title = "Building the future, together",
  description = "Working together, we solve challenges and deliver exceptional results for every client.",
  footerText = "Teamwork shapes our culture, empowers new ideas, and inspires real progress.",
  members = defaultMembers,
  className,
  renderLink,
}) => {
  return (
    <section
      className={cn(
        "bg-background w-full overflow-hidden py-16 md:py-24",
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center gap-4 text-center sm:mb-16">
          {badge && (
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1 text-sm font-normal"
            >
              {badge}
            </Badge>
          )}
          {title && (
            <h2 className="text-foreground max-w-3xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="mb-14 grid grid-cols-2 gap-4 sm:mb-16 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index}
              renderLink={renderLink}
            />
          ))}
        </div>

        {footerText && (
          <div className="text-center">
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
              {footerText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team2;
