"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { IoChevronDown } from "react-icons/io5";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

/*  Types  */

export interface User {
  id: number;
  name: string;
  img: string;
  active?: boolean;
}

type IconRenderer = (props?: any) => ReactNode;

interface VoiceChatDisclosureProps {
  users?: User[];
  title?: string;
  ctaText?: string;
  helperText?: string;
  themeToggleIcons?: {
    light?: IconRenderer;
    dark?: IconRenderer;
  };
  closeIcon?: IconRenderer;
}

/*  Defaults  */

const DEFAULT_USERS: User[] = [
  { id: 1, name: "Oğuz", img: "https://i.pravatar.cc/150?u=oguz", active: true },
  { id: 2, name: "Ashish", img: "https://i.pravatar.cc/150?u=ashish" },
  { id: 3, name: "Mariana", img: "https://i.pravatar.cc/150?u=mariana" },
  { id: 4, name: "MDS", img: "https://i.pravatar.cc/150?u=mds" },
  { id: 5, name: "Ana", img: "https://i.pravatar.cc/150?u=ana" },
  { id: 6, name: "Natko", img: "https://i.pravatar.cc/150?u=natko", active: true },
  { id: 7, name: "Afshin", img: "https://i.pravatar.cc/150?u=afshin" },
];

/*  Component  */

export const VoiceChatDisclosure: React.FC<VoiceChatDisclosureProps> = ({
  users = DEFAULT_USERS,
  title = "Voice Chat",
  ctaText = "Join Now",
  helperText = "Mic will be muted initially.",
  themeToggleIcons = {
    light: () => <Moon size={20} className="text-gray-600" />,
    dark: () => <Sun size={20} className="text-yellow-400" />,
  },
  closeIcon = (props) => (
    <HugeiconsIcon
      icon={Cancel01Icon}
      size={20}
      strokeWidth={2}
      {...props}
    />
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="mb-12 p-3 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-all"
      >
        {theme === "light"
          ? themeToggleIcons.light?.()
          : themeToggleIcons.dark?.()}
      </button>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className={`relative bg-white dark:bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-[1.6px] border-[#E6E6EA] dark:border-zinc-800 transition-colors
          ${isOpen ? "rounded-[40px] w-[420px]" : "rounded-full pl-2 pr-6 py-2"}`}
      >
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            /* -------- Collapsed Pill -------- */
            <motion.div
              key="pill"
              layoutId="container"
              onClick={() => setIsOpen(true)}
              className="relative flex items-center rounded-full cursor-pointer w-fit"
            >
              {/* Voice Indicator */}
              <motion.div
                layoutId="voice-icon"
                className="absolute -left-4 -top-4 w-10 h-10 rounded-full bg-gradient-to-b from-[#45444D] to-[#1E1D24] dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg z-20"
              >
                <div className="flex gap-[3px] items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [6, 16, 6] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                      className="w-[2.5px] bg-[#fefefe] dark:bg-zinc-900 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Avatars */}
              <div className="flex -space-x-3 ml-8">
                {users.slice(0, 4).map((user, idx) => (
                  <motion.div
                    key={user.id}
                    layoutId={`avatar-container-${user.id}`}
                    className="relative"
                    style={{ zIndex: 10 - idx }}
                  >
                    <motion.img
                      layoutId={`avatar-${user.id}`}
                      src={user.img}
                      className="w-14 h-14 rounded-full border-[3px] border-white dark:border-zinc-900 object-cover shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-4 flex items-center gap-1 text-[18px] font-medium text-gray-500 dark:text-zinc-400"
              >
                <span className="tracking-tight">
                  +{users.length - 4}
                </span>
                <IoChevronDown />
              </motion.div>
            </motion.div>
          ) : (
            /*  Expanded Card  */
            <motion.div
              key="card"
              layoutId="container"
              className="flex flex-col rounded-[40px] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-[#F6F5FA] dark:bg-zinc-800/50 mb-8 border-b-[1.6px] border-[#E6E6EA] dark:border-zinc-800 py-2.5 px-8">
                <div className="w-8" />
                <motion.h2
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[19px] font-semibold text-[#83828C] dark:text-zinc-400"
                >
                  {title}
                </motion.h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 bg-[#EFEEF9] dark:bg-zinc-800 flex items-center justify-center"
                >
                  {closeIcon({
                    color: "#AEADB6",
                    className: "text-[#AEADB6]",
                  })}
                </motion.button>
              </div>

              {/* Users Grid */}
              <div className="grid grid-cols-4 gap-y-7 gap-x-2 mb-2 px-6">
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 relative"
                  >
                    <div className="relative p-1 rounded-full">
                      <motion.img
                        layoutId={`avatar-${user.id}`}
                        src={user.img}
                        className="w-[56px] h-[56px] rounded-full object-cover shadow-md border"
                      />
                      {user.active && (
                        <motion.div
                          layoutId={`voice-icon-${user.id}`}
                          className="absolute -right-4 -top-3 w-8 h-8 rounded-full bg-[#fefefe] dark:bg-zinc-800 flex items-center justify-center shadow-xl"
                        >
                          <div className="flex gap-[3px] items-center">
                            {[1, 2, 3, 4].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ height: [6, 16, 6] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                className="w-[2.5px] bg-[#68676C] dark:bg-zinc-300 rounded-full"
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <span className="text-[14px] font-semibold text-[#6A6A6C] dark:text-zinc-400">
                      {user.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6">
                <button className="w-full py-3 bg-[#212027] dark:bg-zinc-100 text-[#F2F1F6] dark:text-zinc-900 rounded-xl text-[18px] transition-transform active:scale-[0.98]">
                  {ctaText}
                </button>
                <p className="text-center text-[15px] text-[#9B9B9F] dark:text-zinc-500 mt-4 font-semibold opacity-70">
                  {helperText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

