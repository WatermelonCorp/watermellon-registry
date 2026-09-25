"use client";

import LogoIcon from "@/assets/logo-icon";
import { Search } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

interface Hero18Props {
  brandName?: string;
  navLinks?: NavLink[];
  headingPrefix?: string;
  headingMiddle?: string;
  headingHighlight?: string;
  description?: string;
  searchPlaceholder?: string;
  searchButtonLabel?: string;
  searchAction?: string;
  ctaLabel?: string;
  ctaHref?: string;
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
      delayChildren: 0.16,
    },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -14, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.7, bounce: 0 },
  },
};

const skylightVariants: Variants = {
  hidden: { opacity: 0, y: -18, scale: 0.96, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 1.05, bounce: 0 },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.75, bounce: 0 },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.85, bounce: 0 },
  },
};

export default function Hero18({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  headingPrefix = "The best place to find",
  headingMiddle = "your",
  headingHighlight = "Inner Stillness",
  description = "Find an escape to reconnect with nature and your inner self. Your moment of clarity is waiting.",
  searchPlaceholder = "Search your quiet escape...",
  searchButtonLabel = "Find Peace",
  searchAction = "#",
  ctaLabel = "Book a call",
  ctaHref = "#",
  backgroundImage = "https://assets.watermelon.sh/hero-18-bg.avif",
}: Hero18Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black font-sans text-white antialiased">
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden px-5 py-3 sm:px-8 lg:px-9"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={sectionVariants}
      >
        <motion.img
          variants={skylightVariants}
          src={backgroundImage}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />

        <motion.nav
          variants={navVariants}
          className="relative z-20 mx-auto flex h-12 w-full max-w-7xl items-center justify-between"
        >
          <a
            href="#"
            className="group inline-flex min-h-10 items-center gap-2.5 text-lg leading-none font-medium tracking-[-0.035em] text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-80 active:scale-[0.96]"
          >
            <LogoIcon className="size-8 text-[#a96b5c]" />
            <span className="font-[Georgia,serif]">{brandName}</span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-normal text-neutral-100/90 transition-[color,transform] duration-200 ease-out hover:text-white active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={ctaHref}
            className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full bg-[#a96b5c] px-5 text-sm font-normal text-white shadow-[inset_0_-4px_12px_0_rgba(0,0,0,0.15),inset_0_4px_12px_0_rgba(255,255,255,0.15),0_0_2px_1px_rgba(0,0,0,0.1),0_2px_4px_0px_rgba(0,0,0,0.1)] ring ring-[#b77767] transition-[background-color,transform] duration-200 ease-out hover:bg-[#b77767] active:scale-[0.96]"
          >
            {ctaLabel}
          </a>
        </motion.nav>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center pt-[18.3rem] pb-14 text-center sm:pt-[20.6rem] md:pt-[18.8rem] lg:pt-[18.2rem] 2xl:max-w-7xl">
          <motion.h1
            variants={riseVariants}
            className="max-w-5xl text-[clamp(2.55rem,5vw,6.25rem)] leading-[0.97] font-light tracking-[-0.045em] text-balance text-white 2xl:max-w-7xl"
          >
            <span className="block">{headingPrefix}</span>
            <span className="block">
              {headingMiddle}{" "}
              <span className="font-[Georgia,serif] font-normal tracking-[-0.055em] text-[#a06355] italic">
                {headingHighlight}
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={riseVariants}
            className="text-md leading-wide mt-4 max-w-lg font-normal text-pretty text-neutral-100/80"
          >
            {description}
          </motion.p>

          <motion.form
            variants={formVariants}
            action={searchAction}
            className="mt-8 flex h-12 w-full max-w-sm items-center gap-2 rounded-full bg-neutral-100 py-1.5 pr-1 pl-1.5 text-neutral-950 shadow-[0_20px_70px_rgba(0,0,0,0.38),0_0_0_1px_rgba(255,255,255,0.1),inset_0_2px_4px_1px_rgba(255,255,255,4)]"
          >
            <label className="sr-only" htmlFor="hero-18-search">
              Search escapes
            </label>
            <Search
              className="ml-2.5 size-4 shrink-0 text-neutral-500"
              aria-hidden="true"
            />
            <input
              id="hero-18-search"
              name="q"
              type="search"
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm font-normal text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-10.5 shrink-0 items-center justify-center rounded-full bg-[#a96b5c] px-5 text-sm font-normal text-white shadow-[inset_0_-4px_12px_0_rgba(0,0,0,0.15),inset_0_4px_12px_0_rgba(255,255,255,0.15),0_0_2px_1px_rgba(0,0,0,0.1),0_2px_4px_0px_rgba(0,0,0,0.1)] ring ring-[#b77767] transition-[background-color,transform] duration-200 ease-out hover:bg-[#b77767] active:scale-[0.96]"
            >
              {searchButtonLabel}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
