import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { FaBars, FaChevronDown, FaPlay, FaXmark } from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Hero8NavItem {
  label: string;
  href: string;
}

export interface Hero8Props {
  logo?: ReactNode;
  logoText?: string;
  navItems?: Hero8NavItem[];
  loginText?: string;
  loginHref?: string;
  badgeText?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  videoText?: string;
  videoHref?: string;
  scrollText?: string;
  backgroundImage?: string;
}

const navItemsDefault: Hero8NavItem[] = [
  { label: 'Pricing', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Support', href: '#' },
];

const navVariants: Variants = {
  hidden: { opacity: 0, y: -22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.65, bounce: 0 },
  },
};

const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

const contentItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.72, bounce: 0 },
  },
};

const backgroundVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.05, bounce: 0 },
  },
};



export function Hero8({
  logo,
  logoText = 'Watermelon',
  navItems = navItemsDefault,
  loginText = 'Login',
  loginHref = '#',
  badgeText = 'Introduce our advance hosting',
  title = 'Shape A Better World',
  titleAccent = 'Through New Moments',
  description = 'Elevate the way people interact with your brand. Launch and scale experiential with Way.',
  videoText = 'Watch Video',
  videoHref = '#',
  scrollText = 'Scroll to Discover',
  backgroundImage = 'https://assets.watermelon.sh/hero-8-bg.avif',
}: Hero8Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative isolate flex w-full overflow-hidden bg-cyan-950 font-sans text-white antialiased min-h-screen">
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-75 outline outline-1 outline-white/10"
        />
      </motion.div>

      <div className="relative z-10 flex min-h-[720px] w-full flex-col px-7 py-5 sm:min-h-screen sm:px-10 lg:px-12">
        <motion.header
          variants={navVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          className="flex items-center justify-between"
        >
          <a href="#" className="flex min-h-10 items-center gap-3">
            {logo ?? <LogoIcon className='size-8 ' />}
            <span className="text-xl leading-none font-medium tracking-normal text-white">
              {logoText}
            </span>
          </a>

          <nav className="hidden items-center gap-14 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-blue- inline-flex min-h-10 items-center text-base font-medium text-white/95 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-7 md:flex">
            <motion.a
              href={loginHref}
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/90 px-8 text-base font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset] backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 hover:bg-white/10"
            >
              {loginText}
            </motion.a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex min-h-10 min-w-10 items-center justify-center text-white transition-transform duration-200 active:scale-[0.96]"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/60 text-white backdrop-blur-sm transition-[background-color,transform] duration-200 active:scale-[0.96] md:hidden"
          >
            <FaBars className="h-5 w-5" />
          </button>
        </motion.header>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              className="fixed inset-x-4 top-4 z-50 rounded-2xl bg-cyan-950/88 p-4 shadow-2xl shadow-cyan-950/50 outline outline-1 outline-white/10 backdrop-blur-xl md:hidden"
            >
              <div className="flex items-center justify-between pl-3">
                <a href="#" className="flex items-center gap-3">
                  {logo ?? <LogoIcon className='size-8' />}
                  <span className="text-xl font-medium">{logoText}</span>
                </a>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-full text-white transition-[background-color,transform] duration-200 hover:bg-white/10 active:scale-[0.96]"
                >
                  <FaXmark className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-7 grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <motion.a
                href={loginHref}
                whileTap={{ scale: 0.96 }}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/80 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-white/10"
              >
                {loginText}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.42 }}
          className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center pt-16 pb-16 text-center sm:pt-20 lg:pt-24"
        >
          <motion.div
            variants={contentItem}
            className="inline-flex min-h-7 items-center gap-2 rounded-full border border-white/90 px-3.5 text-[11px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset] backdrop-blur-sm"
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.65)]"
              aria-hidden="true"
            />
            {badgeText}
          </motion.div>

          <motion.h1
            variants={contentItem}
            className="mt-8 max-w-[960px] text-[clamp(3.25rem,7.6vw,5.65rem)] leading-[0.95] font-normal tracking-normal text-balance text-white"
          >
            <span className="block">{title}</span>
            <span className="mt-3 block font-serif text-[0.78em] leading-[0.92] font-normal italic">
              {titleAccent}
            </span>
          </motion.h1>

          <motion.p
            variants={contentItem}
            className="mt-8 max-w-[630px] text-xl leading-[1.35] font-normal text-pretty text-white/95"
          >
            {description}
          </motion.p>

          <motion.a
            href={videoHref}
            variants={contentItem}
            whileTap={{ scale: 0.96 }}
            className="group mt-14 inline-flex min-h-12 items-center gap-3 text-xl font-medium text-white transition-colors duration-200 hover:text-cyan-100"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white shadow-[0_1px_0_rgba(255,255,255,0.22)_inset] transition-[background-color,transform] duration-200 group-hover:bg-white/10">
              <FaPlay className="ml-0.5 h-3.5 w-3.5" />
            </span>
            <span>{videoText}</span>
          </motion.a>
        </motion.div>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            type: 'spring',
            duration: 0.65,
            bounce: 0,
            delay: 0.45,
          }}
          className="mx-auto mb-5 inline-flex min-h-12 flex-col items-center justify-center gap-2 text-base font-normal text-white/90 transition-colors duration-200 hover:text-white sm:mb-7"
        >
          <span>{scrollText}</span>
          <FaChevronDown className="h-4 w-4 text-cyan-100" />
        </motion.a>
      </div>
    </section>
  );
}
