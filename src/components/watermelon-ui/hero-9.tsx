import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { FaArrowRight, FaChevronDown, FaXmark } from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Hero9NavItem {
  label: string;
  href: string;
  hasMenu?: boolean;
}

export interface Hero9Avatar {
  src: string;
  alt: string;
}

export interface Hero9Props {
  logo?: ReactNode;
  logoText?: string;
  navItems?: Hero9NavItem[];
  ctaText?: string;
  ctaHref?: string;
  eyebrowText?: string;
  avatars?: Hero9Avatar[];
  title?: string;
  description?: string;
  emailPlaceholder?: string;
  formAction?: string;
  submitText?: string;
  backgroundImage?: string;
}

const defaultNavItems: Hero9NavItem[] = [
  { label: 'Features', href: '#', hasMenu: true },
  { label: 'Pricing', href: '#', hasMenu: true },
  { label: 'About', href: '#' },
  { label: 'Resources', href: '#' },
  { label: 'FAQs', href: '#' },
];

const defaultAvatars: Hero9Avatar[] = [
  {
    src: 'https://assets.watermelon.sh/wm_ben.png',
    alt: 'MistPeak user',
  },
  {
    src: 'https://assets.watermelon.sh/wm_alex.png',
    alt: 'MistPeak user',
  },
  {
    src: 'https://assets.watermelon.sh/wm_olivia.png',
    alt: 'MistPeak user',
  },
];

const defaultBackground = 'https://assets.watermelon.sh/hero-9-bg.avif';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -18, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.68, bounce: 0, delay: 0.4 },
  },
};

const contentContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
      delay: 0.3,
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


