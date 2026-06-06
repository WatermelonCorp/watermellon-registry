import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
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

export interface Footer21Props {
    brandName?: string;
    socialLinks?: { label: string; href: string }[];
    leftLinks?: { label: string; href: string }[];
    rightLinks?: { label: string; href: string }[];
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    copyright?: string;
}

export default function Footer21({
    brandName = "Watermelon",
    socialLinks = [
        { label: "INSTAGRAM", href: "#" },
        { label: "FACEBOOK", href: "#" },
        { label: "TWITTER", href: "#" },
        { label: "BEHANCE", href: "#" },
    ],
    leftLinks = [
        { label: "ABOUT US", href: "#" },
        { label: "BLOG", href: "#" },
        { label: "RESOURCES", href: "#" },
    ],
    rightLinks = [
        { label: "ABOUT US", href: "#" },
        { label: "BLOG", href: "#" },
        { label: "RESOURCES", href: "#" },
    ],
    description = "Discover rich culinary experiences inspired by bold flavors, refined techniques, and passion where every bite is crafted to impress.",
    buttonText = "Get Started",
    buttonLink = "#",
    copyright = "Watermelon 2026 @ All rights reserved",
}: Footer21Props) {
    return (
        <motion.footer
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative w-full bg-[#fafafa] dark:bg-[#222222] text-neutral-800 dark:text-neutral-300 font-sans overflow-hidden transition-colors duration-300"
        >
            
            {/* Main Content Container */}
            <div className="mx-auto max-w-[1440px] w-full flex">
                
                {/* Left Hash Band */}
                <div className="hidden md:block w-5 shrink-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,#e5e5e5_6px,#e5e5e5_7px)] dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,#333_6px,#333_7px)]"></div>
 
                {/* Central Content */}
                <div className="flex-1 flex flex-col bg-[#fafafa] dark:bg-[#222222]">
                    
                    {/* Top Border */}
                    <div className="w-full border-t border-neutral-200 dark:border-[#333]"></div>
 
                    {/* Social Links (Flush to edges of central content) */}
                    <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-200 dark:border-[#333]">
                        {socialLinks.map((link, idx) => (
                            <motion.a 
                                key={idx} 
                                href={link.href} 
                                variants={riseItem}
                                className="flex items-center justify-center gap-2 py-8 border-b md:border-b-0 border-r border-neutral-200 dark:border-[#333] last:border-r-0 max-md:nth-[2n]:border-r-0 max-md:nth-last-[-n+2]:border-b-0 text-[12px] md:text-[13px] tracking-widest uppercase text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                {link.label} <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                            </motion.a>
                        ))}
                    </motion.div>
 
                    {/* Middle Section (With padding) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 py-16 md:py-24 border-b border-neutral-200 dark:border-[#333] items-center px-4 md:px-8 lg:px-12">
                        {/* Left Links */}
                        <motion.div variants={riseItem} className="md:col-span-3 flex justify-center md:justify-start">
                            <div className="flex flex-col gap-6 text-center md:text-left">
                                {leftLinks.map((link, idx) => (
                                    <a key={idx} href={link.href} className="text-[12px] md:text-[13px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* Center Content */}
                        <motion.div variants={riseItem} className="md:col-span-6 flex flex-col items-center text-center gap-8">
                            <p className="text-[17px] md:text-xl text-balance text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-md">
                                {description}
                            </p>
                            <a href={buttonLink} className="px-8 py-3.5 bg-[#c26343] hover:bg-[#a44b2e] text-white transition-colors text-[15px] font-medium tracking-wide shadow-sm">
                                {buttonText}
                            </a>
                        </motion.div>
 
                        {/* Right Links */}
                        <motion.div variants={riseItem} className="md:col-span-3 flex justify-center md:justify-end">
                            <div className="flex flex-col gap-6 text-center md:text-left">
                                {rightLinks.map((link, idx) => (
                                    <a key={idx} href={link.href} className="text-[12px] md:text-[13px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
 
                    {/* Bottom Section (With padding) */}
                    <div className="flex flex-col items-center justify-center pt-10 pb-8 gap-8 px-4 md:px-8 lg:px-12">
                        
                        {/* Giant Text with Box Pattern */}
                        <motion.div variants={giantTextVariant} className="w-full max-w-[800px] flex justify-center">
                            <svg
                                className="w-full h-auto select-none"
                                viewBox={`0 0 ${Math.max(brandName.length * 80, 300)} 110`}
                                preserveAspectRatio="xMinYMid meet"
                                aria-label={brandName}
                             >
                                 <defs>
                                     <pattern id="box-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                                         {/* Row 1 */}
                                         <rect x="0" y="0" width="4" height="4" fill="#c56a47" />
                                         <rect x="4" y="0" width="4" height="4" fill="#b25636" />
                                         <rect x="8" y="0" width="4" height="4" fill="#d27552" />
                                         <rect x="12" y="0" width="4" height="4" fill="#a04a2d" />
                                         {/* Row 2 */}
                                         <rect x="0" y="4" width="4" height="4" fill="#b25636" />
                                         <rect x="4" y="4" width="4" height="4" fill="#df815c" />
                                         <rect x="8" y="4" width="4" height="4" fill="#c56a47" />
                                         <rect x="12" y="4" width="4" height="4" fill="#d27552" />
                                         {/* Row 3 */}
                                         <rect x="0" y="8" width="4" height="4" fill="#a04a2d" />
                                         <rect x="4" y="8" width="4" height="4" fill="#c56a47" />
                                         <rect x="8" y="8" width="4" height="4" fill="#b25636" />
                                         <rect x="12" y="8" width="4" height="4" fill="#df815c" />
                                         {/* Row 4 */}
                                         <rect x="0" y="12" width="4" height="4" fill="#d27552" />
                                         <rect x="4" y="12" width="4" height="4" fill="#a04a2d" />
                                         <rect x="8" y="12" width="4" height="4" fill="#c56a47" />
                                         <rect x="12" y="12" width="4" height="4" fill="#b25636" />
                                     </pattern>
                                 </defs>
                                 <text
                                     x="50%"
                                     y="100"
                                     dominantBaseline="alphabetic"
                                     textAnchor="middle"
                                     fill="url(#box-pattern)"
                                     className="font-semibold tracking-tighter"
                                     fontSize="125"
                                 >
                                     {brandName}
                                 </text>
                             </svg>
                         </motion.div>
 
                         {/* Copyright */}
                         <motion.div variants={riseItem} className="text-[12px] md:text-[13px] text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                             {copyright}
                         </motion.div>
 
                     </div>
                 </div> {/* End of Central Content */}
             
                 {/* Right Hash Band */}
                 <div className="hidden md:block w-5 shrink-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,#e5e5e5_6px,#e5e5e5_7px)] dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,#333_6px,#333_7px)]"></div>
 
             </div> {/* End of Main 1440px Container */}
         </motion.footer>
     );
}