"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Check } from "lucide-react";

/* --- Types & Props --- */
export type BillingCycle = "monthly" | "yearly";

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  popular: boolean;
}

interface PricingWidgetProps {
  initialBilling?: BillingCycle;
  initialActivePlanId?: string;
  plansData?: Record<BillingCycle, PricingPlan[]>;
}

interface AnimatedNumberProps {
  value: string;
}

/* --- Constants --- */
const SPRING: Transition = {
  stiffness: 260,
  damping: 22,
  mass: 0.45,
};

const DEFAULT_DATA: Record<BillingCycle, PricingPlan[]> = {
  monthly: [
    { id: "free", title: "Free", price: "0.00", popular: false },
    { id: "starter", title: "Starter", price: "9.99", popular: true },
    { id: "pro", title: "Pro", price: "19.99", popular: false },
  ],
  yearly: [
    { id: "free", title: "Free", price: "0.00", popular: false },
    { id: "starter", title: "Starter", price: "7.49", popular: true },
    { id: "pro", title: "Pro", price: "17.49", popular: false },
  ],
};

/* --- Animated Number Sub-component --- */
const AnimatedNumber: FC<AnimatedNumberProps> = ({ value }) => {
  const digits = value.split("");
  return (
    <span className="inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout">
        {digits.map((digit, index) => (
          <motion.span
            key={digit + index}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={SPRING}
            className={`relative inline-block tabular-nums text-base font-bold dark:text-zinc-100 text-[#040404]`}
          >
            {digit}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
};

/* --- Main Component --- */
export const PricingWidget: FC<PricingWidgetProps> = ({
  initialBilling = "monthly",
  initialActivePlanId = "starter",
  plansData = DEFAULT_DATA,
}) => {
  const [billing, setBilling] = useState<BillingCycle>(initialBilling);
  const [active, setActive] = useState<string>(initialActivePlanId);


  return (
    <div className="min-h-screen flex flex-col items-center w-full justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      

      {/* CARD CONTAINER */}
      <div className="w-[380px] rounded-[32px] shadow-xl border-[1.6px] border-[#E5E5E9] dark:border-zinc-800 p-[16px] bg-[#FEFEFE] dark:bg-zinc-900 transition-colors">

        {/* TOGGLE (Monthly/Yearly) */}
        <div className="relative mb-[16px] flex rounded-full bg-[#F4F4FB] dark:bg-zinc-800 px-[8px] py-[8px] border border-[#f4f4fbdc] dark:border-zinc-700">
          <motion.div
            layout
            transition={SPRING}
            className="absolute inset-y-[4px] w-[48%] rounded-full bg-[#FEFEFE] dark:bg-zinc-700 shadow-sm border border-[#fefefed9] dark:border-zinc-600 my-[0.5px]"
            animate={{ x: billing === "monthly" ? "0%" : "100%" }}
          />
          {(["monthly", "yearly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setBilling(t)}
              className="relative z-10 w-1/2 py-[6px] text-base font-bold text-black dark:text-zinc-200 transition-colors focus:outline-none"
            >
              {t === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>

        {/* PLANS */}
        <div className="space-y-[12px]">
          {plansData[billing].map((item) => {
            const isActive = active === item.id;
            return (
              <motion.button
                layout
                key={item.id}
                onClick={() => setActive(item.id)}
                className="relative flex h-[82px] w-full items-center justify-between rounded-[24px] border-[1.6px] border-[#E5E5E9] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-[16px] text-left transition-all focus:outline-none"
              >
                {/* ACTIVE BORDER */}
                {isActive && (
                  <motion.div
                    layoutId="active-border"
                    transition={SPRING}
                    className="absolute inset-0 rounded-[24px] border-[2.5px] border-black dark:border-white pointer-events-none"
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[18px] font-bold dark:text-white transition-colors">
                      {item.title}
                    </span>
                    {item.popular && (
                      <span className="rounded-[8px] bg-[#F3EDB4] text-[#49411A] px-[10px] py-[2px] text-[14px] font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#040404] dark:text-zinc-400 font-bold transition-colors">
                    $<AnimatedNumber value={item.price} />
                    <span className="text-[#858489] font-semibold"> / month</span>
                  </p>
                </div>

                {/* CHECK ICON */}
                <div className="relative z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full border-[1.6px] border-[#E5E5E9] dark:border-zinc-700">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
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

        {/* CTA */}
        <button className="mt-[20px] w-full rounded-full bg-[#020203] dark:bg-white dark:text-black hover:opacity-90 py-[12px] text-[#F7F7F9] font-semibold transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};