export function Hero9({
  logo,
  logoText = 'Watermelon',
  navItems = defaultNavItems,
  ctaText = 'Book Demo',
  ctaHref = '#',
  eyebrowText = 'Over 1k happy users',
  avatars = defaultAvatars,
  title = 'Breathe In Peace\nBreathe Out The world',
  description = 'Confidential, professional help tailored to your unique\nneeds, available on your schedule.',
  emailPlaceholder = 'Enter your Email',
  formAction = '#',
  submitText = 'Start for Free',
  backgroundImage = defaultBackground,
}: Hero9Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative isolate  w-full overflow-hidden bg-sky-300 font-sans text-slate-950 antialiased min-h-screen">
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
          className="h-full w-full object-cover object-center  outline-1 outline-black/10"
        />
      </motion.div>


      <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[1440px] flex-col px-5 py-4 sm:min-h-screen sm:px-9 lg:px-[58px]">
        <motion.header
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          className="flex h-12 items-center justify-between"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center gap-2.5 text-slate-950 transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
          >
            {logo ?? <LogoIcon className='size-8 text-white' />}
            <span className="text-lg leading-none font-normal tracking-[-0.02em]">
              {logoText}
            </span>
          </a>

          <nav className="hidden items-center gap-[42px] lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group inline-flex min-h-10 items-center gap-1.5 text-sm leading-none font-medium text-slate-900 transition-colors duration-200 ease-out hover:text-slate-600"
              >
                <span>{item.label}</span>
                {item.hasMenu ? (
                  <FaChevronDown className="size-2.5 transition-transform duration-200 group-hover:translate-y-px" />
                ) : null}
              </a>
            ))}
          </nav>

          <motion.a
            href={ctaHref}
            whileTap={{ scale: 0.96 }}
            className="group hidden min-h-10 items-center gap-2 rounded-full bg-white/92 px-5 text-[13px] leading-none font-medium text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08),0_12px_30px_rgba(255,255,255,0.18)] backdrop-blur-md transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-white hover:shadow-[0_2px_4px_rgba(15,23,42,0.1),0_16px_36px_rgba(255,255,255,0.26)] sm:inline-flex"
          >
            <span>{ctaText}</span>
            <FaArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>

          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-[0_1px_2px_rgba(15,23,42,0.08)] backdrop-blur-md transition-[background-color,transform] duration-200 ease-out hover:bg-white active:scale-[0.96] lg:hidden"
          >
            <span className="h-3.5 w-4 bg-[linear-gradient(to_bottom,currentColor_0_2px,transparent_2px_6px,currentColor_6px_8px,transparent_8px_12px,currentColor_12px_14px)]" />
          </button>
        </motion.header>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(5px)' }}
              transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              className="fixed inset-x-4 top-4 z-50 rounded-[28px] bg-white/90 p-4 text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.22)] outline outline-1 outline-white/70 backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-center justify-between pl-3">
                <a href="#" className="inline-flex items-center gap-2.5">
                  {logo ?? <LogoIcon className='size-8 text-zinc-200' />}
                  <span className="text-base font-semibold tracking-[-0.02em]">
                    {logoText}
                  </span>
                </a>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-full text-slate-950 transition-[background-color,transform] duration-200 ease-out hover:bg-slate-950/5 active:scale-[0.96]"
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
                    className="inline-flex min-h-11 items-center justify-between rounded-2xl px-3 text-sm font-medium text-slate-900 transition-colors duration-200 ease-out hover:bg-slate-950/5"
                  >
                    <span>{item.label}</span>
                    {item.hasMenu ? <FaChevronDown className="size-3" /> : null}
                  </a>
                ))}
              </nav>

              <motion.a
                href={ctaHref}
                whileTap={{ scale: 0.96 }}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:bg-slate-800"
              >
                {ctaText}
                <FaArrowRight className="size-3" />
              </motion.a>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.42 }}
          className="mx-auto flex w-full max-w-[760px] flex-1 flex-col items-center pt-[92px] text-center sm:pt-[112px] lg:pt-[102px]"
        >
          <motion.div
            variants={contentItem}
            className="inline-flex min-h-7 items-center gap-2 rounded-full bg-white/30 px-1 pr-5 text-xs leading-none font-semibold text-slate-700 shadow-[0_1px_1px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md"
          >
            <span className="flex -space-x-2">
              {avatars.map((avatar) => (
                <img
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  className="size-5 rounded-full object-cover shadow-xs outline-1 -outline-offset-1 outline-white/10"
                />
              ))}
              <span className="grid size-5 -rotate-45 place-items-center rounded-full bg-white text-slate-800">
                <FaArrowRight className="size-2.5" />
              </span>
            </span>
            <span>{eyebrowText}</span>
          </motion.div>

          <motion.h1
            variants={contentItem}
            className="mt-5 max-w-[735px] text-[clamp(3.05rem,6.1vw,4.75rem)] leading-[0.91] font-medium tracking-[-0.055em] text-balance whitespace-pre-line text-slate-950"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={contentItem}
            className="mt-5 max-w-[510px] text-[clamp(0.95rem,1.45vw,1.12rem)] leading-[1.34] font-normal text-pretty whitespace-pre-line text-slate-700"
          >
            {description}
          </motion.p>

          <motion.form
            variants={contentItem}
            action={formAction}
            className="mt-6 flex w-full max-w-md flex-col gap-1.5 rounded-[28px] bg-white/26 p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_50px_rgba(255,255,255,0.34),inset_0_1px_0_rgba(255,255,255,0.55)] outline-1 outline-white/45 backdrop-blur-[1px] min-[430px]:flex-row min-[430px]:rounded-full"
          >
            <label htmlFor="hero9-email" className="sr-only">
              Email
            </label>
            <input
              id="hero9-email"
              type="email"
              placeholder={emailPlaceholder}
              className="min-h-10 w-full min-w-0 flex-1 bg-transparent px-5 text-center text-sm font-medium text-slate-900 outline-none placeholder:text-slate-700/80 min-[430px]:text-left"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              className="group inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-sm font-medium text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-slate-50 hover:shadow-[0_2px_6px_rgba(15,23,42,0.09)] min-[430px]:w-auto"
            >
              <span>{submitText}</span>
              <FaArrowRight className="size-3 duration-200 group-hover:translate-x-0.5" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
