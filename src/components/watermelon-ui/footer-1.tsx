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

export interface Footer1Props {
  logo: React.ReactNode;
  brandName: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  linkGroups: FooterLinkGroup[];
  copyright: string;
}

export function Footer1({
  logo,
  brandName,
  newsletterTitle,
  newsletterDescription,
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Subscribe",
  linkGroups,
  copyright,
}: Footer1Props) {
  return (
    <footer className=" w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-background mx-auto max-w-7xl rounded-none border p-8 shadow-sm sm:p-12">
        <div className="flex flex-col justify-between gap-12 xl:flex-row xl:gap-24">
          <div className="shrink-0 space-y-8 xl:w-[400px]">
            <div className="flex items-center gap-2">
              <div className="text-primary">{logo}</div>
              <span className="text-xl font-semibold">{brandName}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-foreground font-medium">{newsletterTitle}</h3>
              <form
                className="relative flex max-w-sm items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  className="bg-muted focus-visible:ring-primary w-full rounded-none border-transparent py-6 pr-32 pl-6 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] outline-none focus-visible:border-none focus-visible:ring-1 dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                />
                <Button
                  type="submit"
                  className="border-primary absolute right-1.5 h-9 rounded-none px-5 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.5)]"
                >
                  {newsletterButtonText}
                </Button>
              </form>
              <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
                {newsletterDescription}
              </p>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
            {linkGroups.map((group, idx) => (
              <div key={idx} className="space-y-5">
                <h4 className="text-foreground text-sm font-medium">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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

        <div className="mt-16 flex items-center justify-center border-t pt-8">
          <p className="text-muted-foreground text-center text-xs">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
