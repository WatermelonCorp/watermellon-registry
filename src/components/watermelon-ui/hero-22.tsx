"use client";

import LogoIcon from "@/assets/logo-icon";
import { ArrowRight, AudioLines, Globe2, ShieldCheck } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: "audio" | "shield" | "globe";
}

interface Hero22Props {
  brandName?: string;
  navLinks?: NavLink[];
  headingLine1?: string;
  headingLine2Prefix?: string;
  headingHighlight?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  signupLabel?: string;
  signupHref?: string;
  features?: FeatureItem[];
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Features", href: "#" },
  { label: "Resources", href: "#" },
];

const featuresDefault: FeatureItem[] = [
  { title: "Lifelike Speech", description: "in Seconds", icon: "audio" },
  { title: "Voice Cloning", description: "with Control", icon: "shield" },
];

const iconMap = {
  audio: AudioLines,
  shield: ShieldCheck,
  globe: Globe2,
};

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22, mass: 0.9 },
  },
};

const copyVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 26, mass: 1 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 20, mass: 1.2 },
  },
};

const featureRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 22, rotateX: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 28, mass: 0.8 },
  },
};

export default function Hero22({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  headingLine1 = "The Best Ideas Begin",
  headingLine2Prefix = "When",
  headingHighlight = "You Pause",
  description = "From quiet moments to meaningful direction, we discover ideas that truly matter most.",
  primaryCtaLabel = "Start for Free",
  primaryCtaHref = "#",
  secondaryCtaLabel = "Get Started",
  secondaryCtaHref = "#",
  loginLabel = "Log in",
  loginHref = "#",
  signupLabel = "Get Started",
  signupHref = "#",
  features = featuresDefault,
  backgroundImage = "https://assets.watermelon.sh/hero-22-bg.avif",
}: Hero22Props) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-stone-50 font-sans text-emerald-950 antialiased">
      <motion.img
        src={backgroundImage}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        variants={imageVariants}
      />
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden px-7 py-5 sm:px-12 lg:px-[5.25rem]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.34 }}
        variants={sectionVariants}
      >
        <motion.nav
          variants={navVariants}
          className="relative z-20 flex min-h-10 w-full items-center justify-between gap-6"
        >
          <a
            href="#"
            className="inline-flex min-h-10 items-center gap-2 text-lg font-normal tracking-[-0.045em] text-neutral-900 transition-[opacity,transform] duration-200 ease-out hover:opacity-75 active:scale-[0.96]"
          >
            <LogoIcon className="size-8 text-[#5F7C65]" />
            {brandName}
          </a>

          <div className="hidden items-center gap-[2.85rem] lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-medium text-neutral-900/86 transition-[opacity,transform] duration-200 ease-out hover:opacity-65 active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href={loginHref}
              className="hidden min-h-10 items-center text-sm font-medium text-neutral-950 transition-[opacity,transform] duration-200 ease-out hover:opacity-65 active:scale-[0.96] sm:inline-flex"
            >
              {loginLabel}
            </a>
            <a
              href={signupHref}
              className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[#5F7C65] px-5 text-sm font-normal text-white shadow-[inset_0_2px_6px_0px_rgba(255,255,255,0.15),inset_0_-2px_6px_0px_rgba(0,0,0,0.15)] outline outline-black/20 transition-[background-color,box-shadow,transform] duration-200 ease-out text-shadow-2xs hover:bg-[#5F7C65] active:scale-[0.96]"
            >
              {signupLabel}
            </a>
          </div>
        </motion.nav>

        <div className="relative z-10 grid flex-1 grid-cols-1 items-start gap-10 pt-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(28rem,1fr)] lg:pt-20 2xl:mt-30">
          <div className="max-w-4xl">
            <motion.h1
              variants={copyVariants}
              className="max-w-4xl text-[clamp(3.4rem,4.5vw,5.55rem)] leading-[1.08] font-normal tracking-[-0.065em] text-balance text-emerald-950"
            >
              <span className="block">{headingLine1}</span>
              <span className="block">
                {headingLine2Prefix}{" "}
                <span className="font-[Georgia,serif] text-[0.95em] font-normal tracking-[-0.075em] italic">
                  {headingHighlight}
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={copyVariants}
              className="text-md mt-7 max-w-lg leading-[1.42] font-medium text-pretty text-emerald-950/80"
            >
              {description}
            </motion.p>

            <motion.div
              variants={copyVariants}
              className="mt-7 flex flex-wrap items-center gap-5"
            >
              <a
                href={primaryCtaHref}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#5F7C65] px-5 text-sm font-normal text-white shadow-[inset_0_2px_6px_0px_rgba(255,255,255,0.15),inset_0_-2px_6px_0px_rgba(0,0,0,0.15)] outline outline-black/20 transition-[background-color,box-shadow,transform] duration-200 ease-out text-shadow-2xs hover:bg-[#5F7C65] active:scale-[0.96]"
              >
                {primaryCtaLabel}
                <ArrowRight className="size-4 -rotate-45 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={secondaryCtaHref}
                className="inline-flex min-h-11 items-center justify-center rounded-sm px-7 text-[0.78rem] font-semibold text-neutral-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-white/15 hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.14)] active:scale-[0.96]"
              >
                {secondaryCtaLabel}
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={featureRowVariants}
          className="absolute bottom-20 left-7 z-20 flex-wrap items-center gap-8 sm:left-2 sm:flex lg:left-[5.25rem] lg:gap-12"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];

            return (
              <motion.div
                key={feature.title}
                variants={featureVariants}
                className="flex min-h-12 items-center gap-3"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/30 text-emerald-950 shadow-xs outline -outline-offset-1 outline-black/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="leading-none">
                  <span className="block text-[0.87rem] font-semibold text-neutral-900">
                    {feature.title}
                  </span>
                  <span className="mt-1.5 block text-[0.72rem] font-medium text-neutral-500">
                    {feature.description}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
