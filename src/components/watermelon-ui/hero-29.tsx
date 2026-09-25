import { useState } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Menu01Icon,
  Cancel01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import LogoIcon from "@/assets/logo-icon";

interface Hero29Props {
  title?: string;
  ratingText?: string;
  primaryActionText?: string;
  consultationText?: string;
  descriptionText?: string;
  backgroundImage?: string;
  avatarUrl?: string;
}

export default function Hero29({
  title = "Shape the future by investing\nin professional advisory",
  ratingText = "Over 200+ Rate Us",
  primaryActionText = "Talk Strategy",
  consultationText = "CALL US TODAY FOR FREE CONSULTATION",
  descriptionText = "Gain clarity, reduce risk, and make confident decisions with expert guidance in finance, law, tax and strategy. Our team helps you turn complexity into opportunity.",
  backgroundImage = "https://assets.watermelon.sh/hero-29.avif",
  avatarUrl = "https://assets.watermelon.sh/wm_alex.png",
}: Hero29Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: "Features", hasDropdown: true },
    { label: "Company", hasDropdown: true },
    { label: "Customers", hasDropdown: false },
    { label: "Security", hasDropdown: false },
  ];

  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-neutral-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Subtle overlay to ensure text legibility */}
      <div className="absolute inset-0 z-0 bg-black/10" />

      {/* Header / Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 flex w-full items-center justify-between px-6 py-6 md:px-10 lg:px-12"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-3 text-white">
          <LogoIcon className="size-8" />
          <span className="font-serif text-3xl tracking-wide italic">
            Watermelon
          </span>
        </div>

        {/* Right: Nav & Actions */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 text-[15px] font-normal text-white/90 transition-colors hover:text-white"
              >
                {item.label}
                {item.hasDropdown && (
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="size-3.5 opacity-70"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button className="hidden h-10 rounded-full border border-white/40 bg-transparent px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 lg:flex">
              Contact
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <HugeiconsIcon
                icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon}
                className="size-6"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-2 w-full px-4 lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl bg-black/90 shadow-xl backdrop-blur-md">
              <nav className="flex flex-col p-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        className="size-4 text-white/50"
                      />
                    )}
                  </button>
                ))}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <Button className="h-12 w-full rounded-full border border-white/40 bg-transparent text-base font-medium text-white hover:bg-white/10">
                    Contact
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto flex flex-1 flex-col items-center justify-center px-4 pt-10 pb-20 text-center sm:pb-32 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto flex w-full max-w-5xl flex-col items-center"
        >
          {/* Star Rating */}
          <div className="mb-5 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-[2px] text-white">
              {[...Array(5)].map((_, i) => (
                <HugeiconsIcon
                  key={i}
                  icon={StarIcon}
                  className="size-6 fill-current"
                />
              ))}
            </div>
            <span className="font-normal tracking-wide text-white/90">
              {ratingText}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-10 text-4xl leading-[1.05] font-medium tracking-tighter whitespace-pre-line text-white sm:text-[42px] md:text-[52px] lg:text-[60px] xl:text-[76px]">
            {title}
          </h1>

          {/* Primary Action */}
          <Button
            size="lg"
            className="h-14 rounded-full bg-white px-12 text-base font-medium text-neutral-900 transition-all hover:scale-105 hover:bg-neutral-100 hover:shadow-lg"
          >
            {primaryActionText}
          </Button>
        </motion.div>
      </div>

      {/* Bottom Floating Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="relative z-10 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:items-end lg:px-12"
      >
        {/* Left Consultation Pill */}
        <div className="flex w-fit shrink-0 cursor-pointer items-center gap-4 rounded-full border border-white/10 bg-black/40 py-2 pr-6 pl-2 shadow-xl backdrop-blur-md transition-colors hover:bg-black/50">
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt="Consultant"
              className="size-10 rounded-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="size-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-[11px] font-medium tracking-wide whitespace-nowrap text-white sm:text-xs md:text-sm">
              {consultationText}
            </span>
          </div>
        </div>

        {/* Right Description Text */}
        <div className="max-w-[500px]">
          <p className="text-center text-sm leading-relaxed text-white/90 sm:text-base md:text-left">
            {descriptionText}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
