"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
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
    if (item.children?.length) {
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
    <div className="min-h-full w-full flex flex-col items-center justify-center bg-transparent transition-colors duration-300 overflow-x-hidden pt-12 pb-20">
      <div className="w-full max-w-lg px-6 sm:px-10 flex flex-col min-h-100">

        {/* Breadcrumb */}
        <div className="flex flex-col items-start space-y-1 mb-8">
          <AnimatePresence mode="popLayout">
            {path.map((item, idx) => (
              <motion.button
                key={`path-${item.id}`}
                layoutId={`item-${item.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                onClick={() => handleNavigateBack(idx)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg font-semibold text-xl sm:text-2xl transition-colors
                  text-neutral-400 dark:text-neutral-500
                  hover:bg-neutral-100 dark:hover:bg-neutral-800"
                style={{ marginLeft: `${idx * 12}px` }}
              >
                <TbArrowBackUp size={20} />
                <span className="truncate max-w-50 sm:max-w-xs">
                  {item.label}
                </span>
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
              className="flex flex-col items-start w-full space-y-1"
              style={{ paddingLeft: `${path.length * 16}px` }}
            >
              {currentItems.map((item) => {
                const hasChildren = !!item.children?.length;

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
                      className={`group w-full text-left py-3 px-4 rounded-xl text-xl sm:text-2xl font-semibold transition-all duration-200
                        ${hasChildren
                          ? "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-600 dark:hover:text-neutral-300"
                          : "text-neutral-400 dark:text-neutral-600 cursor-default"
                        }`}
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