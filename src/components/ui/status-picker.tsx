import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MoreHorizontal, Sun, Moon } from 'lucide-react';
import { LuCircleDotDashed } from 'react-icons/lu';

export interface StatusOption {
  id: string;
  emoji: string;
  label: string;
}

interface SetStatusProps {
  options: StatusOption[];
}

export const StatusPicker: React.FC<SetStatusProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusOption | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const handleSelect = (status: StatusOption) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStatus(null);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FEFEFE] dark:bg-[#0F0F12] flex items-center justify-center relative">

        {/*  Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#F4F4F9] dark:bg-[#1C1C22] flex items-center justify-center shadow-sm"
          title="Toggle theme"
        >
          {isDark ? <Sun size={18} className='text-[#F4F4F5]' /> : <Moon size={18} />}
        </button>

        <div className="relative flex flex-col items-center justify-center">

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute bottom-full mb-4 z-50 p-2.5 py-2.5 rounded-[40px] border-2 border-[#F3F3F3] dark:border-[#2A2A33] bg-white dark:bg-[#14141A] shadow-xs flex items-center gap-2"
              >
                {options.map((option) => (
                  <div key={option.id} className="relative group">
                    <AnimatePresence>
                      {hoveredId === option.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                          className="absolute bottom-[70px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap"
                        >
                          <div className="bg-[#F4F4F9] dark:bg-[#1C1C22] text-[#5D5C61] dark:text-[#E5E7EB] px-[18px] py-3 rounded-full text-[18px] font-bold">
                            {option.label}
                          </div>
                          <div className="flex flex-col items-center -mt-0.75">
                            <div className="w-3 h-3 bg-[#F4F4F9] dark:bg-[#1C1C22] rounded-full mb-1 ml-[-48px]" />
                            <div className="w-2 h-2 bg-[#F4F4F9] dark:bg-[#1C1C22] rounded-full ml-[-68px]" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onMouseEnter={() => setHoveredId(option.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleSelect(option)}
                      className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#F4F4F9] dark:bg-[#1C1C22] hover:bg-[#E8E8F0] dark:hover:bg-[#2A2A33] transition-colors text-2xl"
                    >
                      {option.emoji}
                    </button>
                  </div>
                ))}

                <button
                  title="more"
                  className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#F4F4F9] dark:bg-[#1C1C22] hover:bg-[#E8E8F0] dark:hover:bg-[#2A2A33] transition-colors text-[#AFAEB7]"
                >
                  <MoreHorizontal size={30} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            layout
            onClick={() => !selectedStatus && setIsOpen(!isOpen)}
            className="group relative flex items-center gap-2.5 px-6 py-4 bg-[#F4F4F9] dark:bg-[#1C1C22] border-2 border-[#F5F5FA] dark:border-[#2A2A33] rounded-full shadow-sm transition-all duration-300 min-w-[160px] justify-center active:scale-95"
          >
            <AnimatePresence mode="popLayout">
              {!selectedStatus ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.9 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(6px)', scale: 0.9 }}
                  className="flex items-center gap-2.5"
                >
                  <LuCircleDotDashed size={28} strokeWidth={2.5} className="text-[#B5B4BC] group-hover:rotate-45 transition-transform duration-500" />
                  <span className="font-bold tracking-normal text-xl text-[#232328] dark:text-[#F4F4F5]">
                    Set Status
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.9 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(6px)', scale: 0.9 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="text-2xl">{selectedStatus.emoji}</span>
                  <span className="font-bold tracking-normal text-xl text-[#232328] dark:text-[#F4F4F5]">
                    {selectedStatus.label}
                  </span>
                  <button
                    title="close"
                    onClick={handleClear}
                    className="ml-1 p-1 bg-[#D6D5E1] dark:bg-[#2A2A33] rounded-full transition-colors"
                  >
                    <X size={16} strokeWidth={4} className="text-[#f4f2f2]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
};