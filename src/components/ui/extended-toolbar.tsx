'use client';

import { type FC, useState, forwardRef } from 'react';
import { motion, type Transition } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { ChevronRight } from 'lucide-react';
import {
  BsChatLeftFill,
  BsFillArchiveFill,
  BsFillInboxFill,
  BsFillPinAngleFill,
  BsTrash3Fill,
} from 'react-icons/bs';
import { IoImage } from 'react-icons/io5';
import { PiShareFatFill } from 'react-icons/pi';
import { AiFillTag } from 'react-icons/ai';
import type { IconType } from 'react-icons';

interface ToolbarItem {
  icon: IconType;
  label: string;
}

interface ExtendedToolbarProps {
  primaryItems?: ToolbarItem[];
  secondaryItems?: ToolbarItem[];
}

const springConfig: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1.2,
};

const DEFAULT_PRIMARY: ToolbarItem[] = [
  { icon: BsFillInboxFill, label: 'Inbox' },
  { icon: BsChatLeftFill, label: 'Chat' },
  { icon: BsFillPinAngleFill, label: 'Pin' },
  { icon: AiFillTag, label: 'Tag' },
];

const DEFAULT_SECONDARY: ToolbarItem[] = [
  { icon: IoImage, label: 'Image' },
  { icon: BsFillArchiveFill, label: 'Archive' },
  { icon: PiShareFatFill, label: 'Share' },
  { icon: BsTrash3Fill, label: 'Delete' },
];
const SIDE_PADDING = 8;
export const ExtendedToolbar: FC<ExtendedToolbarProps> = ({
  primaryItems = DEFAULT_PRIMARY,
  secondaryItems = DEFAULT_SECONDARY,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [primaryRef, primaryBounds] = useMeasure({ offsetSize: true });
  const [secondaryRef, secondaryBounds] = useMeasure({ offsetSize: true });
  const [toggleRef, toggleBounds] = useMeasure({ offsetSize: true });

  const currentWidth = isExpanded
    ? secondaryBounds.width + toggleBounds.width + SIDE_PADDING
    : primaryBounds.width + toggleBounds.width + SIDE_PADDING;

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{
          width: currentWidth > 0 ? currentWidth : 'auto',
        }}
        transition={springConfig}
        className="relative overflow-hidden rounded-full border border-white/40 bg-neutral-100 py-2 dark:border-white/10 dark:bg-neutral-900"
      >
        <motion.div
          animate={{
            x: isExpanded ? -(primaryBounds.width - SIDE_PADDING) : 0,
          }}
          transition={springConfig}
          className="flex h-full items-center"
        >
          <div
            ref={primaryRef}
            className="flex shrink-0 items-center gap-4 pr-2 pl-4"
          >
            {primaryItems.map((item, i) => (
              <ToolbarIcon
                key={`p-${i}`}
                icon={item.icon}
                active={!isExpanded}
              />
            ))}
          </div>

          <ToggleButton
            ref={toggleRef}
            isOpen={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          />

          <div
            ref={secondaryRef}
            className="flex shrink-0 items-center gap-4 pr-4 pl-2"
          >
            {secondaryItems.map((item, i) => (
              <ToolbarIcon
                key={`s-${i}`}
                icon={item.icon}
                active={isExpanded}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const ToolbarIcon = ({
  icon: Icon,
  active,
}: {
  icon: IconType;
  active: boolean;
}) => (
  <motion.div
    initial={false}
    animate={{
      opacity: active ? 1 : 0,
      filter: active ? 'blur(0px)' : 'blur(4px)',
    }}
    transition={{ duration: 0.2 }}
  >
    <Icon className="size-5 text-neutral-500" />
  </motion.div>
);

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ToggleButton = forwardRef<HTMLDivElement, ToggleButtonProps>(
  ({ isOpen, onClick }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className="z-10 flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white p-2 transition-transform active:scale-95 dark:bg-neutral-800"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={springConfig}
      >
        <ChevronRight
          size={18}
          className="text-neutral-600 dark:text-neutral-300"
        />
      </motion.div>
    </div>
  ),
);
