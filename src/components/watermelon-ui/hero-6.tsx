import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { FaBars, FaXmark } from "react-icons/fa6";
import LogoIcon from "@/assets/logo-icon";

export interface Hero6NavItem {
  label: string;
  href: string;
}

export interface Hero6TrustedBrand {
  name: string;
  logo?: ReactNode;
}

export interface Hero6Props {
  logo?: ReactNode;
  logoText?: string;
  navItems?: Hero6NavItem[];
  headerCtaText?: string;
  headerCtaHref?: string;
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  trustedTitle?: string;
  trustedBrands?: Hero6TrustedBrand[];
}

const navItemsDefault: Hero6NavItem[] = [
  { label: "Product", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pages", href: "#" },
  { label: "Use Cases", href: "#" },
  { label: "Contact", href: "#" },
];

const trustedBrandsDefault: Hero6TrustedBrand[] = [
  { name: "Forbes" },
  { name: "healthline" },
  { name: "Bloomberg" },
  { name: "The Times" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.65, bounce: 0 },
  },
};


function DottedButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex min-h-10 items-center justify-center rounded-[10px] border border-dashed border-white/80 px-6 text-xs leading-none font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset] outline outline-1 -outline-offset-2 outline-white/10 backdrop-blur-sm transition-[border-color,background-color,color,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-white hover:bg-white/10 ${className}`}
    >
      {children}
    </motion.a>
  );
}

export function Hero6({
  logo,
  logoText = "Watermelon",
  navItems = navItemsDefault,
  headerCtaText = "Learn More",
  headerCtaHref = "#",
  title = "Where Insight Met",
  titleAccent = "Vibrant Visions.",
  description = "Discover products designed to elevate your lifestyle with simplicity, elegance, and innovation.",
  primaryCtaText = "Book a Session",
  primaryCtaHref = "#",
  secondaryCtaText = "Learn More",
  secondaryCtaHref = "#",
  backgroundImage = "https://assets.watermelon.sh/hero-6-bg.avif",
  trustedTitle = "Trusted by seekers of calm",
  trustedBrands = trustedBrandsDefault,
}: Hero6Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative flex  w-full overflow-hidden text-white antialiased min-h-screen font-sans">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-100 outline outline-1 outline-white/10"
        />
        <div className="absolute inset-0 bg-sky-950/10" />
      
      </div>

      <div className="relative z-10 flex min-h-[700px] w-full flex-col px-4 py-3 sm:min-h-screen sm:px-8 lg:px-12 ">
        <motion.header
          initial={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="flex items-center justify-between "
        >
          <a href="#" className="flex min-h-10 items-center justify-center gap-2.5">
            {logo ?? <LogoIcon className="size-8" />}
            <span className="text-xl leading-none font-light font-sans tracking-normal text-white">
              {logoText}
              <span className="text-amber-300">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-11 md:flex">
            {navItems.map((navItem) => (
              <a
                key={navItem.label}
                href={navItem.href}
                className="min-h-10 content-center text-md font-normal font-sans text-white/95 transition-colors duration-200 hover:text-amber-200"
              >
                {navItem.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <DottedButton href={headerCtaHref} className="font-sans">{headerCtaText}

            </DottedButton>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-[10px] border border-dashed border-white/70 text-white backdrop-blur-sm transition-[background-color,transform] duration-200 active:scale-[0.96] md:hidden"
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
              className="fixed inset-x-4 top-4 z-50 rounded-2xl bg-sky-950/92 p-4 shadow-2xl shadow-sky-950/50  outline-1 outline-white/10 backdrop-blur-xl md:hidden"
            >
              <div className="flex items-center justify-between pl-3">
                <a href="#" className="flex items-center gap-2.5">
                  {logo ?? <LogoIcon className="size-8" />}
                  <span className="text-xl font-medium text-white">
                    {logoText}
                    <span className="text-amber-300">.</span>
                  </span>
                </a>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-10 min-w-10 items-center justify-center rounded-[10px] text-white transition-[background-color,transform] duration-200 hover:bg-white/10 active:scale-[0.96]"
                >
                  <FaXmark className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 grid gap-1">
                {navItems.map((navItem) => (
                  <a
                    key={navItem.label}
                    href={navItem.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  >
                    {navItem.label}
                  </a>
                ))}
              </nav>

              <DottedButton href={headerCtaHref} className="mt-5 w-full">
                {headerCtaText}
              </DottedButton>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.38 }}
          className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-start pt-26 pb-12 text-center sm:pt-20 lg:pt-24"
        >
          <motion.h1
            variants={item}
            className="max-w-[820px] text-[clamp(3rem,8vw,4.8rem)] leading-[0.92] font-light tracking-normal text-balance text-white"
          >
            <span className="block tracking-tight">{title}</span>
            <span className="mt-2 block font-serif text-[0.9em] font-normal italic">
              {titleAccent}
            </span>
          </motion.h1>

          {description && (
            <motion.p
              variants={item}
              className="mt-8 max-w-[480px] text-sm leading-6 font-normal text-pretty text-white/90 sm:text-[15px]"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href={primaryCtaHref}
              whileTap={{ scale: 0.96 }}
              className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-amber-300 px-6 text-sm font-medium font-sans text-sky-950 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_14px_30px_rgba(250,204,21,0.18),inset_0_-1px_0.5px_0_rgba(0,0,0,0.5)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-amber-200"
            >
              {primaryCtaText}
            </motion.a>

            <DottedButton href={secondaryCtaHref} className="text-sm font-medium font-sans bg-yellow-100/10">
              {secondaryCtaText}
            </DottedButton>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mb-12 w-full max-w-4xl text-center sm:mb-20 "
        >
          {trustedTitle && (
            <motion.p
              variants={item}
              className="text-sm font-light tracking-tight text-white"
            >
              {trustedTitle}
            </motion.p>
          )}

          <motion.div
            variants={item}
            className="mt-5 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-5 pb-6"
          >
            {trustedBrands.map((brand) => (
              <span
                key={brand.name}
                className="font-sans text-[clamp(1.25rem,3vw,1.75rem)] leading-none font-bold text-white/75 drop-shadow-[0_1px_8px_rgba(255,255,255,0.18)] truncate"
              >
                {brand.logo ?? brand.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
