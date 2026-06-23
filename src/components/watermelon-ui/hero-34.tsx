import LogoIcon from "@/assets/logo-icon";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  MessageSquareMore, 
  Globe, 
  ChevronDown,
  ArrowDown
} from "lucide-react";

export default function Hero34() {
  // Nav: fades+slides down, fast
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -14, filter: 'blur(5px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 20, stiffness: 160, delay: 0.05 },
    },
  };

  // Social proof + subtitle: gentle fade up
  const supportVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1, y: 0,
      transition: { type: 'spring', damping: 24, stiffness: 100 },
    },
  };

  // Title: split into two lines, each slides up with blur, staggered
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };
  const titleLineVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 30, stiffness: 90, mass: 1.2 },
    },
  };

  // Subtitle + CTA: delayed after title settles
  const bodyContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.13, delayChildren: 0.85 },
    },
  };
  const bodyItemVariants: Variants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 22, stiffness: 110 },
    },
  };

  // Footer: each column fades up, very late
  const footerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 1.3 },
    },
  };
  const footerItemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1, y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 130 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans antialiased selection:bg-green-200 selection:text-green-900">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://assets.watermelon.sh/hero-34-bg.avif"
          alt="Nature landscape"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-8 py-6"
        >
          <div className="group flex cursor-pointer items-center gap-2 text-[#2C3329]">
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <LogoIcon className="h-7 w-7" />
            </motion.div>
            <span className="text-xl font-normal tracking-tight">
              Watermelon
            </span>
          </div>

          <div className="hidden items-center gap-10 text-sm font-medium text-[#41483E] md:flex">
            {['Journey', 'Our Story', 'What We Offer', 'Connect'].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  className="flex min-h-[40px] items-center transition-colors hover:text-black"
                >
                  {link}
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-6">
            <button className="group hidden min-h-[40px] items-center gap-1.5 text-[14px] font-medium text-[#41483E] transition-colors hover:text-black sm:flex">
              <Globe className="h-4 w-4 opacity-70" />
              <span>EN</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
            </button>
            <button className="flex min-h-[40px] items-center gap-2 rounded-sm bg-[#343F33] px-5 py-2.5 text-[14px] font-medium text-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all will-change-transform hover:bg-[#252D24] active:scale-[0.96]">
              Log In
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.nav>

        {/* Main Hero Content */}
        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-8 pt-10 pb-24">
          <div className="flex max-w-5xl flex-col items-start">
            {/* Social proof — fades up first */}
            <motion.div
              variants={supportVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="flex -space-x-2.5">
                {[
                  'https://assets.watermelon.sh/wm_ben.png',
                  'https://assets.watermelon.sh/wm_alex.png',
                  'https://assets.watermelon.sh/wm_olivia.png',
                  'https://assets.watermelon.sh/wm_mia.png',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-[#FAF9F5] shadow-sm ring-1 ring-black/10"
                  >
                    <img
                      src={src}
                      alt={`Customer ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-normal tracking-tight text-stone-800">
                +20K Happy Customers
              </p>
            </motion.div>

            {/* Headline — two lines staggered, large blur+rise */}
            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="show"
              className="mb-6 max-w-4xl text-[4rem] leading-[1.05] font-normal tracking-[-0.02em] text-stone-700 sm:text-[4.5rem]"
            >
              <motion.span variants={titleLineVariants} className="block">
                Calm by Nature
              </motion.span>
              <motion.span variants={titleLineVariants} className="block">
                Elegant by Experience
              </motion.span>
            </motion.h1>

            {/* Subtitle + CTA — delayed after headline */}
            <motion.div
              variants={bodyContainerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start gap-10"
            >
              <motion.p
                variants={bodyItemVariants}
                className="max-w-lg text-lg leading-[1.4] font-normal text-pretty text-stone-600 sm:text-[1.3rem]"
              >
                Crafted to bring balance, clarity, and subtle elegance into your
                everyday digital experience.
              </motion.p>

              <motion.div
                variants={bodyItemVariants}
                className="flex flex-wrap items-center gap-6"
              >
                <button className="group flex min-h-[40px] items-center gap-2 rounded-sm bg-[#343F33] px-7 py-4 text-[16px] font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition-all will-change-transform hover:bg-[#252D24] active:scale-[0.96]">
                  Discover More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button className="group flex min-h-[40px] items-center gap-3 rounded-sm px-4 py-4 text-[16px] font-medium text-[#2C3329] transition-all will-change-transform hover:opacity-80 active:scale-[0.96]">
                  Watch Demo
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2C3329] text-white shadow-md transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Footer Features */}
        <motion.div
          variants={footerContainerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-[1600px] flex-col items-end justify-between gap-10 px-8 pb-10 md:px-16 lg:flex-row"
        >
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-16 lg:w-3/4">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                variants={footerItemVariants}
                className="flex flex-col gap-3"
              >
                <MessageSquareMore className="h-6 w-6 stroke-[1.5] text-stone-800" />
                <p className="max-w-[200px] text-[14px] leading-snug font-medium text-pretty text-stone-900">
                  Everyone needs a Cofounder, not everyone has one.
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={footerItemVariants}
            className="group flex cursor-pointer items-center gap-2 pb-2 text-sm font-medium text-stone-800"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
