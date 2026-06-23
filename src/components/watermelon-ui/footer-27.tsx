"use client";

import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Facebook01Icon,
  NewTwitterIcon,
  InstagramIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";
import LogoIcon from "@/assets/logo-icon";


const footerColumns = [
  {
    title: "SOLUTIONS",
    links: [
      { label: "Transactional Emails", href: "#" },
      { label: "Marketing Emails", href: "#" },
      { label: "Email Automation", href: "#" },
      { label: "Email Builder", href: "#" },
      { label: "SMTP", href: "#" },
    ],
  },
  {
    title: "DOCS",
    links: [
      { label: "Getting Started", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Transactional Emails", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Glossary", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Fair Use", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Subprocessors", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const socialIcons = [
  { icon: Facebook01Icon, label: "Facebook" },
  { icon: NewTwitterIcon, label: "Twitter" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: Linkedin01Icon, label: "LinkedIn" },
];


const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Parent stagger container — staggers children with 100ms spacing.
 * Skill: Split & Stagger Enter Animations.
 */
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/**
 * Each staggered child rises up with opacity + blur — the canonical
 * "enter" combination from the animations skill.
 */
const riseUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 28, mass: 0.9 },
  },
};

/**
 * Tighter stagger for nav column links — 35ms feels like a cascade.
 */
const linkCascade: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.04 },
  },
};

const linkTrickle: Variants = {
  hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 350, damping: 30, mass: 0.6 },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Wordmark slams up with spring inertia — heavier mass makes it
 * feel weighty, matching the massive type scale.
 */
const wordmarkSlam: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 22, mass: 2.2 },
  },
};



