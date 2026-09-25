"use client";

import LogoIcon from "@/assets/logo-icon";
import { ChevronDown, Monitor, Sofa } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface FeatureItem {
  icon: "sofa" | "monitor";
  title: string;
  subtitle: string;
}

interface Hero26Props {
  brandName?: string;
  navLinks?: NavLink[];
  starCount?: number;
  socialProofLabel?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  appleHref?: string;
  androidHref?: string;
  bookDemoLabel?: string;
  bookDemoHref?: string;
  features?: FeatureItem[];
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Features", href: "#", hasDropdown: true },
  { label: "Company", href: "#", hasDropdown: true },
  { label: "Customers", href: "#" },
  { label: "Security", href: "#" },
  { label: "Resources", href: "#", hasDropdown: true },
];

const featuresDefault: FeatureItem[] = [
  {
    icon: "sofa",
    title: "Premium Comfort",
    subtitle: "Relax in spacious, luxurious seating",
  },
  {
    icon: "monitor",
    title: "Stunning Views",
    subtitle: "Marvel at the world from new heights",
  },
  {
    icon: "sofa",
    title: "Premium Comfort",
    subtitle: "Relax in spacious, luxurious seating",
  },
  {
    icon: "monitor",
    title: "Stunning Views",
    subtitle: "Marvel at the world from new heights",
  },
];

const iconMap = {
  sofa: Sofa,
  monitor: Monitor,
};

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

const bgVariants: Variants = {
  hidden: { opacity: 0, x: 30, scale: 1.04 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.7 },
  },
};

const starsVariants: Variants = {
  hidden: { opacity: 0, x: -16, scale: 0.88 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, mass: 0.75 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 40, x: -8 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: "spring", stiffness: 160, damping: 24, mass: 1.2 },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 30, mass: 0.9 },
  },
};

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 450, damping: 26, mass: 0.6 },
  },
};

const ctaGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

const featureStripVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

const featureCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
  },
};

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.17-.38.54-.21.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
    </svg>
  );
}

export default function Hero26({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  starCount = 5,
  socialProofLabel = "Over 3k+ Creators",
  headingLine1 = "The Silent Horizon",
  description = "Find peace, clarity, and direction as you move forward on your journey. Embrace every step with confidence.",
  primaryCtaLabel = "Book a demo",
  primaryCtaHref = "#",
  appleHref = "#",
  androidHref = "#",
  bookDemoLabel = "Book a demo",
  bookDemoHref = "#",
  features = featuresDefault,
  backgroundImage = "https://assets.watermelon.sh/hero-26-bg.avif",
}: Hero26Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-slate-900 font-sans text-white antialiased">
      {/* ── Background image ──────────────────────────────────────────── */}
      <motion.img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        variants={bgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      />
      <div className="absolute inset-0 h-full w-full bg-black/25"></div>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <motion.div
        className="relative flex min-h-screen w-full flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        variants={sectionVariants}
      >
        {/* ── Navigation ──────────────────────────────────────────────── */}
        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-14 w-full items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-14"
        >
          {/* Brand */}
          <a
            href="#"
            className="inline-flex min-h-10 items-center gap-2 text-lg font-medium tracking-tight text-white transition-opacity duration-200 hover:opacity-75"
          >
            <LogoIcon className="size-8 text-white" />
            {brandName}
          </a>

          {/* Center nav */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center gap-0.5 text-[0.875rem] font-normal text-white/80 transition-[color,transform] duration-200 hover:text-white active:scale-[0.96]"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    className="ml-0.5 size-3.5 opacity-70"
                    strokeWidth={2}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Book a demo CTA */}
          <a
            href={bookDemoHref}
            className="inline-flex min-h-10 items-center justify-center rounded-none border border-white/80 bg-white px-5 text-sm font-normal text-black shadow-xs transition-[background-color,border-color,transform] duration-200 hover:border-white hover:bg-white/90 active:scale-[0.96]"
          >
            {bookDemoLabel}
          </a>
        </motion.nav>

        {/* ── Hero content ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-1 flex-col px-6 pt-10 pb-0 sm:px-10 lg:px-14 2xl:pt-40">
          {/* Stars + social proof */}
          <motion.div variants={starsVariants} className="flex flex-col gap-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: starCount }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-6 text-white"
                  aria-hidden="true"
                >
                  <path d="M8 1.5l1.75 3.54 3.91.57-2.83 2.75.67 3.89L8 10.27l-3.5 1.98.67-3.89L2.34 5.6l3.91-.57z" />
                </svg>
              ))}
            </div>
            <p className="text-md font-normal tracking-wide text-white/80">
              {socialProofLabel}
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={headingVariants}
            className="mt-4 max-w-md text-[clamp(2.8rem,5vw,6.5rem)] leading-[1.02] font-normal tracking-[-0.025em] text-balance text-white sm:max-w-2xl"
          >
            {headingLine1}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={subtitleVariants}
            className="text-md mt-5 max-w-sm leading-[1.55] font-normal text-pretty text-white/80 sm:max-w-md"
          >
            {description}
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={ctaGroupVariants}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <motion.a
              variants={ctaItemVariants}
              href={primaryCtaHref}
              className="inline-flex min-h-10 items-center justify-center rounded-none border border-white/80 bg-white px-5 text-sm font-normal text-black shadow-xs transition-[background-color,border-color,transform] duration-200 hover:border-white hover:bg-white/90 active:scale-[0.96]"
            >
              {primaryCtaLabel}
            </motion.a>

            {/* Apple icon */}
            <motion.a
              variants={ctaItemVariants}
              href={appleHref}
              aria-label="Download on the App Store"
              className="inline-flex size-10 items-center justify-center rounded-full text-white"
            >
              <AppleIcon className="size-full" />
            </motion.a>

            <motion.a
              variants={ctaItemVariants}
              href={androidHref}
              aria-label="Download on Google Play"
              className="inline-flex size-10 items-center justify-center text-white"
            >
              <AndroidIcon className="size-full" />
            </motion.a>
          </motion.div>
        </div>

        {/* ── Bottom feature strip ─────────────────────────────────────── */}
        <motion.div
          variants={featureStripVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="relative z-20 mt-auto mb-10 grid grid-cols-2 place-items-center sm:grid-cols-4"
        >
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={`${feature.title}-${i}`}
                variants={featureCardVariants}
                className="hidden items-start gap-3 px-5 py-4 sm:px-6 sm:py-5 md:flex"
              >
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-white/20 text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="leading-none">
                  <span className="text-md block font-normal text-white">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-sm leading-[1.4] font-normal text-white/80">
                    {feature.subtitle}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
