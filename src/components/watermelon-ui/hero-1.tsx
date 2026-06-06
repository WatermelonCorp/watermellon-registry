"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";


export interface NavLink {
    label: string;
    href: string;
    active?: boolean;
}

export interface SocialLink {
    label: string;
    href: string;
}

export interface Hero1Props {
    /** Brand / logo name shown top-left */
    brand?: React.ReactNode;
    /** Navigation links rendered in the center of the navbar */
    navLinks?: NavLink[];
    /** Main headline — can be a string or JSX (e.g. with <br />) */
    headline?: React.ReactNode;
    /** CTA button label */
    ctaLabel?: string;
    /** CTA button href */
    ctaHref?: string;
    /** Small description text at the bottom-left */
    description?: string;
    /** Social links rendered at the bottom-right */
    socialLinks?: SocialLink[];
    /** Sign-in / auth button label */
    signInLabel?: string;
    /** Sign-in href */
    signInHref?: string;
    /** Callback for when a nav link is clicked */
    onNavLinkClick?: (link: NavLink) => void;
    /** Additional wrapper CSS classes */
    className?: string;
}

const DEFAULT_NAV: NavLink[] = [
    { label: "Products", href: "#", active: true },
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Support", href: "#" },
];

const DEFAULT_SOCIAL: SocialLink[] = [
    { label: "Linkedin", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
];

export default function Hero1({
    brand = "Watermelon",
    navLinks = DEFAULT_NAV,
    headline = (
        <>
            The goal&apos;s the focus,
            <br />
            time&apos;s the marker.
        </>
    ),
    ctaLabel = "Let's Move Forward Today",
    ctaHref = "#",
    description = "Advanced wind turbines that take energy\n production to new heights.",
    socialLinks = DEFAULT_SOCIAL,
    signInLabel = "Sign in",
    signInHref = "#",
    onNavLinkClick,
    className,
}: Hero1Props) {
    const [links, setLinks] = useState<NavLink[]>(navLinks);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavLinkClick = (clickedLink: NavLink, e: React.MouseEvent) => {
        // Avoid default navigation behavior for smooth demo purposes if needed
        if (onNavLinkClick) {
            e.preventDefault();
            onNavLinkClick(clickedLink);
        }
        setLinks(
            links.map((link) => ({
                ...link,
                active: link.label === clickedLink.label,
            }))
        );
        setIsMobileMenuOpen(false);
    };


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const backgroundVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: {
            opacity: 0.9,
            scale: 1,
            transition: { duration: 1.2, ease: "easeOut" as const },
        },
    };

    return (
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white selection:bg-white selection:text-black",
                className
            )}
            style={{ backgroundColor: "#06060c" }}
        >
        
            <motion.div
                initial="hidden"
                animate="visible"
                variants={backgroundVariants}
                className="absolute bottom-0 left-0 w-full sm:w-[85%] md:w-[65%] h-[80%] md:h-[75%] pointer-events-none select-none z-0 overflow-hidden"
            >
                <img
                    src={"https://assets.watermelon.sh/hero-1.avif"}
                    alt="Purple grid structure background"
                    className="absolute inset-0 h-full w-full object-cover object-bottom-left opacity-90"
                />
              
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 70% at 20% 80%, transparent 40%, #06060c 85%)",
                    }}
                />
            </motion.div>

   
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-20"
            >
                {/* Brand Logo */}
                <a href="/" className="flex items-center gap-1 group">
                    {typeof brand === "string" ? (
                        <span className="relative text-white font-semibold text-lg tracking-tight select-none">
                            {brand}
                            <span className="absolute -top-1 -right-2 text-xs text-white select-none">
                                •
                            </span>
                        </span>
                    ) : (
                        brand
                    )}
                </a>

      
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-12 lg:gap-16">
                        {links.map((link) => (
                            <li key={link.label} className="relative py-1">
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavLinkClick(link, e)}
                                    className={cn(
                                        "text-base font-medium transition-colors duration-300 relative px-0.5 tracking-wide",
                                        link.active
                                            ? "text-white"
                                            : "text-white/60 hover:text-white"
                                    )}
                                >
                                    {link.label}
                                    {link.active && (
                                        <motion.span
                                            layoutId="activeUnderline"
                                            className="absolute left-0 right-0 bottom-[-4px] h-[1.5px] bg-white"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden md:block ml-4">
                    <a
                        href={signInHref}
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-white text-white text-base font-medium bg-transparent hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                    >
                        {signInLabel}
                    </a>
                </div>

         
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors z-50 relative"
                    aria-label="Toggle navigation menu"
                >
                    <div className="w-4 h-4 flex flex-col justify-between items-center relative">
                        <span
                            className={cn(
                                "w-full h-[1.5px] bg-white transition-all duration-300 absolute left-0",
                                isMobileMenuOpen ? "rotate-45 top-[7px]" : "top-[2px]"
                            )}
                        />
                        <span
                            className={cn(
                                "w-full h-[1.5px] bg-white transition-all duration-300 absolute left-0 top-[7px]",
                                isMobileMenuOpen && "opacity-0"
                            )}
                        />
                        <span
                            className={cn(
                                "w-full h-[1.5px] bg-white transition-all duration-300 absolute left-0",
                                isMobileMenuOpen ? "-rotate-45 top-[7px]" : "top-[12px]"
                            )}
                        />
                    </div>
                </button>
            </motion.header>

      
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-[#06060c]/98 backdrop-blur-md z-40 flex flex-col justify-between px-6 py-24 md:hidden"
                    >
                        {/* Nav links stack */}
                        <nav className="flex flex-col gap-6 mt-8">
                            {links.map((link, idx) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavLinkClick(link, e)}
                                        className={cn(
                                            "text-3xl font-semibold transition-colors duration-200 block",
                                            link.active ? "text-white" : "text-white/50"
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom buttons & info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="flex flex-col gap-6"
                        >
                            <a
                                href={signInHref}
                                className="w-full py-3.5 rounded-full border border-white/20 text-white text-center text-base font-medium bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                {signInLabel}
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main Hero Content Area ── */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex-1 flex flex-col justify-between px-6 pt-12 pb-10 md:px-12 lg:px-20 md:pt-16 md:pb-12"
            >
                {/* Top Section: Headline & CTA Button */}
                <div className="flex flex-col gap-8 md:gap-10 max-w-[850px] mt-[5vh]">
                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-[-0.04em] text-white"
                    >
                        {headline}
                    </motion.h1>

                    {/* CTA Pill Button with Hover Micro-animations */}
                    <motion.div variants={itemVariants} className="w-fit">
                        <a
                            href={ctaHref}
                            className="inline-flex w-fit items-center gap-4 bg-white text-black font-medium text-sm p-1 pl-4 rounded-lg hover:bg-white/90 transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.06)] group"
                        >
                            <span>{ctaLabel}</span>
                            <span className="w-8 h-8 rounded-md bg-black flex items-center justify-center shrink-0 overflow-hidden relative">
                                {/* Arrow up-right with custom sliding movement on hover */}
                                <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
                            </span>
                        </a>
                    </motion.div>
                </div>

                {/* Bottom Section: Description & Controls */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-10 mt-auto pt-16 w-full relative"
                >
                    {/* Top Row / Left Column: Muted Description paragraph */}
                    <div className="md:max-w-3xl">
                        <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed font-normal whitespace-pre-line">
                            {description}
                        </p>
                    </div>

                    {/* Bottom Row / Center & Right Columns */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between lg:justify-end gap-10 pb-1 w-full lg:w-auto">
                        {/* Premium Social Links (Left on tablet, Right on Desktop) */}
                        <div className="flex items-center gap-6 lg:gap-12 order-1 lg:order-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="text-white text-base lg:text-lg hover:text-white/80 transition-colors duration-250 tracking-wide"
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>

                        {/* Floating scroll indicator (Right on tablet, Center on Desktop) */}
                        <div className="hidden md:flex items-center gap-3 text-white text-sm lg:text-base tracking-wide order-2 lg:order-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:bottom-1">
                            <span>Scroll to Discover</span>
                            <motion.span
                                animate={{ y: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                            >
                                <ArrowDown className="w-4 h-4 text-white" strokeWidth={1.5} />
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}