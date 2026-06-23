import LogoIcon from "@/assets/logo-icon";
import { motion, type Variants } from "framer-motion";
import { Search } from "lucide-react";



export default function Hero39() {


  // Nav: drops from top with blur
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 22, stiffness: 180, delay: 0.05 },
    },
  };

  // Background: slow fade in with scale down
  const bgVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0 },
    },
  };

  // Content Container for stagger
  const contentContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  // General item rise up
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 24, stiffness: 100 },
    },
  };

  // Title lines: more dramatic rise up
  const titleLineVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 28, stiffness: 80, mass: 1.2 },
    },
  };

  // Logos stagger up from the bottom
  const logosContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 1.0 },
    },
  };

  const logoItemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#7aa3c6] font-sans antialiased selection:bg-white/30 selection:text-white">
      {/* ── Background Image ──────────────────────────────────────────────── */}
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform select-none"
      >
        <img
          src="https://assets.watermelon.sh/bg-hero-39.avif"
          alt="Peaceful nature landscape painting"
          className="h-full w-full object-cover object-bottom"
        />

        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#5a86ae]/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/5" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="flex w-full items-center justify-between px-6 py-5 sm:px-8 md:px-12 lg:px-16"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 text-white">
            <LogoIcon className="size-8" />
            <span className="text-lg font-medium tracking-wide">Retreats</span>
          </div>

          {/* Links */}
          <div className="hidden items-center gap-10 md:flex">
            {['Products', 'About', 'Features', 'Support'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="flex min-h-[40px] items-center text-[14.5px] font-medium text-white/90 transition-colors duration-200 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button className="flex min-h-[40px] items-center justify-center rounded-full bg-white px-6 py-2 text-[14.5px] font-medium text-black transition-[transform,background-color] duration-150 ease-out hover:bg-white/90 active:scale-[0.96]">
            Book a call
          </button>
        </motion.nav>

        {/* ── Main Content ────────────────────────────────────────────────── */}
        <main className="flex flex-1 flex-col items-center justify-start px-6 text-center">
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full max-w-4xl flex-col items-center pt-12"
          >
            <motion.div
              variants={itemVariants}
              className="will-change-transform"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="text-xs font-medium tracking-wide text-white">
                  A peaceful place to disconnect
                </span>
              </div>
            </motion.div>

            <motion.h1 className="mt-4 text-[3rem] leading-[1.05] font-normal tracking-tight text-balance text-white sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem]">
              <motion.span
                variants={titleLineVariants}
                className="block will-change-transform"
              >
                The best place to find
              </motion.span>
              <motion.span
                variants={titleLineVariants}
                className="block will-change-transform"
              >
                your{' '}
                <span className="font-serif text-[1.05em] tracking-normal text-white/95 italic">
                  Inner Stillness
                </span>
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-md mt-3 max-w-[500px] leading-[1.6] font-normal text-pretty text-white will-change-transform"
            >
              Find an escape to reconnect with nature and your inner self. Your
              moment of clarity is waiting.
            </motion.p>

            {/* Search Input Bar */}
            <motion.div
              variants={itemVariants}
              className="mt-6 w-full max-w-[580px] will-change-transform"
            >
              {/* Outer semi-transparent ring */}
              <div className="rounded-full bg-white/20 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md">
                {/* Inner white input area */}
                <div className="flex h-[54px] w-full items-center justify-between rounded-full bg-white pr-2 pl-5 shadow-inner">
                  <div className="flex flex-1 items-center gap-3">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter a nature retreat name..."
                      className="w-full bg-transparent text-[15px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                  {/* Search Button */}
                  <button className="text-md flex h-[40px] min-h-[40px] items-center justify-center rounded-full bg-[#6B96C3] px-6 font-medium text-white shadow-[inset_0px_2px_4px_1px_rgba(255,255,255,0.3),inset_0px_-2px_4px_1px_rgba(0,0,0,0.06)] transition-[transform,background-color] duration-150 ease-out text-shadow-2xs hover:bg-[#5a86b3] active:scale-[0.96]">
                    Find Peace
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* ── Bottom Logos ────────────────────────────────────────────────── */}
        <div className="absolute right-0 bottom-8 left-0 flex w-full flex-col items-center justify-center px-6 sm:bottom-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mb-4 text-[13px] font-medium text-white/70"
          >
            Trusted by seekers of calm
          </motion.p>

          <motion.div
            variants={logosContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center justify-center gap-8 opacity-90 sm:gap-12 md:gap-16 lg:gap-20"
          >
            {/* Forbes */}
            <motion.div
              variants={logoItemVariants}
              className="will-change-transform"
            >
              <span className="font-serif text-[24px] font-bold tracking-tight text-white/90">
                Forbes
              </span>
            </motion.div>

            {/* healthline */}
            <motion.div
              variants={logoItemVariants}
              className="will-change-transform"
            >
              <span className="font-sans text-[24px] font-bold tracking-tighter text-white/90">
                healthline
              </span>
            </motion.div>

            {/* Bloomberg */}
            <motion.div
              variants={logoItemVariants}
              className="will-change-transform"
            >
              <span className="font-sans text-[22px] font-bold tracking-tight text-white/90">
                Bloomberg
              </span>
            </motion.div>

            {/* The Washington Post */}
            <motion.div
              variants={logoItemVariants}
              className="will-change-transform"
            >
              <span
                className="font-serif text-[22px] font-bold tracking-tight text-white/90"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                The Washington Post
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
