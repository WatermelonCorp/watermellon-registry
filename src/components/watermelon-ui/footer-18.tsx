'use client'

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
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

export interface Footer18Props {
    newsletterHeading?: string;
    newsletterPlaceholder?: string;
    brandName?: string;
    features?: { label: string; href: string }[];
    recites?: { label: string; href: string }[];
    pricing?: { label: string; href: string }[];
    exploreText?: string;
    exploreHref?: string;
    trialText?: string;
    trialHref?: string;
    address?: React.ReactNode;
    bottomNav?: { label: string; href: string }[];
    socialLinks?: { label: string; href: string }[];
}

export default function Footer18({
    newsletterHeading = "Subscribe to our\nnewsletter",
    newsletterPlaceholder = "Email address",
    brandName = "Watermelon",
    features = [
        { label: "Accounts Payable", href: "#" },
        { label: "Approval Workflows", href: "#" },
        { label: "Bulk Payments", href: "#" },
        { label: "Global Receivables", href: "#" },
        { label: "Currency Conversions", href: "#" },
        { label: "Corporate Cards", href: "#" },
        { label: "Integrations", href: "#" },
    ],
    recites = [
        { label: "Blog", href: "#" },
        { label: "Masterclass", href: "#" },
        { label: "Tools", href: "#" },
        { label: "Changelog", href: "#" },
    ],
    pricing = [
        { label: "Security", href: "#" },
    ],
    exploreText = "Explore",
    exploreHref = "#",
    trialText = "Start free trial",
    trialHref = "#",
    address = (
        <>
            606 4th Street 5W, Suite 1100 Calgary, Alberta<br /><br />
            12P IT1, Canada
        </>
    ),
    bottomNav = [
        { label: "WORK", href: "#" },
        { label: "STUDIO", href: "#" },
        { label: "SERVICES", href: "#" },
        { label: "PARTNERSHIPS", href: "#" },
        { label: "MONOPAGE", href: "#" },
        { label: "CONTACT", href: "#" },
    ],
    socialLinks = [
        { label: "INSTAGRAM", href: "#" },
        { label: "FACEBOOK", href: "#" },
        { label: "TWITTER", href: "#" },
        { label: "BEHANCE", href: "#" },
    ],
}: Footer18Props) {

    const displayExploreText = exploreText === "Explore" ? `Explore ${brandName}` : exploreText;

    return (
        <motion.footer
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative w-full bg-neutral-50 dark:bg-neutral-950/70 text-neutral-600 dark:text-neutral-400 font-sans overflow-hidden min-h-screen flex flex-col justify-between transition-colors duration-300"
        >
            {/* ── Noise Background ── */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay transition-opacity duration-300"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="relative z-10 max-w-[1500px] w-full mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-20 flex flex-col">

                {/* ── Top Section ── */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12">

                    {/* Left: Newsletter Box */}
                    <motion.div variants={riseItem} className="w-full lg:w-[450px] shrink-0 bg-white dark:bg-[#171717] shadow-sm dark:shadow-none border border-neutral-100 dark:border-transparent rounded-md p-6 md:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[420px] transition-colors duration-300">
                        <h2 className="text-3xl md:text-4xl text-neutral-900 dark:text-neutral-400 font-medium tracking-tight whitespace-pre-line leading-[1.1] transition-colors duration-300">
                            {newsletterHeading}
                        </h2>

                        <form className="relative w-full mt-12 md:mt-16" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={newsletterPlaceholder}
                                className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-500 pb-4 text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 pr-10 text-sm transition-colors duration-300"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors cursor-pointer pb-4 flex items-center justify-center"
                            >
                                <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                            </button>
                        </form>
                    </motion.div>

                    {/* Right: Columns */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 pt-4">

                        {/* Column 1: Features & Address */}
                        <motion.div variants={riseItem} className="flex flex-col gap-10 md:gap-12">
                            <div className="flex flex-col gap-4">
                                <h4 className="font-medium text-neutral-900 dark:text-neutral-200 transition-colors duration-300">Features</h4>
                                <ul className="flex flex-col gap-3">
                                    {features.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.href} className="text-[15px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-6 mt-2 md:mt-4">
                                <a
                                    href={trialHref}
                                    className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-white transition-colors"
                                >
                                    {trialText}
                                </a>
                                <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl transition-colors duration-300">
                                    {address}
                                </p>
                            </div>
                        </motion.div>

                        {/* Column 2: Recites */}
                        <motion.div variants={riseItem} className="flex flex-col gap-4">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-200 transition-colors duration-300">Recites</h4>
                            <ul className="flex flex-col gap-3">
                                {recites.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.href} className="text-[15px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Column 3: Pricing & Explore */}
                        <motion.div variants={riseItem} className="flex flex-col justify-between gap-12 h-full">
                            <div className="flex flex-col gap-4">
                                <h4 className="font-medium text-neutral-900 dark:text-neutral-200 transition-colors duration-300">Pricing</h4>
                                <ul className="flex flex-col gap-3">
                                    {pricing.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.href} className="text-[15px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 md:mt-auto">
                                <a
                                    href={exploreHref}
                                    className="inline-flex items-center gap-2 text-[22px] text-neutral-900 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-white transition-colors group"
                                >
                                    {displayExploreText}
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={22} className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-white transition-colors" />
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>

            {/* ── Bottom Section ── */}
            <div className="relative z-10 w-full flex flex-col mt-auto">
                <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 md:mb-4">

                    <motion.div variants={riseItem} className="flex flex-wrap gap-x-8 gap-y-4">
                        {bottomNav.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="text-[11px] font-medium tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors uppercase"
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>

                    <motion.div variants={riseItem} className="flex flex-wrap gap-x-8 gap-y-4">
                        {socialLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="text-[11px] font-medium tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors uppercase flex items-center gap-1.5 group"
                            >
                                {link.label}
                                <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} className="text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors" />
                            </a>
                        ))}
                    </motion.div>

                </div>

                {/* Giant Brand Name */}
                <motion.div variants={giantTextVariant} className="w-full flex justify-center">
                    <svg
                        className="w-full h-auto select-none transition-colors duration-300"
                        viewBox={`0 0 ${Math.max(brandName.length * 90, 400)} 110`}
                        preserveAspectRatio="xMidYMid meet"
                        aria-label={brandName}
                    >
                        <text
                            x="0"
                            y="105"
                            dominantBaseline="alphabetic"
                            textAnchor="start"
                            textLength="100%"
                            lengthAdjust="spacing"
                            className="fill-neutral-300 dark:fill-white/20 font-bold tracking-tighter transition-colors duration-300"
                            fontSize="140"
                        >
                            {brandName.toUpperCase()}
                        </text>
                    </svg>
                </motion.div>
            </div>
        </motion.footer>
    );
}