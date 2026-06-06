import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { motion, type Variants } from 'motion/react';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
};

const giantTextVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Footer17Props {
  heading?: string;
  brandName?: string;
  navColumns?: FooterColumn[];
  socialLinks?: { label: string; href: string }[];
  legalText?: string;
  bottomLinks?: { label: string; href: string }[];
}

export default function Footer17({
  heading = 'Connect\nwith us.',
  brandName = 'Watermelon',
  navColumns = [
    {
      title: 'Menu',
      links: [
        { label: 'About', href: '#' },
        { label: 'Our Work', href: '#' },
        { label: 'Philosophy', href: '#' },
        { label: 'Services Contact', href: '#' },
      ],
    },
    {
      title: 'Office',
      links: [
        { label: '26 Broadway, 8th floor', href: '#' },
        { label: 'New York, NY 10004', href: '#' },
        { label: 'United States', href: '#' },
      ],
    },
  ],
  socialLinks = [
    { label: 'INSTAGRAM', href: '#' },
    { label: 'FACEBOOK', href: '#' },
    { label: 'TWITTER', href: '#' },
    { label: 'BEHANCE', href: '#' },
  ],
  legalText = '© 2026 Firefa Inc. — Registered with FINTRAC (M3388606); cards issued by Peoples Trust Company (Canada)\nand Community Federal Savings Bank (USA) under license from Visa.',
  bottomLinks = [
    { label: 'Press and Media', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
}: Footer17Props) {
  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative w-full overflow-hidden bg-neutral-50 font-sans text-neutral-600 transition-colors duration-300 dark:bg-neutral-950/70 dark:text-neutral-400"
    >
      {/* ── Noise Background ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply dark:opacity-[0.04] dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Vertical Floating Contact Text ── */}
      <div className="absolute top-[40%] right-0 hidden origin-bottom-right -rotate-90 xl:block">
        <span className="translate-x-1/2 text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase transition-colors duration-300 dark:text-neutral-300">
          Contact
        </span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pt-24 pb-12 md:px-12 lg:px-20">
        {/* ── Top Section ── */}
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:gap-24">
          <motion.div
            variants={riseItem}
            className="flex flex-col gap-4 lg:w-1/2"
          >
            <h2 className="text-5xl leading-[1.05] font-normal tracking-tight whitespace-pre-line text-neutral-900 transition-colors duration-300 md:text-6xl lg:text-7xl dark:text-neutral-300">
              {heading}
            </h2>
            {/* Corner Arrow SVG */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-neutral-400 transition-colors duration-300 dark:text-neutral-500"
            >
              <path d="M6 4v10h10" />
              <path d="M12 10l4 4-4 4" />
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24 lg:w-1/2 lg:justify-end">
            {navColumns.map((col, idx) => (
              <motion.div
                key={idx}
                variants={riseItem}
                className="flex flex-col gap-6"
              >
                <h4 className="text-lg font-medium text-neutral-900 transition-colors duration-300 dark:text-neutral-200">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-base text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Middle Section: Divider & Socials ── */}
        <motion.div
          variants={riseItem}
          className="mt-24 flex flex-col items-center gap-4 md:flex-row"
        >
          <div className="hidden h-px flex-1 bg-neutral-200 transition-colors duration-300 md:block dark:bg-neutral-800"></div>
          <div className="flex w-full flex-wrap items-center justify-center gap-6 md:w-auto md:justify-end md:gap-12">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="group flex items-center gap-1.5 text-[11px] font-medium tracking-widest text-neutral-600 uppercase transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                {link.label}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={14}
                  className="text-neutral-400 transition-colors group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Lower Section: Giant Text & Legal ── */}
        <div className="relative flex w-full flex-col">
          {/* Giant Brand Name */}
          <motion.div
            variants={giantTextVariant}
            className="relative mb-8 flex w-full justify-center"
          >
            <svg
              className="h-auto w-full transition-colors duration-300 select-none"
              viewBox={`0 0 ${Math.max(brandName.length * 60, 300)} 105`}
              preserveAspectRatio="xMidYMid meet"
              aria-label={brandName}
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-neutral-300 font-bold tracking-tighter transition-colors duration-300 dark:fill-white/20"
                fontSize="110"
              >
                {brandName}
              </text>
            </svg>

            <div className="absolute inset-x-0 bottom-0 z-10 mb-2 h-px w-full bg-neutral-200 transition-colors duration-300 sm:mb-4 md:mb-6 lg:mb-10 dark:bg-neutral-800"></div>
          </motion.div>

          <motion.div
            variants={riseItem}
            className="flex flex-col items-start justify-between gap-6 text-sm text-neutral-500 transition-colors duration-300 lg:flex-row lg:items-center"
          >
            <p className="max-w-2xl leading-relaxed whitespace-pre-line">
              {legalText}
            </p>

            <div className="flex items-center gap-8">
              {bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="whitespace-nowrap transition-colors hover:text-neutral-900 dark:hover:text-neutral-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
