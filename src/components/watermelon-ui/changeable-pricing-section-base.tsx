'use client';

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
  title?: string;
  plans: Plan[];
  defaultPlanId?: PlanId;
  defaultBillingCycle?: "monthly" | "yearly";
  monthlyLabel?: string;
  yearlyLabel?: string;
  footerText?: string;
  buttonText?: string;
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
    <div className="theme-injected flex items-center justify-center min-h-[600px] p-4 ">
      <div className="w-full max-w-[460px] bg-muted rounded-lg p-1.5 shadow-sm ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-4">
          <h2 className="text-[17px] font-medium text-foreground tracking-tighter">
            {title}
          </h2>
          <div className="flex items-center bg-background p-1 rounded-lg relative z-0">
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-lg shadow-sm -z-10"
              animate={{
                x: billingCycle === "monthly" ? 0 : "100%",
              }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
              style={{ left: 4 }}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`jet w-[72px] py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-colors z-10 ${
                billingCycle === "monthly"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {monthlyLabel}
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`jet w-[72px] py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-colors z-10 ${
                billingCycle === "yearly"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
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
                className={`relative overflow-hidden cursor-pointer rounded-lg transition-colors duration-300 bg-background ${
                  isSelected
                    ? "ring-1 ring-primary shadow-[0_4px_16px_hsl(var(--foreground)/0.08)]"
                    : "ring-1 ring-border shadow-sm hover:ring-border"
                }`}
              >
                <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex flex-1 gap-3">
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`w-[18px] h-[18px] rounded-lg flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-border bg-background"
                          }`}
                        >
                          {isSelected && (
                            <Check
                              size={11}
                              strokeWidth={3.5}
                              className="text-primary-foreground"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[16px] font-medium text-foreground leading-none">
                            {plan.name}
                          </span>
                          {plan.badge && (
                            <span className="bg-accent text-accent-foreground text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider leading-none">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-1.5 leading-snug sm:leading-none">
                          {plan.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex items-center justify-end text-[15px] sm:text-[16px] font-medium text-foreground leading-none overflow-hidden h-[18px]">
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
                      <span className="jet text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-1.5 leading-none">
                        per user/month
                      </span>
                    </div>
                  </div>

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
                        <div className="pt-3.5 mt-3.5 sm:pt-4 sm:mt-4 mb-1 border-t border-border">
                          {plan.featuresLabel && (
                            <p className="jet text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-3">
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
                                  className="text-primary shrink-0"
                                />
                                <span className="text-[12px] text-muted-foreground leading-tight">
                                  {feature.text}
                                </span>
                                {feature.hasInfo && (
                                  <Info
                                    size={13}
                                    className="text-muted-foreground ml-0.5"
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

        {/* Footer */}
        <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-between mt-5 px-3 pb-2">
          <span className="jet text-[10px] text-muted-foreground uppercase tracking-[0.05em] leading-relaxed text-center sm:text-left">
            {footerText}
          </span>
          <button
            onClick={() => onContinue?.(selectedPlan, billingCycle)}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-2.5 rounded-lg text-[13px] font-medium active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}