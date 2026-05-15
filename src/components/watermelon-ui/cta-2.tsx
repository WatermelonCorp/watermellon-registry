import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { FaStar, FaCircle } from "react-icons/fa";

interface Avatar {
  initials: string;
  colorClass: string;
}

interface SocialProof {
  avatars: Avatar[];
  rating: number; // out of 5
  label: string;
}

interface CTASectionProps {
  badge?: string;
  headingLine1: string;
  headingHighlight: string;
  subtext: string;
  primaryCTA: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  socialProof?: SocialProof;
}

const DEFAULT_SOCIAL_PROOF: SocialProof = {
  avatars: [
    { initials: "JK", colorClass: "bg-orange-500" },
    { initials: "SR", colorClass: "bg-cyan-500" },
    { initials: "ML", colorClass: "bg-violet-500" },
    { initials: "AT", colorClass: "bg-emerald-500" },
  ],
  rating: 5,
  label: "Loved by 12k+ engineers & designers",
};

function AvatarStack({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className="flex items-center">
      {avatars.map((avatar, i) => (
        <div
          key={i}
          className={` ${avatar.colorClass} flex h-7 w-7 items-center justify-center rounded-full border-2 border-none text-[10px] font-semibold text-white shadow-[inset_0_0.5px_0px_rgba(255,255,255,0.5),inset_0_-0.5px_0px_rgba(0,0,0,0.3),inset_0_0.5px_10px_rgba(255,255,255,0.5),inset_0_-0.5px_4px_rgba(0,0,0,0.3)] ${i !== 0 ? "-ml-2" : ""} `}
        >
          {avatar.initials}
        </div>
      ))}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`text-[11px] ${
            i < rating ? "text-yellow-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function CTASection({
  badge = "Trusted by 12,000+ teams",
  headingLine1 = "Build faster.",
  headingHighlight = "confidence.",
  subtext = "Stop stitching together tools that don't talk. Everything your team needs — planning, review, and delivery — unified in one thoughtful workspace.",
  primaryCTA = { label: "Get started free" },
  secondaryCTA = { label: "See how it works" },
  socialProof = DEFAULT_SOCIAL_PROOF,
}: CTASectionProps) {
  return (
    <section className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 z-0 h-full w-full bg-transparent [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] [mask-image:linear-gradient(to_bottom,black_60%,transparent)] [background-size:20px_20px] [mask-composite:intersect] dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]" />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden bg-transparent px-6 py-16 text-center sm:px-16 sm:py-20">
        <div className="mb-7 flex justify-center">
          <Badge
            variant="secondary"
            className="text-muted-foreground flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium tracking-widest uppercase"
          >
            <FaCircle className="text-primary animate-pulse text-[6px]" />
            {badge}
          </Badge>
        </div>

        <h2 className="text-foreground mb-5 font-serif text-4xl leading-[1.08] font-normal tracking-tight sm:text-5xl md:text-6xl">
          {headingLine1}
          <br />
          Ship with{" "}
          <span className="text-primary/80 italic">{headingHighlight}</span>
        </h2>

        <p className="text-muted-foreground mx-auto mb-10 max-w-md text-base leading-relaxed">
          {subtext}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="group w-full gap-2 rounded-md text-sm font-semibold shadow-[inset_0_0.5px_0px_rgba(255,255,255,0.5),inset_0_-0.5px_0px_rgba(0,0,0,0.3),inset_0_0.5px_10px_rgba(255,255,255,0.5),inset_0_-0.5px_4px_rgba(0,0,0,0.3)] text-shadow-2xs sm:w-auto"
            onClick={primaryCTA.onClick}
            asChild={!!primaryCTA.href}
          >
            {primaryCTA.href ? (
              <a href={primaryCTA.href}>
                {primaryCTA.label}
                <FiArrowRight className="text-base transition-all duration-200 group-hover:translate-x-1" />
              </a>
            ) : (
              <>
                {primaryCTA.label}
                <FiArrowRight className="text-base transition-all duration-200 group-hover:translate-x-1" />
              </>
            )}
          </Button>

          {secondaryCTA && (
            <Button
              size="lg"
              variant="outline"
              className="text-muted-foreground dark:text-muted hover:text-foreground w-full rounded-md border-none bg-linear-to-b from-zinc-100 to-zinc-50 text-sm font-medium shadow-[inset_0_0.5px_0px_rgba(255,255,255,0.2),inset_0_-0.5px_0px_rgba(0,0,0,0.1),inset_0_0.5px_4px_rgba(255,255,255,0.2),inset_0_-0.5px_4px_rgba(0,0,0,0.1)] transition-all text-shadow-2xs sm:w-auto"
              onClick={secondaryCTA.onClick}
              asChild={!!secondaryCTA.href}
            >
              {secondaryCTA.href ? (
                <a href={secondaryCTA.href}>{secondaryCTA.label}</a>
              ) : (
                <>{secondaryCTA.label}</>
              )}
            </Button>
          )}
        </div>

        {socialProof && (
          <div className="text-muted-foreground mt-6 flex items-center justify-center gap-2.5 text-xs">
            <AvatarStack avatars={socialProof.avatars} />
            <StarRating rating={socialProof.rating} />
            <span className="text-muted-foreground">{socialProof.label}</span>
          </div>
        )}
      </div>
    </section>
  );
}
