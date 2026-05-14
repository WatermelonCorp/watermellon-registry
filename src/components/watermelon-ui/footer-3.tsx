import React from "react";
import { Button } from "@/components/ui/button";

export interface Footer3LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface Footer3SocialLink {
  icon: React.ReactNode;
  href: string;
}

export interface Footer3Props {
  logo?: React.ReactNode;
  brandName?: string;
  description?: string;
  socialLinks?: Footer3SocialLink[];
  linkGroups?: Footer3LinkGroup[];
  copyright?: string;
  legalLinks?: { label: string; href: string }[];
}

export function Footer3({
  logo,
  brandName,
  description,
  socialLinks = [],
  linkGroups = [],
  copyright,
  legalLinks = [],
}: Footer3Props) {
  return (
    <footer className="w-full px-4 py-12 md:px-6">
      <div className="border-border bg-muted mx-auto max-w-7xl overflow-hidden rounded-4xl border">
        <div className="p-1">
          <div className="bg-card rounded-3xl shadow-sm">
            <div className="px-8 py-12 md:px-12 md:py-16">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                <div className="flex flex-col items-start lg:col-span-4">
                  <div className="mb-6 flex items-center gap-3">
                    {logo && <div className="text-primary">{logo}</div>}
                    {brandName && (
                      <span className="text-xl font-bold">{brandName}</span>
                    )}
                  </div>
                  {description && (
                    <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
                      {description}
                    </p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="flex items-center gap-3">
                      {socialLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          asChild
                          className="text-muted-foreground bg-muted hover:text-foreground h-10 w-10 rounded-xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] transition-colors outline-none dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                        >
                          <a
                            href={link.href}
                            target="_blank"
                            className=""
                            rel="noopener noreferrer"
                          >
                            {link.icon}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-8">
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                    {linkGroups.map((group, index) => (
                      <div key={index} className="flex flex-col gap-4">
                        <h4 className="text-foreground mb-1 text-sm font-semibold">
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
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 px-8 py-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {copyright && (
              <p className="text-muted-foreground text-sm">{copyright}</p>
            )}

            {legalLinks.length > 0 && (
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                {legalLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="bg-border h-4 w-px"></span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
