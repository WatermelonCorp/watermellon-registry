"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaFireFlameCurved, FaSailboat } from "react-icons/fa6";
import { LuTent } from "react-icons/lu";
import { type IconType } from "react-icons";

interface ListItem {
  id: string;
  title: string;
  location: string;
  date: string;
  icon: IconType;
}

interface ListStackProps {
  items?: ListItem[];
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Camping",
    location: "Yosemite Park",
    date: "5 August",
    icon: LuTent,
  },
  {
    id: "2",
    title: "Boating",
    location: "Lake Tahoe Park",
    date: "2 August",
    icon: FaSailboat,
  },
  {
    id: "3",
    title: "Barbecue",
    location: "Greenfield Shores",
    date: "28 July",
    icon: FaFireFlameCurved,
  },
];
const CARD_HEIGHT = 60;
const GAP = 8;
const COLLAPSED_OFFSET = -7;

export const ListStack: FC<ListStackProps> = ({ items = ITEMS }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="h- w-full font-sans">
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <div className="relative flex h-full w-full flex-col items-center justify-center perspective-[1000px]">
          {items.map((item, i) => {
            return (
              <motion.div
                className="bg-opacity-80 absolute flex w-[270px] items-center rounded-2xl bg-white px-3 py-3 shadow-[0px_0px_2px_rgba(0,0,0,0.1),0px_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-gray-100 dark:bg-zinc-800"
                key={i}
                animate={isExpanded ? "expanded" : "collapsed"}
                style={{
                  height: CARD_HEIGHT,
                }}
                variants={{
                  expanded: {
                    y: (items.length - 1 - i) * (CARD_HEIGHT + GAP),
                    z: 10,
                  },
                  collapsed: {
                    y: i * COLLAPSED_OFFSET,
                    z: i * 60,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 23,
                }}
              >
                <div className="flex w-full items-center font-sans">
                  <div
                    key={i}
                    className="flex w-full items-center gap-x-2 text-neutral-900"
                  >
                    <div className="flex size-10 items-center justify-center rounded-md bg-black text-zinc-100 dark:bg-white dark:text-zinc-700">
                      <item.icon size={24} />
                    </div>
                    <div className="leading-tighter flex-1">
                      <h3 className="text-sm text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.location}
                      </p>
                    </div>

                    <span className="leading-tighter mb-[2px] ml-5 self-end text-end text-xs text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <motion.div
            className="absolute cursor-pointer rounded-2xl border border-gray-100 bg-white px-4 py-2 text-neutral-900 shadow-sm"
            animate={{
              y: isExpanded
                ? (items.length - 1) * (CARD_HEIGHT + GAP) + CARD_HEIGHT + GAP
                : CARD_HEIGHT + GAP,
              z: isExpanded ? 0 : 40,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            layout
            onClick={() => {
              setIsExpanded((prev) => !prev);
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                layout
                key={isExpanded ? "hide" : "show"}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {" "}
                {isExpanded ? "Hide " : "Show "}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
