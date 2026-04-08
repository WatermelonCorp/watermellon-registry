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
    <div className="theme-injected border-border bg-card w-[380px] rounded-lg border-[1.6px] p-4 shadow-xl transition-colors">
      <div className="border-border bg-muted relative mb-4 flex rounded-lg border px-2 py-2">
        <motion.div
          layout
          transition={SPRING}
          className="border-border bg-card absolute inset-y-1 my-[0.5px] w-[48%] rounded-lg border shadow-sm"
          animate={{ x: billing === 'monthly' ? '0%' : '100%' }}
        />
        {(['monthly', 'yearly'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setBilling(t)}
            className="text-foreground relative z-10 w-1/2 py-1 text-base font-bold transition-colors focus:outline-none"
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
              className="border-border bg-card relative flex h-[82px] w-full items-center justify-between rounded-lg border-[1.6px] px-4 text-left transition-all focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="active-border"
                  transition={SPRING}
                  className="border-foreground pointer-events-none absolute inset-0 z-20 rounded-lg border-[2.5px]"
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-[18px] font-bold transition-colors">
                    {item.title}
                  </span>
                  {item.popular && (
                    <span className="bg-accent text-accent-foreground rounded-lg px-2.5 py-0.5 text-[14px] font-bold">
                      Popular
                    </span>
                  )}
                </div>
                <motion.p className="text-foreground flex items-center gap-1 text-sm font-bold transition-colors">
                  <NumberFlow
                    value={item.price}
                    format={{ style: 'currency', currency: 'USD' }}
                  />
                  <motion.span
                    layout
                    className="text-muted-foreground font-semibold"
                  >
                    {' '}
                    / month
                  </motion.span>
                </motion.p>
              </div>

              <div className="border-border relative z-10 flex size-6 items-center justify-center overflow-hidden rounded-lg border-2">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={SPRING}
                      className="bg-foreground flex size-full items-center justify-center"
                    >
                      <Check className="text-background size-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      <button className="bg-primary text-primary-foreground mt-5 w-full rounded-lg py-3 font-semibold transition-all hover:opacity-90">
        Get Started
      </button>
    </div>
  );
};
