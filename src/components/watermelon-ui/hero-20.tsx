'use client';

import LogoIcon from '@/assets/logo-icon';
import { ArrowRight, CirclePlay, Sparkles } from 'lucide-react';
import { FaGithub as Github, FaFigma as Figma, FaSlack as Slack } from 'react-icons/fa6';
import { SiFramer as Framer } from 'react-icons/si';
import { motion, type Variants } from 'motion/react';

interface NavLink {
  label: string;
  href: string;
}

interface TrustItem {
  label: string;
}

interface BrandMark {
  icon: 'github' | 'figma' | 'framer' | 'slack';
}

interface Hero20Props {
  brandName?: string;
  navLinks?: NavLink[];
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  menuLabel?: string;
  menuHref?: string;
  shopLabel?: string;
  shopHref?: string;
  trustLabel?: string;
  trustItems?: TrustItem[];
  brandMarks?: BrandMark[];
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: 'Products', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Support', href: '#' },
];

const trustItemsDefault: TrustItem[] = [
  { label: 'Premium Design' },
  { label: 'Trusted Platform' },
  { label: 'Custom Illustrations' },
];

const brandMarksDefault: BrandMark[] = [
  { icon: 'github' },
  { icon: 'figma' },
  { icon: 'framer' },
  { icon: 'slack' },
];


const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -14, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.7, bounce: 0.1 },
  },
};

const cloudVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06, filter: 'blur(18px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.3, bounce: 0 },
  },
};

/** Container that staggers its word children */
const headingLineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

/** Individual word reveal: slides up + fades in + de-blurs */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.72, bounce: 0.12 },
  },
};

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.74, bounce: 0 },
  },
};

const ctaGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.6, bounce: 0.1 },
  },
};

const bottomVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.72, bounce: 0 },
  },
};



function AnimatedHeadingLine({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={`block overflow-hidden ${className ?? ''}`}
      variants={headingLineVariants}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-change-transform"
          variants={wordVariants}
          style={{ marginRight: i < words.length - 1 ? '0.28em' : undefined }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}


function BrandMarkIcon({ icon }: { icon: BrandMark['icon'] }) {
  if (icon === 'github') return <Github className="size-4" />;
  if (icon === 'figma') return <Figma className="size-4" />;
  if (icon === 'framer') return <Framer className="size-4" />;
  if (icon === 'slack') return <Slack className="size-4" />;
  return null;
}

export default function Hero20({
  brandName = 'Watermelon',
  navLinks = navLinksDefault,
  headingLine1 = 'Redefine Your',
  headingLine2 = 'Everyday Experience.',
  description = 'Discover products designed to elevate your lifestyle with simplicity, elegance, and innovation.',
  primaryCtaLabel = 'Explore Products',
  primaryCtaHref = '#',
  secondaryCtaLabel = 'Watch Video',
  secondaryCtaHref = '#',
  menuLabel = 'Menu',
  menuHref = '#',
  shopLabel = 'Shop Now',
  shopHref = '#',
  trustLabel = 'Trusted By Leading Brands',
  trustItems = trustItemsDefault,
  brandMarks = brandMarksDefault,
  backgroundImage = 'https://assets.watermelon.sh/hero-21-bg.avif',
}: Hero20Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-sky-600 font-sans text-white antialiased">
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 py-4 sm:px-9 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Background image */}
        <motion.img
          variants={cloudVariants}
          src={backgroundImage}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Nav */}
        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-10 w-full  items-center justify-between"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center gap-2 text-lg leading-none font-medium text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-85 active:scale-[0.96]"
          >
            <LogoIcon className="size-8" />
            <span className="">{brandName}</span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-normal text-white/90 transition-[opacity,transform] duration-200 ease-out hover:opacity-100 active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={menuHref}
              className="hidden min-h-10 items-center justify-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 active:scale-[0.96] sm:inline-flex"
            >
              {menuLabel}
            </a>
            <a
              href={shopHref}
              className="group inline-flex min-h-10 items-center justify-center gap-1 rounded-full bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
            >
              {shopLabel}
              <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.nav>

        {/* Hero copy */}
        <div className="relative z-10 flex flex-1 flex-col justify-center pt-16 pb-28 sm:pt-20 lg:pt-12">
          <div className="max-w-5xl">
            {/* Headline with per-word stagger */}
            <h1 className="max-w-5xl text-[clamp(3rem,4.5vw,4.55rem)] leading-[0.98] font-normal text-white">
              <AnimatedHeadingLine text={headingLine1} />
              <AnimatedHeadingLine text={headingLine2} />
            </h1>

            {/* Description */}
            <motion.p
              variants={copyVariants}
              className="mt-5 max-w-lg text-sm leading-[1.45] font-normal text-pretty text-white/80"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-7 flex flex-wrap items-center gap-5"
              variants={ctaGroupVariants}
            >
              <motion.a
                variants={ctaVariants}
                href={primaryCtaHref}
                className="group inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
              >
                {primaryCtaLabel}
              </motion.a>
              <motion.a
                variants={ctaVariants}
                href={secondaryCtaHref}
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-normal text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-90 active:scale-[0.96]"
              >
                <CirclePlay className="size-5 fill-white/10 transition-[fill,transform] duration-200 ease-out group-hover:scale-105 group-hover:fill-white/20" />
                {secondaryCtaLabel}
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={bottomVariants}
          className="relative z-20 flex flex-col gap-5 pb-3 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="inline-flex min-h-10 items-center justify-center gap-1.5 text-sm font-normal text-white/80"
              >
                <Sparkles className="size-4 text-white" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-[0.6rem] font-semibold text-white/86">
              {trustLabel}
            </p>
            <div className="flex items-center gap-3">
              {brandMarks.map((brand, index) => (
                <span
                  key={brand.icon + index}
                  className="size-9 items-center justify-center gap-2 rounded-full bg-white/40 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),0_16px_40px_rgba(15,23,42,0.18)] backdrop-blur-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 active:scale-[0.96] sm:inline-flex"
                >
                  <BrandMarkIcon icon={brand.icon} />
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
