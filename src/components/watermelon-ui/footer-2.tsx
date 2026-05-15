import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface Footer2Props {
  logo: React.ReactNode;
  brandName: string;
  tagline: string;
  socialLinks: SocialLink[];
  socialText: string;
  linkGroups: FooterLinkGroup[];
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  copyright: string;
  floatingIcon?: React.ReactNode;
}

export function Footer2({
  logo,
  brandName,
  tagline,
  socialLinks,
  socialText,
  linkGroups,
  newsletterTitle,
  newsletterSubtitle,
  newsletterPlaceholder = "Enter email address",
  newsletterButtonText = "Subscribe",
  copyright,
  floatingIcon,
}: Footer2Props) {
  return (
    <footer className="bg-background w-full  px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-6 lg:flex-row">
        <div className="bg-primary text-primary-foreground flex min-h-[400px] shrink-0 flex-col justify-between rounded-[2.5rem] p-10 sm:p-12 lg:w-[420px]">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-primary-foreground">{logo}</div>
              <span className="text-xl font-bold tracking-tight">
                {brandName}
              </span>
            </div>

            <div className="mt-24 sm:mt-32">
              <h2 className="text-2xl leading-snug font-medium sm:text-3xl">
                {tagline}
              </h2>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-4 sm:mt-24">
            <span className="text-md opacity-90">{socialText}</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="bg-background dark:bg-muted text-primary rounded-xl p-2.5 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-muted/50 relative flex flex-1 flex-col justify-between overflow-hidden rounded-[2.5rem] p-10 sm:p-12">
          {floatingIcon && (
            <div className="text-muted-foreground/10 pointer-events-none absolute -top-12 -right-12 h-64 w-64 rotate-12">
              {floatingIcon}
            </div>
          )}

          <div className="relative z-10 flex flex-wrap gap-16 sm:gap-24">
            {linkGroups.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-muted-foreground text-lg">{group.title}</h3>
                <ul className="space-y-4">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="hover:text-primary text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-24 flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-end">
            <div className="text-muted-foreground order-2 text-xs xl:order-1">
              {copyright}
            </div>

            <div className="order-1 w-full space-y-4 sm:max-w-sm xl:order-2">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  {newsletterSubtitle}
                </p>
                <h3 className="text-foreground text-base font-semibold">
                  {newsletterTitle}
                </h3>
              </div>
              <form
                className="relative flex items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  className="bg-muted focus-visible:ring-primary w-full rounded-full border-transparent py-6 pr-32 pl-6 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] outline-none focus-visible:border-none focus-visible:ring-1 dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                />
                <Button
                  type="submit"
                  className="from-primary to-muted/40 border-primary absolute right-1.5 h-9 rounded-full bg-linear-to-b px-5 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.5)]"
                >
                  {newsletterButtonText}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
