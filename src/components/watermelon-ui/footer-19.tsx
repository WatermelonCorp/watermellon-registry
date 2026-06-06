'use client'

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, LanguageCircleIcon, SparklesIcon } from "@hugeicons/core-free-icons";
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

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Footer19Props {
  badgeText?: string;
  newsletterHeading?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  brandName?: string;
  brandLogo?: React.ReactNode;
  navColumns?: FooterColumn[];
  copyright?: string;
  location?: string;
  time?: string;
  socialLinks?: { label: string; href: string }[];
}

export default function Footer19({
  badgeText = "Trusted by Thousands",
  newsletterHeading = "The latest news,\narticles, and resources,\nin your inbox weekly.",
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Stay Updated",
  brandName = "Watermelon",
  brandLogo = <HugeiconsIcon icon={SparklesIcon} size={24} className="text-violet-500 fill-violet-500/20" />,
  navColumns = [
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "PRODUCTS",
      links: [
        { label: "Software", href: "#" },
        { label: "Hardware", href: "#" },
        { label: "Accessories", href: "#" },
        { label: "Licensing", href: "#" },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { label: "Email", href: "#" },
        { label: "Phone", href: "#" },
        { label: "Locations", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
  ],
  copyright = "Copyright© Watermelon Studio",
  location = "Brooklyn, NY",
  time = "07:23:14 AM",
  socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "Linkedin", href: "#" },
  ],
}: Footer19Props) {
  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative w-full bg-[#0A0A0B] text-neutral-300 font-sans overflow-hidden selection:bg-violet-500/30"
    >
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bottom Left Glow */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full" />
        
        {/* Dotted Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", 
            backgroundSize: "24px 24px" 
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 flex flex-col min-h-[500px] justify-between">
        
        {/* ── Top Section: Newsletter ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-24">
          <motion.div variants={riseItem} className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
              <span className="text-sm font-medium text-neutral-200">{badgeText}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light leading-[1.1] text-white tracking-tight whitespace-pre-line">
              {newsletterHeading}
            </h2>
          </motion.div>

          <motion.div variants={riseItem} className="w-full max-w-md lg:mt-auto">
            <form className="flex w-full h-14" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="flex-1 bg-neutral-950 border border-neutral-800 border-r-0 px-5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-shadow"
                required
              />
              <button
                type="submit"
                className="h-full px-6 bg-violet-700 transition-colors border border-violet-800 flex items-center justify-center gap-2 text-sm font-medium text-white cursor-pointer"
              >
                {newsletterButtonText}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── Middle Section: Links & Logo ── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <motion.div variants={riseItem} className="flex items-center gap-2 text-white">
            {brandLogo}
            <span className="text-xl md:text-2xl font-medium tracking-tight">{brandName}</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 lg:gap-32">
            {navColumns.map((col, idx) => (
              <motion.div key={idx} variants={riseItem} className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-white uppercase">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
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

        {/* ── Bottom Section: Meta ── */}
        <motion.div variants={riseItem} className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs text-neutral-500">
          <p>{copyright}</p>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={LanguageCircleIcon} size={16} />
              <span>{location}</span>
            </div>
            <span className="tabular-nums tracking-widest">{time}</span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                className="hover:text-white transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
}
