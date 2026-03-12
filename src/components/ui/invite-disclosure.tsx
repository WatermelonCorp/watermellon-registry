import React, { useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "motion/react";
import { MdOutlineClose } from "react-icons/md";
import { FaFolderClosed } from "react-icons/fa6";
import { LuDraftingCompass } from "react-icons/lu";
import { BiSolidZap } from "react-icons/bi";
import { PiScrewdriverBold } from "react-icons/pi";

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
    id: "1",
    title: "Sonora Repository",
    description: "Contribute to the code repository",
    icon: <FaFolderClosed className="h-4 w-4 text-[#868686]" />,
    hasUpdate: true,
  },
  {
    id: "2",
    title: "Design Tokens",
    description: "Collaborate on design tokens",
    icon: <LuDraftingCompass className="h-5 w-5 text-[#868686]" />,
    hasUpdate: true,
  },
  {
    id: "3",
    title: "Motion Kit",
    description: "Contribute to motion components",
    icon: <BiSolidZap className="h-5 w-5 text-[#868686]" />,
  },
  {
    id: "4",
    title: "Build Tools",
    description: "Explore build tools & pipeline",
    icon: <PiScrewdriverBold className="h-5 w-5 text-[#868686]" />,
  },
];

const springTransition: Transition = {
  type: "spring",
  stiffness: 800,
  damping: 80,
  mass: 5,
};

const collapsedTransition: Transition = {
  type: "spring",
  stiffness: 800,
  damping: 80,
  mass: 4,
};

export const InviteDisclosure: React.FC<InviteDisclosureProps> = ({
  title = "Invites",
  badgeCount = 2,
  invites = DEFAULT_INVITES,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[500px] w-fit items-center justify-center">
      <MotionConfig
        transition={isOpen ? springTransition : collapsedTransition}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!isOpen ? (
            <motion.button
              layoutId="disclosure"
              onClick={() => setIsOpen(true)}
              style={{
                borderRadius: 32,
              }}
              className="flex cursor-pointer items-center gap-3 bg-[#F4F4F4] px-6 py-4 transition-colors duration-200 hover:bg-[#eae8e8] dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <motion.span
                layoutId="title"
                className="text-xl font-semibold text-[#262626] dark:text-neutral-100"
              >
                {title}
              </motion.span>
              <motion.div
                layoutId="badge"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#262626] text-[14px] font-bold text-white dark:bg-neutral-100 dark:text-neutral-900"
              >
                {badgeCount}
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              layoutId="disclosure"
              className="w-xs bg-[#F4F4F4] p-2 sm:w-[360px] dark:bg-neutral-900"
              style={{
                borderRadius: 24,
              }}
            >
              <div className="flex items-center justify-between px-6 pt-4 pb-6">
                <motion.h2
                  layoutId="title"
                  className="text-2xl font-bold text-[#262626] dark:text-neutral-100"
                >
                  {title}
                </motion.h2>
                <motion.button
                  layoutId="badge"
                  title="close"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fefefe] transition-colors duration-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  <MdOutlineClose className="h-5 w-5 text-[#676767] dark:text-neutral-400" />
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
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="group flex cursor-pointer items-center gap-4 rounded-2xl bg-[#FEFEFE] px-3 py-3 transition-all hover:bg-[#FEFEFE]/70 hover:shadow-sm dark:bg-neutral-800 dark:hover:bg-neutral-800/70"
                  >
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] dark:bg-neutral-700">
                        {invite.icon && React.isValidElement(invite.icon)
                          ? React.cloneElement(
                              invite.icon as React.ReactElement<{ className?: string }>,
                              {
                                className: `${
                                  (invite.icon as React.ReactElement<{ className?: string }>).props
                                    .className
                                } dark:text-neutral-300`,
                              }
                            )
                          : invite.icon}
                      </div>
                      {invite.hasUpdate && (
                        <div className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#262626] dark:border-neutral-800 dark:bg-neutral-100" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-[15px] leading-tight font-bold text-[#262626] dark:text-neutral-100">
                        {invite.title}
                      </h3>
                      <p className="text-sm font-medium text-[#9B9B9B] dark:text-neutral-500">
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
