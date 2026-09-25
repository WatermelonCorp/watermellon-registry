"use client";

import LogoIcon from "@/assets/logo-icon";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
  hasMenu?: boolean;
}

interface Hero19Props {
  brandName?: string;
  navLinks?: NavLink[];
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  bookingLabel?: string;
  bookingHref?: string;
  scrollLabel?: string;
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Features", href: "#", hasMenu: true },
  { label: "Pricing", href: "#", hasMenu: true },
  { label: "About", href: "#" },
  { label: "Resources", href: "#" },
  { label: "FAQs", href: "#" },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.14,
    },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.62, bounce: 0 },
  },
};

const copyVariants: Variants = {
  hidden: { opacity: 0, x: -22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.78, bounce: 0 },
  },
};

const buildingVariants: Variants = {
  hidden: { opacity: 0, x: 30, y: 18, scale: 1.04, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 1.08, bounce: 0 },
  },
};

const buttonRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.58, bounce: 0 },
  },
};

export default function Hero19({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  eyebrow = "We've completed over 100+ landmark projects",
  headingLine1 = "Build The Future With",
  headingLine2 = "AI-Native Products",
  description = "Build powerful digital systems and AI-driven platforms that shape how modern cities, businesses, and people move forward.",
  primaryCtaLabel = "See Our Work",
  primaryCtaHref = "#",
  secondaryCtaLabel = "Talk to our team",
  secondaryCtaHref = "#",
  bookingLabel = "Book Demo",
  bookingHref = "#",
  scrollLabel = "Scroll to Explore",
  backgroundImage = "https://assets.watermelon.sh/hero-19-bg.avif",
}: Hero19Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden font-sans text-white antialiased">
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 py-4 sm:px-9 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.36 }}
        variants={sectionVariants}
      >
        <motion.img
          variants={buildingVariants}
          src={backgroundImage}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-left sm:object-center"
        />

        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-10 w-full items-center justify-between"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center gap-2 text-lg font-semibold text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-85 active:scale-[0.96]"
          >
            <LogoIcon className="size-8 text-white" />
            {brandName}
          </a>

          <div className="hidden items-center gap-[2.15rem] lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex min-h-10 items-center gap-1.5 text-sm font-normal text-white/90 transition-[opacity,transform] duration-200 ease-out hover:opacity-100 active:scale-[0.96]"
              >
                {link.label}
                {link.hasMenu ? (
                  <ChevronDown className="size-2.5 transition-transform duration-200 ease-out group-hover:translate-y-0.5" />
                ) : null}
              </a>
            ))}
          </div>

          <a
            href={bookingHref}
            className="group inline-flex min-h-10 items-center justify-center gap-1 rounded-full bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
          >
            {bookingLabel}
            <ArrowRight className="size-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </a>
        </motion.nav>

        <div className="relative z-10 flex flex-1 items-center pt-10 pb-12 sm:pt-14 lg:pt-4">
          <div className="max-w-2xl 2xl:max-w-7xl">
            <motion.p
              variants={copyVariants}
              className="text-xs leading-none font-medium text-white/95 2xl:text-sm"
            >
              {eyebrow} <span aria-hidden="true">-&gt;</span>
            </motion.p>

            <motion.h1
              variants={copyVariants}
              className="mt-5 max-w-2xl text-[clamp(3rem,5.25vw,6rem)] leading-[1.04] font-normal tracking-[-0.055em] text-balance text-white 2xl:max-w-7xl"
            >
              <span className="block">{headingLine1}</span>
              <span className="block">{headingLine2}</span>
            </motion.h1>

            <motion.p
              variants={copyVariants}
              className="mt-5 max-w-[31rem] text-[0.78rem] leading-[1.55] font-medium text-pretty text-white/85 2xl:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              variants={buttonRowVariants}
              className="mt-7 flex flex-wrap items-center gap-5"
            >
              <motion.a
                variants={buttonVariants}
                href={primaryCtaHref}
                className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
              >
                {primaryCtaLabel}
              </motion.a>
              <motion.a
                variants={buttonVariants}
                href={secondaryCtaHref}
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-normal text-white/90 transition-[opacity,transform] duration-200 ease-out hover:opacity-100 active:scale-[0.96]"
              >
                {secondaryCtaLabel}
                <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.a
          variants={copyVariants}
          href="#"
          className="absolute right-7 bottom-6 z-20 hidden min-h-10 items-center gap-3 text-[0.73rem] font-medium text-white/85 transition-[opacity,transform] duration-200 ease-out hover:opacity-100 active:scale-[0.96] md:inline-flex lg:right-12 lg:bottom-8"
        >
          {scrollLabel}
          <ArrowDown className="size-3.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
