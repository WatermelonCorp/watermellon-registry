import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaCopy } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

type RevealAndCopyProps = {
  cardNumber: string;
  hiddenIndexes?: number[];
  revealDuration?: number;
  copiedDuration?: number;
};

export const RevealAndCopy = ({
  cardNumber,
  hiddenIndexes = [1, 2],
  revealDuration = 3000,
  copiedDuration = 1200,
}: RevealAndCopyProps) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const parts = cardNumber.split(" ");

  const resetAll = useCallback(() => {
    setRevealed(false);
    setCopied(false);
    setTimerActive(false);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimerActive(true);

    const timer = setTimeout(() => {
      if (!copied) resetAll();
    }, revealDuration);

    return () => clearTimeout(timer);
  }, [revealed, copied, revealDuration, resetAll]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      resetAll();
    }, copiedDuration);

    return () => clearTimeout(timer);
  }, [copied, copiedDuration, resetAll]);

  const handleCopy = async () => {
    if (copied) return;

    await navigator.clipboard.writeText(cardNumber);

    setCopied(true);
    setTimerActive(false);
  };

  return (
    <div className="theme-injected  flex flex-col items-center justify-center gap-8 transition-colors duration-500">
      <div className="border-border bg-background  flex h-[70px] min-w-[420px] items-center rounded-lg border-2 px-2 shadow-sm transition-colors duration-500">
        <div className="relative flex flex-1 gap-0 overflow-hidden text-[22px] tracking-[0.18em]">
          <AnimatePresence>
            {revealed && (
              <motion.div
                key="shine"
                initial={{ left: "-60%" }}
                animate={{ left: "160%" }}
                transition={{
                  delay: 0.35,
                  duration: 1,
                  ease: "linear",
                }}
                className="pointer-events-none absolute inset-y-0 z-30 w-[60%] mix-blend-overlay"
                style={{
                  transform: "skewX(-20deg)",
                  background: `
                    linear-gradient(
                      90deg,
                      transparent 0%,
                      oklch(var(--background) / 0.15) 20%,
                      oklch(var(--background) / 0.9) 50%,
                      oklch(var(--background) / 0.15) 80%,
                      transparent 100%
                    )
                  `,
                  filter: "blur(6px)",
                }}
              />
            )}
          </AnimatePresence>

          {parts.map((part, idx) => {
            const isMasked = !revealed && hiddenIndexes.includes(idx);
            const display = isMasked ? "xxxx" : part;

            return (
              <div
                key={idx}
                className="relative flex w-[85px] justify-center overflow-hidden font-bold"
              >
                <div className="relative flex items-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {display.split("").map((char, i) => (
                      <motion.span
                        key={`${display}-${i}`}
                        initial={{
                          opacity: 0,
                          y: 12,
                          scale: 0.5,
                          filter: "blur(4px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 14,
                            delay: i * 0.06,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -12,
                          scale: 0.5,
                          filter: "blur(4px)",
                          transition: {
                            delay: i * 0.06,
                            duration: 0.18,
                          },
                        }}
                        className="text-foreground tabular-nums"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative ml-4 h-12 w-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {!revealed && (
              <motion.button
                key="eye"
                onClick={() => setRevealed(true)}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="bg-muted text-foreground flex h-full w-full items-center justify-center rounded-lg"
              >
                <BsEyeFill size={22} />
              </motion.button>
            )}

            {revealed && (
              <motion.button
                key="copy"
                onClick={handleCopy}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className={`relative flex h-full w-full items-center justify-center rounded-lg transition-colors duration-300 ${
                  copied
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {timerActive && !copied && (
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 48 48"
                  >
                    <motion.rect
                      x="1.5"
                      y="1.5"
                      width="45"
                      height="45"
                      rx="var(--radius)"
                      ry="var(--radius)"
                      fill="transparent"
                      className="stroke-secondary-foreground"
                      strokeWidth="3"
                      strokeDasharray="180"
                      initial={{ strokeDashoffset: 180 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: revealDuration / 1000,
                        ease: "linear",
                      }}
                    />
                  </svg>
                )}

                {copied ? <FaCheck size={22} /> : <FaCopy size={22} />}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
