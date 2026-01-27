"use client";

import React, { useState, useEffect, FC } from "react";
import { motion, AnimatePresence, Spring } from "framer-motion";
import { ChevronDown, Sun, Moon, Send } from "lucide-react";
import { HiCursorArrowRipple } from "react-icons/hi2";
import { Layers } from "lucide-react";
import { IoIosTimer } from "react-icons/io";
import { PiHandTap } from "react-icons/pi";

/* --- Types --- */
export interface AccordionItemData {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

interface AccordionProps {
  items?: AccordionItemData[];
}

/* --- Constants --- */
const springTransition: Spring = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 1,
};

// Default Items
const DEFAULT_ITEMS: AccordionItemData[] = [
  { id: 1, title: "What is Interaction Design?", icon: <HiCursorArrowRipple size={28} className="-rotate-10" color="#86858C" />, content: "Interaction design focuses on creating engaging interfaces with well-thought-out behaviors and actions." },
  { id: 2, title: "Principles & Patterns", icon: <Layers size={24} />, content: "Fundamental guidelines and repeated solutions that ensure consistency and usability in design." },
  { id: 3, title: "Usability & Accessibility", icon: <PiHandTap size={26} className="-rotate-20" />, content: "Designing experiences that are easy to use and accessible to people of all abilities." },
  { id: 4, title: "Prototyping & Testing", icon: <Send size={24} />, content: "Rapid experimentation and validation of ideas through prototypes and real user testing." },
  { id: 5, title: "UX Optimisation", icon: <IoIosTimer size={26} />, content: "Improving user experience by analyzing behavior and refining interactions over time." },
];

/* --- Sub-Component --- */
const AccordionItem: FC<AccordionItemProps> = ({ item, openId, setOpenId }) => {
  const isOpen = openId === item.id;

  return (
    <motion.div
      layout
      transition={springTransition}
      className={`overflow-hidden transition-colors duration-200 ${
        isOpen
          ? "border-[1.8px] border-[#E5E5E9] dark:border-zinc-800 rounded-[22px] px-[8px] py-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] bg-[#F9F9FB] dark:bg-zinc-900 z-10"
          : "bg-transparent rounded-[22px]"
      }`}
    >
      <button
        onClick={() => setOpenId(isOpen ? null : item.id)}
        className="group flex w-full items-center justify-between rounded-[22px] py-[8px] px-[8px] text-left outline-none hover:bg-[#F9F9FB] dark:hover:bg-zinc-800/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-[12px]">
          <motion.div
            layout
            transition={springTransition}
            className="p-[8px] rounded-[12px] text-[#86858C] dark:text-zinc-500"
          >
            {item.icon}
          </motion.div>
          <motion.span
            layout
            className="text-lg font-bold text-[#272729] dark:text-zinc-100"
          >
            {item.title}
          </motion.span>
        </div>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            backgroundColor: "transparent"
          }}
          className="p-[4px] rounded-full"
          transition={springTransition}
        >
          <ChevronDown size={24} className="text-neutral-400 dark:text-zinc-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={springTransition}
          >
            <div className="px-[20px] pb-[12px] text-[18px] leading-snug font-medium text-[#545359] dark:text-zinc-400 origin-top">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* --- Main Component --- */
export const AccordionApp: FC<AccordionProps> = ({ items }) => {
  const defaultItems = items ?? DEFAULT_ITEMS;

  const [openId, setOpenId] = useState<number | null>(defaultItems.length > 0 ? defaultItems[0].id : null);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const openIndex = defaultItems.findIndex((item) => item.id === openId);
  const topItems = openIndex !== -1 ? defaultItems.slice(0, openIndex) : defaultItems;
  const activeItem = openIndex !== -1 ? defaultItems[openIndex] : null;
  const bottomItems = openIndex !== -1 ? defaultItems.slice(openIndex + 1) : [];

  return (
    <div className="min-h-screen w-full bg-[#ffffff] dark:bg-zinc-950 flex flex-col items-center justify-center p-[24px] transition-colors duration-500">

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
      </button>

      <motion.div layout className="w-full max-w-[400px] flex flex-col gap-[16px]">

        {/* Top items */}
        <AnimatePresence mode="popLayout">
          {topItems.length > 0 && (
            <motion.div
              key="top-group"
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={springTransition}
              className="bg-transparent backdrop-blur-sm border-[1.8px] border-[#E5E5E9] dark:border-zinc-800 rounded-[22px] px-[8px] py-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] z-30 flex flex-col gap-[8px]"
            >
              {topItems.map((item) => (
                <AccordionItem key={item.id} item={item} openId={openId} setOpenId={setOpenId} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active item */}
        <AnimatePresence mode="popLayout">
          {activeItem && (
            <motion.div
              key={`active-${activeItem.id}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springTransition}
              className="z-20"
            >
              <AccordionItem item={activeItem} openId={openId} setOpenId={setOpenId} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom items */}
        <AnimatePresence mode="popLayout">
          {bottomItems.length > 0 && (
            <motion.div
              key="bottom-group"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={springTransition}
              className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-[8px] py-[4px] border-[1.8px] border-[#E5E5E9] dark:border-zinc-800 rounded-[22px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            >
              {bottomItems.map((item) => (
                <AccordionItem key={item.id} item={item} openId={openId} setOpenId={setOpenId} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
