import LogoIcon from "@/assets/logo-icon";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero37() {
  // Nav: drops from top with blur — settles fast so it doesn't steal focus
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 22, stiffness: 180, delay: 0.05 },
    },
  };

  // Background glow: fade + very subtle scale reveal
  const bgGlowVariants: Variants = {
    hidden: { opacity: 0, scale: 1.06 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0 },
    },
  };

  // Headline container: staggers each line
  const headlineContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.16, delayChildren: 0.35 },
    },
  };

  const headlineLineVariants: Variants = {
    hidden: { opacity: 0, y: 52, filter: 'blur(18px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 28, stiffness: 78, mass: 1.3 },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 26, stiffness: 105, delay: 0.95 },
    },
  };

  // CTA button: scale + fade after subtitle
  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.93 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 22, stiffness: 120, delay: 1.18 },
    },
  };

  // Stats container: staggers each stat
  const statsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 1.4 },
    },
  };

  // Each stat: rises from bottom with blur
  const statItemVariants: Variants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(7px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 24, stiffness: 100 },
    },
  };

  // Right tagline (bottom-right): fades in last
  const taglineVariants: Variants = {
    hidden: { opacity: 0, x: 18, filter: 'blur(5px)' },
    show: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 24, stiffness: 100, delay: 1.6 },
    },
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden antialiased selection:bg-white/20 selection:text-white"
      style={{ backgroundColor: '#110d0a' }}
    >
      <motion.div
        variants={bgGlowVariants}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none"
      >
        <img
          src="https://assets.watermelon.sh/bg-hero-37.avif"
          alt="Dramatic red-orange glow wave background"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="flex w-full items-center justify-between px-6 py-5 sm:px-8 md:px-12 lg:px-14"
        >
          {/* Logo — grid icon + "Visora" wordmark */}
          <div className="flex items-center gap-2.5">
            <LogoIcon className="size-8" />
            <span className="text-lg font-normal tracking-[-0.01em] text-white">
              Watermelon
            </span>
          </div>

          {/* Center nav links — hidden on mobile */}
          <nav
            className="hidden items-center gap-10 md:flex"
            aria-label="Primary navigation"
          >
            {['Pricing', 'Products', 'About', 'Features', 'Support'].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="flex min-h-[40px] items-center text-[14px] font-normal text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {link}
                </a>
              ),
            )}
          </nav>

          {/* Log in — right side, small square icon + text */}
          <div className="flex items-center gap-2.5">
            {/* Tiny square marker matching image */}
            <span
              className="inline-block size-2 shrink-0 rounded-[2px] bg-white/70"
              aria-hidden="true"
            />
            <a
              href="#login"
              className="flex min-h-[40px] items-center text-[14px] font-normal text-white/85 transition-colors duration-200 hover:text-white"
            >
              Log in
            </a>
          </div>
        </motion.nav>

        {/* ── Main hero content ─────────────────────────────────────────────────
            Left-aligned, sits roughly in the upper-left third of the viewport */}
        <main className="flex flex-1 flex-col justify-between px-6 pt-14 pb-10 sm:px-8 sm:pt-16 md:px-12 lg:px-14 lg:pt-20">
          {/* Upper content — headline, subtitle, CTA */}
          <div className="flex max-w-3xl flex-col items-start">
            {/* Headline — two lines, each animates independently */}
            <motion.h1
              variants={headlineContainerVariants}
              initial="hidden"
              animate="show"
              className="text-[2.75rem] leading-[1.06] font-normal tracking-[-0.025em] text-balance text-white sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] 2xl:text-[7rem]"
            >
              <motion.span
                variants={headlineLineVariants}
                className="block will-change-transform"
              >
                Where Innovation
              </motion.span>
              <motion.span
                variants={headlineLineVariants}
                className="block will-change-transform"
              >
                Meets Impact.
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-[400px] text-[14.5px] leading-[1.65] font-normal text-pretty text-white/65 will-change-transform sm:text-[15px] 2xl:max-w-md 2xl:text-lg"
            >
              Visora empowers teams to build, scale, and transform with
              technology that drives real results.
            </motion.p>

            {/* CTA button — white filled, dark text, arrow icon */}
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate="show"
              className="mt-8 will-change-transform"
            >
              <button className="group flex min-h-[44px] items-center gap-2.5 rounded-[5px] bg-white py-2.5 pr-4 pl-5 text-[14.5px] font-medium tracking-[-0.005em] text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.25),0_4px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.90),inset_0_-1px_0_rgba(0,0,0,0.08)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-neutral-50 hover:shadow-[0_2px_6px_rgba(0,0,0,0.30),0_8px_24px_rgba(0,0,0,0.22)] active:scale-[0.96] 2xl:text-lg">
                Request a Demo
                <ArrowRight
                  className="h-4 w-4 text-neutral-700 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </div>

          {/* ── Bottom row — stats left, tagline right ───────────────────────── */}
          <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-end sm:justify-between">
            {/* Stats row — left */}
            <motion.div
              variants={statsContainerVariants}
              initial="hidden"
              animate="show"
              className="flex gap-10 sm:gap-12"
            >
              {/* Stat 1 — Unlimited design / Request */}
              <motion.div
                variants={statItemVariants}
                className="flex flex-col gap-1.5 will-change-transform"
              >
                <div className="flex items-center gap-2">
                  {/* 2×2 dot-grid icon */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="opacity-60"
                  >
                    <circle cx="3" cy="3" r="1.5" fill="white" />
                    <circle cx="11" cy="3" r="1.5" fill="white" />
                    <circle cx="3" cy="11" r="1.5" fill="white" />
                    <circle cx="11" cy="11" r="1.5" fill="white" />
                  </svg>
                  <span className="text-[1.05rem] font-semibold tracking-[-0.01em] text-white tabular-nums">
                    Unlimited design
                  </span>
                </div>
                <span className="ml-[22px] text-[13px] font-normal text-white/45">
                  Request
                </span>
              </motion.div>

              {/* Stat 2 — 48 Hours / Delivery */}
              <motion.div
                variants={statItemVariants}
                className="flex flex-col gap-1.5 will-change-transform"
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="opacity-60"
                  >
                    <rect
                      x="2"
                      y="5.5"
                      width="10"
                      height="3"
                      rx="1"
                      fill="white"
                    />
                    <rect
                      x="5.5"
                      y="2"
                      width="3"
                      height="10"
                      rx="1"
                      fill="white"
                    />
                  </svg>
                  <span className="text-[1.05rem] font-semibold tracking-[-0.01em] text-white tabular-nums">
                    48 Hours
                  </span>
                </div>
                <span className="ml-[22px] text-[13px] font-normal text-white/45">
                  Delivery
                </span>
              </motion.div>
            </motion.div>

            {/* Bottom-right tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="show"
              className="text-md max-w-xs leading-[1.55] font-normal text-pretty text-white/90 will-change-transform sm:text-right"
            >
              Advanced design systems that take brands to new heights
            </motion.p>
          </div>
        </main>
      </div>
    </div>
  );
}
