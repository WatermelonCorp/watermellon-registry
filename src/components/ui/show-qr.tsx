"use client";

import React, { useEffect, useState } from "react";
import { HiQrCode } from "react-icons/hi2";
import { ImLink } from "react-icons/im";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeWidgetProps {
  value: string;
  buttonLabel?: string;
  onCopy?: () => void;
}

export const ShowQR: React.FC<QRCodeWidgetProps> = ({
  value,
  buttonLabel = "Show QR Code",
  onCopy,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const t = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isCopied]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    onCopy?.();
  };

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="relative flex items-center justify-center p-4">
        <AnimatePresence mode="popLayout">
          {/* COLLAPSED */}
          {!isOpen ? (
            <motion.button
              key="collapsed"
              layoutId="qr-container"
              onClick={() => setIsOpen(true)}
              className="
                flex items-center gap-3 px-6 py-4 rounded-[2rem]
                bg-[#F6F5FA] hover:bg-[#EBEAEE]
                dark:bg-[#1C1C1E] dark:hover:bg-[#262628]
                text-[#18181B] dark:text-white
                shadow-sm tracking-tight
              "
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <motion.div layoutId="qr-icon-container">
                <HiQrCode size={34} />
              </motion.div>
              <motion.span layoutId="qr-label" className="text-xl font-bold">
                {buttonLabel}
              </motion.span>
            </motion.button>
          ) : (
            /* EXPANDED */
            <motion.div
              key="expanded"
              layoutId="qr-container"
              className="
                w-[360px] rounded-[2.7rem] p-4
                bg-[#F1F0F7]
                dark:bg-[#1C1C1E]
                flex flex-col gap-3
              "
            >
              {/* QR */}
              <div
                className="
                  bg-white dark:bg-[#0B0B0E]
                  border-2 border-[#EDECF3] dark:border-white/10
                  rounded-[2.5rem] p-6 aspect-square
                  flex items-center justify-center
                "
              >
                <QRCodeSVG
                  value={value}
                  size={220}
                  level="H"
                  fgColor="currentColor"
                  bgColor="transparent"
                  className="text-black dark:text-white"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleCopy}
                  className="
                    flex-1 rounded-full py-4 px-6
                    bg-white dark:bg-[#0B0B0E]
                    border-2 border-[#EDECF3] dark:border-white/10
                    shadow-sm
                    flex items-center justify-center gap-3
                    active:scale-[0.98]
                  "
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isCopied ? "copied" : "copy"}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      className="flex items-center gap-3 text-[#2F2F2F] dark:text-white"
                    >
                      <ImLink size={24} />
                      <span className="font-bold text-[20px]">
                        {isCopied ? "Copied Link" : "Copy Link"}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="
                    rounded-full p-4
                    bg-white dark:bg-[#0B0B0E]
                    border-2 border-[#EDECF3] dark:border-white/10
                    shadow-sm
                    text-[#2F2F2F] dark:text-white
                    active:scale-90
                  "
                >
                  <X size={24} strokeWidth={3} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
