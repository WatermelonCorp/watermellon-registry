import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { BsCheckCircleFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type ButtonStatus = "idle" | "loading" | "success" | "saved";
type Size = "sm" | "md" | "lg";

const SIZE_CONFIG = {
  sm: {
    height: 52,
    circleWidth: 52,
    idleWidth: 108,
    savedWidth: 128,
    text: "text-[18px]",
    icon: "text-2xl",
    spinner: "w-7 h-7",
    gap: "gap-2",
    padding: "px-4",
  },
  md: {
    height: 56,
    circleWidth: 56,
    idleWidth: 120,
    savedWidth: 140,
    text: "text-[20px]",
    icon: "text-3xl",
    spinner: "w-8 h-8",
    gap: "gap-3",
    padding: "px-5",
  },
  lg: {
    height: 68,
    circleWidth: 68,
    idleWidth: 144,
    savedWidth: 168,
    text: "text-[22px]",
    icon: "text-[28px]",
    spinner: "w-9 h-9",
    gap: "gap-4",
    padding: "px-5",
  },
};

interface SaveToggleProps {
  size?: Size;
  idleText?: string;
  savedText?: string;
  loadingDuration?: number;
  successDuration?: number;
  onStatusChange?: (status: ButtonStatus) => void;
}

export const SaveToggle: React.FC<SaveToggleProps> = ({
  size = "md",
  idleText = "Save",
  savedText = "Saved",
  loadingDuration = 1000,
  successDuration = 800,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const { theme } = useTheme();

  const cfg = SIZE_CONFIG[size];

  const stableWidth = Math.max(cfg.idleWidth, cfg.savedWidth);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const handleClick = () => {
    if (status === "idle") {
      setStatus("loading");

      setTimeout(() => {
        setStatus("success");

        setTimeout(() => {
          setStatus("saved");
        }, successDuration);
      }, loadingDuration);
    } else if (status === "saved") {
      setStatus("idle");
    }
  };

  const isCircle = status === "loading" || status === "success";

  const getBackgroundColor = () => {
    if (status === "loading" || status === "success") {
      return theme === "dark" ? "bg-secondary" : "bg-secondary";
    }
    if (status === "saved") {
      return theme === "dark" ? "bg-card" : "bg-card";
    }
    return theme === "dark" ? "bg-primary" : "bg-primary";
  };

  const getBorderColor = () => {
    if (status === "saved") {
      return theme === "dark" ? "border-muted" : "border-muted";
    }
    return "border-border";
  };

  const getCheckColor = () => {
    if (status === "success") {
      return theme === "dark" ? "text-primary" : "text-primary";
    }
    return theme === "dark" ? "text-muted-foreground" : "text-muted-foreground";
  };

  return (
    <div className="theme-injected flex items-center justify-center p-10">
      <MotionConfig
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 1,
        }}
      >
        <motion.button
          onClick={handleClick}
          initial={false}
          animate={{
            width: isCircle ? cfg.circleWidth : stableWidth,
            height: cfg.height,
          }}
          style={{
            borderWidth: status === "saved" ? "2px" : "1px",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 1.2,
            backgroundColor: {
              duration: 0.2,
            },
          }}
          className={cn(
            "relative z-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg select-none focus:outline-none active:scale-[0.97]",
            getBackgroundColor(),
            getBorderColor()
          )}
        >
          <AnimatePresence mode="popLayout">
            {status === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, x: -20 }}
                className={`absolute inset-0 flex items-center justify-center font-bold tracking-tight ${cfg.text} text-primary-foreground`}
              >
                {idleText}
              </motion.span>
            )}

            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.svg
                  viewBox="0 0 26 26"
                  className={cfg.spinner}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.7,
                    ease: "linear",
                  }}
                >
                  <circle
                    cx="13"
                    cy="13"
                    r="10"
                    className="stroke-primary"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M13 3 A10 10 0 0 1 23 13"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    className="stroke-muted"
                  />
                </motion.svg>
              </motion.div>
            )}

            {(status === "success" || status === "saved") && (
              <motion.div
                key="check-state"
                layout
                initial={
                  status === "success"
                    ? { opacity: 0, scale: 0.5, filter: "blur(4px)" }
                    : { opacity: 1 }
                }
                animate={
                  status === "success"
                    ? { opacity: 1, scale: 1.15, filter: "blur(0px)" }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                exit={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                className={`absolute inset-0 flex items-center justify-center ${
                  status === "saved" ? `${cfg.gap} ${cfg.padding}` : ""
                }`}
              >
                <motion.div layout className={cn(getCheckColor())}>
                  <BsCheckCircleFill className={`${cfg.icon} z-20`} />
                </motion.div>

                <AnimatePresence mode="popLayout">
                  {status === "saved" && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`font-bold tracking-tight whitespace-nowrap ${cfg.text} text-muted-foreground z-20`}
                    >
                      {savedText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </MotionConfig>
    </div>
  );
};
