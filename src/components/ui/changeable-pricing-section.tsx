import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";

export type PlanId = string;

export interface Feature {
  text: string;
  hasInfo?: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  priceMonthly: string;
  priceYearly: string;
  badge?: string;
  featuresLabel?: string;
  features: Feature[];
}

export interface ChangeablePricingSectionProps {
  /** The main title of the section */
  title?: string;
  /** Array of pricing plans to display */
  plans: Plan[];
  /** Optional ID of the default selected plan */
  defaultPlanId?: PlanId;
  /** Default billing cycle */
  defaultBillingCycle?: "monthly" | "yearly";
  /** Custom label for monthly toggle */
  monthlyLabel?: string;
  /** Custom label for yearly toggle */
  yearlyLabel?: string;
  /** Footer text below plans */
  footerText?: string;
  /** CTA button text */
  buttonText?: string;
  /** Callback fired when continue button is clicked */
  onContinue?: (planId: PlanId, billingCycle: "monthly" | "yearly") => void;
}

export default function ChangeablePricingSection({
  title = "Select a plan",
  plans,
  defaultPlanId,
  defaultBillingCycle = "monthly",
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  footerText = "Cancel anytime. No long-term contract.",
  buttonText = "Continue",
  onContinue,
}: ChangeablePricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    defaultPlanId || (plans.length > 0 ? plans[0].id : ""),
  );
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    defaultBillingCycle,
  );

  return (
    <div className="flex items-center justify-center min-h-[600px] p-4 inter dark:bg-neutral-950">
      <div className="w-full max-w-[460px] bg-neutral-100 dark:bg-neutral-950 rounded-[24px] p-1.5 shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-800/50">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-4">
          <h2 className="text-[17px] font-medium text-neutral-800 dark:text-neutral-100 tracking-tighter">
            {title}
          </h2>
          <div className="flex items-center bg-neutral-200 dark:bg-neutral-950 p-1 rounded-full relative z-0 ring-1 ring-transparent dark:ring-neutral-600/50">
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-orange-500/15 rounded-full shadow-sm dark:shadow-none -z-10"
              animate={{
                x: billingCycle === "monthly" ? 0 : "100%",
              }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
              style={{ left: 4 }}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`jet w-[72px] py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors z-10 ${billingCycle === "monthly" ? "text-neutral-800 dark:text-orange-500" : "text-neutral-400 dark:text-neutral-500"}`}
            >
              {monthlyLabel}
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`jet w-[72px] py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors z-10 ${billingCycle === "yearly" ? "text-neutral-800 dark:text-orange-500" : "text-neutral-400 dark:text-neutral-500"}`}
            >
              {yearlyLabel}
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="flex flex-col gap-1">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                layout
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
                className={`relative overflow-hidden cursor-pointer rounded-[18px] transition-colors duration-300 bg-white dark:bg-neutral-800/50 ${
                  isSelected
                    ? "ring-[1px] ring-orange-500 dark:ring-orange-500 shadow-[0_4px_16px_rgba(249,115,22,0.06)] dark:shadow-none"
                    : "ring-1 ring-neutral-200/80 dark:ring-neutral-800 shadow-sm dark:shadow-none hover:ring-neutral-300 dark:hover:ring-neutral-700"
                }`}
              >
                <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                  {/* Top row */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                      {/* Radio button */}
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`w-[18px] h-[18px] rounded-full flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "border-orange-500 bg-orange-500"
                              : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-transparent"
                          }`}
                        >
                          {isSelected && (
                            <Check
                              size={11}
                              strokeWidth={3.5}
                              className="text-white"
                            />
                          )}
                        </div>
                      </div>

                      {/* Plan Info */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] font-medium text-neutral-800 dark:text-neutral-100 leading-none">
                            {plan.name}
                          </span>
                          {plan.badge && (
                            <span className="bg-green-100 dark:bg-green-500/10 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider leading-none">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-none">
                          {plan.description}
                        </span>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center justify-end text-[15px] sm:text-[16px] font-medium text-neutral-800 dark:text-neutral-100 leading-none overflow-hidden h-[18px]">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={billingCycle}
                            initial={{
                              y: billingCycle === "yearly" ? 20 : -20,
                              opacity: 0,
                              filter: "blur(4px)",
                            }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{
                              y: billingCycle === "monthly" ? -20 : 20,
                              opacity: 0,
                              filter: "blur(4px)",
                            }}
                            transition={{
                              type: "spring",
                              bounce: 0,
                              duration: 0.4,
                            }}
                            className="inline-block whitespace-nowrap"
                          >
                            {billingCycle === "monthly"
                              ? plan.priceMonthly
                              : plan.priceYearly}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="jet text-[10px] text-neutral-400 font-bold tracking-widest uppercase mt-1.5 leading-none">
                        per user/month
                      </span>
                    </div>
                  </div>

                  {/* Expandable Features */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        key="features"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          opacity: { duration: 0.2 },
                          height: { duration: 0.3, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3.5 mt-3.5 sm:pt-4 sm:mt-4 mb-1 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                          {plan.featuresLabel && (
                            <p className="jet text-[10px] font-bold text-neutral-400 tracking-widest uppercase mb-3">
                              {plan.featuresLabel}
                            </p>
                          )}
                          <div className="flex flex-col gap-2.5">
                            {plan.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5"
                              >
                                <Check
                                  size={14}
                                  strokeWidth={3}
                                  className="text-green-500 shrink-0"
                                />
                                <span className="text-[12px] text-neutral-600 dark:text-neutral-300 leading-tight">
                                  {feature.text}
                                </span>
                                {feature.hasInfo && (
                                  <Info
                                    size={13}
                                    className="text-neutral-300 dark:text-neutral-600 ml-0.5"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer info & CTA */}
        <div className="flex items-center justify-between mt-5 px-1 pb-1">
          <span className="jet text-[10px] text-neutral-400 uppercase tracking-[0.05em] max-w-[190px] leading-relaxed whitespace-nowrap">
            {footerText}
          </span>
          <button
            onClick={() => onContinue?.(selectedPlan, billingCycle)}
            className="bg-orange-500 text-white px-5 py-2 rounded-full text-[13px] font-medium hover:bg-orange-600 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
