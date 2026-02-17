import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Zap } from "lucide-react";
import { HiBadgeCheck } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaInbox } from "react-icons/fa6";
import { RiBubbleChartFill } from "react-icons/ri";
import { BsFileTextFill, BsSendFill, BsTagFill } from "react-icons/bs";
import { TbClockHour12Filled } from "react-icons/tb";

function AnimatedText({
  text,
  className,
  delayStep = 0.014,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const chars = text.split("");

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={text}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                y: 10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 16,
                mass: 1.2,
                delay: i * delayStep,
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.8,
};
const DEFAULT_STEPS = [
  { id: 1, label: "Importing Survey Data", icon: FaInbox },
  { id: 2, label: "Refining Responses", icon: RiBubbleChartFill },
  { id: 3, label: "Labelling Responses", icon: BsTagFill },
  { id: 4, label: "Analyzing Sentiment", icon: TbClockHour12Filled },
  { id: 5, label: "Creating Reports", icon: BsFileTextFill },
  { id: 6, label: "Sharing Survey Report", icon: BsSendFill },
];

type StepItem = {
  id: number;
  label: string;
  icon: React.ComponentType<any>;
};

type RunActionButtonProps = {
  steps?: StepItem[];
};

export function RunActionButton({
  steps = DEFAULT_STEPS,
}: RunActionButtonProps) {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [currentStep, setCurrentStep] = useState(0);

  const startAction = () => {
    setStatus("running");
    setCurrentStep(0);
  };

  const reset = () => {
    setStatus("idle");
    setCurrentStep(0);
  };

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        setStatus("done");
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [status, steps.length]);

  const widths = {
    idle: 180,
    running: 360,
    done: 200,
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ width: widths[status] }}
        transition={spring}
        className={`relative flex h-[64px] items-center justify-between overflow-hidden rounded-full ${
          status === "running"
            ? "border-2 border-dashed border-[#D6D6DD] dark:border-white/20"
            : "border-2 border-transparent"
        } `}
      >
        <AnimatePresence mode="popLayout">
          {status === "idle" && (
            <motion.button
              key="idle"
              onClick={startAction}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={spring}
              className="flex flex-1 items-center gap-2 rounded-full bg-[#F4F4F9] px-5 py-3 whitespace-nowrap dark:bg-zinc-800"
            >
              <Zap className="h-6 w-6 text-[#26262B] dark:text-zinc-100" />

              <AnimatedText
                text="Run Action"
                className="text-[18px] font-medium text-[#26262B] dark:text-zinc-100"
              />
            </motion.button>
          )}

          {status === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={spring}
              className="flex flex-1 items-center justify-between gap-3 px-4 whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                    transition={spring}
                  >
                    {React.createElement(steps[currentStep].icon, {
                      className: "w-6 h-6 text-[#28272A]  dark:text-zinc-100",
                    })}
                  </motion.div>
                </AnimatePresence>
                <AnimatedText
                  text={steps[currentStep].label}
                  className="text-[18px] font-bold text-[#28272A]  dark:text-zinc-100"
                />
              </div>

              <motion.button
                onClick={reset}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                transition={{ ...spring, delay: 0.15 }}
                className="ml-1 rounded-full bg-[#D6D5E2] dark:bg-white p-1.5"
              >
                <IoCloseSharp className="h-4 w-4 text-white dark:text-black" />
              </motion.button>
            </motion.div>
          )}

          {status === "done" && (
            <motion.button
              key="done"
              onClick={reset}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={spring}
              className="flex flex-1 items-center gap-2 rounded-full bg-[#EAF9EA] dark:bg-green-200 px-5 py-3 whitespace-nowrap"
            >
              <HiBadgeCheck className="h-6 w-6 text-[#22c55e]" />

              <AnimatedText
                text="Action Done"
                className="text-[18px] font-bold text-[#22c55e]"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
