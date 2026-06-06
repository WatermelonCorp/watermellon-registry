
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  FaArrowTrendUp,
  FaShieldHalved,
  FaEarthAmericas,
  FaPlay,
  FaStar,
  FaBars,
  FaXmark,
  FaChevronDown,
} from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Hero4NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Hero4Stat {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface Hero4SocialLink {
  label: string;
  href: string;
}

export interface Hero4Props {
  /** Brand logo icon */
  logo?: ReactNode;
  /** Brand logo text */
  logoText?: string;
  /** Navigation items */
  navItems?: Hero4NavItem[];
  /** Sign in button text */
  signInText?: string;
  /** Sign in button URL */
  signInHref?: string;
  /** Get started button text */
  getStartedText?: string;
  /** Get started button URL */
  getStartedHref?: string;
  /** Badge text above the headline */
  badgeText?: string;
  /** Headline line 1 */
  titleLine1?: string;
  /** Headline line 2 (start — regular color) */
  titleLine2Start?: string;
  /** Headline line 2 (end — gradient accent) */
  titleLine2Accent?: string;
  /** Body description paragraph */
  description?: string;
  /** Primary CTA text */
  primaryCtaText?: string;
  /** Primary CTA URL */
  primaryCtaHref?: string;
  /** Secondary CTA text */
  secondaryCtaText?: string;
  /** Secondary CTA URL */
  secondaryCtaHref?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Stats displayed in the bottom bar */
  stats?: Hero4Stat[];
  /** Social links in the bottom bar */
  socialLinks?: Hero4SocialLink[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -30, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 70, damping: 20 },
  },
};

export function Hero4({
  logo,
  logoText = 'Luminary',
  navItems = [
    { label: 'Products', href: '#', hasDropdown: false },
    { label: 'Solutions', href: '#', hasDropdown: false },
    { label: 'Pricing', href: '#', hasDropdown: false },
    { label: 'Resources', href: '#', hasDropdown: false },
  ],
  signInText = 'Sign in',
  signInHref = '#',
  getStartedText = 'Get Started',
  getStartedHref = '#',
  badgeText = 'CRAFTED FOR TOMORROW',
  titleLine1 = 'Where Creativity',
  titleLine2Start = 'Meets ',
  titleLine2Accent = 'Brilliance',
  description = 'Luminary helps teams design, prototype, and ship with cutting-edge tools that turn bold ideas into lasting digital experiences.',
  primaryCtaText = 'Get Started',
  primaryCtaHref = '#',
  secondaryCtaText = 'Watch Demo',
  secondaryCtaHref = '#',
  backgroundImage = 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1920',
  stats = [
    {
      value: '10K+',
      label: 'Active Teams',
      icon: <FaArrowTrendUp className="h-4 w-4 fill-current" />,
    },
    {
      value: '99.9%',
      label: 'Uptime',
      icon: <FaShieldHalved className="h-4 w-4 fill-current" />,
    },
    {
      value: '150+',
      label: 'Countries',
      icon: <FaEarthAmericas className="h-4 w-4 fill-current" />,
    },
  ],
  socialLinks = [
    { label: 'Linkedin', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Behance', href: '#' },
  ],
}: Hero4Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-white">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none h-full w-full object-cover brightness-70 select-none"
          />
        </div>
      )}

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-30 w-full"
      >
        <div className="mx-auto flex max-w-full items-center justify-between px-8 py-5 sm:px-12 md:px-16 lg:px-20">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-medium tracking-tight text-white"
          >
            <span className="flex items-center justify-center text-white">
              {logo || <LogoIcon className="size-8 fill-current" />}
            </span>
            <span className="text-md font-light tracking-wide">{logoText}</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1 text-sm font-normal text-zinc-300 transition-colors duration-200 hover:text-white"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <FaChevronDown className="h-2.5 w-2.5 fill-current transition-transform duration-200 group-hover:translate-y-0.5" />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={signInHref}
              className="flex items-center justify-center rounded-[12px] border border-zinc-700 bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] p-[1px]"
            >
              <div className="rounded-lg bg-black px-5 py-2 text-sm font-light text-white transition-all duration-200">
                {signInText}
              </div>
            </a>
            <a
              href={getStartedHref}
              className="rounded-lg bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] px-5 py-2 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-200 hover:bg-amber-500"
            >
              {getStartedText}
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-zinc-800 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <FaBars className="h-5 w-5 fill-current" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 p-6 backdrop-blur-md md:hidden"
          >
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-center text-white">
                {logo || <LogoIcon className="size-8 fill-current" />}
              </span>
              <span className="text-xl font-light tracking-wide uppercase">
                {logoText}
              </span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-zinc-800"
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

          <div className="mt-auto flex flex-col gap-3">
            <a
              href={signInHref}
              className="flex items-center justify-center rounded-[12px] border border-zinc-700 bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] p-[1px]"
            >
              <div className="w-full rounded-lg bg-black px-5 py-3 text-center text-sm font-light text-white transition-all duration-200">
                {signInText}
              </div>
            </a>
            <a
              href={getStartedHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] py-3 text-base font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-colors"
            >
              {getStartedText}
            </a>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 pt-3 pb-8 sm:px-12 md:px-16 md:pt-24 lg:px-20 lg:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-1 flex-col justify-center"
        >
          <div className="max-w-3xl">
            {badgeText && (
              <motion.div variants={item} className="mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-800/50 bg-amber-950/40 px-4 py-1.5 text-xs font-medium tracking-wider text-amber-400">
                  <FaStar className="h-3 w-3 fill-amber-400" />
                  {badgeText}
                </span>
              </motion.div>
            )}

            <motion.h1 variants={item} className="mb-6 text-4xl leading-tight font-normal tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {titleLine1 && <span className="block">{titleLine1}</span>}
              {(titleLine2Start || titleLine2Accent) && (
                <span className="block">
                  {titleLine2Start}
                  {titleLine2Accent && (
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                      {titleLine2Accent}
                    </span>
                  )}
                </span>
              )}
            </motion.h1>

            {description && (
              <motion.p variants={item} className="sm:text-md mb-8 max-w-lg text-base leading-relaxed font-light text-zinc-200">
                {description}
              </motion.p>
            )}

            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              {primaryCtaText && (
                <a
                  href={primaryCtaHref}
                  className="rounded-lg bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] px-7 py-3 text-sm font-medium text-white shadow-lg shadow-amber-600/20 outline-2 -outline-offset-2 outline-white/20 transition-all duration-200 hover:bg-amber-500 hover:shadow-amber-500/30"
                >
                  {primaryCtaText}
                </a>
              )}
              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className="flex items-center justify-center rounded-[12px] border border-zinc-700 bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] p-[1px]"
                >
                  <div className="flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-light text-white transition-all duration-200">
                    {secondaryCtaText}
                    <FaPlay className="ml-2 h-3 w-3 fill-current" />
                  </div>
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 mb-12 sm:mt-12 md:mt-30"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            {stats.length > 0 && (
              <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                {stats.map((stat) => (
                  <motion.div variants={item} key={stat.label} className="flex items-center gap-3">
                    {stat.icon && (
                      <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-200 backdrop-blur-sm">
                        {stat.icon}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xl font-light tracking-tight text-white sm:text-3xl">
                        {stat.value}
                      </span>
                      <span className="text-sm font-normal text-zinc-300">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-8">
                {socialLinks.map((link) => (
                  <motion.a
                    variants={item}
                    key={link.label}
                    href={link.href}
                    className="text-sm font-normal text-zinc-300 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
