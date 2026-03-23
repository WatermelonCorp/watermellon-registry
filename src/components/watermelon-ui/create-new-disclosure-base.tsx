'use client';

import { useState, type FC, type ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  Cancel01Icon,
  Folder01Icon,
  TaskEdit01Icon,
  NoteIcon,
  Award01Icon,
  Flag02Icon,
  Calendar04Icon,
} from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'motion/react';

export interface DisclosureItem {
  icon: ReactNode;
  label: string;
}

export interface CreateNewDisclosureProps {
  items?: DisclosureItem[];
  initialOpen?: boolean;
}

interface GridItemProps {
  icon: ReactNode;
  label: string;
}

const GridItem: FC<GridItemProps> = ({ icon, label }) => {
  return (
    <motion.button className="group flex flex-col items-center justify-center gap-2 rounded-xl px-2 py-4 transition-all duration-200 hover:bg-accent/40">
      <div className="text-muted-foreground transition-colors group-hover:text-foreground">
        {icon}
      </div>
      <span className="text-sm font-medium tracking-tight text-foreground">
        {label}
      </span>
    </motion.button>
  );
};

export const CreateNewDisclosure: FC<CreateNewDisclosureProps> = ({
  items,
  initialOpen = false,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);

  const defaultItems: DisclosureItem[] = [
    {
      icon: <HugeiconsIcon icon={Folder01Icon} size={28} strokeWidth={1.5} />,
      label: 'Project',
    },
    {
      icon: <HugeiconsIcon icon={TaskEdit01Icon} size={28} strokeWidth={1.5} />,
      label: 'Task',
    },
    {
      icon: <HugeiconsIcon icon={NoteIcon} size={28} strokeWidth={1.5} />,
      label: 'Note',
    },
    {
      icon: <HugeiconsIcon icon={Award01Icon} size={28} strokeWidth={1.5} />,
      label: 'Goal',
    },
    {
      icon: <HugeiconsIcon icon={Flag02Icon} size={28} strokeWidth={1.5} />,
      label: 'Milestone',
    },
    {
      icon: <HugeiconsIcon icon={Calendar04Icon} size={28} strokeWidth={1.5} />,
      label: 'Reminder',
    },
  ];

  const disclosureItems = items || defaultItems;

  return (
    <div
      className="theme-injected bg-transparent text-foreground font-sans"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {!open ? (
          <motion.button
            key="collapsed"
            layoutId="shared-container"
            onClick={() => setOpen(true)}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
            style={{
              borderRadius:32,
            }}
            className="flex cursor-pointer items-center gap-2 border border-border bg-card px-8 py-4 text-lg font-medium whitespace-nowrap text-foreground shadow-sm"
          >
            <motion.div layoutId="label" className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Add01Icon}
                size={26}
                className="text-muted-foreground"
                strokeWidth={1.5}
              />
              Create New
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layoutId="shared-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.1 },
            }}
            style={{
              borderRadius:32, 
            }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
            className="h-full w-80 sm:w-96 rounded-2xl border border-border bg-muted/40 p-1"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <motion.p
                layoutId="label"
                className="text-base font-semibold text-foreground"
              >
                Create New
              </motion.p>
              <motion.button
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.95 }}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-secondary text-secondary-foreground"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={16}
                  className="text-secondary-foreground"
                  strokeWidth={2.5}
                />
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-4 rounded-4xl bg-card p-4 shadow-sm">
              {disclosureItems.map((item, index) => (
                <GridItem key={index} icon={item.icon} label={item.label} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
