
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { ArrowRight, Blocks, Command, Sparkles, Workflow, Zap } from 'lucide-react';
import LogoIcon from '@/assets/logo-icon';

interface Hero31Props {
    logoText?: string;
    navItems?: string[];
    signUpText?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    trustedByText?: string;
    backgroundImage?: string;
}

export default function Hero31({
    logoText = "Watermelon",
    navItems = ['Product', 'About Us', 'Features', 'FAQ', 'Contact'],
    signUpText = "Sign up",
    title = "Innovation that Drives Impact.",
    subtitle = "Watermelon empowers teams to build, scale, and transform with technology that drives real results.",
    ctaText = "Request a Demo",
    trustedByText = "TRUSTED BY AMBITIOUS TEAMS",
    backgroundImage = "https://assets.watermelon.sh/hero-31-bg.avif",
}: Hero31Props) {
    // Nav: slides down from top, soft spring
    const navContainerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };
    const navItemVariants: Variants = {
        hidden: { opacity: 0, y: -16, filter: 'blur(6px)' },
        show: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { type: 'spring', damping: 22, stiffness: 120, mass: 0.8 },
        },
    };

    // Title: word-by-word stagger, rises with a gentle overshoot
    const titleWords = title.split(' ');
    const wordContainerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.45 },
        },
    };
    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 28, rotateX: 12, filter: 'blur(5px)' },
        show: {
            opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
            transition: { type: 'spring', damping: 18, stiffness: 130 },
        },
    };

    // Body + CTA: fade+rise, delayed after title finishes
    const bodyVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.85 },
        },
    };
    const bodyItemVariants: Variants = {
        hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
        show: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { type: 'spring', damping: 26, stiffness: 100, mass: 1 },
        },
    };

    // Footer logos: scale in from below with stagger
    const logosContainerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 1.2 },
        },
    };
    const logoItemVariants: Variants = {
        hidden: { opacity: 0, y: 10, scale: 0.94 },
        show: {
            opacity: 1, y: 0, scale: 1,
            transition: { type: 'spring', damping: 20, stiffness: 140 },
        },
    };

    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans text-white antialiased selection:bg-white/20">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            src={backgroundImage}
            alt="Background"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex h-full min-h-screen max-w-7xl flex-col px-6 py-8 md:px-12">
          {/* Navigation */}
          <AnimatePresence>
            <motion.nav
              variants={navContainerVariants}
              initial="hidden"
              animate="show"
              className="flex items-center justify-between"
            >
              <motion.div variants={navItemVariants} className="flex items-center gap-2">
                <LogoIcon className="h-8 w-8 text-white" />
                <span className="font-serif text-2xl tracking-wide italic">{logoText}</span>
              </motion.div>

              <motion.div variants={navItemVariants} className="hidden items-center gap-10 md:flex">
                {navItems.map((item) => (
                  <a key={item} href="#" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                    {item}
                  </a>
                ))}
              </motion.div>

              <motion.div variants={navItemVariants}>
                <button className="group flex h-10 items-center gap-2 bg-zinc-200 px-5 text-sm font-medium text-black shadow-[inset_0_2px_0px_rgba(255,255,255,1),inset_0_-2px_0px_rgba(0,0,0,0.2)] transition-transform active:scale-[0.96]">
                  {signUpText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.nav>
          </AnimatePresence>

          {/* Hero Main Content — title is word-by-word, body/CTA staggered after */}
          <div className="mt-32 flex max-w-[42rem] flex-col gap-6 md:mt-40" style={{ perspective: '800px' }}>
            {/* Word-by-word title */}
            <motion.h1
              variants={wordContainerVariants}
              initial="hidden"
              animate="show"
              className="text-5xl font-medium tracking-tight text-white md:text-5xl lg:text-7xl lg:leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              {titleWords.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="mr-[0.25em] inline-block last:mr-0">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Staggered body, subtitle, CTA */}
            <motion.div
              variants={bodyVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              <motion.p
                variants={bodyItemVariants}
                className="text-lg leading-relaxed font-light text-white/80 md:text-xl"
                style={{ textWrap: 'pretty' }}
              >
                {subtitle}
              </motion.p>
              <motion.div variants={bodyItemVariants} className="mt-4">
                <button className="group shadow-[inset_0_2px_0px_rgba(255,255,255,1),inset_0_-2px_0px_rgba(0,0,0,0.2)] bg-zinc-300 flex h-14 items-center gap-3 px-8 text-base font-medium text-black transition-transform active:scale-[0.96]">
                  {ctaText}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer Logos — scale in one by one */}
          <motion.div
            variants={logosContainerVariants}
            initial="hidden"
            animate="show"
            className="mt-auto flex flex-col gap-8 pt-32 pb-8 md:flex-row md:items-center md:gap-12 lg:gap-16"
          >
            <motion.span variants={logoItemVariants} className="shrink-0 text-sm font-bold tracking-wide text-white/50 tabular-nums">
              {trustedByText}
            </motion.span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 lg:gap-16">
              {[
                { icon: Command, name: 'novo', weight: 'font-bold tracking-tighter' },
                { icon: Workflow, name: 'Telia Cygate', weight: 'font-medium tracking-tight' },
                { icon: Blocks, name: 'customer.io', weight: 'font-bold tracking-tight' },
                { icon: Sparkles, name: 'Fastmail', weight: 'font-medium tracking-tight' },
                { icon: Zap, name: 'Medtronic', weight: 'font-bold tracking-tighter' },
              ].map(({ icon: Icon, name, weight }) => (
                <motion.div key={name} variants={logoItemVariants} className="flex items-center gap-2 opacity-60 mix-blend-screen grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <Icon className="h-6 w-6" />
                  <span className={`text-xl ${weight}`}>{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
}
