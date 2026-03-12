import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    if (!revealed) return;

    setTimerActive(true);

    const timer = setTimeout(() => {
      if (!copied) resetAll();
    }, revealDuration);

    return () => clearTimeout(timer);
  }, [revealed, copied, revealDuration]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      resetAll();
    }, copiedDuration);

    return () => clearTimeout(timer);
  }, [copied, copiedDuration]);

  const resetAll = () => {
    setRevealed(false);
    setCopied(false);
    setTimerActive(false);
  };

  const handleCopy = async () => {
    if (copied) return;

    await navigator.clipboard.writeText(cardNumber);

    setCopied(true);
    setTimerActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-white transition-colors duration-500 dark:bg-zinc-950">
      <div className="flex h-[70px] min-w-[420px] items-center rounded-[20px] border-2 border-[#E5E4ED] bg-white px-2 shadow-sm transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-900">
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
                className="pointer-events-none absolute inset-y-0 z-30 w-[60%] mix-blend-overlay dark:mix-blend-screen"
                style={{
                  transform: "skewX(-20deg)",
                  background: `
                    linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(255,255,255,0.15) 20%,
                      rgba(255,255,255,0.9) 50%,
                      rgba(255,255,255,0.15) 80%,
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
                        className="text-[#282828] tabular-nums dark:text-zinc-100"
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
                className="flex h-full w-full items-center justify-center rounded-2xl bg-[#E4E4FF] text-[#4E53CA] dark:bg-indigo-900/30 dark:text-indigo-400"
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
                className={`relative flex h-full w-full items-center justify-center rounded-2xl transition-colors duration-300 ${
                  copied
                    ? "bg-[#2DBE50] text-white"
                    : "bg-[#CAF9D5] text-[#2DBE50] dark:bg-emerald-900/30 dark:text-emerald-400"
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
                      rx="14"
                      ry="14"
                      fill="transparent"
                      stroke="currentColor"
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
