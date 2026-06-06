import { type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import { FaArrowRight } from 'react-icons/fa6';

export interface Footer8Link {
  label: string;
  href: string;
}

export interface Footer8LinkColumn {
  links: Footer8Link[];
}

export interface Footer8PersonInfo {
  name: string;
  role: string;
  location: string;
}

export interface Footer8Props {
  /** Small heading above the CTA */
  tagline?: string;
  /** The main CTA email address */
  email?: string;
  /** The href for the email CTA (e.g. mailto:) */
  emailHref?: string;
  /** Icon shown next to the email CTA */
  emailIcon?: ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Person/brand info displayed below separator on the left */
  personInfo?: Footer8PersonInfo;
  /** Navigation link columns displayed on the right */
  linkColumns?: Footer8LinkColumn[];
  /** Copyright text at the bottom */
  copyright?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.9, bounce: 0.2 },
  },
};

const separatorVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { type: 'spring', duration: 0.9, bounce: 0 },
  },
};

const fadeSlideVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
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

export function Footer8({
  tagline = "Let's collaborate",
  email = 'hello@novastudio.com',
  emailHref = 'mailto:hello@novastudio.com',
  emailIcon,
  backgroundImage,
  personInfo = {
    name: 'Elena Vasquez',
    role: 'Creative Director',
    location: 'Brooklyn, NY',
  },
  linkColumns = [],
  copyright = '© 2026 novastudio',
}: Footer8Props) {
  return (
    <footer className="relative w-full py-12">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-7xl flex-col justify-between px-6 py-10 sm:min-h-[560px] sm:px-10 md:min-h-[600px] md:px-16 lg:px-20"
      >
        <motion.div variants={slideUpVariants} className="flex flex-1 flex-col justify-center gap-4 pt-8 sm:gap-5 md:gap-6">
          {tagline && (
            <p className="text-sm font-normal text-white/90 sm:text-lg">
              {tagline}
            </p>
          )}
        </motion.div>

        <div className="flex flex-col gap-6 pb-2 sm:gap-6">
          <motion.a
            variants={slideUpVariants}
            href={emailHref}
            className="group flex w-full items-center justify-between gap-3 sm:gap-4 md:gap-5"
          >
            <div className="flex w-full items-center overflow-hidden">
              <svg
                className="h-auto w-full transition-colors duration-300 select-none"
                viewBox={`0 0 ${Math.max(email.length * 70, 400)} 160`}
                preserveAspectRatio="xMidYMid meet"
                aria-label={email}
              >
                <text
                  x="0"
                  y="130"
                  dominantBaseline="alphabetic"
                  textAnchor="start"
                  textLength="100%"
                  lengthAdjust="spacing"
                  className="fill-white/90 font-sans font-medium tracking-normal transition-colors group-hover:fill-white"
                  fontSize="140"
                >
                  {email}
                </text>
              </svg>
            </div>
            <span className="flex shrink-0 items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-4">
              {emailIcon || (
                <FaArrowRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
              )}
            </span>
          </motion.a>
          
          <motion.div variants={separatorVariants}>
            <Separator className="bg-white/30" />
          </motion.div>
          
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between">
            {personInfo && (
              <motion.div variants={fadeSlideVariants} className="flex flex-wrap items-center gap-1.5 text-sm text-white/80 sm:gap-2">
                <span className="font-medium text-white">
                  {personInfo.name}
                </span>
                <span className="text-white/50">•</span>
                <span>{personInfo.role}</span>
                <span className="text-white/50">•</span>
                <span>{personInfo.location}</span>
              </motion.div>
            )}

            {linkColumns.length > 0 && (
              <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-20">
                {linkColumns.map((column, colIndex) => (
                  <motion.ul variants={fadeSlideVariants} key={colIndex} className="flex flex-col gap-2.5">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                ))}
              </div>
            )}
          </div>

          {copyright && (
            <motion.p variants={fadeVariants} className="mt-4 text-xs text-white/60 sm:mt-6 sm:text-sm">
              {copyright}
            </motion.p>
          )}
        </div>
      </motion.div>
    </footer>
  );
}
