import { type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Footer4Link {
  label: string;
  href: string;
}

export interface Footer4LinkGroup {
  title: string;
  links: Footer4Link[];
}

export interface Footer4SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface Footer4BadgeItem {
  label: string;
  icon?: ReactNode;
}

export interface Footer4Props {
  /** Brand logo node */
  logo?: ReactNode;
  /** Brand / product name */
  brandName: string;
  /** Short punchy tagline rendered large */
  tagline: string;
  /** Supporting sentence beneath the tagline */
  description?: string;
  /** Optional badge shown above the tagline */
  badge?: Footer4BadgeItem;
  /** Newsletter section title */
  newsletterTitle: string;
  /** Newsletter supporting copy */
  newsletterSubtitle?: string;
  /** Input placeholder */
  newsletterPlaceholder?: string;
  /** Button label */
  newsletterButtonLabel?: string;
  /** Link columns */
  linkGroups?: Footer4LinkGroup[];
  /** Social icon links shown in the bottom bar */
  socialLinks?: Footer4SocialLink[];
  /** Bottom bar legal / nav links */
  legalLinks?: Footer4Link[];
  /** Copyright text */
  copyright: string;
}

export function Footer4({
  logo,
  brandName,
  tagline,
  description,
  badge,
  newsletterTitle,
  newsletterSubtitle,
  newsletterPlaceholder = "you@company.com",
  newsletterButtonLabel = "Subscribe",
  linkGroups = [],
  socialLinks = [],
  legalLinks = [],
  copyright,
}: Footer4Props) {
  return (
    <footer className="bg-background w-full">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-0 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-between gap-6 lg:col-span-5 lg:pr-16">
            <div className="flex items-center gap-2">
              {logo && (
                <div className="text-foreground flex size-6 items-center justify-center">
                  {logo}
                </div>
              )}
              <span className="text-primary text-2xl font-semibold tracking-tight">
                {brandName}
              </span>
            </div>
            <div className="flex flex-col gap-5">
              {badge && (
                <Badge
                  variant="secondary"
                  className="w-fit gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {badge.icon && (
                    <span className="text-primary">{badge.icon}</span>
                  )}
                  {badge.label}
                </Badge>
              )}

              <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {tagline}
              </h2>

              {description && (
                <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="lg:border-border flex flex-col gap-12 lg:col-span-7 lg:border-l lg:pl-16">
            <div className="bg-muted/50 rounded-2xl p-8">
              <div className="mb-5 flex flex-col gap-1">
                <h3 className="text-foreground text-base font-semibold">
                  {newsletterTitle}
                </h3>
                {newsletterSubtitle && (
                  <p className="text-muted-foreground text-sm">
                    {newsletterSubtitle}
                  </p>
                )}
              </div>

              <form
                className="flex flex-col gap-2.5 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  className="bg-muted focus-visible:ring-primary w-full rounded-md border-transparent py-5 pr-32 pl-6 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.5)] outline-none focus-visible:border-none focus-visible:ring-1 dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.1)]"
                />
                <Button
                  type="submit"
                  className="border-primary shrink-0 rounded-lg px-5 py-5 text-sm font-medium shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.5)] text-shadow-2xs"
                >
                  {newsletterButtonLabel}
                </Button>
              </form>

              <p className="text-muted-foreground mt-3 text-xs">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>

            {linkGroups.length > 0 && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                {linkGroups.map((group, gi) => (
                  <div key={gi} className="flex flex-col gap-4">
                    <h4 className="text-foreground text-xs font-semibold tracking-wider uppercase">
                      {group.title}
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {group.links.map((link, li) => (
                        <li key={li}>
                          <a
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Separator className="mt-12 opacity-60" />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-muted-foreground text-xs">{copyright}</p>

          {legalLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-5">
              {legalLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
