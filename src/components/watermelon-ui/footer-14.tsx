import { type FormEvent, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import {

  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';



export interface Footer14Link {
  label: string;
  href: string;
}

export interface Footer14Column {
  title: string;
  links: Footer14Link[];
}

export interface Footer14SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface Footer14Props {
  /** Custom logo mark element */
  logoIcon?: ReactNode;
  brandName?: string;
  /** Navigation columns rendered in the top section */
  columns?: Footer14Column[];
  /** Social media links */
  socialLinks?: Footer14SocialLink[];
  emailPlaceholder?: string;
  subscribeLabel?: string;
  /** Short tagline shown below the subscribe form */
  subscribeTagline?: string;
  onSubscribe?: (email: string) => void;
  /** System status text */
  statusLabel?: string;
  statusValue?: string;
  copyright?: string;
  /** Large brand text in the hero section */
  heroBrandName?: string;
}


const defaultColumns: Footer14Column[] = [
  {
    title: 'SOLUTIONS',
    links: [
      { label: 'Transactional Emails', href: '#' },
      { label: 'Marketing Emails', href: '#' },
      { label: 'Email Automation', href: '#' },
      { label: 'SMTP', href: '#' },
      { label: 'Email Builder', href: '#' },
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
    title: 'LEGAL',
    links: [
      { label: 'Fair Use', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Subprocessors', href: '#' },
    ],
  },
];

const defaultSocials: Footer14SocialLink[] = [
  { label: 'Facebook', href: '#', icon: <FaFacebookF /> },
  { label: 'Twitter / X', href: '#', icon: <FaXTwitter /> },
  { label: 'Instagram', href: '#', icon: <FaInstagram /> },
  { label: 'LinkedIn', href: '#', icon: <FaLinkedinIn /> },
];


const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};


const navStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};


const riseItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
};


const linkStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4, bounce: 0 },
  },
};

const bottomBarItem: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};


const heroBrandVariant: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.1, bounce: 0 },
  },
};







export function Footer14({
  logoIcon,
  brandName = 'Watermelon',
  columns = defaultColumns,
  socialLinks = defaultSocials,
  emailPlaceholder = 'Enter your email',
  subscribeLabel = 'Subscribe',
  subscribeTagline = 'Receive calm nature wrapped\nin moonlight silence.',
  onSubscribe,
  statusLabel = 'System status :',
  statusValue = 'Moderate',
  copyright = '© 2026 Melon , Inc. All rights reserved.',
  heroBrandName = 'Watermelon',
}: Footer14Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    onSubscribe?.(email);
  }

  return (
    <footer className="w-full overflow-hidden rounded-4xl bg-[#4b6a9b] font-sans antialiased">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 pt-10 pb-0 sm:px-10 lg:px-14 xl:px-20"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
          <motion.div
            variants={riseItem}
            className="flex shrink-0 gap-2.5 items-start justify-start -translate-y-2"
          >
            <span className="shrink-0">{logoIcon ?? <LogoIcon className='size-8 text-blue-200/50' />}</span>
            <span className="text-lg font-normal tracking-wide text-gray-100 uppercase select-none mt-0.5">
              {brandName}
            </span>
          </motion.div>

          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:gap-x-6 xl:gap-x-8"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem}>
                <h3 className="text-lg leading-none font-normal tracking-wide text-balance text-gray-100 uppercase">
                  {col.title}
                </h3>
                <motion.ul
                  variants={linkStagger}
                  className="mt-4 space-y-[10px]"
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkItem}>
                      <a
                        href={link.href}
                        className="text-md leading-none font-light text-blue-100/80 transition-colors duration-200 hover:text-blue-100"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            variants={riseItem}
            className="flex w-full shrink-0 flex-col gap-2 sm:max-w-[200px] lg:max-w-xs"
          >
            <div className="flex items-center gap-0">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  whileTap={{ scale: 0.96 }}
                  className="flex min-h-10 min-w-10 items-center justify-start rounded-md text-blue-200 transition-colors duration-200 hover:text-blue-100"
                >
                  <span className="">{link.icon}</span>
                </motion.a>
              ))}
            </div>

            <div>
              <h3 className="text-md leading-none font-medium text-gray-100">
                Contact Us
              </h3>
              <form onSubmit={handleSubmit} className="mt-2">
                <div className="flex gap-2 overflow-hidden rounded-none">
                  <label htmlFor="footer-14-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer14-email"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    className="h-[38px] min-w-0 flex-1 bg-white px-3 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    className="text-md flex h-[38px] shrink-0 cursor-pointer items-center gap-1.5 bg-blue-200 pr-2.5 pl-3 font-medium text-blue-950 outline-1 -outline-offset-1 outline-black/10 transition-[background-color] duration-150 text-shadow-2xs hover:bg-blue-200/95 active:bg-blue-200"
                  >
                    <span>{subscribeLabel}</span>
                  </motion.button>
                </div>

                <p className="text-sm mt-2 leading-tight font-normal text-pretty whitespace-pre-line text-blue-100/60">
                  {subscribeTagline}
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={bottomBarItem}
          className="mx-auto mt-4 max-w-[1440px] border-t border-blue-200/40"
        >
          <div className="flex flex-col gap-3 py-4 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-md font-normal text-blue-100/80">
              {statusLabel}
              <span className="ml-2 font-light text-gray-100">
                {statusValue}
              </span>
            </p>

            <p className="text-md font-normal text-blue-100/80">{copyright}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={heroBrandVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative flex items-end justify-center overflow-hidden bg-[#4b6a9b] px-6 pt-6 sm:pt-8 md:pt-14"
        style={{ minHeight: 'clamp(140px, 20vw, 260px)' }}
      >
        <p
          aria-hidden="true"
          className="translate-y-1 text-center font-sans leading-[0.82] font-bold tracking-[-0.02em] text-[#6d8fc0] select-none text-shadow-xs md:translate-y-8"
          style={{
            fontSize: 'clamp(3rem, 15vw, 22rem)',
            // marginBottom: 'clamp(-0.5rem, -2vw, -4rem)',
          }}
        >
          {heroBrandName}
        </p>
      </motion.div>
    </footer>
  );
}
