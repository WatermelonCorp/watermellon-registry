import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { RiBubbleChartFill } from 'react-icons/ri';

interface SwitchDisclosureProps {
  title?: string;
  subOptionLabel?: string;
  defaultEnabled?: boolean;
  defaultSubOptionChecked?: boolean;
  onToggleChange?: (enabled: boolean) => void;
  onSubOptionChange?: (checked: boolean) => void;
}

export const SwitchDisclosure: React.FC<SwitchDisclosureProps> = ({
  title = "Predictive Completion",
  subOptionLabel = "Enable Inline Suggestions",
  defaultEnabled = false,
  defaultSubOptionChecked = false,
  onToggleChange,
  onSubOptionChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isSubOptionChecked, setIsSubOptionChecked] = useState(defaultSubOptionChecked);

  const springConfig = { type: "spring", stiffness: 500, damping: 40, mass: 1 } as const;

  const handleToggle = () => {
    const next = !isEnabled;
    setIsEnabled(next);
    onToggleChange?.(next);
  };

  const handleSubOptionToggle = () => {
    const next = !isSubOptionChecked;
    setIsSubOptionChecked(next);
    onSubOptionChange?.(next);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcfcfc] p-4">
      <motion.div
        layout
        initial={false}
        transition={springConfig}
        className={`w-full max-w-[340px] bg-white  rounded-[26px] p-[5px] overflow-hidden transition-colors duration-300 ${
          isEnabled ? 'border-2 border-[#EBEBF0] shadow-sm' : 'border-0 shadow-none'
        }`}
      >
        {/* Main Row */}
        <div 
          className="flex items-center justify-between p-3 cursor-pointer rounded-[26px] shadow-sm bg-[#F6F5FA]"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full transition-colors text-[#ADACB8]`}>
              <RiBubbleChartFill size={24} />
            </div>
            <span className="text-lg font-bold text-[#28272A] tracking-tight">
              {title}
            </span>
          </div>

          {/* Toggle Switch */}
          <div 
            className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${
              isEnabled ? 'bg-[#EE2563]' : 'bg-gray-200'
            }`}
          >
            <motion.div
              layout
              transition={springConfig}
              className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
              animate={{ x: isEnabled ? 20 : 0 }}
            />
          </div>
        </div>

        {/* Disclosure Section */}
        <AnimatePresence>
          {isEnabled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springConfig}
              className="overflow-hidden mt-1"
            >
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-4 flex items-center gap-3 group cursor-pointer"
                onClick={handleSubOptionToggle}
              >
                {/* Custom Checkbox */}
                <div 
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isSubOptionChecked 
                      ? 'bg-[#28272A] border-[#28272A]' 
                      : ' border-[#EBEBF0] bg-white group-hover:border-gray-300'
                  }`}
                >
                  <AnimatePresence>
                    {isSubOptionChecked && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        whileTap={{ scale: 1.01 }}
                      >
                        <Check size={14} className="text-white" strokeWidth={4} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <span className="text-[#6C6B72] text-[17px] font-semibold transition-colors group-hover:text-gray-800">
                  {subOptionLabel}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
