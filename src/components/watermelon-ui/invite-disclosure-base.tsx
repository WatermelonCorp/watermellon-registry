import React, { useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { MdOutlineClose } from 'react-icons/md';
import { FaFolderClosed } from 'react-icons/fa6';
import { LuDraftingCompass } from 'react-icons/lu';
import { BiSolidZap } from 'react-icons/bi';
import { PiScrewdriverBold } from 'react-icons/pi';

export interface InviteItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  hasUpdate?: boolean;
}

interface InviteDisclosureProps {
  title?: string;
  badgeCount?: number;
  invites?: InviteItem[];
}

const DEFAULT_INVITES: InviteItem[] = [
  {
    id: '1',
    title: 'Sonora Repository',
    description: 'Contribute to the code repository',
    icon: <FaFolderClosed className="h-4 w-4 text-muted-foreground" />,
    hasUpdate: true,
  },
  {
    id: '2',
    title: 'Design Tokens',
    description: 'Collaborate on design tokens',
    icon: <LuDraftingCompass className="h-5 w-5 text-muted-foreground" />,
    hasUpdate: true,
  },
  {
    id: '3',
    title: 'Motion Kit',
    description: 'Contribute to motion components',
    icon: <BiSolidZap className="h-5 w-5 text-muted-foreground" />,
  },
  {
    id: '4',
    title: 'Build Tools',
    description: 'Explore build tools & pipeline',
    icon: <PiScrewdriverBold className="h-5 w-5 text-muted-foreground" />,
  },
];

const springTransition: Transition = {
  type: 'spring',
  stiffness: 800,
  damping: 80,
  mass: 5,
};

const collapsedTransition: Transition = {
  type: 'spring',
  stiffness: 800,
  damping: 80,
  mass: 4,
};

export const InviteDisclosure: React.FC<InviteDisclosureProps> = ({
  title = 'Invites',
  badgeCount = 2,
  invites = DEFAULT_INVITES,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="theme-injected flex min-h-full w-fit items-center justify-center bg-transparent text-foreground font-sans"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <MotionConfig transition={isOpen ? springTransition : collapsedTransition}>
        <AnimatePresence mode="popLayout" initial={false}>
          {!isOpen ? (
            <motion.button
              layoutId="disclosure"
              onClick={() => setIsOpen(true)}
              style={{
                borderRadius: 32,
              }}
              className="flex cursor-pointer items-center gap-3 rounded-3xl border border-border bg-card px-6 py-4 text-foreground transition-colors duration-200 hover:bg-accent/40"
            >
              <motion.span
                layoutId="title"
                className="text-xl font-semibold text-foreground"
              >
                {title}
              </motion.span>
              <motion.div
                layoutId="badge"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {badgeCount}
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              layoutId="disclosure"
              style={{
                borderRadius: 24,
              }}
              className="w-80 sm:w-96 rounded-2xl border border-border bg-card p-2 text-card-foreground"
            >
              <div className="flex items-center justify-between px-6 pt-4 pb-6">
                <motion.h2
                  layoutId="title"
                  className="text-2xl font-bold text-foreground"
                >
                  {title}
                </motion.h2>
                <motion.button
                  layoutId="badge"
                  title="close"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors duration-200 hover:bg-accent"
                >
                  <MdOutlineClose className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="space-y-3 px-2 pb-4">
                {invites.map((invite, index) => (
                  <motion.div
                    key={invite.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      delay: index * 0.04 + 0.1,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-background px-3 py-3 transition-all hover:bg-accent/40 hover:shadow-sm"
                  >
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/60">
                        {invite.icon && React.isValidElement(invite.icon)
                          ? React.cloneElement(
                              invite.icon as React.ReactElement<any>,
                              {
                                className: `${(invite.icon as React.ReactElement<any>).props.className} text-muted-foreground`,
                              },
                            )
                          : invite.icon}
                      </div>
                      {invite.hasUpdate && (
                        <div className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base leading-tight font-bold text-foreground">
                        {invite.title}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {invite.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};
