"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TbArrowBackUp } from "react-icons/tb";

export interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
}

interface TreeMenuProps {
  menuData?: MenuItem[];
}

export const TreeMenu: FC<TreeMenuProps> = ({ menuData = [] }) => {
  const [path, setPath] = useState<MenuItem[]>([]);


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
    animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center justify-center sm:justify-center bg-transparent transition-colors duration-300 overflow-x-hidden pt-12 pb-20">
      {/* Main Container */}
      <div className="w-full max-w-lg px-6 sm:px-10 flex flex-col min-h-100">
        
        {/* Breadcrumb Path */}
        <div className="flex flex-col items-start space-y-1 mb-6">
          <AnimatePresence mode="popLayout">
            {path.map((item, idx) => (
              <motion.button
                key={`path-${item.id}`}
                layoutId={`item-${item.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                onClick={() => handleNavigateBack(idx)}
                className="flex items-center text-zinc-400 dark:text-zinc-500 font-bold text-xl sm:text-2xl px-2 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors gap-2"
                style={{ marginLeft: `${idx * 12}px` }}
              >
                <TbArrowBackUp className="shrink-0" size={20} />
                <span className="truncate max-w-50 sm:max-w-xs">{item.label}</span>
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
              className="flex flex-col items-start w-full"
              style={{ paddingLeft: `${path.length * 16}px` }}
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
                      className={`group w-full text-left py-2 px-3 rounded-xl text-xl sm:text-2xl font-bold transition-all duration-200 wrap-break-word
                        ${hasChildren
                          ? 'text-zinc-900 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-zinc-500'
                          : 'text-zinc-400 dark:text-zinc-700 cursor-default'}`}
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