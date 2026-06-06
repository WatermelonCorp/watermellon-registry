import { type FormEvent, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Footer13Link {
  label: string;
  href: string;
}

export interface Footer13Column {
  title: string;
  links: Footer13Link[];
}

export interface Footer13SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface Footer13BottomLink {
  label: string;
  href: string;
}

export interface Footer13Props {
  /** URL for the full-width hero landscape image at the top */
  heroSrc?: string;
  heroAlt?: string;
  /** Custom logo mark element */
  logoIcon?: ReactNode;
  brandName?: string;
  /** Four navigation columns rendered left of the Contact Us column */
  columns?: Footer13Column[];
  emailPlaceholder?: string;
  subscribeLabel?: string;
  /** Short tagline shown below the subscribe form */
  subscribeTagline?: string;
  onSubscribe?: (email: string) => void;
  copyright?: string;
  socialLinks?: Footer13SocialLink[];
  bottomLinks?: Footer13BottomLink[];
}

const defaultColumns: Footer13Column[] = [
  {
    title: 'Company',
    links: [
      { label: 'Manifesto', href: '#' },
      { label: 'Career', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Inquiries', href: '#' },
    ],
  },
  {
    title: 'Intelligence',
    links: [
      { label: 'Field Notes', href: '#' },
      { label: 'System Ethics', href: '#' },
      { label: 'The Long Now', href: '#' },
      { label: 'Whitepapers', href: '#' },
      { label: 'Intelligence', href: '#' },
    ],
  },
  {
    title: 'Protocols',
    links: [
      { label: 'The Golden Path', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact us', href: '#' },
      { label: 'Products', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Security Policy', href: '#' },
    ],
  },
];

const defaultSocials: Footer13SocialLink[] = [
  { label: 'Facebook', href: '#', icon: <FaFacebookF /> },
  { label: 'Twitter / X', href: '#', icon: <FaXTwitter /> },
  { label: 'Instagram', href: '#', icon: <FaInstagram /> },
  { label: 'LinkedIn', href: '#', icon: <FaLinkedinIn /> },
];

const defaultBottomLinks: Footer13BottomLink[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const heroVariant: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.65, bounce: 0 },
  },
};

const linkStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.45, bounce: 0 },
  },
};


export function Footer13({
  heroSrc = 'https://assets.watermelon.sh/footer-13-bg.avif',
  heroAlt = 'A serene mountain landscape at dusk with pine silhouettes',
  logoIcon,
  brandName = 'Watermelon',
  columns = defaultColumns,
  emailPlaceholder = 'Enter your email',
  subscribeLabel = 'Subscribe',
  subscribeTagline = 'Receive calm nature wrapped\nin moonlight silence.',
  onSubscribe,
  copyright = '© 2026 Watermelon Inc. All rights reserved.',
  socialLinks = defaultSocials,
  bottomLinks = defaultBottomLinks,
}: Footer13Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    onSubscribe?.(email);
  }

  return (
    <footer className="w-full overflow-hidden font-sans antialiased">
      <motion.div
        variants={heroVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative h-[340px] w-full overflow-hidden sm:h-[400px] md:h-[460px] lg:h-[520px]"
      >
        <img
          src={heroSrc}
          alt={heroAlt}
          className="h-full w-full mask-b-from-80% object-cover object-center outline-1 -outline-offset-1 outline-white/10"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        className="bg-neutral-950 px-6 pt-8 sm:px-10 lg:px-14 xl:px-20"
      >
        <div className="flex flex-col gap-10 border-b border-white/[0.07] pb-8 lg:flex-col lg:gap-8 xl:gap-8">
          <motion.div
            variants={riseItem}
            className="flex shrink-0 items-center gap-2 "
          >
            <span className="shrink-0">{logoIcon ?? <LogoIcon className='size-8 dark:text-white text-zinc-200' />}</span>
            <span className="text-xl font-normal tracking-wide text-white uppercase select-none">
              {brandName}
            </span>
          </motion.div>

          <motion.nav
            variants={staggerContainer}
            aria-label="Footer navigation"
            className="grid flex-1 grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(210px,350px)] lg:gap-x-4 xl:gap-x-4"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem}>
                <h3 className="text-lg leading-none font-light tracking-wide text-balance text-white">
                  {col.title}
                </h3>
                <motion.ul
                  variants={linkStagger}
                  className="mt-[18px] space-y-[11px]"
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkItem}>
                      <a
                        href={link.href}
                        className="text-sm leading-none font-light text-neutral-400 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}

            <motion.div
              variants={riseItem}
              className="col-span-2 sm:col-span-2 md:col-span-1"
            >
              <h3 className="text-sm leading-none font-medium tracking-wide text-balance text-white">
                Contact Us
              </h3>
              <form onSubmit={handleSubmit} className="mt-[18px]">
                <div className="flex w-full max-w-2xl gap-2 overflow-hidden">
                  <label htmlFor="footer13-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer13-email"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    className="h-[42px] min-w-0 flex-1 bg-white px-3 text-sm font-normal text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    className="flex h-[42px] shrink-0 cursor-pointer items-center gap-1.5 bg-[linear-gradient(to_right,#881F43_0%,#C53A4A_50%,#FDA25F_100%)] pr-3 pl-3.5 text-sm font-medium text-neutral-900 outline-2 -outline-offset-2 outline-white/10 transition-[background-color] duration-150 hover:bg-neutral-100 active:bg-neutral-200"
                  >
                    <span>{subscribeLabel}</span>
                    <FaArrowRight className="size-3 shrink-0" />
                  </motion.button>
                </div>

                <p className="mt-2.5 text-sm leading-[1.55] font-light text-pretty whitespace-pre-line text-neutral-200">
                  {subscribeTagline}
                </p>
              </form>
            </motion.div>
          </motion.nav>
        </div>

        <motion.div
          variants={riseItem}
          className="flex flex-col gap-5 py-[18px] text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <p className="text-md font-normal text-neutral-300">{copyright}</p>

          <div className="flex items-center gap-0">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                whileTap={{ scale: 0.96 }}
                className="flex min-h-10 min-w-10 items-center justify-center text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                <span className="text-[15px]">{link.icon}</span>
              </motion.a>
            ))}
          </div>

         
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-normal text-neutral-500 transition-colors duration-200 hover:text-neutral-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
