import { motion, type Variants } from 'motion/react';
import { Play } from 'lucide-react';
import React from 'react';

export interface Hero32Props {
    logoText?: string;
    navItems?: string[];
    loginText?: string;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    primaryActionText?: string;
    backgroundImage?: string;
}

export default function Hero32({
    logoText = "Haven",
    navItems = ['Home', 'Usecases', 'Pricing', 'Contact'],
    loginText = "Login",
    title = (
        <>
            Your Haven for <br />
            <span className="italic">Seamless</span> AI Solutions
        </>
    ),
    subtitle = (
        <>
            Confidential, professional help tailored to your unique needs, <br className="hidden md:block" />
            available on your schedule.
        </>
    ),
    primaryActionText = "Book a demo",
    backgroundImage = "https://assets.watermelon.sh/hero-32-bg.avif",
}: Hero32Props) {
    // Nav: single element, drops in from top with blur
    const navVariants: Variants = {
        hidden: { opacity: 0, y: -24, filter: 'blur(8px)', scale: 0.97 },
        visible: {
            opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
            transition: { type: 'spring', damping: 24, stiffness: 120, duration: 0.6 },
        },
    };

    // Title: rises up with a heavier mass — slow, majestic settling
    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
        visible: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { type: 'spring', damping: 28, stiffness: 80, mass: 1.4, delay: 0.35 },
        },
    };

    // Subtitle: lighter, quicker
    const subtitleVariants: Variants = {
        hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
        visible: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { type: 'spring', damping: 22, stiffness: 110, delay: 0.65 },
        },
    };

    // CTA group: scale up from slightly small + fade
    const ctaVariants: Variants = {
        hidden: { opacity: 0, scale: 0.92, y: 10 },
        visible: {
            opacity: 1, scale: 1, y: 0,
            transition: { type: 'spring', damping: 20, stiffness: 140, delay: 0.85 },
        },
    };

    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#5bb2ff] font-sans antialiased selection:bg-white/20">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundImage}
            alt="Sunflowers background"
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col pt-6">
          {/* Nav — single spring drop */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex w-fit items-center gap-8 rounded-full bg-white px-2 py-2 shadow-sm"
          >
            <div className="pl-4 text-base font-bold tracking-tight text-neutral-900 2xl:text-lg">
              {logoText}
            </div>
            <div className="hidden items-center gap-6 px-4 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 2xl:text-lg"
                >
                  {item}
                </a>
              ))}
            </div>
            <button className="rounded-full bg-sky-500 px-6 py-2 text-xs font-medium text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.2)] transition-all hover:bg-sky-600 active:scale-[0.96] 2xl:text-lg">
              {loginText}
            </button>
          </motion.nav>

          {/* Hero Main Content — each element independently animated */}
          <div className="flex flex-1 items-start justify-center px-6 pt-20">
            <div className="flex max-w-4xl flex-col items-center text-center 2xl:max-w-6xl">
              {/* Title: majestic slow rise */}
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl font-normal tracking-tight text-white md:text-7xl lg:text-[5.5rem] lg:leading-[1.1] 2xl:text-[7rem]"
                style={{ textWrap: 'balance', fontFamily: 'serif' }}
              >
                {title}
              </motion.h1>

              {/* Subtitle: lighter, quicker */}
              <motion.p
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 max-w-2xl text-base leading-relaxed font-normal text-white md:text-lg"
                style={{ textWrap: 'pretty' }}
              >
                {subtitle}
              </motion.p>

              {/* CTA: scales into place */}
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 flex items-center justify-center gap-4"
              >
                <button className="flex min-h-12 items-center rounded-full bg-white/20 px-8 text-sm font-medium text-white shadow-[inset_2px_2px_0_-0.5px_rgba(255,255,255,0.1),inset_-2px_-2px_0_-0.5px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-transform hover:bg-white/30 active:scale-[0.96] 2xl:text-lg">
                  {primaryActionText}
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sky-400 shadow-lg transition-transform hover:scale-105 active:scale-[0.96]">
                  <Play className="h-5 w-5 fill-current" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
}
