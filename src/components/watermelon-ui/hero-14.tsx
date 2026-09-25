"use client";

import LogoIcon from "@/assets/logo-icon";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FaGithub as Github, FaFigma as Figma, FaSlack as Slack, FaTwitch as Twitch } from "react-icons/fa6";
import { SiFramer as Framer } from "react-icons/si";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface PartnerLogo {
  name: string;
  mark: "github" | "figma" | "framer" | "slack" | "twitch";
}

interface Hero14Props {
  brandName?: string;
  navLinks?: NavLink[];
  badgeText?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  demoLabel?: string;
  demoHref?: string;
  partnerEyebrow?: string;
  partners?: PartnerLogo[];
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Features", href: "#", hasDropdown: true },
  { label: "Pricing", href: "#", hasDropdown: true },
  { label: "About", href: "#" },
  { label: "Resources", href: "#" },
  { label: "FAQs", href: "#" },
];

const partnerLogosDefault: PartnerLogo[] = [
  { name: "GitHub", mark: "github" },
  { name: "Figma", mark: "figma" },
  { name: "Framer", mark: "framer" },
  { name: "Slack", mark: "slack" },
  { name: "Twitch", mark: "twitch" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.14,
    },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.25, duration: 1.2 },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.25, duration: 1.2 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.1, duration: 1.6 },
  },
};

function PartnerMark({ mark }: { mark: PartnerLogo["mark"] }) {
  if (mark === "github") return <Github className="size-5" />;
  if (mark === "figma") return <Figma className="size-5" />;
  if (mark === "framer") return <Framer className="size-5" />;
  if (mark === "slack") return <Slack className="size-5" />;
  if (mark === "twitch") return <Twitch className="size-5" />;

  return null;
}

export default function Hero14({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  badgeText = "AI-Powered Creativity",
  headingLine1 = "Unlock the Power",
  headingLine2 = "Beyond the Horizon",
  description = "Where innovation meets imagination to shape the future.",
  primaryCtaLabel = "Get Started",
  primaryCtaHref = "#",
  demoLabel = "Book Demo",
  demoHref = "#",
  partnerEyebrow = "Powering leading companies",
  partners = partnerLogosDefault,
  backgroundImage = "https://assets.watermelon.sh/hero-14-bg.avif",
}: Hero14Props) {
  return (
    <section className="relative isolate flex min-h-screen w-full overflow-hidden bg-slate-950 text-white antialiased">
      <motion.div
        className="relative flex min-h-[680px] w-full flex-col overflow-hidden bg-slate-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] md:min-h-[720px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.38 }}
        variants={containerVariants}
      >
        <motion.img
          variants={imageVariants}
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.nav
          variants={riseVariants}
          className="relative z-10 mx-auto flex min-h-14 w-full max-w-[76rem] items-center justify-between border-b border-white/[0.06] px-5 py-3 sm:px-8 lg:px-12"
        >
          <a
            href="#"
            className="group/brand text-md inline-flex min-h-10 items-center gap-2 font-normal text-white transition-[opacity,transform] duration-200 ease-out hover:opacity-85 active:scale-[0.96]"
          >
            <LogoIcon className="size-8" />
            <span>{brandName}</span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group/nav inline-flex min-h-10 items-center gap-1.5 text-sm font-normal text-white/88 transition-[color,transform] duration-200 ease-out hover:text-white active:scale-[0.96]"
              >
                {link.label}
                {link.hasDropdown ? (
                  <ChevronDown className="size-3 stroke-[2.4] opacity-80 transition-transform duration-200 ease-out group-hover/nav:translate-y-0.5" />
                ) : null}
              </a>
            ))}
          </div>

          <a
            href={demoHref}
            className="group/demo inline-flex min-h-10 items-center justify-center gap-1 rounded-full bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
          >
            {demoLabel}
            <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/demo:translate-x-1" />
          </a>
        </motion.nav>

        <div className="relative z-10 mx-auto flex w-full max-w-[76rem] flex-1 flex-col items-center px-5 pt-14 pb-10 text-center sm:px-8 sm:pt-20 lg:px-12 2xl:max-w-7xl">
          <motion.div
            variants={riseVariants}
            className="inline-flex min-h-8 items-center gap-2 rounded-full bg-white/10 px-4 text-[11px] font-semibold text-white/74 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_10px_28px_rgba(15,23,42,0.16)] backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            {badgeText}
          </motion.div>

          <motion.h1
            variants={riseVariants}
            className="mt-6 max-w-4xl text-[clamp(2.7rem,4.5vw,6.6rem)] leading-[0.98] font-light tracking-normal text-balance text-white 2xl:max-w-7xl"
          >
            <span className="block">{headingLine1}</span>
            <span className="mt-1 block font-serif text-[1.12em] leading-[0.92] font-normal text-white italic">
              {headingLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={riseVariants}
            className="mt-5 max-w-xl text-sm leading-6 font-medium text-pretty text-white/62 sm:text-[15px]"
          >
            {description}
          </motion.p>

          <motion.a
            variants={riseVariants}
            href={primaryCtaHref}
            className="group/cta mt-4 inline-flex min-h-10 items-center justify-center gap-1 rounded-md bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
          >
            {primaryCtaLabel}
            <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/cta:translate-x-1" />
          </motion.a>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            className="mt-auto w-full pb-20 sm:pb-24 lg:pb-8"
          >
            <motion.p
              variants={riseVariants}
              className="text-md font-light text-white/70"
            >
              {partnerEyebrow}
            </motion.p>
            <div className="mx-auto mt-2 flex max-w-3xl flex-wrap items-center justify-center gap-x-9 gap-y-5 sm:gap-x-11">
              {partners.map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${partner.mark}-${index}`}
                  variants={logoVariants}
                  className="flex items-center gap-2.5 text-white/82"
                >
                  <PartnerMark mark={partner.mark} />
                  <span className="text-lg font-medium tracking-[-0.02em]">
                    {partner.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
