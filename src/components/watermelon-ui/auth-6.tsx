"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MdRocketLaunch, MdArrowForward } from "react-icons/md";

export interface SocialProviderItem {
  /** Display label for the provider button */
  label: string;
  /** React node for the provider icon */
  icon: React.ReactNode;
  /** Callback fired when this provider button is clicked */
  onClick?: () => void;
}

export interface LegalLink {
  /** Display text */
  text: string;
  /** URL or callback */
  href?: string;
  onClick?: () => void;
}

export interface Auth6Props {
  /** Brand icon rendered inside the logo mark */
  brandIcon?: React.ReactNode;
  /** Main heading text */
  heading?: string;
  /** Supporting description below the heading */
  description?: string;
  /** Array of social/OAuth providers to display */
  socialProviders?: SocialProviderItem[];
  /** Text shown in the divider between social buttons and email */
  dividerText?: string;
  /** Placeholder for the email input */
  emailPlaceholder?: string;
  /** Label for the email submit button */
  emailButtonLabel?: string;
  /** Prefix text before the legal links */
  legalPrefix?: string;
  /** Array of legal links (e.g. Terms, Privacy) */
  legalLinks?: LegalLink[];
  /** Conjunction between legal links (e.g. "and") */
  legalConjunction?: string;
  /** Callback when email form is submitted */
  onEmailSubmit?: (email: string) => void;
}

export function Auth6({
  brandIcon,
  heading = "Get started with Orbit",
  description = "Launch your next project in seconds. Sign up or log in below.",
  socialProviders = [],
  dividerText = "or",
  emailPlaceholder = "your@email.com",
  emailButtonLabel = "Continue with email",
  legalPrefix = "By proceeding, you accept our",
  legalLinks = [
    { text: "Terms of Service", href: "#" },
    { text: "Privacy Policy", href: "#" },
  ],
  legalConjunction = "and the",
  onEmailSubmit,
}: Auth6Props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEmailSubmit?.(email);
  };

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-2xl">
          {brandIcon ?? (
            <MdRocketLaunch className="text-primary-foreground h-7 w-7" />
          )}
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {heading}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {socialProviders.length > 0 && (
          <div className="flex w-full flex-wrap items-center justify-center gap-2.5">
            {socialProviders.map((provider) => (
              <Button
                key={provider.label}
                variant="outline"
                type="button"
                className="bg-muted h-10 cursor-pointer gap-2 rounded-full px-5 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0px_0px_0px_0.5px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0px_0px_0px_0.5px_rgba(255,255,255,0.03),0px_1px_2px_-1px_rgba(255,255,255,0.08),0px_2px_4px_0px_rgba(255,255,255,0.08)]"
                onClick={provider.onClick}
              >
                {provider.icon}
                {provider.label}
              </Button>
            ))}
          </div>
        )}
        {socialProviders.length > 0 && (
          <div className="flex w-full items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground shrink-0 text-sm font-medium tracking-widest">
              {dividerText}
            </span>
            <Separator className="flex-1" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <Input
            id="auth6-email"
            type="email"
            placeholder={emailPlaceholder}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 rounded-lg text-sm"
            required
          />
          <Button
            type="submit"
            className="from-primary to-primary/70 dark:to-primary/50 h-10 w-full cursor-pointer gap-2 rounded-lg bg-gradient-to-b text-sm font-semibold shadow-[inset_0_2px_0_0_rgba(255,255,255,0.15)]"
          >
            {emailButtonLabel}
            <MdArrowForward className="h-4 w-4" />
          </Button>
        </form>

        {legalLinks.length > 0 && (
          <p className="text-muted-foreground max-w-xs text-center text-xs leading-relaxed">
            {legalPrefix}{" "}
            {legalLinks.map((link, idx) => (
              <span key={link.text}>
                {idx > 0 && <span> {legalConjunction} </span>}
                <a
                  href={link.href}
                  onClick={link.onClick}
                  className="text-foreground hover:text-primary font-medium underline underline-offset-4 transition-colors"
                >
                  {link.text}
                </a>
              </span>
            ))}
            .
          </p>
        )}
      </div>
    </div>
  );
}
