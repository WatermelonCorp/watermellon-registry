"use client";

import { useState, useRef, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { TbArrowBackUp } from "react-icons/tb";

export interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
}

interface TreeMenuProps {
  menuData?: MenuItem[];
  onSelect?: (item: MenuItem) => void;
}

export const TreeMenu: FC<TreeMenuProps> = ({ menuData = [], onSelect }) => {
  const [path, setPath] = useState<MenuItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const clickedIndexRef = useRef<number | null>(null);

  const currentItems =
    path.length === 0 ? menuData : path[path.length - 1].children || [];

  const handleNavigateForward = (item: MenuItem, index: number) => {
    if (item.children?.length) {
      clickedIndexRef.current = index;
      setPath((prev) => [...prev, item]);
      setActiveItemId(null);
    } else {
      setActiveItemId(item.id);
      if (onSelect) {
        onSelect(item);
      }
    }
  };

  const handleNavigateBack = (index: number) => {
    clickedIndexRef.current = null;
    setPath((prev) => prev.slice(0, index));
  };

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: {},
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: (index: number) => {
      const clicked = clickedIndexRef.current;
      if (clicked !== null) {
        if (index < clicked)
          return {
            opacity: 0,
            y: -100,
            transition: { duration: 0.3, ease: "easeOut" },
          };
        if (index > clicked)
          return {
            opacity: 0,
            y: 100,
            transition: { duration: 0.3, ease: "easeOut" },
          };
        return { opacity: 0, transition: { duration: 0.2 } };
      }
      return { opacity: 0, y: -10, transition: { duration: 0.2 } };
    },
  };

  return (
    <div className="theme-injected flex min-h-full w-full flex-col items-center justify-center overflow-x-hidden pt-12 pb-20 transition-colors duration-300">
      <div className="flex min-h-100 w-full max-w-lg flex-col px-6 sm:px-10">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-col items-start space-y-1">
          <AnimatePresence mode="popLayout">
            {path.map((item, idx) => (
              <motion.button
                key={`path-${item.id}`}
                layout="position"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5, transition: { duration: 0.4 } }}
                onClick={() => handleNavigateBack(idx)}
                className="text-muted-foreground hover:bg-muted/50  flex items-center gap-2 rounded-lg px-2 py-1 text-xl font-semibold transition-colors sm:text-2xl"
                style={{ marginLeft: `${idx * 12}px` }}
              >
                <TbArrowBackUp size={20} />
                <motion.span
                  layoutId={`name-${item.id}`}
                  className="inline-block max-w-50 truncate sm:max-w-xs"
                >
                  {item.label}
                </motion.span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Menu List */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            <motion.ul
              key={path.length === 0 ? "root" : path[path.length - 1].id}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex w-full flex-col items-start space-y-1"
              style={{ paddingLeft: `${path.length * 16}px` }}
            >
              {currentItems.map((item, index) => {
                const hasChildren = !!item.children?.length;

                return (
                  <motion.li
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <button
                      onClick={() => handleNavigateForward(item, index)}
                      className={`group w-full rounded-lg px-4 py-3 text-left text-xl font-semibold transition-all duration-200 sm:text-2xl ${
                        hasChildren
                          ? "text-foreground hover:bg-muted/50 hover:text-foreground"
                          : activeItemId === item.id
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <motion.span
                        layoutId={hasChildren ? `name-${item.id}` : undefined}
                        className="inline-block"
                      >
                        {item.label}
                      </motion.span>
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
