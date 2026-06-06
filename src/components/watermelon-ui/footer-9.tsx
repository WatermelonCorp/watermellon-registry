import { type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export interface Footer9SocialLink {
  label: string;
  href: string;
}

export interface Footer9NavLink {
  label: string;
  href: string;
}

export interface Footer9LegalLink {
  label: string;
  href: string;
}

export interface Footer9Props {
  /** Large CTA heading text (multi-line supported) */
  heading?: string;
  /** Contact email displayed below the heading */
  email?: string;
  /** Href for the email link (e.g. mailto:) */
  emailHref?: string;
  /** Custom icon for email link */
  emailIcon?: ReactNode;
  /** Background image URL for the hero area */
  backgroundImage?: string;
  /** Social media links displayed on the right */
  socialLinks?: Footer9SocialLink[];
  /** Brand logo or name element */
  brandLogo?: ReactNode;
  /** Navigation links shown in the bottom bar */
  navLinks?: Footer9NavLink[];
  /** Copyright text */
  copyright?: string;
  /** Legal/policy links shown at the very bottom */
  legalLinks?: Footer9LegalLink[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', duration: 0.8, bounce: 0 },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const lineSeparatorVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0.5 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { type: 'spring', duration: 0.9, bounce: 0 },
  },
};

export function Footer9({
  heading = 'Ready to Build\nSomething Great?',
  email = 'hello@apexcraft.studio',
  emailHref = 'mailto:hello@apexcraft.studio',
  emailIcon,
  backgroundImage,
  socialLinks = [],
  brandLogo,
  navLinks = [],
  copyright = '© 2026 Luminova. All rights reserved',
  legalLinks = [],
}: Footer9Props) {
  return (
    <footer className="relative w-full overflow-hidden bg-transparent py-12 selection:bg-sky-400/20">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-10 md:px-16 lg:px-20"
      >
        <div className="flex min-h-[420px] flex-col justify-between gap-10 pt-12 pb-10 sm:min-h-[460px] sm:pt-16 md:min-h-[500px] lg:flex-row lg:items-start lg:gap-16">
          <div className="flex flex-1 flex-col justify-between gap-8">
            <h2 className="text-primary-foreground max-w-2xl text-4xl leading-tight font-normal tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {heading.split('\n').map((line, i) => (
                <motion.span variants={itemVariants} key={i} className="block">
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.a
              variants={itemVariants}
              href={emailHref}
              className="group inline-flex items-center gap-2 self-start"
            >
              <span className="text-primary-foreground/80 group-hover:text-primary-foreground text-sm font-normal tracking-wide transition-colors duration-200 sm:text-base">
                {email}
              </span>
              <span className="text-primary-foreground/80 group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                {emailIcon || (
                  <FaArrowUpRightFromSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                )}
              </span>
            </motion.a>
          </div>

          {socialLinks.length > 0 && (
            <motion.nav
              variants={fadeLeftVariants}
              aria-label="Social media links"
              className="flex flex-row flex-wrap gap-4 lg:flex-col lg:items-end lg:gap-2.5 lg:pt-2"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-normal transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          )}
        </div>

        <div className="flex flex-col gap-5 pb-6 sm:gap-6 sm:pb-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
            {brandLogo && <motion.div variants={fadeRightVariants} className="shrink-0">{brandLogo}</motion.div>}

            {navLinks.length > 0 && (
              <motion.nav
                variants={fadeLeftVariants}
                aria-label="Footer navigation"
                className="flex flex-wrap items-center gap-5 sm:gap-6 md:gap-8"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-normal text-white/90 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </div>

          <motion.div variants={lineSeparatorVariants}>
            <Separator className="bg-primary-foreground/20" />
          </motion.div>

          <motion.div variants={fadeVariants} className="mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
            {copyright && (
              <p className="text-xs text-white sm:text-sm">{copyright}</p>
            )}

            {copyright && legalLinks.length > 0 && (
              <span className="hidden px-4 text-white/90 sm:inline">|</span>
            )}

            {legalLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 text-xs text-balance text-white/90 sm:text-sm">
                {legalLinks.map((link, index) => (
                  <span key={link.label} className="inline-flex items-center">
                    <a
                      href={link.href}
                      className="hover:text-primary-foreground/80 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="px-1">,</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
