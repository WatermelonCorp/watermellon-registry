"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowRight, ArrowDown, Play, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavLink {
    label: string;
    href: string;
    active?: boolean;
    hasDropdown?: boolean;
    dropdownItems?: { label: string; href: string }[];
}

export interface SocialLink {
    label: string;
    href: string;
}

export interface Hero2Props {
    brand?: React.ReactNode;
    navLinks?: NavLink[];
    headline?: React.ReactNode;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    socialLinks?: SocialLink[];
    signInLabel?: string;
    signInHref?: string;
    className?: string;
}

const DEFAULT_NAV: NavLink[] = [
    { label: "Home", href: "#", active: true },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "FAQs", href: "#" },
];

const DEFAULT_SOCIAL: SocialLink[] = [
    { label: "Linkedin", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
];

export function Hero2({
    brand = "Watermelon",
    navLinks = DEFAULT_NAV,
    headline = (
        <>
            Automate Smarter,<br />
            Work <span className="italic font-medium font-serif text-[oklch(0.6378_0.1051_172.72)]">Faster.</span>
        </>
    ),
    description = "Say goodbye to repetitive tasks. Our AI-driven platform streamlines\nyour workflows so your team can focus on what really matters.",
    primaryCtaLabel = "See It In Action",
    secondaryCtaLabel = "Book a demo",
    socialLinks = DEFAULT_SOCIAL,
    signInLabel = "Sign in",
    className,
}: Hero2Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(
        navLinks.find((link) => link.active)?.label || navLinks[0]?.label || null
    );

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    };

    return (
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900",
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={
                    "https://assets.watermelon.sh/hero-2.avif"
                    }
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover object-right md:object-center opacity-100"
                />
            </div>

            {/* Header / Navbar */}
            <div className="w-full max-w-[1440px] mx-auto relative z-50">
                <header className="flex items-center justify-between px-6 md:px-10 lg:px-16 xl:px-24 py-6 md:py-8">
                    {/* Brand Logo */}
                    <a href="/" className="flex items-center gap-1 group">
                        {typeof brand === "string" ? (
                            <span className="relative text-slate-900 font-bold text-xl tracking-tight select-none">
                                {brand}
                                <span className="absolute top-1 -right-1.5 w-1 h-1 rounded-full bg-[oklch(0.6378_0.1051_172.72)]"></span>
                            </span>
                        ) : (
                            brand
                        )}
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-10 lg:gap-14" onMouseLeave={() => setHoveredLink(null)}>
                            {navLinks.map((link) => (
                                <li
                                    key={link.label}
                                    className="relative py-2 flex flex-col items-center group"
                                    onMouseEnter={() => setHoveredLink(link.label)}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.href === "#") e.preventDefault();
                                            setActiveLink(link.label);
                                        }}
                                        className={cn(
                                            "text-sm font-medium transition-colors flex items-center gap-1.5",
                                            (hoveredLink === link.label || (!hoveredLink && activeLink === link.label)) ? "text-slate-900 font-semibold" : "text-slate-400"
                                        )}
                                    >
                                        {link.label}
                                        {link.hasDropdown && (
                                            <ChevronDown className="w-3.5 h-3.5 opacity-50 stroke-[2.5] transition-transform duration-200 group-hover:rotate-180" />
                                        )}
                                    </a>
                                    {/* Active/Hover Indicator Dot */}
                                    {(hoveredLink === link.label || (!hoveredLink && activeLink === link.label)) && (
                                        <motion.span
                                            layoutId="activeDot"
                                            className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[oklch(0.6378_0.1051_172.72)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Desktop Sign in button */}
                    <div className="hidden md:block">
                        <Button variant="outline" className="rounded-full px-7 h-10 text-sm font-medium bg-white/60 backdrop-blur-md shadow-[0_0_0_1px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02)] hover:text-black transition-all text-slate-900 border-0">
                            {signInLabel}
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden z-50 p-2"
                    >
                        <div className="w-5 flex flex-col gap-1.5">
                            <span className={cn("h-0.5 bg-slate-900 transition-transform", isMobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
                            <span className={cn("h-0.5 bg-slate-900 transition-opacity", isMobileMenuOpen ? "opacity-0" : "")} />
                            <span className={cn("h-0.5 bg-slate-900 transition-transform", isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "")} />
                        </div>
                    </button>
                </header>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-0 bg-white z-40 flex flex-col pt-24 px-6 pb-6 h-screen"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.href === "#") e.preventDefault();
                                        setActiveLink(link.label);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={cn(
                                        "text-2xl font-semibold flex items-center gap-2",
                                        activeLink === link.label ? "text-slate-900" : "text-slate-400"
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-auto">
                            <Button className="w-full rounded-full bg-[oklch(0.6378_0.1051_172.72)] hover:opacity-90 text-white h-12 text-base">
                                {signInLabel}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-20"
            >
                <div className="max-w-2xl lg:max-w-3xl">
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-slate-900 leading-[1.08]"
                    >
                        {headline}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl whitespace-pre-line"
                    >
                        {description}
                    </motion.p>

                    <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Button className="rounded-full px-8 bg-[oklch(0.6378_0.1051_172.72)] hover:brightness-105 text-white h-12 text-sm md:text-base font-medium shadow-[0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.1)] border-0 transition-all group">
                            {primaryCtaLabel}
                            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button variant="secondary" className="rounded-full px-8 bg-[#eaeff1]/80 hover:bg-[#eaeff1] backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.02)] text-slate-900 h-12 text-sm md:text-base font-medium border-0 transition-all">
                            {secondaryCtaLabel}
                            <Play className="w-3.5 h-3.5 ml-2 fill-slate-900" />
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-24 pb-8 md:pb-12 gap-y-8 gap-x-6"
            >
                {/* Social Links */}
                <div className="flex items-center gap-8 lg:gap-14 w-full md:w-auto justify-center md:justify-start">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="text-slate-500 hover:text-slate-900 text-sm md:text-base transition-colors"
                        >
                            {social.label}
                        </a>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="flex items-center gap-2 text-slate-500 text-sm md:text-base cursor-pointer group w-full md:w-auto justify-start md:justify-end">
                    <span>Scroll to Discover</span>
                    <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" strokeWidth={1.5} />
                    </motion.span>
                </div>
            </motion.div>
        </section>
    );
}