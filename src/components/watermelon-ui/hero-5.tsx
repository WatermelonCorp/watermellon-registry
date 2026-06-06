import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { FaChevronDown, FaBars, FaXmark, FaArrowRight } from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Hero5NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Hero5TrustedBrand {
  name: string;
  logo?: ReactNode;
}

export interface Hero5Props {
  /** Brand logo icon */
  logo?: ReactNode;
  /** Brand logo text */
  logoText?: string;
  /** Navigation items */
  navItems?: Hero5NavItem[];
  /** Login button text */
  loginText?: string;
  /** Login button URL */
  loginHref?: string;
  /** Headline line 1 (regular weight) */
  titleLine1?: string;
  /** Headline line 2 (italic accent) */
  titleLine2Accent?: string;
  /** Body description paragraph */
  description?: string;
  /** Primary CTA text (outlined button) */
  primaryCtaText?: string;
  /** Primary CTA URL */
  primaryCtaHref?: string;
  /** Secondary CTA text (filled button with arrow) */
  secondaryCtaText?: string;
  /** Secondary CTA URL */
  secondaryCtaHref?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Trusted brands section title */
  trustedTitle?: string;
  /** Trusted brand items */
  trustedBrands?: Hero5TrustedBrand[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export function Hero5({
  logo,
  logoText = 'Apex Creative',
  navItems = [
    { label: 'Services', href: '#', hasDropdown: true },
    { label: 'Plans', href: '#', hasDropdown: true },
    { label: 'Company', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Help', href: '#' },
  ],
  loginText = 'Login',
  loginHref = '#',
  titleLine1 = 'Where Vision Shapes',
  titleLine2Accent = 'Lasting Impressions',
  description = 'Crafting digital experiences through bold innovation that captivates audiences, elevates brands, and drives meaningful results.',
  primaryCtaText = 'Discover More',
  primaryCtaHref = '#',
  secondaryCtaText = 'Begin Now',
  secondaryCtaHref = '#',
  backgroundImage = 'https://assets.watermelon.sh/hero-5-bg.avif',
  trustedTitle = 'Trusted By Leading Brands',
  trustedBrands = [
    { name: 'Google' },
    { name: 'Adobe' },
    { name: 'Microsoft' },
    { name: 'Stripe' },
  ],
}: Hero5Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none h-full w-full object-cover select-none"
          />
        </div>
      )}

      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 w-full"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
          <a href="#" className="flex items-center gap-2 text-white">
            <span className="flex items-center justify-center">
              {logo || (
                <LogoIcon className='size-6' />
              )}
            </span>
            <span className="text-md font-light tracking-wide">
              {logoText}
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1 text-sm font-normal text-zinc-200 transition-colors duration-200 hover:text-white"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <FaChevronDown className="h-2 w-2 fill-current transition-transform duration-200 group-hover:translate-y-px" />
                )}
              </a>
            ))}
          </nav>

      
          <div className="hidden md:flex">
            <a
              href={loginHref}
              className="rounded-lg border border-zinc-700 bg-transparent px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-900"
            >
              {loginText}
            </a>
          </div>

          
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-zinc-900 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <FaBars className="h-5 w-5 fill-current" />
          </button>
        </div>
      </motion.header>

   
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 p-6 backdrop-blur-md md:hidden"
          >
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="flex items-center gap-2 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-center">
                  {logo || (
                   <LogoIcon className='size-8'/>
                  )}
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {logoText}
                </span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-zinc-900"
                aria-label="Close menu"
              >
                <FaXmark className="h-5 w-5 fill-current" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-zinc-800 pb-3 text-lg font-medium text-white transition-colors hover:text-amber-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <FaChevronDown className="h-4 w-4 fill-current text-zinc-500" />
                  )}
                </a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href={loginHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full border border-zinc-700 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-900"
              >
                {loginText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mt-30 mb-40 flex min-h-full flex-col items-center justify-center px-6 text-center sm:px-10 lg:px-16"
      >
        <div className="flex flex-col items-center">
          <motion.h1 variants={item} className="mb-6 max-w-3xl">
            <span className="block bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-4xl leading-tight font-light tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {titleLine1}
            </span>
            <span className="block bg-gradient-to-r from-white to-indigo-200 bg-clip-text font-serif text-4xl leading-tight font-light tracking-tight text-transparent italic sm:text-5xl md:text-6xl lg:text-7xl">
              {titleLine2Accent}
            </span>
          </motion.h1>

          {description && (
            <motion.p
              variants={item}
              className="mb-10 max-w-xl text-sm leading-relaxed font-light text-zinc-200 sm:text-base"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {primaryCtaText && (
              <a
                href={primaryCtaHref}
                className="rounded-lg border border-zinc-700 bg-transparent bg-white px-7 py-3 text-sm font-medium text-black transition-all duration-200"
              >
                {primaryCtaText}
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={secondaryCtaHref}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-white/10 px-7 py-3 text-sm font-medium text-white shadow-sm outline -outline-offset-1 outline-white/20 backdrop-blur-sm"
              >
                <span>{secondaryCtaText}</span>
                <FaArrowRight className="h-3 w-3 fill-current transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            )}
          </motion.div>
        </div>

        <div className="mt-auto pt-20 pb-10 sm:pt-32 sm:pb-14">
          {trustedTitle && (
            <motion.p
              variants={item}
              className="sm:text-md mb-6 text-sm font-light tracking-wide text-zinc-100 sm:mb-8"
            >
              {trustedTitle}
            </motion.p>
          )}
          {trustedBrands.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
              {trustedBrands.map((brand) => (
                <motion.span
                  variants={item}
                  key={brand.name}
                  className="text-lg font-normal tracking-wide text-white/80 sm:text-xl"
                >
                  {brand.logo || brand.name}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
