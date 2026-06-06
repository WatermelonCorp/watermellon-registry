import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { FaArrowDown, FaArrowRight, FaBars, FaXmark } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import LogoIcon from "@/assets/logo-icon";

export interface Hero7NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface Hero7Props {
  logo?: ReactNode;
  logoText?: string;
  navItems?: Hero7NavItem[];
  signupText?: string;
  signupHref?: string;
  languageLabel?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  scrollText?: string;
  backgroundImage?: string;
}

const navItemsDefault: Hero7NavItem[] = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "About us", href: "#" },
  { label: "Features", href: "#" },
  { label: "Services", href: "#" },
];

const navVariants: Variants = {
  hidden: { opacity: 0, y: -22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.65, bounce: 0,delay:0.2 },
  },
};

const copyContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.25,
    },
  },
};

const copyItem: Variants = {
  hidden: { opacity: 0, x: -34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.72, bounce: 0,delay:0.7 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 86, scale: 1.04, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 1.5, bounce: 0 },
  },
};


function FlagIcon() {
  return (
    <span
      className="grid h-4 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
      aria-hidden="true"
    >
      <span className="bg-red-600" />
      <span className="bg-white" />
      <span className="bg-red-600" />
    </span>
  );
}

export function Hero7({
  logo,
  logoText = "Watermelon",
  navItems = navItemsDefault,
  signupText = "Sign up",
  signupHref = "#",
  languageLabel = "EN",
  title = "Building Bold Ideas",
  titleAccent = "Into Reality.",
  description = "Experiences that stand strong, scale fast, and look exceptional. We help brands and businesses design meaningful digital",
  primaryCtaText = "View work",
  primaryCtaHref = "#",
  secondaryCtaText = "Start Journey",
  secondaryCtaHref = "#",
  scrollText = "Scroll to Discover",
  backgroundImage = "https://assets.watermelon.sh/hero-7-bg.avif",
}: Hero7Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative isolate flex  w-full overflow-hidden bg-sky-200 text-blue-950 antialiased min-h-screen font-sans">
      <div className="absolute inset-0 bg-sky-200" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_31%_22%,rgba(255,255,255,0.42),transparent_34%),linear-gradient(180deg,rgba(191,219,254,0.96)_0%,rgba(219,234,254,0.86)_42%,rgba(239,246,255,0.42)_100%)]" />

      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="absolute inset-0"
      >
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover  outline outline-1 outline-black/10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-sky-100/0 to-sky-200/10" />
      </motion.div>

      <div className="relative z-10 flex min-h-[720px] w-full flex-col px-7 py-4 sm:min-h-screen sm:px-10 lg:px-12">
        <motion.header
          variants={navVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          className="flex items-center justify-between"
        >
          <a href="#" className="flex min-h-10 items-center gap-2">
            {logo ?? <LogoIcon className="size-8 text-white" />}
            <span className="text-2xl leading-none font-normal tracking-normal text-blue-950">
              {logoText}
            </span>
          </a>

          <nav className="hidden items-center gap-2 rounded-full md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={
                  item.active
                    ? "inline-flex min-h-10 items-center rounded-full bg-blue-100 px-6 text-md font-medium text-blue-950 shadow-[0_1px_0_0.5px_rgba(255,255,255,0.15)_inset,0_8px_18px_rgba(30,64,175,0.1)] transition-[background-color,transform] duration-200 active:scale-[0.96]"
                    : "inline-flex min-h-8 items-center px-2 text-md font-medium text-blue-950/90 transition-colors duration-200 hover:text-sky-700"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <motion.a
              href={signupHref}
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-h-10 items-center rounded-[10px] bg-blue-100 px-6 text-base font-medium text-blue-950 shadow-[0_1px_0_0.5px_rgba(255,255,255,0.7)_inset,0_10px_24px_rgba(30,64,175,0.08)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-sky-50"
            >
              {signupText}
            </motion.a>
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-blue-950 transition-colors duration-200 hover:text-blue-800"
            >
              <FlagIcon />
              <span>{languageLabel}</span>
               <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-[10px] bg-white text-blue-950 shadow-[0_8px_18px_rgba(30,64,175,0.08)] transition-transform duration-200 active:scale-[0.96] md:hidden"
          >
            <FaBars className="h-4 w-4" />
          </button>
        </motion.header>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="fixed inset-x-4 top-4 z-50 rounded-2xl bg-white/92 p-4 shadow-2xl shadow-blue-950/10  outline-1 outline-black/10 backdrop-blur-xl md:hidden"
            >
              <div className="flex items-center justify-between pl-3">
                <a href="#" className="flex items-center gap-2 text-blue-950">
                  {logo ?? <LogoIcon className="text-blue-200 size-8" />}
                  <span className="text-2xl font-normal">{logoText}</span>
                </a>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-[10px] text-blue-950 transition-[background-color,transform] duration-200 hover:bg-sky-100 active:scale-[0.96]"
                >
                  <FaXmark className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-blue-950 transition-colors duration-200 hover:bg-sky-100"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <motion.a
                href={signupHref}
                whileTap={{ scale: 0.96 }}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-950 px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-blue-900"
              >
                {signupText}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex flex-1 items-start pt-16 sm:pt-24 lg:pt-28">
          <motion.div
            variants={copyContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.42 }}
            className=""
          >
            <motion.h1
              variants={copyItem}
              className="text-[clamp(3.3rem,8vw,5.15rem)] max-w-7xl w-full  leading-[0.96] font-normal tracking-normal  text-blue-950 "
            >
              <span className="block tracking-tight">{title}</span>
              <span className="mt-1 block font-serif text-[0.88em] leading-[0.95] font-normal italic">
                {titleAccent}
              </span>
            </motion.h1>

            <motion.p
              variants={copyItem}
              className="mt-6 max-w-xl w-full text-md leading-[1.55] font-medium text-pretty text-blue-950/90 "
            >
              {description}
            </motion.p>

            <motion.div
              variants={copyItem}
              className="mt-6 flex flex-wrap items-center gap-6"
            >
              <motion.a
                href={primaryCtaHref}
                whileTap={{ scale: 0.96 }}
                className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-linear-to-b from-blue-900 to-blue-950 px-9 text-base font-normal text-white shadow-[0_12px_30px_rgba(30,58,138,0.1),inset_0_-0.5px_2px_1px_rgba(0,0,0,0.5),inset_0_0px_0_2px_var(--color-blue-800)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-blue-950/90"
              >
                {primaryCtaText}
              </motion.a>

              <motion.a
                href={secondaryCtaHref}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex min-h-10 items-center gap-2 text-base font-medium text-blue-950 transition-colors duration-200 hover:text-blue-900"
              >
                <span>{secondaryCtaText}</span>
                <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.a
            href="#"
            variants={copyItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="absolute right-0 bottom-[24%] hidden min-h-10 items-center gap-3 text-sm font-medium text-blue-950 transition-colors duration-200 hover:text-blue-800 lg:inline-flex"
          >
            <span>{scrollText}</span>
            <FaArrowDown className="h-3 w-3" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
