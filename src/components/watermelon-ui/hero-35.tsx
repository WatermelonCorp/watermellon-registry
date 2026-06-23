import LogoIcon from "@/assets/logo-icon";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero35() {
  // Nav: slides down from top with blur, fast spring
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -18, filter: 'blur(6px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 22, stiffness: 150, delay: 0.1 },
    },
  };

  // Title: word-by-word cascade — each word rises from below with blur
  const titleWords = ["The", "Future", "of", "Digital", "Influence"];
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.4 },
    },
  };
  const titleWordVariants: Variants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(10px)', rotateX: 8 },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0,
      transition: { type: 'spring', damping: 26, stiffness: 95, mass: 1.1 },
    },
  };

  // Stats row: fades in from bottom, delayed after title
  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 24, stiffness: 110, delay: 1.05 },
    },
  };

  // Right column: body text then CTA, staggered
  const rightContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.75 },
    },
  };
  const rightItemVariants: Variants = {
    hidden: { opacity: 0, x: 20, filter: 'blur(5px)' },
    show: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 20, stiffness: 100, mass: 0.9 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans antialiased selection:bg-white/30 selection:text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.watermelon.sh/hero-35-bg.avif"
          alt="Magical landscape"
          className="h-full w-full object-cover"
        />
        {/* Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>


      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1800px] flex-col justify-between px-6 py-6 md:px-12">

        {/* Navigation — drops from top */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between"
        >
          <div className="group flex cursor-pointer items-center gap-2 text-white">
            <LogoIcon className="size-8" />
            <span className="text-lg font-medium tracking-wide">Watermelon</span>
          </div>

          <div className="hidden items-center gap-10 text-[13px] font-medium tracking-[0.05em] text-white/80 md:flex">
            {['HOME', 'ABOUT US', 'CATALOG', 'SHOP', 'FEATURES'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="flex min-h-[40px] items-center transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>

          <button className="group flex min-h-[40px] items-center gap-2 rounded-full bg-zinc-200 px-6 py-2.5 text-[14px] font-medium text-black shadow-[inset_0_-2px_0px_rgba(0,0,0,0.2),inset_0_2px_0px_rgba(255,255,255,0.2)] transition-all will-change-transform hover:bg-white/90 active:scale-[0.96]">
            Book Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.nav>

        {/* Bottom Content Area */}
        <div className="flex flex-col items-end justify-between gap-12 pb-8 lg:flex-row">

          {/* Left Column */}
          <div className="flex w-full flex-col gap-12 lg:w-1/2" style={{ perspective: '800px' }}>
            {/* Title: word-by-word cascade */}
            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="show"
              className="text-[3.5rem] leading-[1.05] font-normal tracking-tight text-white sm:text-[5rem]"
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={titleWordVariants}
                  className="mr-[0.22em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Stats — fades in after title settles */}
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="show"
              className="flex gap-12 sm:gap-16"
            >
              {[
                { value: '48 Hours', label: 'Delivery' },
                { value: '62 Hours', label: 'Request' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-80">
                      <circle cx="4" cy="4" r="1.5" />
                      <circle cx="12" cy="4" r="1.5" />
                      <circle cx="4" cy="12" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                    </svg>
                    <span className="text-[1.25rem] font-medium tracking-wide tabular-nums">{value}</span>
                  </div>
                  <span className="ml-6 text-[14px] font-medium tracking-wide text-white/60">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — slides in from right, staggered */}
          <motion.div
            variants={rightContainerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col items-start gap-8 lg:w-[450px] lg:items-start"
          >
            <motion.p
              variants={rightItemVariants}
              className="text-[1.125rem] leading-[1.6] font-normal text-pretty text-white/90"
            >
              Turn your vision into reality with powerful tools designed for
              creators, builders, and dreamers. Start faster, grow smarter, and
              build something extraordinary.
            </motion.p>

            <motion.button
              variants={rightItemVariants}
              className="group flex min-h-[40px] items-center gap-2 rounded-full bg-zinc-200 px-7 py-3.5 text-[15px] font-medium text-black shadow-[inset_0_-2px_0px_rgba(0,0,0,0.2),inset_0_2px_0px_rgba(255,255,255,0.2)] transition-all will-change-transform hover:bg-white/90 active:scale-[0.96]"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
