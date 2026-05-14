"use client";

import type { ReactNode } from "react";
import { FaLinkedinIn, FaGithub, FaDribbble, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type Team5SocialPlatform =
  | "linkedin"
  | "github"
  | "twitter"
  | "dribbble"
  | "website";

export interface Team5Social {
  platform: Team5SocialPlatform;
  url: string;
  label?: string;
}

export interface Team5Member {
  id: string;
  name: string;
  role: string;
  image: string;
  socials?: Team5Social[];
}

export interface Team5Props {
  badge?: string;
  heading?: string;
  description?: string;
  members?: Team5Member[];
  className?: string;
  renderLink?: (props: {
    href: string;
    label: string;
    children: ReactNode;
  }) => ReactNode;
}

const socialIconMap: Record<Team5SocialPlatform, React.ElementType> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  twitter: FaXTwitter,
  dribbble: FaDribbble,
  website: FaGlobe,
};

const defaultMembers: Team5Member[] = [
  {
    id: "riya-kapoor",
    name: "Riya Kapoor",
    role: "Founding Partner",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "noah-schmidt",
    name: "Noah Schmidt",
    role: "Technical Architect",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "github", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
  {
    id: "amara-osei",
    name: "Amara Osei",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "dribbble", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "liam-vasquez",
    name: "Liam Vasquez",
    role: "Growth Strategist",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "website", url: "#" },
    ],
  },
  {
    id: "sofia-lin",
    name: "Sofia Lin",
    role: "Lead Engineer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "github", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
  {
    id: "erik-johansson",
    name: "Erik Johansson",
    role: "Operations Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    socials: [
      { platform: "linkedin", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
];

function MemberSocialLinks({
  member,
  renderLink,
}: {
  member: Team5Member;
  renderLink?: Team5Props["renderLink"];
}) {
  if (!member.socials || member.socials.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {member.socials.map((social) => {
        const Icon = socialIconMap[social.platform];
        if (!Icon) return null;

        const label = social.label ?? `${member.name} on ${social.platform}`;

        const content = (
          <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-zinc-950">
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

function MemberStrip({
  member,
  renderLink,
}: {
  member: Team5Member;
  renderLink?: Team5Props["renderLink"];
}) {
  return (
    <div
      className={cn(
        "group relative min-w-0 flex-[1] overflow-hidden rounded-lg",
        "cursor-pointer shadow-sm transition-all duration-500",
        "hover:flex-[3] hover:shadow-xl",
      )}
    >
      <img
        src={member.image}
        alt={`Portrait of ${member.name}`}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-col gap-3 p-5 opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
        <Badge variant="secondary" className="w-fit text-xs">
          {member.role}
        </Badge>

        <h3 className="text-xl font-semibold tracking-tight whitespace-nowrap text-white sm:text-2xl">
          {member.name}
        </h3>

        <MemberSocialLinks member={member} renderLink={renderLink} />
      </div>
    </div>
  );
}

export default function Team5({
  heading = "Makers who move the needle",
  description = "Six minds. One mission. We ship products that matter.",
  members = defaultMembers,
  className,
  renderLink,
}: Team5Props) {
  return (
    <section className={cn("bg-background w-full py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
          {heading && (
            <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}

          {description && (
            <p className="text-muted-foreground mt-4 max-w-xl text-base sm:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-72 gap-1.5 sm:h-80 sm:gap-2 md:h-96">
          {members.map((member) => (
            <MemberStrip
              key={member.id}
              member={member}
              renderLink={renderLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { Team5 };
