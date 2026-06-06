import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';

export interface Hero11NavItem {
  label: string;
  href: string;
}

export interface Hero11Props {
  brandName?: string;
  navItems?: Hero11NavItem[];
  ctaText?: string;
  ctaHref?: string;
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  backgroundImage?: string;
}

const defaultNavItems: Hero11NavItem[] = [
  { label: 'Collection', href: '#' },
  { label: 'Subscription', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Contact', href: '#' },
];

const defaultBackground = 'https://assets.watermelon.sh/hero-11-bg.avif';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.68, bounce: 0 },
  },
};

const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

const contentItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.72, bounce: 0 },
  },
};

const backgroundVariants: Variants = {
  hidden: { opacity: 0, scale: 1.035, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.15, bounce: 0 },
  },
};

function MenuIcon() {
  return (
    <span
      className="h-3.5 w-4 bg-[linear-gradient(to_bottom,currentColor_0_2px,transparent_2px_6px,currentColor_6px_8px,transparent_8px_12px,currentColor_12px_14px)]"
      aria-hidden="true"
    />
  );
}

export function Hero11({
  brandName = 'Watermelon',
  navItems = defaultNavItems,
  ctaText = 'Shop Now',
  ctaHref = '#',
  title = 'Timeless Beauty,\nThoughtfully Made.',
  description = 'Inspired by nature, rooted in tradition.\nDiscover pieces that tell a story',
  primaryText = 'Explore Collection',
  primaryHref = '#',
  backgroundImage = defaultBackground,
}: Hero11Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative isolate  w-full overflow-hidden bg-stone-100 font-sans text-teal-950 antialiased min-h-screen">
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-center outline-1 outline-black/10"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,246,236,0.94)_0%,rgba(250,246,236,0.76)_34%,rgba(250,246,236,0.2)_66%,rgba(250,246,236,0.03)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,236,0.72)_0%,rgba(250,246,236,0.04)_42%,rgba(250,246,236,0.12)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[690px] w-full max-w-[1440px] flex-col px-6 py-5 sm:min-h-screen sm:px-10 lg:px-[72px]">
        <motion.header
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          className="flex h-12 items-center justify-between"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center text-[22px] leading-none font-semibold tracking-tight text-teal-950 transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
          >
            {brandName}
          </a>

          <nav className="hidden items-center gap-[44px] lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex min-h-10 items-center text-sm leading-none font-medium text-teal-950/88 transition-colors duration-200 ease-out hover:text-teal-800"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <motion.a
              href={ctaHref}
              whileTap={{ scale: 0.96 }}
              className="hidden min-h-10 items-center justify-center bg-teal-950 px-6 text-sm leading-none font-normal text-stone-100 shadow-[0_1px_2px_rgba(15,23,42,0.14)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-teal-900 hover:shadow-[0_2px_7px_rgba(15,23,42,0.18)] sm:inline-flex"
            >
              {ctaText}
            </motion.a>

            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center bg-teal-950 text-stone-100 shadow-[0_1px_2px_rgba(15,23,42,0.14)] transition-[background-color,transform] duration-200 ease-out hover:bg-teal-900 active:scale-[0.96] lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </motion.header>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(5px)' }}
              transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              className="fixed inset-x-4 top-4 z-50 bg-stone-50/92 p-4 text-teal-950 shadow-[0_24px_80px_rgba(15,23,42,0.22)] outline outline-1 outline-white/70 backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-center justify-between pl-3">
                <a
                  href="#"
                  className="text-xl font-semibold tracking-[-0.025em]"
                >
                  {brandName}
                </a>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex size-10 items-center justify-center text-teal-950 transition-[background-color,transform] duration-200 ease-out hover:bg-teal-950/5 active:scale-[0.96]"
                >
                  <FaXmark className="size-4" />
                </button>
              </div>

              <nav className="mt-5 grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-teal-950 transition-colors duration-200 ease-out hover:bg-teal-950/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <motion.a
                href={ctaHref}
                whileTap={{ scale: 0.96 }}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center bg-teal-950 px-5 text-sm font-semibold text-stone-100 transition-[background-color,transform] duration-200 ease-out hover:bg-teal-900"
              >
                {ctaText}
              </motion.a>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.42 }}
          className="flex flex-1 items-start pt-[76px] sm:pt-[105px] lg:pt-[76px]"
        >
          <div className="max-w-[540px]">
            <motion.h1
              variants={contentItem}
              className="text-[clamp(3.05rem,5.05vw,5.35rem)] leading-[1.02] font-medium tracking-[-0.045em]  text-balance whitespace-pre-line text-teal-950"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={contentItem}
              className="mt-5 max-w-[350px] bg-white/10 mask-r-from-80% text-[clamp(1rem,1.2vw,1.18rem)] leading-[1.42] font-medium text-pretty whitespace-pre-line text-stone-900/82 backdrop-blur-[1px]"
            >
              {description}
            </motion.p>

            <motion.a
              href={primaryHref}
              variants={contentItem}
              whileTap={{ scale: 0.96 }}
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-teal-950 px-5 text-[14px] leading-none font-semibold text-stone-100 shadow-[0_1px_2px_rgba(15,23,42,0.16)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-teal-900 hover:shadow-[0_2px_7px_rgba(15,23,42,0.18)]"
            >
              <span>{primaryText}</span>
              <FaArrowRight className="size-3" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
