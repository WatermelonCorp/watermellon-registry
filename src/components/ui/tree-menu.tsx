"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TbArrowBackUp } from "react-icons/tb";
import { Sun, Moon } from "lucide-react";

// --- Types ---
export interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
}

interface TreeMenuProps {
  menuData?: MenuItem[]; 
}

// --- Default Menu Data ---
const MENU_DATA: MenuItem[] = [
  {
    id: "foundation",
    label: "Foundation",
    children: [
      {
        id: "design-principles",
        label: "Design Principles",
        children: [
          { id: "clarity", label: "Clarity" },
          { id: "efficiency", label: "Efficiency" },
          { id: "consistency", label: "Consistency" },
          { id: "beauty", label: "Beauty" },
        ],
      },
      {
        id: "colors",
        label: "Colors",
        children: [
          {
            id: "neutrals",
            label: "Neutrals",
            children: [
              { id: "neutral-50", label: "Slate 50" },
              { id: "neutral-500", label: "Slate 500" },
              { id: "neutral-900", label: "Slate 900" },
            ],
          },
          { id: "brand-colors", label: "Brand Colors" },
          { id: "functional-colors", label: "Functional Colors" },
        ],
      },
      {
        id: "typography",
        label: "Typography",
        children: [
          { id: "heading-styles", label: "Heading Styles" },
          { id: "body-styles", label: "Body Styles" },
          { id: "monospace", label: "Monospace" },
        ],
      },
      {
        id: "spacing",
        label: "Spacing",
        children: [
          { id: "grid-system", label: "Grid System" },
          { id: "layout-constants", label: "Layout Constants" },
        ],
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      {
        id: "buttons",
        label: "Buttons",
        children: [
          { id: "primary-button", label: "Primary Button" },
          { id: "secondary-button", label: "Secondary Button" },
          { id: "icon-button", label: "Icon Button" },
        ],
      },
      {
        id: "cards",
        label: "Cards",
        children: [
          { id: "profile-card", label: "Profile Card" },
          { id: "product-card", label: "Product Card" },
          { id: "info-card", label: "Info Card" },
        ],
      },
      {
        id: "modals",
        label: "Modals",
        children: [
          { id: "alert-modal", label: "Alert Modal" },
          { id: "confirm-modal", label: "Confirm Modal" },
          { id: "form-modal", label: "Form Modal" },
        ],
      },
      {
        id: "forms",
        label: "Forms",
        children: [
          { id: "login-form", label: "Login Form" },
          { id: "signup-form", label: "Signup Form" },
          { id: "contact-form", label: "Contact Form" },
        ],
      },
    ],
  },
  {
    id: "gestures",
    label: "Gestures",
    children: [
      { id: "tap", label: "Tap" },
      {
        id: "swipe",
        label: "Swipe",
        children: [
          { id: "swipe-left", label: "Swipe Left" },
          { id: "swipe-right", label: "Swipe Right" },
          { id: "swipe-up", label: "Swipe Up" },
          { id: "swipe-down", label: "Swipe Down" },
          { id: "multi-directional", label: "Multi-Directional" },
        ],
      },
      { id: "drag", label: "Drag" },
      { id: "pinch", label: "Pinch" },
      { id: "rotate", label: "Rotate" },
    ],
  },
  {
    id: "interactions",
    label: "Interactions",
    children: [
      { id: "animations", label: "Animations" },
      { id: "transitions", label: "Transitions" },
      {
        id: "haptics",
        label: "Haptics",
        children: [
          { id: "light-impact", label: "Light Impact" },
          { id: "medium-impact", label: "Medium Impact" },
          { id: "heavy-impact", label: "Heavy Impact" },
          { id: "intense-impact", label: "Intense Impact" },
          { id: "custom", label: "Custom" },
        ],
      },
      { id: "audio-feedback", label: "Audio Feedback" },
      { id: "microinteractions", label: "Microinteractions" },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    children: [
      {
        id: "navigation-patterns",
        label: "Navigation Patterns",
        children: [
          { id: "tabs", label: "Tabs" },
          { id: "breadcrumbs", label: "Breadcrumbs" },
          { id: "side-menu", label: "Side Menu" },
        ],
      },
      {
        id: "layout-patterns",
        label: "Layout Patterns",
        children: [
          { id: "grid-layout", label: "Grid Layout" },
          { id: "card-layout", label: "Card Layout" },
          { id: "dashboard-layout", label: "Dashboard Layout" },
        ],
      },
      {
        id: "form-patterns",
        label: "Form Patterns",
        children: [
          { id: "login-form", label: "Login Form" },
          { id: "signup-form", label: "Signup Form" },
          { id: "search-form", label: "Search Form" },
        ],
      },
      {
        id: "feedback-patterns",
        label: "Feedback Patterns",
        children: [
          { id: "notifications", label: "Notifications" },
          { id: "toasts", label: "Toasts" },
          { id: "modals", label: "Modals" },
        ],
      },
    ],
  },
];

// --- TreeMenu Component ---
export const TreeMenu: FC<TreeMenuProps> = ({ menuData = MENU_DATA }) => {
  const [path, setPath] = useState<MenuItem[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Theme Switcher Effect
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const currentItems =
    path.length === 0 ? menuData : path[path.length - 1].children || [];

  const handleNavigateForward = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      setPath((prev) => [...prev, item]);
    }
  };

  const handleNavigateBack = (index: number) => {
    setPath((prev) => prev.slice(0, index));
  };

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle dark mode"
        className="mb-8 p-3 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition-all active:scale-95"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-600" size={20} />}
      </button>

      <div className="w-full max-w-md relative px-8 py-12 flex flex-col min-h-[500px]">
        {/* Breadcrumb / Back Path */}
        <div className="flex flex-col items-start space-y-1 mb-4">
          <AnimatePresence>
            {path.map((item, idx) => (
              <motion.button
                key={`path-${item.id}`}
                layoutId={`item-${item.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => handleNavigateBack(idx)}
                className="flex items-center text-zinc-400 dark:text-zinc-500 font-bold text-2xl px-2.5 gap-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                style={{ marginLeft: `${idx * 16}px` }}
              >
                <TbArrowBackUp size={24} />
                {item.label}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Menu List */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.ul
              key={path.length === 0 ? "root" : path[path.length - 1].id}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start"
              style={{ paddingLeft: `${path.length * 24}px` }}
            >
              {currentItems.map((item) => {
                const hasChildren = !!(item.children && item.children.length > 0);
                return (
                  <motion.li
                    key={item.id}
                    variants={itemVariants}
                    layoutId={hasChildren ? `item-${item.id}` : undefined}
                    className="w-full"
                  >
                    <button
                      onClick={() => handleNavigateForward(item)}
                      disabled={!hasChildren}
                      className={`group w-full text-left py-2 px-3 rounded-lg text-2xl font-bold transition-all duration-200 
                        ${hasChildren
                          ? 'text-zinc-900 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-zinc-500'
                          : 'text-zinc-400 dark:text-zinc-600 cursor-default'}`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TreeMenu;