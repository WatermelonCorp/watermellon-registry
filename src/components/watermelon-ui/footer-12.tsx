import { type FormEvent, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMoon,
  FaSun,
  FaXTwitter,
} from 'react-icons/fa6';
import { ChevronDown } from 'lucide-react';
import LogoIcon from '@/assets/logo-icon';

export interface Footer12Link {
  label: string;
  href: string;
}

export interface Footer12Column {
  title: string;
  links: Footer12Link[];
}

export interface Footer12SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface Footer12Props {
  newsletterTitle?: string;
  inputPlaceholder?: string;
  subscribeText?: string;
  onSubscribe?: (email: string) => void;
  columns?: Footer12Column[];
  brandName?: string;
  copyright?: string;
  socialLinks?: Footer12SocialLink[];
  languageLabel?: string;
}

const columnsDefault: Footer12Column[] = [
  {
    title: 'SOLUTIONS',
    links: [
      { label: 'Transactional Emails', href: '#' },
      { label: 'Marketing Emails', href: '#' },
      { label: 'Email Automation', href: '#' },
      { label: 'Email Builder', href: '#' },
      { label: 'SMTP', href: '#' },
    ],
  },
  {
    title: 'DOCS',
    links: [
      { label: 'Getting Started', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Transactional Emails', href: '#' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Glossary', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Fair Use', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Subprocessors', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

const socialLinksDefault: Footer12SocialLink[] = [
  { label: 'Facebook', href: '#', icon: <FaFacebookF /> },
  { label: 'X', href: '#', icon: <FaXTwitter /> },
  { label: 'Instagram', href: '#', icon: <FaInstagram /> },
  { label: 'LinkedIn', href: '#', icon: <FaLinkedinIn /> },
];

const footerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.65, bounce: 0 },
  },
};

const brandItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.85, bounce: 0 },
  },
};


export function Footer12({
  newsletterTitle = 'Keep up to date with our quarterly newsletter, "You’ve got mail."',
  inputPlaceholder = 'Enter Your Email',
  subscribeText = 'Subscribe',
  onSubscribe,
  columns = columnsDefault,
  brandName = 'Melon',
  copyright = '© 2026 Melon , Inc. All rights reserved.',
  socialLinks = socialLinksDefault,
  languageLabel = 'English',
}: Footer12Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    onSubscribe?.(email);
  }

  return (
    <motion.footer
      variants={footerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      className="w-full overflow-hidden bg-neutral-800 px-6 py-10 font-sans text-stone-50 antialiased sm:px-10 lg:px-12"
    >
      <div className="mx-auto flex min-h-[390px] w-full max-w-[1440px] flex-col justify-between">
        <div className="grid gap-10 lg:grid-cols-[minmax(250px,390px)_1fr] lg:gap-20">
          <motion.div variants={riseItem} className="max-w-[390px]">
            <h2 className="max-w-[330px] text-[18px] leading-[1.08] font-normal tracking-normal text-stone-50 sm:text-[19px]">
              {newsletterTitle}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 max-w-[390px]">
              <input
                name="email"
                type="email"
                placeholder={inputPlaceholder}
                className="h-[50px] w-full rounded-md bg-stone-300 px-6 text-sm font-normal text-neutral-900 outline outline-1 outline-black/10 transition-[background-color,outline-color] duration-200 placeholder:text-neutral-500 focus:bg-stone-100 focus:outline-white/40"
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                className="text-md mt-5 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full bg-stone-200 px-5 font-medium text-neutral-800 shadow-[inset_0px_2px_2px_1px_rgba(255,255,255,1),inset_0_-2px_2px_1px_rgba(0,0,0,0.1)] outline-2 outline-stone-200 transition-[background-color,transform] duration-200 hover:bg-stone-200/90 hover:bg-white active:scale-[0.98]"
              >
                <span>{subscribeText}</span>
                <FaArrowRight className="size-4" />
              </motion.button>
            </form>
          </motion.div>

          <motion.nav
            variants={footerContainer}
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 lg:pt-0"
          >
            {columns.map((column) => (
              <motion.div key={column.title} variants={riseItem}>
                <h3 className="text-lg leading-none font-normal tracking-wide text-stone-50 uppercase">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm leading-none font-light tracking-wide text-stone-50/90 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.nav>
        </div>

        <motion.div
          variants={brandItem}
          className="mx-auto mt-12 flex w-full items-center justify-center  overflow-hidden sm:mt-8 lg:mt-4"
        >
          <div className="hidden shrink-0 md:block">
            <LogoIcon className="size-20 lg:size-60" />
          </div>
          <svg
            className="h-auto w-full flex-1 select-none"
            viewBox={`0 0 ${Math.max(brandName.length * 90, 400)} 110`}
            preserveAspectRatio="xMidYMid meet"
            aria-label={brandName}
          >
            <text
              x="50%"
              y="98%"
              dominantBaseline="alphabetic"
              textAnchor="middle"
              textLength="90%"
              lengthAdjust="spacing"
              className="fill-stone-50 font-sans font-normal tracking-wider"
              fontSize="130"
            >
              {brandName}
            </text>
          </svg>
        </motion.div>

        <motion.div
          variants={riseItem}
          className="mt-9 grid gap-6 text-stone-50/95 md:grid-cols-3 md:items-center"
        >
          <p className="text-md leading-none font-light text-stone-300">
            {copyright}
          </p>

          <div className="flex items-center gap-5 md:justify-center">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                whileTap={{ scale: 0.96 }}
                className="flex min-h-10 min-w-10 items-center justify-center text-stone-200 transition-colors duration-200 hover:text-stone-50 md:min-h-6 md:min-w-6"
              >
                <span className="md:text-md text-base">{link.icon}</span>
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:justify-end">
            <div className="flex h-7 items-center rounded-full bg-stone-50 p-0.5 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]">
              <button
                type="button"
                className="flex h-full items-center gap-1.5 rounded-full bg-neutral-200 px-2.5 text-[10px] font-medium text-neutral-800 shadow-sm transition-colors"
              >
                <FaSun className="h-[10px] w-[10px]" />
                <span>Light</span>
              </button>
              <button
                type="button"
                className="flex h-full items-center gap-1.5 rounded-full px-2.5 text-[10px] font-medium text-neutral-500 transition-colors hover:text-neutral-800"
              >
                <FaMoon className="h-[10px] w-[10px]" />
                <span>Dark</span>
              </button>
            </div>

            <button
              type="button"
              className="text-md inline-flex min-h-7 items-center gap-2 rounded-full bg-stone-50 px-4 font-normal text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.98]"
            >
              <span>{languageLabel}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
