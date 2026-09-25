"use client";

import LogoIcon from "@/assets/logo-icon";
import { ArrowRight, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

interface Hero25Props {
  brandName?: string;
  navLinks?: NavLink[];
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  signupLabel?: string;
  signupHref?: string;
  socialProofText?: string;
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Products", href: "#" },
  { label: "About", href: "#" },
  { label: "Features", href: "#" },
  { label: "Support", href: "#" },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.07 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 340, damping: 26, mass: 0.75 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 28, mass: 1.1 },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 30, mass: 0.9 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 24, mass: 0.65 },
  },
};

const socialProofVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 },
  },
};

export default function Hero25({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  headingLine1 = "Build focus and move",
  headingLine2 = "a with purpose",
  description = "Discover a simpler way to move forward — where focus, balance, and purpose guide every step you take.",
  ctaLabel = "Learn more",
  ctaHref = "#",
  signupLabel = "Sign up",
  signupHref = "#",
  socialProofText = "Trusted by over 20k users",
  backgroundImage = "https://assets.watermelon.sh/hero-25-bg.avif",
}: Hero25Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-zinc-100 font-sans antialiased">
      {/* Background image */}
      <motion.img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        variants={bgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      />

      {/* Subtle top-to-bottom gradient overlay to keep text legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-black/10" />

      {/* Main layout */}
      <motion.div
        className="relative flex min-h-screen w-full flex-col px-5 py-4 sm:px-8 lg:px-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
      >
        {/* ── Navigation ────────────────────────────────────────────────── */}
        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-10 w-full items-center justify-between gap-4"
        >
          {/* Brand */}
          <a
            href="#"
            className="inline-flex min-h-10 items-center gap-2 text-lg font-medium text-zinc-100 transition-opacity duration-200 hover:opacity-75"
          >
            <LogoIcon className="size-8 text-zinc-100" />
            {brandName}
          </a>

          {/* Center nav links */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-medium text-zinc-100 transition-[opacity,transform] duration-200 hover:opacity-80 active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Sign up CTA */}
          <a
            href={signupHref}
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-zinc-50 px-5 text-sm font-medium text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(255,255,255,1)] backdrop-blur-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.10)] active:scale-[0.96]"
          >
            {signupLabel}
          </a>
        </motion.nav>

        {/* ── Hero content ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-start pt-14 sm:pt-16 md:pt-14">
          {/* Heading */}
          <motion.h1
            variants={headingVariants}
            className="max-w-md text-center text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.03] font-medium tracking-[-0.032em] text-balance text-zinc-900 sm:max-w-xl md:max-w-4xl 2xl:max-w-7xl"
          >
            <span className="block">{headingLine1}</span>
            <span className="block">{headingLine2}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={subtitleVariants}
            className="mt-5 max-w-xs text-center text-sm leading-[1.5] font-medium text-pretty text-zinc-700 sm:max-w-sm 2xl:text-lg"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.a
            variants={ctaVariants}
            href={ctaHref}
            className="group mt-7 inline-flex min-h-11 items-center justify-between gap-0 overflow-hidden rounded-full bg-zinc-50 pr-1 pl-5 text-sm font-medium text-zinc-900 shadow-[0_2px_12px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,1)] transition-[box-shadow,transform] duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-[0.97]"
          >
            <span className="pr-3">{ctaLabel}</span>
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-yellow-400 text-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.10)] transition-[background-color,transform] duration-300">
              <ArrowRight className="size-4 stroke-[2.25]" />
            </span>
          </motion.a>
        </div>

        {/* ── Social proof — bottom-left ────────────────────────────────── */}
        <motion.div
          variants={socialProofVariants}
          className="absolute bottom-6 left-5 z-20 flex items-center gap-2.5 sm:bottom-7 sm:left-8 lg:left-14"
        >
          {/* Avatar cluster icon */}
          <div className="inline-flex size-8 items-center justify-center rounded-full bg-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-sm">
            <Users className="size-[0.875rem] text-zinc-600" />
          </div>
          <span className="text-[0.75rem] font-medium text-zinc-800 drop-shadow-sm">
            {socialProofText}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
