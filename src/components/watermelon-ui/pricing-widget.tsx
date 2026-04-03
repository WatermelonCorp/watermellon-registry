'use client';

import { useState, type FC } from 'react';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { Check } from 'lucide-react';
import NumberFlow from '@number-flow/react';

export type BillingCycle = 'monthly' | 'yearly';

export interface PricingPlan {
  id: string;
  title: string;
  price: number;
  popular: boolean;
}

interface PricingWidgetProps {
  initialBilling?: BillingCycle;
  initialActivePlanId?: string;
  plansData?: Record<BillingCycle, PricingPlan[]>;
}

const SPRING: Transition = {
  stiffness: 260,
  damping: 22,
};

const DEFAULT_DATA: Record<BillingCycle, PricingPlan[]> = {
  monthly: [
    { id: 'free', title: 'Free', price: 0.0, popular: false },
    { id: 'starter', title: 'Starter', price: 9.99, popular: true },
    { id: 'pro', title: 'Pro', price: 19.99, popular: false },
  ],
  yearly: [
    { id: 'free', title: 'Free', price: 0.0, popular: false },
    { id: 'starter', title: 'Starter', price: 7.49, popular: true },
    { id: 'pro', title: 'Pro', price: 17.49, popular: false },
  ],
};

export const PricingWidget: FC<PricingWidgetProps> = ({
  initialBilling = 'monthly',
  initialActivePlanId = 'starter',
  plansData = DEFAULT_DATA,
}) => {
  const [billing, setBilling] = useState<BillingCycle>(initialBilling);
  const [active, setActive] = useState<string>(initialActivePlanId);

  return (
    <div className="w-[380px] rounded-[32px] border-[1.6px] border-[#E5E5E9] bg-[#FEFEFE] p-4 shadow-xl transition-colors dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative mb-4 flex rounded-full border border-[#f4f4fbdc] bg-[#F4F4FB] px-2 py-2 dark:border-zinc-700 dark:bg-zinc-800">
        <motion.div
          layout
          transition={SPRING}
          className="absolute inset-y-1 my-[0.5px] w-[48%] rounded-full border border-[#fefefed9] bg-[#FEFEFE] shadow-sm dark:border-zinc-600 dark:bg-zinc-700"
          animate={{ x: billing === 'monthly' ? '0%' : '100%' }}
        />
        {(['monthly', 'yearly'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setBilling(t)}
            className="relative z-10 w-1/2 py-1 text-base font-bold text-black transition-colors focus:outline-none dark:text-zinc-200"
          >
            {t === 'monthly' ? 'Monthly' : 'Yearly'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {plansData[billing].map((item) => {
          const isActive = active === item.id;
          return (
            <motion.button
              layout
              key={item.id}
              onClick={() => setActive(item.id)}
              className="relative flex h-[82px] w-full items-center justify-between rounded-[24px] border-[1.6px] border-[#E5E5E9] bg-white px-4 text-left transition-all focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
            >
              {isActive && (
                <motion.div
                  layoutId="active-border"
                  transition={SPRING}
                  className="pointer-events-none absolute inset-0 z-20 rounded-[24px] border-[2.5px] border-black dark:border-white"
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold transition-colors dark:text-white">
                    {item.title}
                  </span>
                  {item.popular && (
                    <span className="rounded-xl bg-[#F3EDB4] px-2.5 py-0.5 text-[14px] font-bold text-[#49411A]">
                      Popular
                    </span>
                  )}
                </div>
                <motion.p className="flex items-center gap-1 text-sm font-bold text-[#040404] transition-colors dark:text-zinc-400">
                  <NumberFlow
                    value={item.price}
                    format={{ style: 'currency', currency: 'USD' }}
                  />
                  <motion.span layout className="font-semibold text-[#858489]">
                    {' '}
                    / month
                  </motion.span>
                </motion.p>
              </div>

              <div className="relative z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[1.6px] border-[#E5E5E9] dark:border-zinc-700">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={SPRING}
                      className="flex h-full w-full items-center justify-center rounded-full bg-black dark:bg-white"
                    >
                      <Check size={14} className="text-white dark:text-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      <button className="mt-5 w-full rounded-full bg-[#020203] py-3 font-semibold text-[#F7F7F9] transition-all hover:opacity-90 dark:bg-white dark:text-black">
        Get Started
      </button>
    </div>
  );
};
