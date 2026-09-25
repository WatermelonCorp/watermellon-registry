"use client";

import { ArrowDown } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

interface Hero23Props {
  brandName?: string;
  navLinks?: NavLink[];
  headingLine1?: string;
  headingLine2Prefix?: string;
  headingHighlight?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  topCtaLabel?: string;
  topCtaHref?: string;
  quote?: string;
  quoteAuthor?: string;
  scrollLabel?: string;
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Product", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pages", href: "#" },
  { label: "Use Cases", href: "#" },
  { label: "Contact", href: "#" },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08,
    },
  },
};

// Nav slides in from the left with a crisp spring
const navVariants: Variants = {
  hidden: { opacity: 0, x: -28, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 24, mass: 0.85 },
  },
};

// Background scales up from slightly below with a slow, cinematic settle
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.12, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 55, damping: 18, mass: 1.4 },
  },
};

// Copy reveals with a 3D perspective tilt (rotateX) — card-flipping feel
const copyVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 210, damping: 30, mass: 0.9 },
  },
};

const buttonRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
};

// Buttons pop in with an elastic overshoot
const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 22, mass: 0.75 },
  },
};

// Footer drifts up with a gentle, light bounce
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 24, mass: 1 },
  },
};

export default function Hero23({
  brandName = "Watermelon.",
  navLinks = navLinksDefault,
  headingLine1 = "Where focus",
  headingLine2Prefix = "meets",
  headingHighlight = "serenity.",
  description = "Tucked away in nature, this is more than a tennis court it's a private escape designed for uninterrupted play.",
  primaryCtaLabel = "Book a Session",
  primaryCtaHref = "#",
  secondaryCtaLabel = "Learn More",
  secondaryCtaHref = "#",
  topCtaLabel = "Learn More",
  topCtaHref = "#",
  quote = '"The peaceful setting, the pristine court, the clear mind it gives me- Serenity Court is my escape and my edge."',
  quoteAuthor = "-ALEX R, MEMBERSHIP PLAYER",
  scrollLabel = "Scroll to Discover",
  backgroundImage = "https://assets.watermelon.sh/hero-23-bg.avif",
}: Hero23Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-emerald-950 font-sans text-white antialiased">
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden px-7 py-7 sm:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.34 }}
        variants={sectionVariants}
      >
        <motion.img
          variants={imageVariants}
          src={backgroundImage}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-10 w-full items-center justify-between gap-6"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center text-lg font-medium tracking-[-0.035em] text-white transition-[transform] duration-200 ease-out active:scale-[0.96]"
          >
            {brandName}
          </a>

          <div className="hidden items-center gap-[2.8rem] lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-medium text-white transition-[color,transform] duration-300 ease-out hover:text-yellow-200 active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={topCtaHref}
            className="inline-flex min-h-10 items-center justify-center rounded-md px-6 text-sm font-medium text-yellow-300 shadow-[inset_0_0_0_1px_rgba(250,204,21,0.95)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-yellow-300/10 hover:shadow-[inset_0_0_0_1px_rgba(250,204,21,1),0_14px_34px_rgba(250,204,21,0.12)] active:scale-[0.96]"
          >
            {topCtaLabel}
          </a>
        </motion.nav>

        <div className="relative z-10 flex flex-1 flex-col justify-start pt-16 sm:pt-20 2xl:mt-30">
          <div className="max-w-4xl">
            <motion.h1
              variants={copyVariants}
              className="max-w-4xl text-[clamp(3.25rem,5.5vw,6.4rem)] leading-[1.02] font-normal tracking-tighter text-balance text-white"
            >
              <span className="block">{headingLine1}</span>
              <span className="block">
                {headingLine2Prefix}{" "}
                <span className="font-[Georgia,serif] text-[0.94em] font-normal tracking-[-0.075em] text-yellow-300 italic">
                  {headingHighlight}
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={copyVariants}
              className="mt-6 max-w-lg text-sm leading-[1.55] font-medium text-pretty text-white/70"
            >
              {description}
            </motion.p>

            <motion.div
              variants={buttonRowVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                variants={buttonVariants}
                href={primaryCtaHref}
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-yellow-300 px-6 font-sans text-sm font-medium text-sky-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_14px_30px_rgba(250,204,21,0.18),inset_0_-1px_0.5px_0_rgba(0,0,0,0.5)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-amber-200"
              >
                {primaryCtaLabel}
              </motion.a>
              <motion.a
                variants={buttonVariants}
                href={secondaryCtaHref}
                className="inline-flex min-h-11 items-center justify-center rounded-md px-6 text-sm font-medium text-yellow-300 shadow-[inset_0_0_0_1px_rgba(250,204,21,0.9)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-yellow-300/10 hover:shadow-[inset_0_0_0_1px_rgba(250,204,21,1),0_14px_34px_rgba(250,204,21,0.1)] active:scale-[0.96]"
              >
                {secondaryCtaLabel}
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.blockquote
          variants={footerVariants}
          className="absolute bottom-16 z-20 max-w-2xl px-2 text-sm leading-[1.45] font-normal text-yellow-300/70 italic sm:left-12 lg:left-16"
        >
          <p>{quote}</p>
          <footer className="mt-4 text-sm font-medium text-yellow-300/70 uppercase">
            {quoteAuthor}
          </footer>
        </motion.blockquote>

        <motion.a
          variants={footerVariants}
          href="#"
          className="absolute right-7 bottom-16 z-20 hidden min-h-10 items-center gap-3 text-sm font-normal text-yellow-300/70 transition-[opacity,transform] duration-200 ease-out hover:opacity-80 active:scale-[0.96] sm:right-12 md:inline-flex lg:right-16"
        >
          {scrollLabel}
          <ArrowDown className="size-3.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
