import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';
import { HiQrCode } from 'react-icons/hi2';
import { ImLink } from "react-icons/im";
import { FaMoon, FaSun } from 'react-icons/fa6';

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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      onCopy?.();
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={isDark ? 'invert hue-rotate-180' : ''}>
      <div className="relative min-h-screen bg-white w-full flex flex-col items-center justify-center p-8 space-y-12">

        {/* Theme Toggle  */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center border bg-white shadow-sm"
          title="Toggle theme"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative flex items-center justify-center p-4">
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              <motion.button
                key="collapsed"
                layoutId="qr-container"
                onClick={toggleOpen}
                className="flex items-center justify-center gap-2.5 px-6 py-4 bg-[#F6F5FA] hover:bg-[#ebeaee] text-[#18181B] rounded-[2rem] transition-colors duration-200 cursor-pointer shadow-sm tracking-tight"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  layout: { duration: 0.4, type: "spring", bounce: 0.1 },
                  opacity: { duration: 0.2 }
                }}
              >
                <motion.div layoutId="qr-icon-container" className="text-[#27272B]">
                  <HiQrCode size={34} />
                </motion.div>
                <motion.span layoutId="qr-label" className="text-xl font-bold">
                  {buttonLabel}
                </motion.span>
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                layoutId="qr-container"
                className="w-[360px] bg-[#F1F0F7] rounded-[2.7rem] p-4 flex flex-col items-center gap-3 overflow-hidden"
                transition={{
                  layout: { duration: 0.4, type: "spring", bounce: 0.1 }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="bg-[#FEFEFE] p-6 rounded-[2.5rem] w-full aspect-square flex items-center justify-center border-2 border-[#EDECF3]"
                >
                  <QRCodeSVG
                    value={value}
                    size={220}
                    level="H"
                    fgColor="#030303"
                    className="w-full h-full"
                  />
                </motion.div>

                <div className="flex w-full gap-3 items-center">
                  <motion.button
                    onClick={handleCopy}
                    className="flex-1 bg-[#FEFEFE] hover:bg-gray-50 active:scale-[0.98] transition-all rounded-full py-4 px-6 flex items-center justify-center gap-2 shadow-sm border-2 border-[#EDECF3]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isCopied ? 'copied' : 'copy'}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex items-center gap-3 text-[#2F2F2F]"
                      >
                        <ImLink size={24} />
                        <span className="font-bold tracking-tight text-[20px]">
                          {isCopied ? 'Copied Link' : 'Copy Link'}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    onClick={toggleOpen}
                    className="bg-[#FEFEFE] hover:bg-gray-50 active:scale-90 transition-all rounded-full p-4 flex items-center justify-center shadow-sm border-2 border-[#EDECF3] text-[#2F2F2F]"
                  >
                    <X size={24} strokeWidth={3} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
