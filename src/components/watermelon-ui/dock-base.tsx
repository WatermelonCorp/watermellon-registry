'use client';

import React, { useState, type FC } from 'react';
import { motion, type Transition } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  AddSquareIcon,
  MessageNotification01Icon,
  NoteIcon,
  Search01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface DockItem {
  id: number;
  Icon: React.ElementType;
}

interface DockProps {
  items?: DockItem[];
}

const DEFAULT_DOCK_ITEMS: DockItem[] = [
  { id: 1, Icon: () => <HugeiconsIcon icon={Search01Icon} size={26} /> },
  { id: 2, Icon: () => <HugeiconsIcon icon={NoteIcon} size={26} /> },
  { id: 3, Icon: () => <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
  {
    id: 4,
    Icon: () => <HugeiconsIcon icon={MessageNotification01Icon} size={26} />,
  },
  { id: 5, Icon: () => <HugeiconsIcon icon={Settings01Icon} size={26} /> },
];

const dockSpring: Transition = {
  stiffness: 300,
  damping: 22,
  mass: 0.7,
};

export const Dock: FC<DockProps> = ({ items }) => {
  const dockItems = items ?? DEFAULT_DOCK_ITEMS;
  const [selected, setSelected] = useState<number | null>(null);
  const [animateSelected, setAnimateSelected] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelected(id);
    setAnimateSelected(id);
    setTimeout(() => {
      setAnimateSelected(null);
    }, 200);
  };

  return (
    <div className="theme-injected flex w-full flex-col items-center justify-center bg-transparent font-sans transition-colors duration-500">
      <motion.div
        layout
        transition={dockSpring}
        className="relative flex items-end gap-3.5 rounded-3xl border border-border bg-card px-3 py-2 shadow-sm"
      >
        {dockItems.map((item) => (
          <motion.div
            className="relative"
            onClick={() => handleClick(item.id)}
            style={{
              transformOrigin: 'bottom',
            }}
            initial={{
              scale: 1,
            }}
            whileHover={{
              y: -4,
            }}
            animate={{
              scale: animateSelected === item.id ? 1.3 : 1,
              y: animateSelected === item.id ? -6 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 550,
              damping: 15,
              mass: 1.1,
            }}
          >
            <motion.div className="cursor-pointer rounded-md bg-muted p-2 transition-colors hover:bg-background">
              <item.Icon
                className={cn(
                  'size-4 text-muted-foreground transition-all duration-200',
                  selected === item.id && 'text-foreground',
                )}
              />
            </motion.div>

            <motion.div
              className={cn(
                'absolute mt-px flex w-full items-center justify-center opacity-0 transition-opacity duration-400 will-change-transform',
                selected === item.id && 'opacity-100',
              )}
            >
              <div
                className="rounded-full bg-primary"
                style={{
                  width: 4,
                  height: 4,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
