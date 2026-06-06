import LogoIcon from '@/assets/logo-icon';
import { motion, type Variants } from 'motion/react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';

export interface Footer16Link {
  label: string;
  href: string;
}

export interface Footer16Column {
  title: string;
  links: Footer16Link[];
}

export interface Footer16Social {
  label: string;
  href: string;
  icon: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
}

export interface Footer16Props {
  brandName?: string;
  tagline?: string;
  columns?: Footer16Column[];
  legalLinks?: Footer16Link[];
  socials?: Footer16Social[];
  copyright?: string;
  backgroundImage?: string;
}

const defaultColumns: Footer16Column[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Revenue Acceleration', href: '#' },
      { label: 'Search Visibility', href: '#' },
      { label: 'Conversion Optimization', href: '#' },
      { label: 'Customer Automation', href: '#' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'Web Architecture', href: '#' },
      { label: 'Brand Systems', href: '#' },
      { label: 'Growth Marketing', href: '#' },
      { label: 'E-commerce Infrastructure', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '#' },
      { label: 'Growth Insights', href: '#' },
      { label: 'Playbooks', href: '#' },
      { label: 'Industry Reports', href: '#' },
    ],
  },
];

const defaultLegalLinks: Footer16Link[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const defaultSocials: Footer16Social[] = [
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
];

const backgroundUrl = 'https://assets.watermelon.sh/footer-16-bg.avif';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const wordmarkVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.1, bounce: 0 },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.65, bounce: 0 },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.42, bounce: 0 },
  },
};

const socialIcons = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};


export function Footer16({
  brandName = 'MELON',
  tagline = 'Change your future today using marketing\nand growth systems everything you need\nstarts here',
  columns = defaultColumns,
  legalLinks = defaultLegalLinks,
  socials = defaultSocials,
  copyright = '© 2026 Watermelon, Inc. All rights reserved.',
  backgroundImage = backgroundUrl,
}: Footer16Props) {
  return (
    <footer className="relative w-full overflow-hidden bg-zinc-950 font-sans text-zinc-100 antialiased ">
      <div
        className="absolute inset-0 z-10 bg-cover bg-center sm:-translate-y-16"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,14,0.35)_0%,rgba(9,10,14,0.06)_42%,rgba(9,10,14,0.58)_68%,rgba(9,10,14,0.9)_100%)]"
        aria-hidden="true"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        className="relative mx-auto flex min-h-[620px] flex-col justify-end pt-16 sm:min-h-[680px] lg:min-h-[812px]"
      >
        <motion.div
          variants={wordmarkVariants}
          className="pointer-events-none absolute top-[43%] left-1/2 flex w-[118vw] -translate-x-1/2 justify-center overflow-hidden sm:top-[20%] lg:top-[12%]"
          aria-hidden="true"
        >
          <svg
            className="h-auto w-full select-none"
            viewBox={`0 0 ${Math.max(brandName.length * 90, 400)} 160`}
            preserveAspectRatio="xMidYMid meet"
            aria-label={brandName}
          >
            <defs>
              <linearGradient id="brandGrad16" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              dominantBaseline="alphabetic"
              textAnchor="middle"
              textLength="80%"
              lengthAdjust="spacing"
              className="font-sans font-medium tracking-tigth"
              fill="url(#brandGrad16)"
              fontSize="100"
            >
              {brandName}
            </text>
          </svg>
        </motion.div>

        <div className="relative z-10 border-t border-white/10 bg-black/1 px-4 pt-9 pb-7 shadow-[0_-24px_80px_rgba(9,10,14,0.34)] backdrop-blur-xs sm:px-12 sm:pt-11 sm:pb-8 lg:pt-[46px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,1fr)_minmax(520px,0.98fr)] lg:gap-x-20">
            <motion.div variants={riseVariants} className="max-w-2xl">
              <a
                href="#"
                className="group inline-flex min-h-10 items-start gap-2 text-zinc-50 transition-[opacity,transform] duration-200 ease-out hover:opacity-85 active:scale-[0.96]"
                aria-label={`${brandName} home`}
              >
                <LogoIcon  className='size-8 -translate-y-2' />
                <span className="text-xl leading-none font-normal tracking-wide">
                  {brandName}
                </span>
              </a> 
              <p className="text-md max-w-lg leading-relaxed font-normal text-pretty whitespace-pre-line text-zinc-300/78 sm:text-sm">
                {tagline}
              </p>
            </motion.div>

            <motion.nav
              variants={sectionVariants}
              aria-label="Footer navigation"
              className="grid grid-cols-1 gap-7 min-[520px]:grid-cols-3 min-[520px]:gap-x-10 lg:gap-x-[66px]"
            >
              {columns.map((column) => (
                <motion.div variants={riseVariants} key={column.title}>
                  <h3 className="text-md leading-none font-light tracking-wide text-zinc-50 uppercase">
                    {column.title}
                  </h3>
                  <motion.ul
                    variants={listVariants}
                    className="mt-4 space-y-[8px]"
                  >
                    {column.links.map((link) => (
                      <motion.li variants={linkVariants} key={link.label}>
                        <a
                          href={link.href}
                          className="inline-flex min-h-5 items-center text-sm leading-tight font-light text-zinc-300/70 transition-colors duration-200 ease-out hover:text-zinc-50"
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.nav>
          </div>

          <motion.div
            variants={riseVariants}
            className="mt-4 flex flex-col border-t border-white/11 pt-4 sm:mt-9 sm:flex-row sm:items-start gap-2 sm:justify-between"
          >
            <p className="text-sm  font-normal text-zinc-400/76">
              {copyright}
            </p>

            <div className="flex flex-col sm:items-end">
              <motion.ul
                variants={listVariants}
                className="flex items-center gap-1 sm:justify-end"
                aria-label="Social links"
              >
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];

                  return (
                    <motion.li variants={linkVariants} key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="group relative flex size-10 items-center justify-start text-zinc-400 transition-[color,transform] duration-200 ease-out hover:text-zinc-50 active:scale-[0.96]"
                      >
                        <Icon className="group-hover:blur-0 size-4 transition-[opacity,scale,filter] duration-200 ease-out group-hover:scale-110 group-hover:opacity-100" />
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.ul
                variants={listVariants}
                className="flex flex-wrap items-center gap-x-5  sm:justify-end"
              >
                {legalLinks.map((link) => (
                  <motion.li variants={linkVariants} key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-5 items-center text-sm leading-none font-normal text-zinc-300/80 transition-colors duration-200 ease-out hover:text-zinc-50"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
