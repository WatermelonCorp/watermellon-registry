import { motion, type Variants } from 'motion/react';
import { Armchair, Monitor, PlaneTakeoff } from 'lucide-react';
import React from 'react';

export interface Hero33Props {
    logoText?: string;
    navItems?: string[];
    primaryActionText?: string;
    secondaryActionText?: string;
    titleLines?: string[];
    features?: {
        icon: React.ElementType;
        title: string;
        description: string;
    }[];
    backgroundImage?: string;
}

export default function Hero33({
  logoText = 'Watermelon',
  navItems = ['Flights', 'Destinations', 'Pricing', 'Contact'],
  primaryActionText = 'Explore Flights',
  secondaryActionText = 'Learn More',
  titleLines = ['Peak Moments,', 'Unforgettable', 'Journeys.'],
  features = [
    {
      icon: Armchair,
      title: 'Premium Comfort',
      description: 'Relax in spacious, luxurious\nseating',
    },
    {
      icon: Monitor,
      title: 'Stunning Views',
      description: 'Marvel at the world from\nnew heights',
    },
  ],
  backgroundImage = 'https://assets.watermelon.sh/hero-33-bg.avif',
}: Hero33Props) {
  // Nav: quick fade+blur slide
  const navVariants: Variants = {
    hidden: { opacity: 0, y: -16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 150,
        duration: 0.5,
      },
    },
  };

  // Title container: per-line stagger with progressive delay
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.3 },
    },
  };

  // Each title line: slides from left + blur
  const titleLineVariants: Variants = {
    hidden: { opacity: 0, x: -32, filter: 'blur(8px)', skewX: 2 },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      skewX: 0,
      transition: { type: 'spring', damping: 24, stiffness: 100, mass: 1.1 },
    },
  };

  // CTA buttons: fade up after title lines settle
  const ctaContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.85 },
    },
  };
  const ctaItemVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 18, stiffness: 150 },
    },
  };

  // Bottom feature cards: slide up with stagger
  const featuresContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 1.1 },
    },
  };
  const featureItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)', scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { type: 'spring', damping: 22, stiffness: 120 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#130f0c] font-sans antialiased selection:bg-white/20">
      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={backgroundImage}
          alt="Airplane window sunset view"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-6 pb-12 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          {/* Navigation */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between"
          >
            <div className="flex items-center text-2xl font-bold tracking-tight text-white">
              {logoText}
              <span className="text-amber-500">.</span>
            </div>
            <div className="hidden items-center gap-10 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
            <button className="rounded-md border border-amber-500 px-6 py-2.5 text-sm font-medium text-white transition-transform hover:bg-white/10 active:scale-[0.96]">
              Book Now
            </button>
          </motion.nav>

          {/* Hero Main Content */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex max-w-3xl flex-col items-start">
              {/* Title — line-by-line stagger, slides from left */}
              <motion.h1
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                className="overflow-hidden text-5xl font-normal tracking-tight text-white md:text-7xl lg:text-7xl lg:leading-[1.05]"
              >
                {titleLines.map((line, i) => (
                  <motion.span
                    key={i}
                    variants={titleLineVariants}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.h1>

              {/* CTA — staggered scale-in after title */}
              <motion.div
                variants={ctaContainerVariants}
                initial="hidden"
                animate="visible"
                className="mt-10 flex items-center gap-4"
              >
                <motion.button
                  variants={ctaItemVariants}
                  className="flex h-12 items-center gap-2 rounded-md bg-white pr-5 pl-6 text-sm font-semibold text-black transition-transform hover:bg-white/90 active:scale-[0.96]"
                >
                  {primaryActionText}
                  <PlaneTakeoff className="h-4 w-4" />
                </motion.button>
                <motion.button
                  variants={ctaItemVariants}
                  className="flex h-12 items-center rounded-md border border-amber-500 px-8 text-sm font-medium text-white transition-transform hover:bg-white/10 active:scale-[0.96]"
                >
                  {secondaryActionText}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Features — stagger in last */}
          <motion.div
            variants={featuresContainerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-col gap-8 md:flex-row md:gap-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={featureItemVariants}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500 bg-white/5 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-white/60">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
