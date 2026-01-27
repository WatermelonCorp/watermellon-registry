"use client";

import { useState, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

 interface TabItem {
  id: string;
  icon: ReactNode;
  label: string;
  activeColor: string;
}

 interface DiscreteTabsProps {
  tabs: TabItem[];
  onTabChange?: (tabId: string) => void;
  defaultTab?: string;
}

export const DiscreteTabs: FC<DiscreteTabsProps> = ({ tabs, onTabChange, defaultTab }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);
  const [shine, setShine] = useState<boolean>(false);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShine(true), 600);
    return () => {
      clearTimeout(timer);
      setShine(false);
    };
  }, [activeTab]);

  return (
<div className="flex items-center justify-center gap-2 rounded-full py-6 overflow-hidden w-fit mx-auto">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="relative focus:outline-none"
          >
            <motion.div
              layout="position"
              transition={{ type: "spring", stiffness: 210, damping: 18, mass: 1 }}
              className={`relative flex h-16 ${isActive ? "w-40" : "w-full"} items-center justify-center`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBg"
                  className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-md"
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-1 pr-3 cursor-pointer">
                <motion.div
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${
                    isActive ? tab.activeColor : "bg-white dark:bg-zinc-900 text-gray-800"
                  }`}
                >
                  {tab.icon}
                </motion.div>
                <motion.span
                  animate={{ width: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                  className={`relative overflow-hidden whitespace-nowrap text-xl font-semibold ${
                    isActive ? tab.activeColor : "text-black dark:text-white"
                  }`}
                >
                  {tab.label}
                  <AnimatePresence>
                    {isActive && shine && (
                      <motion.span
                        initial={{ left: "-120%" }}
                        animate={{ left: "120%" }}
                        className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </motion.span>
              </div>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
};