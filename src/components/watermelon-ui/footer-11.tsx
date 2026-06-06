import LogoIcon from '@/assets/logo-icon';
import * as React from 'react';
import {
  FaCircle,
  FaArrowUp,
  FaArrowRight,
} from 'react-icons/fa6';

export interface Footer11NavLink {
  label: string;
  href: string;
}

export interface Footer11Props {
  /** Small tagline badge text displayed at top-left */
  badgeText?: string;
  /** Large heading text in the upper section */
  heading?: string;
  /** Label above the contact email */
  contactLabel?: string;
  /** Contact email address displayed */
  contactEmail?: string;
  /** Href for the contact email link */
  contactEmailHref?: string;
  /** Navigation links displayed at bottom-right of upper section */
  navLinks?: Footer11NavLink[];
  /** Brand name displayed in the bottom section */
  brandName?: string;
  /** Custom brand logo element (SVG or ReactNode) */
  brandLogo?: React.ReactNode;
  /** Callback when scroll to top is clicked */
  onScrollToTop?: () => void;
}

export function Footer11({
  badgeText = 'Loved by Creators',
  heading = 'Want to collaborate with us, explore our tools or just curious to know more?',
  contactLabel = 'Reach out at:',
  contactEmail = 'hello@watermelon.sh',
  contactEmailHref = 'mailto:hello@watermelon.sh',
  navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  brandName = 'watermelon.io',
  brandLogo,
  onScrollToTop,
}: Footer11Props) {
  const handleScrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full overflow-hidden">
      <div className="relative bg-zinc-950 px-6 pt-8 pb-10 sm:px-10 md:px-16 lg:px-20">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <FaCircle className="h-2 w-2 fill-red-500" />
            <span className="text-md font-light text-zinc-50">{badgeText}</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="group text-md inline-flex items-center gap-1.5 font-light tracking-wide text-zinc-200 transition-colors duration-200 hover:text-zinc-200"
          >
            <span className="">Scroll to Top</span>
            <FaArrowUp className="size-4 fill-zinc-200 transition-all duration-200 group-hover:fill-zinc-200" />
          </button>
        </div>

        <div className="mt-8 max-w-lg sm:mt-10 md:mt-12">
          <h2 className="text-2xl leading-snug font-light tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="mt-20 flex flex-col gap-8 sm:mt-24 md:mt-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-lg font-light tracking-wide text-zinc-400">
              {contactLabel}
            </span>
            <a
              href={contactEmailHref}
              className="group inline-flex items-center gap-2 text-2xl font-medium text-zinc-200 transition-colors duration-200 hover:text-white"
            >
              <span>{contactEmail}</span>
              <FaArrowRight className="size-6 fill-zinc-200 transition-all duration-200 group-hover:fill-zinc-200" />
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-md font-medium text-zinc-200 transition-colors duration-200 hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative bg-zinc-950 px-6 pt-10 pb-12 sm:px-10 md:px-16 lg:px-20 lg:pt-14 lg:pb-16">
        <div className="pointer-events-none absolute right-0 bottom-0 h-full w-3/4 blur-lg sm:w-2/3">
          <div className="absolute right-0 bottom-0 h-full w-full bg-gradient-to-tl from-red-500/80 via-red-800/30 to-transparent" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-red-600/40 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-red-800/20 blur-3xl" />
        </div>


        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 overflow-hidden sm:flex-row sm:gap-8">
          <div className="hidden shrink-0 sm:block">
            {brandLogo || (
              <LogoIcon className="size-20  text-white/20 lg:size-32" />
            )}
          </div>

          <svg
            className="h-auto w-full flex-1 select-none"
            viewBox={`0 0 ${Math.max(brandName.length * 90, 400)} 100`}
            preserveAspectRatio="xMidYMid meet"
            aria-label={brandName}
          >
            <text
              x="0%"
              y="100%"
              dominantBaseline="alphabetic"
              textAnchor="start"
              textLength="90%"
              lengthAdjust="spacing"
              className="fill-white/20 font-sans font-bold tracking-tight"
              fontSize="140"
            >
              {brandName}
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
