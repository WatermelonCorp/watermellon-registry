import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface Footer5Link {
  label: string;
  href: string;
}

export interface Footer5LinkGroup {
  title: string;
  links: Footer5Link[];
}

export interface Footer5SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface Footer5ContactCta {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

export interface Footer5Props {
  logo?: ReactNode;
  brandName: string;
  topNavLabel?: string;
  socialLinks?: Footer5SocialLink[];
  contactCta?: Footer5ContactCta;
  linkGroups?: Footer5LinkGroup[];
  brandWatermark?: string;
  copyright: string;
  legalLinks?: Footer5Link[];
}

export function Footer5({
  logo,
  brandName,
  topNavLabel,
  socialLinks = [],
  contactCta,
  linkGroups = [],
  brandWatermark,
  copyright,
  legalLinks = [],
}: Footer5Props) {
  return (
    <footer className="bg-background w-full">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            {logo && <div className="text-foreground">{logo}</div>}
            <span className="text-foreground text-lg font-semibold tracking-tight">
              {brandName}
            </span>
          </div>

          <div className="flex items-center gap-5">
            {topNavLabel && (
              <span className="text-primary hidden text-sm sm:inline">
                {topNavLabel}
              </span>
            )}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    size="icon"
                    variant="outline"
                    asChild
                    className="text-foreground bg-muted hover:text-foreground h-9 w-9 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] transition-colors outline-none dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Separator className="opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {contactCta && (
            <div className="flex flex-col gap-6 lg:col-span-4">
              <h3 className="text-foreground text-sm font-semibold">
                Get in touch
              </h3>

              <a
                href={contactCta.href}
                className="group bg-muted hover:bg-muted/80 flex items-start gap-4 rounded-2xl border p-5 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] transition-colors dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
              >
                <div className="bg-primary border-primary text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)]">
                  {contactCta.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                    {contactCta.title}
                  </span>
                  <span className="text-muted-foreground text-xs leading-relaxed">
                    {contactCta.description}
                  </span>
                </div>
              </a>
            </div>
          )}

          {linkGroups.length > 0 && (
            <div className={contactCta ? "lg:col-span-8" : "lg:col-span-12"}>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
                {linkGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="flex flex-col gap-4">
                    <h4 className="text-foreground text-sm font-semibold">
                      {group.title}
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-muted-foreground hover:text-primary text-sm transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 md:px-12">
        {brandWatermark && (
          <div className="relative overflow-hidden">
            <div className="flex items-end justify-center gap-4 pt-4 pb-0 tracking-widest md:gap-6">
              {logo && (
                <div className="text-muted shrink-0">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-40 lg:w-40 [&>svg]:h-full [&>svg]:w-full">
                    {logo}
                  </div>
                </div>
              )}
              <span className="text-muted text-7xl leading-none font-bold select-none sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem]">
                {brandWatermark}
              </span>
            </div>

            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent" />
          </div>
        )}
        <div className="absolute bottom-0 flex w-full translate-y-5 flex-col items-center justify-between gap-1 px-12 sm:translate-y-0 sm:flex-row">
          <p className="text-muted-foreground text-xs">{copyright}</p>

          {legalLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
