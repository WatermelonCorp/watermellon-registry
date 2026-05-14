import type { FormEvent } from "react";
import {  RiMailFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface NewsletterVisual {
  src: string;
  alt: string;
  label: string;
}

export interface NewsletterLink {
  label: string;
  href: string;
}

export interface Newsletter4Props {
  brand?: string;
  headline?: string;
  description?: string;
  emailPlaceholder?: string;
  buttonLabel?: string;
  consentText?: string;
  links?: NewsletterLink[];
  visual?: NewsletterVisual;
  onClose?: () => void;
  onSubmit?: (email: string) => void;
  className?: string;
}

const defaultLinks: NewsletterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Member Terms", href: "/terms" },
];

const defaultVisual: NewsletterVisual = {
  src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
  alt: "Editorial fashion detail with a model wearing a textured jacket",
  label: "Studio Notes",
};

export default function Newsletter4({
  headline = "Get the edit",
  description = "Join our weekly letter for quiet design finds, studio rituals, and early access to limited releases.",
  emailPlaceholder = "Email address",
  buttonLabel = "Subscribe",
  consentText = "By joining, you agree to receive thoughtful updates from our studio.",
  links = defaultLinks,
  visual = defaultVisual,

  onSubmit,
  className,
}: Newsletter4Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    onSubmit?.(email);
  };

  return (
    <section
      className={cn(
        "bg-background flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8",
        className,
      )}
    >
      <Card className="border-border bg-card relative grid w-full max-w-5xl overflow-hidden rounded-4xl p-0 shadow-sm md:grid-cols-2">
        <div className="flex min-h-96 flex-col justify-center px-8 py-12 sm:px-12 md:px-14 lg:px-16">
          <div className="max-w-md space-y-5">
            <div className="space-y-3">
              <h2 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
                {headline}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                {description}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <RiMailFill className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder={emailPlaceholder}
                  className="focus-visible:ring-primary/20 bg-muted focus-visible:border-primary/50 h-12 rounded-xl pl-11 text-base shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_0_rgba(0,0,0,0.08)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.1)]"
                />
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-xl text-base font-semibold shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]"
              >
                {buttonLabel}
              </Button>
            </form>

            <p className="text-muted-foreground text-xs leading-relaxed">
              {consentText}{" "}
              {links.map((link, index) => (
                <span key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-foreground font-medium underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                  {index < links.length - 1 ? " and " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="bg-muted relative min-h-60 overflow-hidden md:min-h-full">
          <img
            src={visual.src}
            alt={visual.alt}
            className="h-full w-full object-cover"
          />
          <div className="bg-foreground/20 absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
            <h3 className="text-primary-foreground max-w-xs text-4xl leading-none font-bold tracking-tight sm:text-5xl">
              {visual.label}
            </h3>
          </div>
        </div>
      </Card>
    </section>
  );
}
