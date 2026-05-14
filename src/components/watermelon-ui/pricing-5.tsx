import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PricingFeature {
  name: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  isPopular?: boolean;
  badge?: string;
}

export interface Pricing5Props {
  heading: string;
  subheading: string;
  monthlyLabel?: string;
  yearlyLabel?: string;
  plans: PricingPlan[];
}

export function Pricing5({
  heading,
  subheading,
  monthlyLabel = "Bill Monthly",
  yearlyLabel = "Bill Yearly",
  plans,
}: Pricing5Props) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-background w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {subheading}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center space-x-4">
          <Label
            htmlFor="billing-toggle"
            className={cn(
              "cursor-pointer text-sm font-medium transition-colors",
              !isYearly ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {monthlyLabel}
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label
            htmlFor="billing-toggle"
            className={cn(
              "cursor-pointer text-sm font-medium transition-colors",
              isYearly ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {yearlyLabel}
          </Label>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-[2rem] p-2 transition-all duration-200 sm:p-3",
                plan.isPopular
                  ? "bg-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.15),inset_0_2px_0_0px_rgba(255,255,255,0.5)]"
                  : "bg-muted shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.08),inset_0_2px_0_0px_rgba(255,255,255,0.15)]",
              )}
            >
              <div className="mt-3 mb-4 px-4 sm:px-5">
                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "text-xl font-bold",
                      plan.isPopular
                        ? "text-primary-foreground"
                        : "text-foreground",
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <Badge
                      variant={plan.isPopular ? "secondary" : "default"}
                      className="rounded-full"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.isPopular
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <div className="bg-card flex flex-1 flex-col rounded-4xl p-6 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.08)] sm:p-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-card-foreground text-4xl font-extrabold">
                    {plan.currency}
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm font-medium">
                    / {isYearly ? "year" : "month"}
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <MdCheckCircle
                        className={cn(
                          "size-6 shrink-0",
                          plan.isPopular
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                      <span className="text-card-foreground text-sm">
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "] mt-8 h-12 w-full rounded-xl border text-base font-semibold",
                    plan.isPopular
                      ? "border-primary shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
                      : "border-border shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.15),inset_0_1px_0px_0px_rgba(255,255,255,0.1)]",
                  )}
                  variant={
                    plan.buttonVariant ||
                    (plan.isPopular ? "default" : "secondary")
                  }
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
