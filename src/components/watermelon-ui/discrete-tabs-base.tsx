"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

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

export const DiscreteTabs: FC<DiscreteTabsProps> = ({
  tabs,
  onTabChange,
  defaultTab,
}) => {
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
    <motion.div
      layout
      className="theme-injected mx-auto flex w-fit items-center justify-center gap-2 overflow-hidden rounded-lg py-6"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleTabClick(tab.id);
              }
            }}
            className="relative focus:outline-none"
          >
            <motion.div
              layout="position"
              transition={{
                type: "spring",
                stiffness: 210,
                damping: 18,
                mass: 1,
              }}
              className="flex h-16 w-full items-center justify-center"
            >
              <div
                className={cn(
                  "bg-background border-border flex h-12 cursor-pointer items-center justify-center rounded-lg border px-3",
                  isActive && ""
                )}
                tabIndex={0}
              >
                <motion.div
                  className={cn(
                    "flex items-center justify-center transition-colors duration-300",
                    isActive ? tab.activeColor : "text-foreground"
                  )}
                >
                  {tab.icon}
                </motion.div>

                <motion.span
                  animate={{
                    width: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                    marginLeft: isActive ? 8 : 0,
                  }}
                  className={cn(
                    "relative overflow-hidden text-xl font-semibold whitespace-nowrap transition-colors duration-300",
                    isActive ? tab.activeColor : "text-foreground"
                  )}
                >
                  {tab.label}

                  <AnimatePresence>
                    {isActive && shine && (
                      <motion.span
                        initial={{ left: "-120%" }}
                        animate={{ left: "120%" }}
                        transition={{
                          duration: 0.5,
                          ease: "linear",
                        }}
                        className="via-background/50 absolute top-0 bottom-0 w-16 bg-linear-to-r from-transparent to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </motion.span>
              </div>
            </motion.div>
          </button>
        );
      })}
    </motion.div>
  );
};
