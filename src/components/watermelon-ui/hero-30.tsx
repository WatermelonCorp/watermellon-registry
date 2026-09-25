import { useState } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  PlayIcon,
  GlobeIcon,
  ArrowDown01Icon,
  Menu01Icon,
  InstagramIcon,
  YoutubeIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import LogoIcon from "@/assets/logo-icon";

interface Hero30Props {
  title?: string;
  subtitle?: string;
  customersText?: string;
  avatars?: string[];
  primaryActionText?: string;
  secondaryActionText?: string;
  backgroundImage?: string;
}

export default function Hero30({
  title = "Minimal Design\nPowerful by Feel",
  subtitle = "Designed to bring calm, clarity, and effortless\nelegance into your everyday digital experience.",
  customersText = "+20K Happy Customers",
  avatars = [
    "https://assets.watermelon.sh/wm_ben.png",
    "https://assets.watermelon.sh/wm_alex.png",
    "https://assets.watermelon.sh/wm_olivia.png",
    "https://assets.watermelon.sh/wm_mia.png",
  ],
  primaryActionText = "Discover More",
  secondaryActionText = "Watch Demo",
  backgroundImage = "https://assets.watermelon.sh/footer-30.avif",
}: Hero30Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ["Journey", "Our Story", "What We Offer", "Connect"];

  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#8FC5E7]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-white/20 sm:bg-transparent" />

      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 flex w-full items-center justify-between px-6 py-6 lg:px-12"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-[#1C201A]">
          <LogoIcon className="size-8 text-white" />
          <span className="text-2xl font-bold tracking-tight">Watermelon</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[15px] font-medium text-[#1C201A] transition-colors hover:text-black"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-6 md:flex">
          <button className="flex items-center gap-1.5 text-[15px] font-medium text-[#1C201A] transition-colors hover:text-black">
            <HugeiconsIcon icon={GlobeIcon} className="size-4" />
            <span>EN</span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
          </button>

          <Button className="h-11 rounded-none bg-[#2B3024] px-6 text-[15px] font-medium text-white transition-all hover:bg-black">
            Log In{" "}
            <HugeiconsIcon icon={ArrowRight01Icon} className="ml-1.5 size-4" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="p-2 text-[#1C201A] md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <HugeiconsIcon icon={Menu01Icon} className="size-6" />
        </button>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto flex flex-1 flex-col justify-center px-6 pt-12 md:pt-0 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="max-w-3xl"
        >
          {/* Customers Row */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex -space-x-3">
              {avatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Customer ${i + 1}`}
                  className="size-8 rounded-full border-2 border-[#8FC5E7] object-cover sm:size-10"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-[#1C201A]/90 sm:text-base">
              {customersText}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl leading-[1.05] font-medium tracking-tighter whitespace-pre-line text-[#1C201A] sm:text-6xl md:text-7xl lg:text-[84px]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed whitespace-pre-line text-[#1C201A]/80 sm:text-xl">
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Button
              size="lg"
              className="h-14 rounded-none bg-[#2B3024] px-8 text-base font-medium text-white transition-all hover:bg-black"
            >
              {primaryActionText}{" "}
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>

            <button className="group flex items-center gap-3 text-base font-medium text-[#1C201A] transition-colors hover:text-black">
              {secondaryActionText}
              <div className="flex size-10 items-center justify-center rounded-full bg-[#2B3024] text-white transition-transform group-hover:scale-110">
                <HugeiconsIcon
                  icon={PlayIcon}
                  className="size-4 fill-current"
                />
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="relative z-10 flex w-full flex-col-reverse items-start justify-between gap-6 px-6 pb-8 md:flex-row md:items-end lg:px-12"
      >
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {[NewTwitterIcon, YoutubeIcon, InstagramIcon].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex size-12 items-center justify-center rounded-full border border-[#1C201A]/20 text-[#1C201A] transition-colors hover:bg-[#1C201A]/10"
            >
              <HugeiconsIcon icon={Icon} className="size-5" />
            </a>
          ))}
        </div>

        {/* Talk to our team */}
        <a
          href="#"
          className="group flex items-center gap-2 text-[15px] font-medium text-[#1C201A] transition-colors hover:text-black"
        >
          Talk to our team
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </a>
      </motion.div>
    </section>
  );
}
