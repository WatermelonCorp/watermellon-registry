import { type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { FaArrowRight } from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';



export interface Footer15Link {
  label: string;
  href: string;
}

export interface Footer15Column {
  title: string;
  links: Footer15Link[];
}

export interface Footer15Props {
  /** Custom logo mark element */
  logoIcon?: ReactNode;
  brandName?: string;
  /** Short brand description / tagline */
  description?: string;
  /** CTA button label */
  ctaLabel?: string;
  ctaHref?: string;
  /** Navigation columns */
  columns?: Footer15Column[];
  /** Large brand text in the bottom hero section */
  heroBrandName?: string;
  /** Copyright year / text */
  copyrightYear?: string;
}



const defaultColumns: Footer15Column[] = [
  {
    title: 'Product',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Twitter', href: '#' },
      { label: 'Linkedin', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
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


const heroBrandVariant: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 1.1, bounce: 0 },
  },
};


const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.5, bounce: 0 },
  },
};






export function Footer15({
  logoIcon,
  brandName = 'Watermelon',
  description = 'Craft adaptive systems, enhance results,\nand launch effortlessly with next-\ngeneration AI capabilities.',
  ctaLabel = 'Explore now',
  ctaHref = '#',
  columns = defaultColumns,
  heroBrandName = 'Watermelon',

}: Footer15Props) {
  return (
    <footer className="w-full overflow-hidden rounded-t-4xl bg-[#2a2a1e] font-sans antialiased sm:rounded-t-[2.5rem] md:rounded-t-[3rem]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 pt-10 pb-0 sm:px-10 sm:pt-14 lg:px-14 lg:pt-16 xl:px-20"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:gap-16 xl:gap-20">
          <motion.div
            variants={riseItem}
            className="flex shrink-0 flex-col gap-5 lg:max-w-[240px] xl:max-w-[260px]"
          >
            <div className="flex items-center gap-2">
              <span className="shrink-0">
                {logoIcon ?? <LogoIcon className="size-8 text-[#a8a08c]" />}
              </span>
              <span className="text-lg font-medium  text-[#e8e0cc] uppercase select-none">
                {brandName}
              </span>
            </div>

            <p className="text-sm leading-[1.6] font-light text-pretty whitespace-pre-line text-[#a8a08c]">
              {description}
            </p>

            <motion.a
              href={ctaHref}
              variants={ctaVariant}
              whileTap={{ scale: 0.96 }}
              className="group mt-1 inline-flex w-fit items-center gap-2.5 rounded-full bg-green-500 py-0.5 pr-1 pl-5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] transition-[background-color,box-shadow] duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15),0_0_20px_rgba(232,224,204,0.12)]"
            >
              <span className="text-sm font-medium text-[#2a2a1e]">
                {ctaLabel}
              </span>
              <span className="will-change-transfor flex size-10 items-center justify-center rounded-full bg-zinc-800">
                <FaArrowRight className="size-4 text-zinc-100 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </motion.div>

          <motion.nav
            variants={navStagger}
            aria-label="Footer navigation"
            className="grid w-full max-w-[540px] grid-cols-2 gap-y-8 sm:grid-cols-4"
          >
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem} className="">
                <h3 className="text-md leading-none font-normal tracking-wide text-balance text-[#e8e0cc]">
                  {col.title}
                </h3>
                <motion.ul
                  variants={linkStagger}
                  className="mt-3 flex flex-col gap-3"
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkItem}>
                      <a
                        href={link.href}
                        className="inline-block text-sm leading-none font-light text-[#a8a08c] transition-colors duration-200 hover:text-[#e8e0cc]"
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
      </motion.div>

      <motion.div
        variants={heroBrandVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative flex items-end justify-center overflow-hidden px-4 pt-10 sm:px-6 sm:pt-14 md:pt-20"
      >
        <svg
          className="h-auto w-full translate-y-2 select-none md:translate-y-6"
          viewBox={`0 0 ${Math.max(heroBrandName.length * 90, 400)} 110`}
          preserveAspectRatio="xMidYMid meet"
          aria-label={heroBrandName}
        >
          <text
            x="50%"
            y="100%"
            dominantBaseline="alphabetic"
            textAnchor="middle"
            textLength="95%"
            lengthAdjust="spacing"
            className="fill-[#e8e0cc] font-sans font-semibold  text-shadow-sm"
            fontSize="160"
          >
            {heroBrandName}
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}
