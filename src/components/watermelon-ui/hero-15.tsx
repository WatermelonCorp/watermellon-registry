"use client";

import LogoIcon from "@/assets/logo-icon";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

interface TrustedBrand {
  name: string;
  mark: "google" | "adobe" | "microsoft" | "stripe";
}

interface Hero15Props {
  brandName?: string;
  navLinks?: NavLink[];
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  signupLabel?: string;
  signupHref?: string;
  trustedEyebrow?: string;
  trustedBrands?: TrustedBrand[];
  backgroundImage?: string;
}

const navLinksDefault: NavLink[] = [
  { label: "Contact", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Features", href: "#" },
  { label: "Resources", href: "#" },
];

const trustedBrandsDefault: TrustedBrand[] = [
  { name: "Google", mark: "google" },
  { name: "Adobe", mark: "adobe" },
  { name: "Microsoft", mark: "microsoft" },
  { name: "stripe", mark: "stripe" },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const softReveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 1.2, stiffness: 40, damping: 15 },
  },
};

const navReveal: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 1, stiffness: 50, damping: 12 },
  },
};

const brandReveal: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 0.8, stiffness: 60, damping: 12 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 1.5, stiffness: 30, damping: 20 },
  },
};

function TrustedMark({ mark }: { mark: TrustedBrand["mark"] }) {
  if (mark === "google") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
        <path
          fill="currentColor"
          d="M21.5 12.3c0-.8-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 2.9-4.2 2.9-7.3Z"
        />
        <path
          fill="currentColor"
          d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9a6 6 0 0 1-5.7-4.1H3v2.6A10 10 0 0 0 12 22Z"
        />
        <path
          fill="currentColor"
          d="M6.3 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.3-2.6Z"
        />
        <path
          fill="currentColor"
          d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.8 9.8 0 0 0 12 2a10 10 0 0 0-9 5.5l3.3 2.6A6 6 0 0 1 12 6Z"
        />
      </svg>
    );
  }

  if (mark === "adobe") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
        <path
          fill="currentColor"
          d="M14.3 3h6.3v18L14.3 3Zm-4.6 0H3.4v18L9.7 3Zm2.3 7.1 4.1 10.9h-2.7l-1.2-3.2H9.6l2.4-7.7Z"
        />
      </svg>
    );
  }

  if (mark === "microsoft") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
        <path
          fill="currentColor"
          d="M3 3h8.5v8.5H3V3Zm9.5 0H21v8.5h-8.5V3ZM3 12.5h8.5V21H3v-8.5Zm9.5 0H21V21h-8.5v-8.5Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="currentColor"
        d="M13.1 10.1c-1.6-.6-2.5-1-2.5-1.7 0-.6.5-.9 1.5-.9 1.7 0 3.4.6 4.5 1.2V4.5a11.9 11.9 0 0 0-4.5-.8C8.5 3.7 6 5.6 6 8.7c0 4.9 6.7 4.1 6.7 6.2 0 .8-.7 1.1-1.7 1.1-1.5 0-3.5-.6-5.1-1.5v4.3c1.7.7 3.4 1 5.1 1 3.7 0 6.2-1.8 6.2-5 0-5.3-6.7-4.4-6.7-6.4 0-.7.6-1 1.6-1Z"
      />
    </svg>
  );
}

export default function Hero15({
  brandName = "Watermelon",
  navLinks = navLinksDefault,
  headingLine1 = "Where Color Meet",
  headingLine2 = "Powerful Concepts",
  description = "Transforming ideas into visually striking designs that communicate, inspire, and stand out.",
  primaryCtaLabel = "Explore More",
  primaryCtaHref = "#",
  secondaryCtaLabel = "Start Journey",
  secondaryCtaHref = "#",
  signupLabel = "Sign up",
  signupHref = "#",
  trustedEyebrow = "Trusted By Leading Brands",
  trustedBrands = trustedBrandsDefault,
  backgroundImage = "https://assets.watermelon.sh/hero-15-bg.avif",
}: Hero15Props) {
  return (
    <section className="relative isolate flex min-h-screen w-full overflow-hidden bg-neutral-950 px-1.5 py-1.5 text-white antialiased">
      <motion.div
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] md:min-h-screen"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.38 }}
        variants={sectionVariants}
      >
        <motion.img
          variants={imageVariants}
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.nav
          variants={navReveal}
          className="max-w-8xl relative z-10 mx-auto flex min-h-12 w-full items-center justify-between px-8 py-3 sm:px-12 lg:px-24"
        >
          <a
            href="#"
            className="group/brand text-md inline-flex min-h-10 items-center gap-2 font-semibold text-white/92 transition-[opacity,transform] duration-200 ease-out hover:opacity-80 active:scale-[0.96]"
          >
            <LogoIcon className="size-8" />
            {brandName}
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-10 items-center text-sm font-normal text-white/84 transition-[color,transform] duration-200 ease-out hover:text-white active:scale-[0.96]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={signupHref}
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
          >
            {signupLabel}
          </a>
        </motion.nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-6 pt-16 pb-10 text-center sm:px-12 sm:pt-20 lg:px-24">
          <motion.div
            variants={softReveal}
            className="mx-auto max-w-4xl 2xl:max-w-7xl"
          >
            <h1 className="text-[clamp(2.9rem,6.1vw,6.55rem)] leading-[0.98] font-light tracking-normal text-balance text-white/95">
              <span className="block">{headingLine1}</span>
              <span className="mt-1 block font-serif text-[1.06em] leading-[0.92] font-normal text-white italic">
                {headingLine2}
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={softReveal}
            className="mt-5 max-w-lg text-sm leading-7 font-normal text-pretty text-white/70 sm:text-sm 2xl:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            variants={softReveal}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={primaryCtaHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-100 px-6 text-sm font-normal text-slate-800 shadow-[inset_0_2px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(0,0,0,0.2)] transition-[background-color,color,transform] duration-200 ease-out text-shadow-2xs hover:bg-zinc-200 hover:text-slate-950 active:scale-[0.96]"
            >
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              className="group/secondary inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white/10 px-5 text-sm font-light text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.17),0_18px_42px_rgba(0,0,0,0.26)] active:scale-[0.96]"
            >
              {secondaryCtaLabel}
              <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover/secondary:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            className="md:pb-12- mt-auto w-full sm:pb-24"
          >
            <motion.p
              variants={softReveal}
              className="text-sm font-light text-white/50 2xl:text-lg"
            >
              {trustedEyebrow}
            </motion.p>
            <div className="mx-auto mt-5 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-4 2xl:max-w-2xl">
              {trustedBrands.map((brand) => (
                <motion.div
                  key={`${brand.mark}-${brand.name}`}
                  variants={brandReveal}
                  className="flex items-center gap-1.5 text-white/40"
                >
                  <TrustedMark mark={brand.mark} />
                  <span className="text-2xl font-semibold tracking-[-0.03em] 2xl:text-3xl">
                    {brand.name}
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
