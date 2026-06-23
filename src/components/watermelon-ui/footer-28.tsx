"use client";

import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import LogoIcon from "@/assets/logo-icon";



const contactInfo = {
  email: "Sundown@.business.com",
  phone: "+1234567890",
  address: "456 Innovation Drive, Suite 789 San Francisco, CA 94107",
};

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Live Chat", href: "#" },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "FACEBOOK", href: "#" },
  { label: "TWITTER", href: "#" },
  { label: "BEHANCE", href: "#" },
];



interface GradientBlobBgColors {
  /** Deep navy base colour. Default: #0d1035 */
  base?: string;
  /** Large indigo blob (left-centre). Default: #6366F1 */
  indigo?: string;
  /** Purple blob (top-right). Default: #A855F7 */
  purple?: string;
  /** Cyan blob (right, color-blend). Default: #22D3EE */
  cyan?: string;
  /** Sky-blue blob (centre blend). Default: #38BDF8 */
  sky?: string;
  /** Fuchsia blob (right-centre). Default: #D946EF */
  fuchsia?: string;
  /** Rose blob (far right). Default: #F43F5E */
  rose?: string;
  /** Stroke on the cyan blob shape. Default: #8215B5 */
  cyanStroke?: string;
}


function GradientBlobBg({
  base = "#0d1035",
  indigo = "#6366F1",
  purple = "#A855F7",
  cyan = "#22D3EE",
  sky = "#38BDF8",
  fuchsia = "#D946EF",
  rose = "#F43F5E",
  cyanStroke = "#8215B5",
}: GradientBlobBgColors = {}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1442 840"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        {/* Gaussian blur filters — stdDeviation matches original (150px) */}
        <filter
          id="f28-blur0"
          x="75"
          y="-529"
          width="1389"
          height="1409"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="f28-blur1"
          x="-314"
          y="-338"
          width="1525.5"
          height="1557"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="f28-blur2"
          x="457.747"
          y="-61.9653"
          width="1250.64"
          height="1280.33"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="f28-blur3"
          x="-56.1195"
          y="-802.553"
          width="1528.02"
          height="1730.92"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="f28-blur4"
          x="236.815"
          y="-203.551"
          width="1148.62"
          height="1679.06"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
        <filter
          id="f28-blur5"
          x="599.001"
          y="-490.287"
          width="1206.64"
          height="1451.12"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
      </defs>

      {/* ── Base background fill ── */}
      <rect width="1442" height="840" fill={base} />

      {/* ── Blob 0: Purple (top-right sweep) ── */}
      <g filter="url(#f28-blur0)">
        <path
          d="M1058.73 174.079C1249.38 61.5557 1138.17 -141.525 1058.73 -229C928.289 -229 662.066 -202.562 640.709 -96.8108C614.012 35.3784 326.211 21.0524 382.209 159.102C438.206 297.152 611.405 229.429 511.782 417.62C412.158 605.81 973.433 620.788 973.433 512.041C973.433 403.294 820.416 314.734 1058.73 174.079Z"
          fill={purple}
        />
      </g>

      {/* ── Blob 1: Indigo (left large sweep) ── */}
      <g filter="url(#f28-blur1)">
        <path
          d="M451 589.5L-14 919V-18L911.5 -38L629.5 192L451 589.5Z"
          fill={indigo}
        />
      </g>

      {/* ── Blobs 2-5: color blend group ── */}
      <g style={{ mixBlendMode: "color" }}>
        {/* Blob 2: Cyan (right, with color blend) */}
        <g filter="url(#f28-blur2)">
          <path
            d="M823.191 646.622L1175.37 852.255L1357.13 599.281L1334.25 302.088L999.312 289.241L823.191 646.622Z"
            fill={cyan}
          />
          <path
            d="M823.191 646.622L1175.37 852.255L1357.13 599.281L1334.25 302.088L999.312 289.241L823.191 646.622Z"
            stroke={cyanStroke}
            strokeWidth="100"
          />
        </g>

        {/* Blob 3: Sky-blue (centre arc) */}
        <g filter="url(#f28-blur3)">
          <path
            d="M382.484 627.499C168.459 640.203 250.089 316.477 317.658 153.027L306.694 145.149L624.513 -501.992C735.724 -481.398 994.618 -391.226 1140.5 -195.291C1322.85 49.6275 650.015 611.619 382.484 627.499Z"
            fill={sky}
          />
          <path
            d="M382.484 627.499C168.459 640.203 250.089 316.477 317.658 153.027L306.694 145.149L624.513 -501.992C735.724 -481.398 994.618 -391.226 1140.5 -195.291C1322.85 49.6275 650.015 611.619 382.484 627.499Z"
            stroke="black"
          />
        </g>

        {/* Blob 4: Fuchsia (right diagonal) */}
        <g filter="url(#f28-blur4)">
          <path
            d="M757.336 117.968C702.057 231.923 953.035 781.901 1085.43 1042.65L937.024 1175.51C884.457 1071.86 740.797 836.277 586.687 723.088C394.05 581.602 826.434 -24.4765 757.336 117.968Z"
            fill={fuchsia}
          />
        </g>

        {/* Blob 5: Rose (far-right arc) */}
        <g filter="url(#f28-blur5)">
          <path
            d="M969.352 -165.121C1026.39 -275.352 1350.64 3.14185 1505.64 156.168C1408.98 290.708 1199.8 577.217 1136.41 646.929C1057.18 734.069 968.977 388.102 908.524 264.014C848.071 139.925 1093.54 199.313 1136.09 113.524C1178.64 27.7346 898.058 -27.333 969.352 -165.121Z"
            fill={rose}
          />
        </g>
      </g>
    </svg>
  );
}




