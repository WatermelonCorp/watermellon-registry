"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
      requestAnimationFrame(() => {
        if (initialData.communityName) setCommunityName(initialData.communityName);
        if (initialData.pricing) setPricing(initialData.pricing);
        if (initialData.isApplicationRequired !== undefined) setIsApplicationRequired(initialData.isApplicationRequired);
      });
    }
  }, [initialData]);

  const pricingOptions = ['FREE', 'ONE-TIME', 'MONTHLY'];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="theme-injected font-sans fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden">

          {/* BG Overlay Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-background/70 backdrop-blur-sm"
          >
            {/* Glow Effects */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-72 bg-primary/10 blur-[80px] rotate-[-15deg] rounded-full"
            />
            <div className="absolute inset-0 bg-background/60" />
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
            className="relative w-full max-w-135 backdrop-blur-2xl rounded-2xl p-6 sm:p-7 shadow-2xl z-50 my-auto
                       bg-card border-4 sm:border-8 border-border"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">Create community</h2>
                <p className="text-sm mt-3 sm:mt-4 leading-relaxed max-w-full text-muted-foreground">
                  Enter your community name and choose how people can join. You can make it free, charge a fee, or require an application.
                </p>
              </div>
              <button title='close'
                onClick={onClose}
                className="transition-colors p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm ml-1 text-muted-foreground">Community name</label>
                <div className="relative group">
                  <input title='name'
                    type="text"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                    className="w-full rounded-xl mt-3 px-5 py-3 outline-none transition-all
                             bg-background border border-input text-foreground focus:border-ring"
                  />
                </div>
              </div>

              {/* Pricing Tabs */}
              <div className="space-y-2">
                <label className="text-sm ml-1 text-muted-foreground">Pricing & Access</label>
                <div className="grid grid-cols-3 mt-2.5 rounded-full p-1 relative
                              bg-muted border border-border">
                  {pricingOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setPricing(option)}
                      className={`relative z-10 py-3 text-xs font-normal tracking-widest transition-colors duration-300 ${pricing === option
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                        }`}
                    >
                      {option}
                      {pricing === option && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full -z-10
                                   bg-card border border-border shadow-sm"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Section */}
              <div className="flex items-center justify-between rounded-xl px-4 py-4
                            bg-background border border-border">
                <div className="flex items-center gap-2">
                  <span className="text-base text-muted-foreground">Application required</span>
                  <Info size={16} className="cursor-help text-muted-foreground" />
                </div>
                <button title='switch'
                  onClick={() => setIsApplicationRequired(!isApplicationRequired)}
                  className={`w-10 h-6 rounded-full transition-colors duration-300 relative ${isApplicationRequired
                    ? 'bg-primary'
                    : 'bg-muted'
                    }`}
                >
                  <motion.div
                    animate={{ x: isApplicationRequired ? 19 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 w-5 h-5 rounded-full transition-colors ${isApplicationRequired
                      ? 'bg-primary-foreground'
                      : 'bg-card'
                      }`}
                  />
                </button>
              </div>

              <p className="text-center text-sm pt-2 text-muted-foreground">
                By creating a community, you agree to Payper's{' '}
                <span className="underline cursor-pointer text-foreground">Community Guidelines</span>
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-8 sm:mt-10">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-medium transition-colors
                         border border-border text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => onCreate({ communityName, pricing, isApplicationRequired })}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-bold transition-all active:scale-95
                         bg-primary text-primary-foreground hover:bg-primary/90"
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