export default function Footer27() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-[#0a0a0a] font-sans antialiased selection:bg-white selection:text-black"
      aria-label="Site footer"
    >
      <div className="relative w-full">
        <motion.img
          src="https://assets.watermelon.sh/footer-25.avif"
          alt="Dramatic golden-hour sunset over a mountain lake surrounded by pine trees"
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          /* Image outline — dark mode: pure white, never tinted (Skill: Image Outlines) */
          className="h-[300px] w-full object-cover object-center outline outline-1 -outline-offset-1 outline-white/10 sm:h-[360px] md:h-[420px] lg:h-[500px]"
        />

        {/* Gradient: transparent → solid dark. Pulls the image into the footer. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.6) 70%, #0a0a0a 100%)',
          }}
        />

        {/* Overlay text on the image */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16"
        >
          <motion.h2
            variants={riseUp}
            /* text-balance: even line lengths on short headings (Skill: Text Wrapping) */
            className="max-w-xs text-3xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-white sm:max-w-sm sm:text-4xl md:max-w-md md:text-5xl"
          >
            The future of work
            <br />
            is adaptive.
          </motion.h2>

          <motion.p
            variants={riseUp}
            /* text-pretty: prevents orphans in body text (Skill: Text Wrapping) */
            className="mt-3 max-w-[270px] text-sm leading-relaxed text-pretty text-white/65 sm:text-[15px]"
          >
            Flowwork helps distributed teams understand patterns and build
            smarter work systems without extra complexity.
          </motion.p>

          <motion.div variants={riseUp} className="mt-5">
            {/*
              Scale-on-press (Skill): active:scale-[0.96] — never below 0.95.
              Transition-specific (Skill): transition-[background-color,box-shadow,transform]
              Concentric radius (Skill): outer rounded-full, inner icon span is rounded-full
              with 2px internal padding — effectively rounded-full matches at this scale.
            */}
            <motion.a
              href="#"
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-medium text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-[background-color,box-shadow] duration-200 hover:bg-white/90 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.4)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              Contact Us
              {/*
                Concentric border radius: inner circle is rounded-full with 6px padding
                inside the outer rounded-full. outerRadius=∞ → inner can also be ∞.
                Optical: icon side has 2px less padding (pr-1.5 vs pl-5).
              */}
              <span className="flex size-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 group-hover:translate-x-0.5">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Main Footer Content ─────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-10 pb-0 sm:px-8 md:px-12 lg:px-16">
        {/* 12-column grid: 3 brand | 6 nav | 3 social */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand block — 3 cols */}
          <motion.div
            variants={riseUp}
            className="flex flex-col gap-5 sm:col-span-2 lg:col-span-3"
          >
            <div className="flex items-center gap-2.5">
              <LogoIcon className="size-9 flex-shrink-0" />
              <span className="font-mdium text-lg tracking-[0.05em] text-white uppercase select-none">
                Watermelon
              </span>
            </div>

            <p className="max-w-[210px] text-[13px] leading-relaxed text-pretty text-neutral-400">
              Crafting experiences that inspire and leave a lasting impact
            </p>

            <motion.a
              href="#"
              whileTap={{ scale: 0.96 }}
              /*
                Shadow-over-border (Skill): box-shadow ring instead of solid border.
                Dark mode: white ring at low opacity.
              */
              className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.35)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              Let&apos;s Connect
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </motion.a>
          </motion.div>

          {/* Navigation columns — 6 cols */}
          <motion.nav
            variants={staggerContainer}
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-6 lg:ml-8"
          >
            {footerColumns.map((col) => (
              <motion.div
                key={col.title}
                variants={riseUp}
                className="flex flex-col gap-4"
              >
                <h3 className="text-sm font-semibold tracking-[0.1em] text-balance text-white uppercase">
                  {col.title}
                </h3>

                <motion.ul
                  variants={linkCascade}
                  className="flex flex-col gap-[10px]"
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkTrickle}>
                      <a
                        href={link.href}
                        className="inline-block text-[13px] leading-snug text-pretty text-neutral-400 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            variants={riseUp}
            className="flex flex-col gap-4 lg:col-span-3"
          >
            <h3 className="text-xl font-semibold text-balance text-white">
              Stay Connected
            </h3>
            <p className="max-w-[220px] text-[13px] leading-relaxed text-pretty text-neutral-400">
              Follow us for updates, insights and a dose of inpiration
            </p>

            <div className="flex items-center gap-2">
              {socialIcons.map(({ icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileTap={{ scale: 0.96 }}
                  className="flex size-10 items-center justify-center rounded-full bg-white/5 text-neutral-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[background-color,color,box-shadow] duration-150 hover:bg-white/10 hover:text-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  <HugeiconsIcon icon={icon} className="size-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-5 pb-6 text-[13px] text-neutral-500 sm:flex-row sm:items-center"
        >
          <p className="leading-none tabular-nums">
            © 2026 Watermelon, Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 leading-none">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="transition-colors duration-150 hover:text-neutral-200 focus-visible:text-neutral-200 focus-visible:outline-none"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Massive Wordmark ────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" aria-hidden="true">
        <motion.div
          variants={wordmarkSlam}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex w-full items-end select-none"
        >
          {/* Decorative logo icon — sits to the left of wordmark text */}
          <div className="flex-shrink-0 self-end px-4 pb-0 sm:px-6 lg:px-8">
          
          </div>  <LogoIcon className="from-[#6b6b6b] to-[#191919] h-[90px] w-auto bg-gradient-to-b text-transparent sm:h-[120px] md:h-[120px] lg:h-[160px] xl:h-[180px] bg-clip-text" />

          {/* LUNORA wordmark with gradient fill */}
          <div className="flex-1 overflow-hidden">
            <svg
              className="h-auto w-full"
              viewBox="0 0 870 170"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="wm-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="#6b6b6b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#191919" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="90%"
                dominantBaseline="auto"
                textAnchor="middle"
                textLength="870"
                lengthAdjust="spacingAndGlyphs"
                fontSize="175"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                letterSpacing="-0.025em"
                fill="url(#wm-gradient)"
              >
                Watermelon
              </text>
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
