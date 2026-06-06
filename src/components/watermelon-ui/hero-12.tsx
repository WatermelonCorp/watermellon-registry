'use client'

import LogoIcon from '@/assets/logo-icon';
import { ArrowRight, ArrowDown, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface NavLink {
    label: string;
    href: string;
}


interface Hero3Props {
    brandName?: string;
    navLinks?: NavLink[];
    language?: string;
    signUpLabel?: string;
    signUpHref?: string;
    /** Small pill badge text above the heading */
    badgeText?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;

    bottomTagline?: string;
    scrollText?: string;
}

export default function Hero3({
    brandName = 'Watermelon',
    navLinks = [
        { label: 'Pricing', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Support', href: '#' },
    ],
    language = 'EN',
    signUpLabel = 'Sign up',
    signUpHref = '#',
    badgeText = '✦  Award-winning digital studio',
    headingLine1 = 'Building bold ideas',
    headingLine2 = 'into reality.',
    description = 'Experiences that stand strong, scale fast, and look exceptional. We help brands and businesses design meaningful digital',
    primaryCtaLabel = 'View Work',
    primaryCtaHref = '#',
    secondaryCtaLabel = 'Start Journey',
    secondaryCtaHref = '#',
    bottomTagline = 'Transforming creative thinking\ninto impactful solutions that\ndrive real results.',
    scrollText = 'Scroll to Discover',
}: Hero3Props) {

    const line1Words = headingLine1.split(' ');
    const line2Words = headingLine2.split(' ');

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden">

            {/* Background Image — cinematic zoom */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <img
                    src="https://assets.watermelon.sh/hero-3.avif"
                    alt="Hero background"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
            </motion.div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/25" />
            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent" />

            {/* Noise texture overlay for premium feel */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col h-full w-full">

                {/* ─── Navbar ─── */}
                <motion.nav
                    className="w-full px-6 md:px-10 lg:px-16 py-5 md:py-6 flex items-center justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2.5 shrink-0 group">
                       <LogoIcon className='size-8 text-white' />
                        <span className="text-white text-xl font-semibold tracking-tight group-hover:tracking-wide transition-all duration-300">
                            {brandName}
                        </span>
                    </a>

                    {/* Center Nav Links */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={idx}
                                href={link.href}
                                className="text-white/85 hover:text-white text-[15px] font-medium transition-colors duration-200 relative group"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/70 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-[15px]">
                            <Globe size={18} strokeWidth={1.5} />
                            <span>{language}</span>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <motion.a
                            href={signUpHref}
                            className="border border-white/80 text-white rounded-full px-6 py-2 text-[14px] font-medium relative overflow-hidden group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                {signUpLabel}
                            </span>
                        </motion.a>

                        <button className="lg:hidden text-white p-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    </div>
                </motion.nav>

                {/* ─── Main Content Area ─── */}
                <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
                    <div className="max-w-2xl">

                            {/* Badge pill with shimmer */}
                            <motion.div
                                className="inline-flex items-center gap-2 mb-8 md:mb-10"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                            >
                                <span className="relative inline-flex items-center px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium text-white/90 border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden">
                                    {/* Shimmer sweep */}
                                    <span className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
                                    <span className="relative">{badgeText}</span>
                                </span>
                            </motion.div>

                            {/* Heading — word-by-word stagger */}
                            <h1 className="text-white text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-light leading-[1.05] tracking-tight mb-6 md:mb-8">
                                <span className="block overflow-hidden">
                                    {line1Words.map((word, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block mr-[0.3em]"
                                            initial={{ y: '110%', opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.7 + i * 0.1,
                                                ease: [0.33, 1, 0.68, 1],
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </span>
                                <em className="block overflow-hidden italic font-light pb-1">
                                    {line2Words.map((word, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block mr-[0.3em]"
                                            initial={{ y: '110%', opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 1.0 + i * 0.1,
                                                ease: [0.33, 1, 0.68, 1],
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </em>
                            </h1>

                            {/* Animated horizontal rule */}
                            <motion.div
                                className="h-px bg-linear-to-r from-white/50 via-white/20 to-transparent mb-6 md:mb-8 max-w-md"
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.2, delay: 1.3, ease: [0.33, 1, 0.68, 1] }}
                            />

                            {/* Description */}
                            <motion.p
                                className="text-white/65 text-sm md:text-base leading-relaxed max-w-md mb-10 md:mb-12"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 1.4, ease: 'easeOut' }}
                            >
                                {description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <div className="flex items-center gap-6 md:gap-8">
                                {/* Primary — gradient border pill */}
                                <motion.a
                                    href={primaryCtaHref}
                                    className="relative rounded-full p-px overflow-hidden group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 1.6 }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    {/* Animated gradient border */}
                                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-white/70 via-white/30 to-white/70 bg-size-[200%_100%] animate-[gradientShift_3s_linear_infinite]" />
                                    <span className="relative z-10 block px-7 py-3 rounded-full bg-black/40 backdrop-blur-sm text-white text-[14px] md:text-[15px] font-medium group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        {primaryCtaLabel}
                                    </span>
                                </motion.a>

                                {/* Secondary */}
                                <motion.a
                                    href={secondaryCtaHref}
                                    className="flex items-center gap-2 text-white/90 hover:text-white text-[14px] md:text-[15px] font-medium transition-colors group"
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 1.8 }}
                                >
                                    {secondaryCtaLabel}
                                    <ArrowRight size={18} strokeWidth={2} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                </motion.a>
                            </div>
                    </div>
                </div>

                {/* ─── Bottom Bar ─── */}
                <div className="w-full px-6 md:px-10 lg:px-16 pb-8 md:pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">

                    <motion.p
                        className="text-white/55 text-[13px] md:text-[14px] leading-relaxed whitespace-pre-line"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                    >
                        {bottomTagline}
                    </motion.p>

                    <motion.a
                        href="#next-section"
                        className="flex items-center gap-2.5 text-white/55 hover:text-white/90 text-[13px] md:text-[14px] transition-colors shrink-0 group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.2 }}
                    >
                        {/* Animated line before text */}
                        <motion.span
                            className="hidden sm:block w-8 h-px bg-white/30 group-hover:w-12 group-hover:bg-white/60 transition-all duration-300 origin-left"
                        />
                        {scrollText}
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ArrowDown size={16} strokeWidth={1.5} />
                        </motion.span>
                    </motion.a>
                </div>

            </div>

            {/* ─── Decorative Corner Frame Lines ─── */}
            {/* Top-right corner */}
            <motion.div
                className="absolute top-6 right-6 md:top-8 md:right-10 lg:right-16 w-12 h-12 pointer-events-none hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
            >
                <span className="absolute top-0 right-0 w-full h-px bg-linear-to-l from-white/25 to-transparent" />
                <span className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-white/25 to-transparent" />
            </motion.div>

            {/* Bottom-left corner */}
            <motion.div
                className="absolute bottom-6 left-6 md:bottom-8 md:left-10 lg:left-16 w-12 h-12 pointer-events-none hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
            >
                <span className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-white/25 to-transparent" />
                <span className="absolute bottom-0 left-0 w-px h-full bg-linear-to-t from-white/25 to-transparent" />
            </motion.div>

            {/* CSS keyframes injected inline */}
            <style>{`
                @keyframes shimmer {
                    to { transform: translateX(200%); }
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>
        </section>
    );
}