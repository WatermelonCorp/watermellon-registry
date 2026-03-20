"use client";

import React, { useState, type FC } from "react";
import { motion, MotionConfig, type Transition } from "motion/react";
import { ChevronDown, Send } from "lucide-react";
import { HiCursorArrowRipple } from "react-icons/hi2";
import { Layers } from "lucide-react";
import { IoIosTimer } from "react-icons/io";
import { PiHandTap } from "react-icons/pi";
import useMeasure from "react-use-measure";

export interface AccordionItemData {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  setOpenId: (id: number | null) => void;
  index: number;
  total: number;
  openIndex: number;
}
interface AccordionProps {
  items?: AccordionItemData[];
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 50,
  mass: 1,
};

const DEFAULT_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    title: "What is Interaction Design?",
    icon: <HiCursorArrowRipple size={28} className="-rotate-10" />,
    content:
      "Interaction design focuses on creating engaging interfaces with well-thought-out behaviors and actions.",
  },
  {
    id: 2,
    title: "Principles & Patterns",
    icon: <Layers size={24} />,
    content:
      "Fundamental guidelines and repeated solutions that ensure consistency and usability in design.",
  },
  {
    id: 3,
    title: "Usability & Accessibility",
    icon: <PiHandTap size={26} className="-rotate-20" />,
    content:
      "Designing experiences that are easy to use and accessible to people of all abilities.",
  },
  {
    id: 4,
    title: "Prototyping & Testing",
    icon: <Send size={24} />,
    content:
      "Rapid experimentation and validation of ideas through prototypes and real user testing.",
  },
  {
    id: 5,
    title: "UX Optimisation",
    icon: <IoIosTimer size={26} />,
    content:
      "Improving user experience by analyzing behavior and refining interactions over time.",
  },
];

const AccordionItem: FC<AccordionItemProps> = ({
  item,
  setOpenId,
  index,
  total,
  openIndex,
}) => {
  const [ref, bounds] = useMeasure();
  const isOpen = index === openIndex;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const isBeforeOpen = index === openIndex - 1;
  const isAfterOpen = index === openIndex + 1;

  const isAlone = (isAfterOpen && isLast) || (isBeforeOpen && isFirst);

  const BORDER_WIDTH = "1px";
  const BORDER_STYLE = "solid";
  const borderTopWidth =
    isFirst || isAfterOpen || isOpen ? BORDER_WIDTH : "0px";
  const borderBottomWidth =
    isLast || isBeforeOpen || isOpen ? BORDER_WIDTH : "0px";
  const borderLeftWidth = BORDER_WIDTH;
  const borderRightWidth = BORDER_WIDTH;

  let borderTopLeftRadius: number | string = 0;
  let borderTopRightRadius: number | string = 0;
  let borderBottomLeftRadius: number | string = 0;
  let borderBottomRightRadius: number | string = 0;

  const RADIUS = "var(--radius)";

  if (isOpen || isAlone) {
    borderTopLeftRadius = RADIUS;
    borderTopRightRadius = RADIUS;
    borderBottomLeftRadius = RADIUS;
    borderBottomRightRadius = RADIUS;
  } else if (isBeforeOpen) {
    borderBottomLeftRadius = RADIUS;
    borderBottomRightRadius = RADIUS;
  } else if (isAfterOpen) {
    borderTopLeftRadius = RADIUS;
    borderTopRightRadius = RADIUS;
  } else if (isFirst) {
    borderTopLeftRadius = RADIUS;
    borderTopRightRadius = RADIUS;
  } else if (isLast) {
    borderBottomLeftRadius = RADIUS;
    borderBottomRightRadius = RADIUS;
  }

  return (
    <MotionConfig transition={springTransition}>
      <motion.li layout>
        <motion.div
          animate={{
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
          }}
          className="border-border bg-card overflow-hidden border-solid will-change-transform"
          style={{
            borderTopWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderRightWidth,
            borderStyle: BORDER_STYLE,
            marginBlock: isOpen ? "10px" : "0px",
          }}
        >
          <button
            onClick={() => setOpenId(isOpen ? null : item.id)}
            className="flex w-full cursor-pointer items-center justify-between px-[12px] py-[10px]"
          >
            <div className="text-card-foreground flex items-center gap-[12px]">
              {item.icon}

              <span className="text-card-foreground text-lg font-bold">
                {item.title}
              </span>
            </div>

            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown className="text-muted-foreground" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: isOpen ? bounds.height : 0,
              opacity: isOpen ? 1 : 0,
            }}
            className="overflow-hidden will-change-transform"
          >
            <div ref={ref}>
              <div className="text-muted-foreground px-5 pb-5 text-[18px] font-medium">
                {item.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.li>
    </MotionConfig>
  );
};

export const AccordionApp: FC<AccordionProps> = ({ items }) => {
  const defaultItems = items ?? DEFAULT_ITEMS;

  const [openId, setOpenId] = useState<number | null>(null);

  const openIndex = defaultItems.findIndex((item) => item.id === openId);

  return (
    <div className="theme-injected flex w-full flex-col items-center justify-center p-6 transition-colors duration-500">
      <ul className="w-full max-w-[400px]">
        {defaultItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            setOpenId={setOpenId}
            index={index}
            total={defaultItems.length}
            openIndex={openIndex}
          />
        ))}
      </ul>
    </div>
  );
};
