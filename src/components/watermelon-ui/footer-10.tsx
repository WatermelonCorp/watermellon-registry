import * as React from 'react';

import { Input } from '@/components/ui/input';
import {
  FaArrowRight,
} from 'react-icons/fa6';

export interface Footer10NavLink {
  label: string;
  href: string;
}

export interface Footer10LinkColumn {
  title: string;
  links: Footer10NavLink[];
}

export interface Footer10Props {
  /** Small label for the top-left banner badge */
  bannerTagline?: string;
  /** Large heading displayed inside the top dark banner */
  bannerHeading?: string;
  /** Text for the CTA button in the top banner */
  bannerCtaLabel?: string;
  /** Href for the CTA button in the top banner */
  bannerCtaHref?: string;
  /** Background image URL for the upper dark banner */
  bannerBackgroundImage?: string;
  /** Label for the contact area (e.g. "Reach out :") */
  contactLabel?: string;
  /** Contact email address */
  contactEmail?: string;
  /** Custom href for the contact email link */
  contactEmailHref?: string;
  /** Custom description text displayed on the left column */
  description?: string;
  /** Placeholder for the newsletter email input */
  newsletterPlaceholder?: string;
  /** Action handler when subscribing to the newsletter */
  onSubscribe?: (email: string) => void;
  /** Navigation links grouped into columns */
  linkColumns?: Footer10LinkColumn[];
  /** Custom brand logo or text at the bottom left */
  brandName?: string;
  /** Copyright text displayed at the bottom right */
  copyright?: string;
}

export function Footer10({
  bannerTagline = 'Trusted by Thousands',
  bannerHeading = 'Interested in working together, trying out the platform or simply learning more?',
  bannerCtaLabel = 'Learn Our Approach',
  bannerCtaHref = '#',
  bannerBackgroundImage,
  contactLabel = 'Reach out :',
  contactEmail = 'hello@watermelon.ui',
  contactEmailHref = 'mailto:hello@watermelon.ui',
  description = 'Next-generation cloud platform delivering unmatched speed, security, and scalability. Designed for developers. Engineered for the future.',
  newsletterPlaceholder = 'Email address',
  onSubscribe,
  linkColumns = [],
  brandName = 'Watermelon Corp',
  copyright = '© 2026 Watermelon Corp. All rights reserved.',
}: Footer10Props) {
  const [email, setEmail] = React.useState('');

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubscribe && email.trim()) {
      onSubscribe(email.trim());
      setEmail('');
    }
  };



  return (
    <footer className="text-foreground selection:bg-primary/20 w-full ">
      <div className="mx-auto w-full max-w-7xl bg-[#FFF6F6] pb-10">
        <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-none px-6 py-12 sm:px-12 sm:py-16 md:px-16 lg:py-20">
          {bannerBackgroundImage && (
            <img
              src={bannerBackgroundImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90 select-none outline -outline-offset-1 outline-white/20"
            />
          )}

          <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:gap-6">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="inline-flex items-center gap-1.5 rounded-full py-1 text-xs font-medium tracking-wide">
                <div className="size-2 rounded-full bg-white" />
                <span className="font-medium text-white/80">
                  {bannerTagline}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <h2 className="max-w-2xl text-2xl leading-tight font-light tracking-tight sm:text-3xl md:text-4xl">
                {bannerHeading}
              </h2>

              <div className="shrink-0">
                <a
                  href={bannerCtaHref}
                  className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <span>{bannerCtaLabel}</span>
                  <FaArrowRight className="h-3.5 w-3.5 fill-zinc-200 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-12 px-8 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between gap-2 lg:col-span-5">
            <div>
              <p className="text-lg font-medium text-zinc-600">
                {contactLabel}
              </p>

              <a
                href={contactEmailHref}
                className="group focus:ring-ring inline-flex items-baseline gap-2.5 rounded text-2xl font-medium tracking-tight text-zinc-800 transition-colors duration-200 hover:text-zinc-500 focus:ring-2 focus:outline-none sm:text-3xl"
              >
                <span>{contactEmail}</span>
                <FaArrowRight className="size-6 fill-zinc-800 transition-all duration-200 ease-in-out group-hover:translate-x-2 group-hover:fill-zinc-600" />
              </a>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-7">
            <form
              onSubmit={handleSubscribeSubmit}
              className="w-full max-w-md self-end"
            >
              <div className="border-border flex items-center justify-between border-b-2 border-zinc-200 pb-1 transition-colors duration-200 focus-within:border-zinc-500">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletterPlaceholder}
                  required
                  className="placeholder:text-muted-foreground/60 h-10 w-full rounded-none border-0 bg-transparent px-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Subscribe to our newsletter"
                />

                <button
                  type="submit"
                  className="group text-muted-foreground hover:text-primary focus:ring-primary/40 rounded p-2 transition-colors duration-200 focus:ring-2 focus:outline-none"
                  aria-label="Submit newsletter subscription"
                >
                  <FaArrowRight className="fill-muted-foreground group-hover:fill-primary h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>

            {linkColumns.length > 0 && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
                {linkColumns.map((column) => (
                  <div key={column.title} className="flex flex-col">
                    <h3 className="text-zinc-900 text-sm font-medium tracking-wide uppercase">
                      {column.title}
                    </h3>

                    <ul className="mt-4 flex flex-col gap-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground focus:ring-primary/40 rounded text-sm transition-colors duration-200 focus:ring-2 focus:outline-none"
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

        <div className="mt-16 flex flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-zinc-900 text-md font-medium">
            {brandName}
          </span>

          <span className="text-md font-semibold text-zinc-900">
            {copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
