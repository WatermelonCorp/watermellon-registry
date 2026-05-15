import { Facebook, Instagram, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface SocialLink {
  platform: "instagram" | "facebook" | "twitter";
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  socials?: SocialLink[];
}

export interface Team4Props {
  /**
   * The text to display in the badge above the heading.
   */
  badge?: string;
  /**
   * The main heading text.
   */
  heading?: string;
  /**
   * The description text below the heading.
   */
  description?: string;
  /**
   * The list of team members to display.
   */
  members?: TeamMember[];
}

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "James Turner",
    role: "Brand Strategy Director",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Emily Park",
    role: "Digital Solutions Expert",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Daniel Kim",
    role: "Creative Marketing Partner",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "4",
    name: "Sophia Williams",
    role: "Experience Innovation Lead",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "5",
    name: "Emma Wright",
    role: "Product Design Manager",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256&h=256&auto=format&fit=crop",
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
];

export function Team4({
  badge = "Together, we innovate",
  heading = "Building ideas, shaping futures",
  description = "Pushing limits, sharing ideas, and building lasting impact.",
  members = defaultMembers,
}: Team4Props) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center md:mb-20">
          {badge && (
            <Badge
              variant="secondary"
              className="mb-6 rounded-full px-4 py-1.5 text-sm font-normal"
            >
              {badge}
            </Badge>
          )}

          {heading && (
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}

          {description && (
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {members.map((member) => (
            <div key={member.id} className="group flex flex-col items-center">
              <div className="bg-muted ring-border/50 ring-offset-background group-hover:ring-border relative mb-6 h-40 w-40 overflow-hidden rounded-full ring-1 ring-offset-4 transition-all duration-300 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-44 lg:w-44 xl:h-52 xl:w-52">
                <img
                  src={member.avatar}
                  alt={`Portrait of ${member.name}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="text-center">
                <h3 className="text-foreground mb-1 text-lg font-medium">
                  {member.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {member.role}
                </p>
              </div>

              {member.socials && member.socials.length > 0 && (
                <div className="flex items-center gap-4">
                  {member.socials.map((social, index) => {
                    const Icon =
                      social.platform === "instagram"
                        ? Instagram
                        : social.platform === "facebook"
                          ? Facebook
                          : Twitter;

                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`${member.name} on ${social.platform}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team4;
