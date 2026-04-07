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

type IconRenderer = (props?: Omit<React.SVGProps<SVGSVGElement>, 'strokeWidth'> & { strokeWidth?: number }) => ReactNode;

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
            width: isOpen ? 'min(320px, calc(100vw - 32px))' : 280,
            height: isOpen ? 'auto' : 90,
            borderRadius: isOpen ? 32 : 44,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!isOpen ? (
              <div className="flex h-[90px] items-center px-6">
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
              <motion.div layout className="flex flex-col">
                <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3 sm:px-8">
                  <div className="w-8" />
                  <h2 className="font-sans text-base font-semibold text-foreground sm:text-lg truncate">
                    {title}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="rounded-full bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {closeIcon({
                      className: 'text-current size-4 sm:size-5',
                    })}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-y-6 px-4 py-6 sm:gap-y-8 sm:px-6">
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
                          className="h-11 w-11 rounded-full border border-border object-cover shadow-md sm:h-[56px] sm:w-[56px]"
                        />

                        {user.active && (
                          <motion.div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-xl sm:-top-3 sm:-right-3 sm:h-8 sm:w-8">
                            <div className="flex items-center gap-[2px]">
                              {bars.map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-[1.5px] rounded-full bg-muted-foreground sm:w-[2px]"
                                  animate={{ height: [2, 10, 6] }}
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

                      <span className="font-sans text-[11px] font-semibold text-muted-foreground sm:text-sm truncate w-full text-center px-1">
                        {user.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="px-4 pb-6 sm:px-6">
                  <button className="w-full rounded-4xl bg-primary py-2.5 font-sans text-base font-semibold text-primary-foreground transition active:scale-[0.98] sm:py-3 sm:text-lg">
                    {ctaText}
                  </button>
                  <p className="mt-3 text-center font-sans text-xs text-muted-foreground sm:mt-4 sm:text-sm">
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
