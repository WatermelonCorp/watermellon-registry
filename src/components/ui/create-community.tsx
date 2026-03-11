"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

interface CommunityData {
  communityName: string;
  pricing: string;
  isApplicationRequired: boolean;
}

interface CreateCommunityProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CommunityData) => void;
  initialData?: Partial<CommunityData>;
}

export const CreateCommunity: React.FC<CreateCommunityProps> = ({ 
  isOpen, 
  onClose, 
  onCreate,
  initialData 
}) => {
  const [communityName, setCommunityName] = useState(initialData?.communityName || 'Clipping Course');
  const [pricing, setPricing] = useState(initialData?.pricing || 'FREE');
  const [isApplicationRequired, setIsApplicationRequired] = useState(initialData?.isApplicationRequired || false);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (initialData.communityName) setCommunityName(initialData.communityName);
      if (initialData.pricing) setPricing(initialData.pricing);
      if (initialData.isApplicationRequired !== undefined) setIsApplicationRequired(initialData.isApplicationRequired);
    }
  }, [initialData]);

  const pricingOptions = ['FREE', 'ONE-TIME', 'MONTHLY'];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
          
          {/* BG Overlay Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-[#0a0a0a] dark:backdrop-blur-none"
          >
            {/* Glow Effects */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-75 bg-white/30 blur-[80px] rotate-[-15deg] hidden dark:block"
              style={{ borderRadius: '50%' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_80%)] hidden dark:block" />
          </motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.4 } 
            }}
            className="relative w-full max-w-135 backdrop-blur-2xl rounded-4xl p-5 sm:p-6 shadow-2xl z-50 my-auto
                       bg-white border-[6px] sm:border-12 border-[#F2F2F2]
                       dark:bg-[#131313]/80 dark:border-[#232323]"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-gray-900 dark:text-white">Create community</h2>
                <p className="text-[13px] sm:text-[14px] mt-3 sm:mt-4 leading-relaxed max-w-full text-gray-500 dark:text-[#696969]">
                  Enter your community name and choose how people can join. You can make it free, charge a fee, or require an application.
                </p>
              </div>
              <button title='close'
                onClick={onClose}
                className="transition-colors p-1 text-gray-400 hover:text-gray-600 dark:text-[#888888] dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[14px] ml-1 text-gray-500 dark:text-[#8A8A8A]">Community name</label>
                <div className="relative group">
                  <input title='name'
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    className="w-full rounded-[18px] mt-2.5 px-5 py-3.5 outline-none transition-all
                             bg-gray-50 border border-gray-200 text-gray-900 focus:border-gray-300
                             dark:bg-[#1c1c1c]/50 dark:border-white/10 dark:text-white dark:focus:border-[#EDEDED]/60"
                  />
                </div>
              </div>

              {/* Pricing Tabs */}
              <div className="space-y-2">
                 <label className="text-[14px] ml-1 text-gray-500 dark:text-[#8A8A8A]">Pricing & Access</label>
                <div className="grid grid-cols-3 mt-2.5 rounded-full p-1 relative
                              bg-gray-100 border border-gray-200
                              dark:bg-[#0A0A0A] dark:border-white/5">
                  {pricingOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setPricing(option)}
                      className={`relative z-10 py-3.5 text-[11px] sm:text-[12px] font-normal tracking-widest transition-colors duration-300 ${
                        pricing === option 
                        ? 'text-gray-900 dark:text-[#EDEDED]' 
                        : 'text-gray-400 dark:text-[#EDEDED]/80'
                      }`}
                    >
                      {option}
                      {pricing === option && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full -z-10
                                   bg-white border border-gray-200 shadow-sm
                                   dark:bg-[#272727] dark:border-white/10"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Section */}
              <div className="flex items-center justify-between rounded-[18px] px-4 py-4
                            bg-gray-50 border border-gray-200
                            dark:bg-[#1C1C1C] dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] sm:text-[16px] text-gray-500 dark:text-[#BCBCBC]">Application required</span>
                  <Info size={16} className="cursor-help text-gray-400 dark:text-[#666666]" />
                </div>
                <button title='switch'
                  onClick={() => setIsApplicationRequired(!isApplicationRequired)}
                  className={`w-10 h-6 rounded-full transition-colors duration-300 relative ${
                    isApplicationRequired 
                    ? 'bg-black dark:bg-white/80' 
                    : 'bg-gray-200 dark:bg-[#333333]'
                  }`}
                >
                  <motion.div
                    animate={{ x: isApplicationRequired ? 19 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 w-5 h-5 rounded-full transition-colors ${
                      isApplicationRequired 
                      ? 'bg-white dark:bg-[#333333]' 
                      : 'bg-white'
                    }`}
                  />
                </button>
              </div>

              <p className="text-center text-[13px] sm:text-[14px] pt-2 text-gray-400 dark:text-[#666666]">
                By creating a community, you agree to Payper's{' '}
                <span className="underline cursor-pointer text-gray-500 dark:text-[#888888]">Community Guidelines</span>
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-8 sm:mt-10">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-[14px] font-medium transition-colors
                         border border-gray-200 text-gray-600 hover:bg-gray-50
                         dark:border-white/40 dark:text-white dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={() => onCreate({ communityName, pricing, isApplicationRequired })}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-[14px] font-bold transition-all active:scale-95
                         bg-black text-white hover:bg-gray-800
                         dark:bg-white dark:text-black dark:hover:bg-[#eeeeee]"
              >
                Create community
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};