const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};


const riseUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 28, mass: 0.9 },
  },
};


const linkCascade: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

const linkItem: Variants = {
  hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 350, damping: 30, mass: 0.6 },
  },
};


const socialItemVariant: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.7 },
  },
};



const wordmarkSlam: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 22, mass: 2.5 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer28() {
  return (
    <footer
      className="relative w-full overflow-hidden font-sans antialiased selection:bg-white/20"
      aria-label="Site footer"
    >
      <GradientBlobBg />

      <div className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="border-b border-white/15 px-6 py-8 sm:px-8 md:px-12 lg:px-14"
        >
          {/* Logo row */}
          <motion.div
            variants={riseUp}
            className="mb-4 flex items-center gap-2.5"
          >
            <LogoIcon className="size-8 flex-shrink-0" />
            <span className="text-base font-semibold tracking-wide text-white select-none">
              Watermelon
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={riseUp}
            className="max-w-md text-sm leading-relaxed text-pretty text-white/60 sm:text-[15px]"
          >
            Bock was founded with the goal of tung B2B marketing to the next
            performance level. We combine analytical thinking, strategic action
          </motion.p>
        </motion.div>

        {/* ═══ MIDDLE SECTION: 3-column grid ═════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 divide-y divide-white/15 border-b border-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3"
        >
          {/* ── CONTACT US ── */}
          <motion.div
            variants={riseUp}
            className="px-6 py-8 sm:px-8 md:px-12 lg:px-14"
          >
            {/* Column heading */}
            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.15em] text-balance text-white/50 uppercase">
              CONTACT US
            </h3>

            <motion.div variants={linkCascade} className="flex flex-col gap-3">
              <motion.a
                href={`mailto:${contactInfo.email}`}
                variants={linkItem}
                className="inline-block text-[13px] leading-snug text-pretty text-white/80 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                {contactInfo.email}
              </motion.a>
              <motion.a
                href={`tel:${contactInfo.phone}`}
                variants={linkItem}
                className="inline-block text-[13px] leading-snug text-pretty text-white/80 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                {contactInfo.phone}
              </motion.a>
              <motion.p
                variants={linkItem}
                /* text-pretty prevents orphan in address (Skill: Text Wrapping) */
                className="text-[13px] leading-relaxed text-pretty text-white/80"
              >
                {contactInfo.address}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* ── NAVIGATION ── */}
          <motion.div
            variants={riseUp}
            className="px-6 py-8 sm:px-8 md:px-14 lg:px-20"
          >
            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.15em] text-balance text-white/50 uppercase">
              NAVIGATION
            </h3>

            <motion.nav
              variants={linkCascade}
              aria-label="Navigation links"
              className="flex flex-col gap-3"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={linkItem}
                  className="inline-block w-fit text-[13px] leading-snug text-pretty text-white/80 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>

          <motion.div
            variants={riseUp}
            className="px-6 py-8 sm:col-span-2 sm:border-t sm:border-white/15 sm:px-8 md:px-14 lg:col-span-1 lg:border-t-0 lg:border-l lg:border-white/15 lg:px-20"
          >
            <h3 className="mb-5 text-[11px] font-semibold tracking-[0.15em] text-balance text-white/50 uppercase">
              SUPPORT
            </h3>

            <motion.nav
              variants={linkCascade}
              aria-label="Support links"
              className="flex flex-col gap-3"
            >
              {supportLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={linkItem}
                  className="inline-block w-fit text-[13px] leading-snug text-pretty text-white/80 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        </motion.div>

        {/* ═══ SOCIAL BAR ════════════════════════════════════════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 divide-x divide-white/15 border-b border-white/15 sm:grid-cols-4"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              variants={socialItemVariant}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-2 py-4 text-[11px] font-semibold tracking-[0.14em] text-white/55 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
              aria-label={social.label}
            >
              <span>{social.label}</span>

              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* ═══ WORDMARK ══════════════════════════════════════════════════ */}
        <div className="relative w-full overflow-hidden" aria-hidden="true">
          <motion.div
            variants={wordmarkSlam}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="select-none"
          >
            <svg
              className="h-auto w-full"
              viewBox="0 0 1000 180"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="f28-wordmark-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="90%"
                dominantBaseline="auto"
                textAnchor="middle"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fontSize="175"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                letterSpacing="-0.025em"
                fill="url(#f28-wordmark-gradient)"
              >
                WATERMELON
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
