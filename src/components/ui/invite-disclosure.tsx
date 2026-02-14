import React, { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { MdOutlineClose } from "react-icons/md";
import { FaFolderClosed } from "react-icons/fa6";
import { LuDraftingCompass } from "react-icons/lu";
import { BiSolidZap } from "react-icons/bi";
import { PiScrewdriverBold } from "react-icons/pi";

/*  TYPES  */
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

/*  DEFAULT DATA  */
const DEFAULT_INVITES: InviteItem[] = [
  {
    id: "1",
    title: "Sonora Repository",
    description: "Contribute to the code repository",
    icon: <FaFolderClosed className="w-4 h-4 text-[#868686]" />,
    hasUpdate: true,
  },
  {
    id: "2",
    title: "Design Tokens",
    description: "Collaborate on design tokens",
    icon: <LuDraftingCompass className="w-5 h-5 text-[#868686]" />,
    hasUpdate: true,
  },
  {
    id: "3",
    title: "Motion Kit",
    description: "Contribute to motion components",
    icon: <BiSolidZap className="w-5 h-5 text-[#868686]" />,
  },
  {
    id: "4",
    title: "Build Tools",
    description: "Explore build tools & pipeline",
    icon: <PiScrewdriverBold className="w-5 h-5 text-[#868686]" />,
  },
];

const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
} as const;

/*  COMPONENT  */
export const InviteDisclosure: React.FC<InviteDisclosureProps> = ({
  title = "Invites",
  badgeCount = 2,
  invites = DEFAULT_INVITES,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center w-fit h-[500px]">
      <motion.div
        layout
        transition={springTransition}
        style={{
          borderRadius: isOpen ? 40 : 100,
        }}
        className="bg-[#F4F4F4] dark:bg-zinc-900 border border-[#F4F4F4] dark:border-zinc-800 shadow-sm overflow-hidden origin-center"
      >
        {!isOpen ? (
          /*  trigger button */
          <motion.button
            layoutId="disclosure"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-6 py-4 cursor-pointer bg-[#F4F4F4] dark:bg-zinc-900 hover:bg-[#eae8e8] dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            <motion.span
              layout="position"
              className="text-xl font-semibold text-[#262626] dark:text-zinc-100"
            >
              {title}
            </motion.span>
            <motion.div
              layoutId="badge"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-[#262626] dark:bg-zinc-100 text-white dark:text-zinc-900 text-[14px] font-bold"
            >
              {badgeCount}
            </motion.div>
          </motion.button>
        ) : (
          /* PANEL  */
          <motion.div layoutId="disclosure" className="w-xs sm:w-[360px] p-2">
            <div className="flex items-center justify-between px-6 pt-4 pb-6">
              <motion.h2
                layout="position"
                className="text-2xl font-bold text-[#262626] dark:text-zinc-100"
              >
                {title}
              </motion.h2>
              <button
                title="close"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#fefefe] dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors duration-200"
              >
                <MdOutlineClose className="w-5 h-5 text-[#676767] dark:text-zinc-400" />
              </button>
            </div>

            <div className="px-2 pb-4 space-y-3">
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
                  className="flex items-center gap-4 px-3 py-3 rounded-2xl bg-[#FEFEFE] dark:bg-zinc-800 hover:bg-[#FEFEFE]/70 dark:hover:bg-zinc-800/70 transition-all cursor-pointer group hover:shadow-sm"
                >
                  <div className="relative">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F5F5] dark:bg-zinc-700">
                      {invite.icon && React.isValidElement(invite.icon)
                        ? React.cloneElement(
                            invite.icon as React.ReactElement<any>,
                            {
                              className: `${(invite.icon as React.ReactElement<any>).props.className} dark:text-zinc-300`,
                            },
                          )
                        : invite.icon}
                    </div>
                    {invite.hasUpdate && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#262626] dark:bg-zinc-100 rounded-full border-2 border-white dark:border-zinc-800" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold text-[#262626] dark:text-zinc-100 leading-tight">
                      {invite.title}
                    </h3>
                    <p className="text-sm text-[#9B9B9B] dark:text-zinc-500 font-medium">
                      {invite.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
