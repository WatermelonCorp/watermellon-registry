'use client';

import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { IoChevronDown } from 'react-icons/io5';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

export interface User {
  id: number;
  name: string;
  img: string;
  active?: boolean;
}

type IconRendererProps = {
  className?: string;
};

type IconRenderer = (props?: IconRendererProps) => ReactNode;

interface VoiceChatDisclosureProps {
  users?: User[];
  title?: string;
  ctaText?: string;
  helperText?: string;
  closeIcon?: IconRenderer;
}

const DEFAULT_USERS: User[] = [
  {
    id: 1,
    name: 'Oğuz',
    img: 'https://i.pravatar.cc/150?u=oguz',
    active: true,
  },
  { id: 2, name: 'Ashish', img: 'https://i.pravatar.cc/150?u=ashish' },
  { id: 3, name: 'Mariana', img: 'https://i.pravatar.cc/150?u=mariana' },
  { id: 4, name: 'MDS', img: 'https://i.pravatar.cc/150?u=mds' },
  { id: 5, name: 'Ana', img: 'https://i.pravatar.cc/150?u=ana' },
  {
    id: 6,
    name: 'Natko',
    img: 'https://i.pravatar.cc/150?u=natko',
    active: true,
  },
];

export const VoiceChatDisclosure: React.FC<VoiceChatDisclosureProps> = ({
  users = DEFAULT_USERS,
  title = 'Voice Chat',
  ctaText = 'Join Now',
  helperText = 'Mic will be muted initially.',
  closeIcon = (props) => (
    <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={2} {...props} />
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bars = [0, 1, 2, 3];

  return (
    <MotionConfig
      transition={{ type: 'spring', bounce: 0, visualDuration: 0.32 }}
    >
      <motion.div layout className="relative theme-injected font-sans">
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              layout="position"
              className="absolute -top-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-4xl bg-primary shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-[3px]">
                {bars.map((i) => (
                  <motion.div
                    key={i}
                    className="w-[2.5px] rounded-full bg-primary-foreground"
                    initial={{ height: 6 }}
                    animate={{ height: [2, 16, 6] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          onClick={() => !isOpen && setIsOpen(true)}
          className="cursor-pointer overflow-hidden border border-border bg-card shadow-xl"
          style={{
            width: isOpen ? 420 : 280,
            height: isOpen ? 420 : 90,
            borderRadius: isOpen ? 32 : 44,
          }}
        >
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              <div className="flex h-full items-center px-6">
                <div className="flex -space-x-3">
                  {users.slice(0, 4).map((user, idx) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      style={{ zIndex: 10 - idx }}
                    >
                      <motion.img
                        layoutId={`avatar-img-${user.id}`}
                        src={user.img}
                        className="h-14 w-14 rounded-full border-4 border-background object-cover shadow-lg"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="ml-4 flex items-center gap-1 font-sans text-lg font-medium text-muted-foreground">
                  <span>+{users.length - 4}</span>
                  <IoChevronDown />
                </div>
              </div>
            ) : (
              <motion.div layout className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border bg-muted px-8 py-3">
                  <div className="w-8" />
                  <h2 className="font-sans text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {closeIcon({
                      className: 'text-current',
                    })}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-y-8 px-6 py-6">
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      className="relative flex flex-col items-center gap-2"
                    >
                      <div className="relative">
                        <motion.img
                          layoutId={`avatar-img-${user.id}`}
                          src={user.img}
                          className="h-[56px] w-[56px] rounded-full border border-border object-cover shadow-md"
                        />

                        {user.active && (
                          <motion.div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-xl">
                            <div className="flex items-center gap-[2px]">
                              {bars.map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-[2px] rounded-full bg-muted-foreground"
                                  animate={{ height: [2, 12, 6] }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <span className="font-sans text-sm font-semibold text-muted-foreground">
                        {user.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full rounded-4xl bg-primary py-3 font-sans text-lg font-semibold text-primary-foreground transition active:scale-[0.98]">
                    {ctaText}
                  </button>
                  <p className="mt-4 text-center font-sans text-sm text-muted-foreground">
                    {helperText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
