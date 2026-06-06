'use client'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { motion, type Variants } from 'motion/react';

export interface LinkItem {
    label: string;
    href: string;
}

export interface OfferColumn {
    title: string;
    links: LinkItem[];
}

export interface Footer22Props {
    brandName?: string;
    offerColumns?: OfferColumn[];
    newsletterHeadline?: string;
    newsletterDescription?: string;
    contactHeading?: string;
    contactDescription?: string;
    emailContact?: string;
    bottomLinks?: LinkItem[];
}

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

const gridItem: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

export default function Footer22({
    brandName = "WATERMELON",
    offerColumns = [
        {
            title: "OFFER",
            links: [
                { label: "Calendars", href: "#" },
                { label: "Refills & accessories", href: "#" },
                { label: "Notebooks", href: "#" },
                { label: "Bundles", href: "#" },
            ]
        },
        {
            title: "OFFER",
            links: [
                { label: "Calendars", href: "#" },
                { label: "Refills & accessories", href: "#" },
                { label: "Notebooks", href: "#" },
                { label: "Bundles", href: "#" },
            ]
        },
        {
            title: "OFFER",
            links: [
                { label: "Calendars", href: "#" },
                { label: "Refills & accessories", href: "#" },
                { label: "Notebooks", href: "#" },
                { label: "Bundles", href: "#" },
            ]
        },
        {
            title: "OFFER",
            links: [
                { label: "Calendars", href: "#" },
                { label: "Refills & accessories", href: "#" },
                { label: "Notebooks", href: "#" },
                { label: "Bundles", href: "#" },
            ]
        }
    ],
    newsletterHeadline = "Get 20% off the first Order",
    newsletterDescription = "Sign up for our monthly newsletter. That's it!",
    contactHeading = "Contact Us",
    contactDescription = "Receive calm nature wrapped in moonlight silence.",
    emailContact = "Watermelon@business.com",
    bottomLinks = [
        { label: "About", href: "#" },
        { label: "Support", href: "#" },
        { label: "Features", href: "#" },
        { label: "Support", href: "#" },
    ]
}: Footer22Props) {
    return (
        <motion.footer
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="w-full bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300"
        >

            {/* Top Section */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                    {/* Left: Offer Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {offerColumns.map((col, idx) => (
                            <motion.div key={idx} variants={riseItem} className="flex flex-col gap-6">
                                <h4 className="font-semibold text-[13px] tracking-wide uppercase text-neutral-900 dark:text-neutral-100">
                                    {col.title}
                                </h4>
                                <ul className="flex flex-col gap-3.5">
                                    {col.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <a href={link.href} className="text-[14px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Newsletter & Contact */}
                    <motion.div variants={riseItem} className="lg:col-span-4 flex flex-col gap-10 lg:pl-10">
                        {/* Newsletter */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[22px] font-medium tracking-tight text-neutral-900 dark:text-neutral-100">{newsletterHeadline}</h3>
                            <p className="text-[15px] text-neutral-600 dark:text-neutral-400">
                                {newsletterDescription}
                            </p>
                        </div>

                        {/* Contact Form */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[22px] font-medium tracking-tight text-neutral-900 dark:text-neutral-100">{contactHeading}</h3>
                            <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 min-w-0 bg-white dark:bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-sm px-4 py-2.5 text-[15px] focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 transition-colors"
                                    required
                                />
                                <button type="submit" className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black rounded-sm px-6 py-2.5 flex items-center justify-center gap-2 font-medium transition-transform hover:opacity-90 active:scale-95 shrink-0">
                                    Subscribe <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                                </button>
                            </form>
                            <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[280px] mt-1">
                                {contactDescription}
                            </p>
                        </div>
                    </motion.div>

                </div>

                {/* Middle Email/Reach Out Section */}
                <motion.div variants={riseItem} className="pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                    <div className="flex flex-col gap-4">
                        <span className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-normal">Reach out at:</span>
                        <a href={`mailto:${emailContact}`} className="text-2xl md:text-4xl lg:text-[40px] font-light text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white flex items-center gap-3 group transition-colors">
                            {emailContact}
                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={24} className="text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 md:gap-10 pb-1">
                        {bottomLinks.map((link, idx) => (
                            <a key={idx} href={link.href} className="text-[17px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>

                </motion.div>
            </div>

            {/* Bottom Banner with Pixel-Perfect Mosaic Grid */}
            <motion.div variants={gridItem} className="relative w-full overflow-hidden bg-white dark:bg-[#0a0a0a]">

                {/* CSS Mosaic Grid Generation */}
                <div className="absolute inset-0 flex flex-col w-full h-full">
                    {Array.from({ length: 12 }).map((_, r) => (
                        <div key={r} className="flex-1 flex w-full">
                            {Array.from({ length: 48 }).map((_, c) => {
                                // Deterministic pseudo-randomness for the mosaic pattern
                                const hash = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
                                const rand = hash - Math.floor(hash);

                                // Gradient mapping: top rows are lighter/transparent, bottom rows are solid cyan/blue
                                const rowFactor = r / 11; // 0 to 1

                                // Base opacity combines the random noise with the vertical gradient
                                const opacity = (rand * 0.2) + (rowFactor * 0.85);

                                return (
                                    <div
                                        key={c}
                                        className="flex-1 border-r border-b border-transparent"
                                        style={{
                                            backgroundColor: `rgba(89, 195, 224, ${opacity})`
                                        }}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Big Text Container */}
                <div className="relative flex items-center justify-center w-full py-2 md:py-3 px-1 md:px-2 z-10 overflow-hidden">
                    <span className="text-[13vw] md:text-[14vw] font-black text-white/90 dark:text-white/60 mix-blend-overlay tracking-tighter leading-none select-none text-center whitespace-nowrap">
                        {brandName.toUpperCase()}
                    </span>
                </div>

            </motion.div>

        </motion.footer>
    );
}