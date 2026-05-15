import { MdCheckCircle } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  priceSuffix?: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
}

export interface Pricing1Props {
  plans: PricingPlan[];
  className?: string;
}

export function Pricing1({ plans, className }: Pricing1Props) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-6", className)}>
      <div className="bg-muted/40 rounded-none border p-2 shadow-sm md:p-3">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-none p-6 transition-all sm:p-8",
                plan.isPopular
                  ? "bg-background border-border/50 border shadow-md"
                  : "hover:bg-background/50 bg-transparent",
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-6 right-6">
                  <Badge
                    variant="default"
                    className="rounded-none px-3 py-1 text-xs font-semibold shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_0.5px_0px_0px_rgba(255,255,255,0.35)]"
                  >
                    Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-foreground mb-3 text-2xl font-bold tracking-tight">
                  {plan.title}
                </h3>
                <p className="text-muted-foreground min-h-[40px] pr-8 text-sm sm:pr-12">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-foreground text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                {plan.priceSuffix && (
                  <span className="text-muted-foreground text-sm font-medium">
                    {plan.priceSuffix}
                  </span>
                )}
              </div>

              <div className="bg-border mb-8 h-[2px] w-1/3" />

              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <MdCheckCircle className="text-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-muted-foreground text-sm font-medium">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                {plan.isPopular ? (
                  <Button
                    size="lg"
                    className="border-primary flex h-14 w-full items-center justify-between rounded-none border px-6 font-semibold shadow-[0px_0px_4px_1px_rgba(0,0,0,0.1),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
                  >
                    <span className="text-base">Get started for</span>
                    <div className="bg-primary-foreground/50 mx-4 h-[1px] flex-1" />
                    <span className="text-base">{plan.buttonText}</span>
                  </Button>
                ) : (
                  <Button className="group flex h-14 w-full cursor-pointer items-center justify-between border-0 bg-transparent px-2 outline-none">
                    <span className="text-foreground group-hover:text-primary text-base font-medium transition-colors">
                      Get started for
                    </span>
                    <div className="bg-border group-hover:bg-primary/20 mx-4 h-[2px] flex-1 transition-colors" />
                    <span className="text-foreground group-hover:text-primary text-base font-bold transition-colors">
                      {plan.buttonText}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
