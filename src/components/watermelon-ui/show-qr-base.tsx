"use client";

import { X, Link } from "lucide-react";
import { IoQrCodeOutline } from "react-icons/io5";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from "motion/react";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import useMeasure from "react-use-measure";

interface ShowQrProps {
  value: string;
  buttonLabel?: string;
  onCopy?: () => void;
}

export const ShowQr = ({
  value,
  buttonLabel = "Show QR Code",
  onCopy,
}: ShowQrProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [ref, bounds] = useMeasure();

  useEffect(() => {
    if (isCopied) {
      const t = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isCopied]);

  const springConfig: Transition = {
    type: "spring",
    bounce: 0.25,
    visualDuration: 0.35,
  };

  const collapsedTransition: Transition = {
    type: "spring",
    bounce: 0.15,
    visualDuration: 0.35,
  };

  return (
    <div className="theme-injected  flex w-full h-[500px] items-center justify-center overflow-hidden transition-colors">
      <MotionConfig
        transition={isExpanded ? springConfig : collapsedTransition}
      >
        <motion.div
          initial={{
            width: 170,
          }}
          animate={{
            width: isExpanded ? 250 : 170,
            height: isExpanded ? bounds.height : 48,
          }}
          className="bg-muted overflow-hidden rounded-lg"
        >
          <div ref={ref} className="">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  className="text-foreground flex cursor-pointer items-center justify-center gap-1 px-4 py-3 font-medium"
                  onClick={() => setIsExpanded(true)}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                >
                  <IoQrCodeOutline className="size-6" />
                  <span>{buttonLabel}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  className="text-foreground flex flex-col items-center gap-2 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                >
                  <motion.div
                    className="border-border bg-background flex h-[220px] w-[220px] items-center justify-center rounded-lg border p-4"
                    initial={{ opacity: 0, y: 60, scale: 1.2 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                  >
                    <QRCodeSVG
                      value={value}
                      size={200}
                      level="H"
                      fgColor="currentColor"
                      bgColor="transparent"
                      className="text-foreground h-full w-full"
                    />
                  </motion.div>

                  <div className="flex w-full items-center gap-2">
                    <motion.div
                      className="border-border bg-background flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg border p-2 text-lg font-medium"
                      onClick={() => {
                        navigator.clipboard.writeText(value);
                        setIsCopied(true);
                        onCopy?.();
                      }}
                      layout
                    >
                      <motion.div layout>
                        <Link />
                      </motion.div>
                      <AnimatedText
                        from="Copy"
                        to="Copied"
                        isCopied={isCopied}
                      />
                      <motion.span layout>Link</motion.span>
                    </motion.div>

                    <div
                      className="border-border bg-background flex cursor-pointer items-center justify-center rounded-lg border p-2"
                      onClick={() => {
                        setIsExpanded(false);
                        setIsCopied(false);
                      }}
                    >
                      <X />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

const AnimatedText = ({
  from,
  to,
  isCopied,
}: {
  from: string;
  to: string;
  isCopied: boolean;
}) => {
  const activeText = isCopied ? to : from;

  return (
    <div className="flex text-lg tracking-tight will-change-transform">
      <AnimatePresence mode="popLayout" initial={false}>
        {activeText.split("").map((char, index) => {
          const displayChar = char === " " ? "\u00A0" : char;

          return (
            <motion.span
              key={char + index}
              layout
              initial={{ opacity: 0, y: 5, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.03 * index,
                },
              }}
              exit={{ opacity: 0, y: -5, scale: 0.7 }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
