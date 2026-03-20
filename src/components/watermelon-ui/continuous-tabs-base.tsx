"use client";

import { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "motion/react";

interface TabItem {
  id: string;
  label: string;
}

interface ContinuousTabsProps {
  tabs?: TabItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
}

const DEFAULT_TABS: TabItem[] = [
  { id: "home", label: "Home" },
  { id: "interactions", label: "Interactions" },
  { id: "resources", label: "Resources" },
  { id: "docs", label: "Docs" },
];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
  tabs = DEFAULT_TABS,
  defaultActiveId = "home",
  onChange,
}) => {
  const [active, setActive] = useState<string>(defaultActiveId);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  if (!isMounted) return null;

  return (
    <LayoutGroup>
      <nav className="theme-injected border-2 border-border bg-background shadow-[inset_0_-2px_4px_hsl(var(--foreground)/0.08), inset_0_1px_0_hsl(var(--background)/0.9), 0_4px_12px_hsl(var(--foreground)/0.03)] relative flex items-center gap-0.5 rounded-lg border p-1 transition-all duration-300 sm:gap-1 sm:p-1.5">
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              className="relative rounded-lg px-4 py-2 outline-none sm:px-6 sm:py-3"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 0.9,
                  }}
                  className="bg-foreground absolute inset-0 rounded-lg shadow-xs"
                />
              )}

              <motion.span
                layout="position"
                className={`relative z-10 text-sm font-semibold transition-colors duration-200 sm:text-base ${
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                } `}
              >
                {tab.label}
              </motion.span>
            </button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
};
