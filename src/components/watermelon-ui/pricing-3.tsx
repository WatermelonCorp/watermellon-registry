import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IoPricetag,
  IoStar,
  IoCheckmarkCircle,
  IoArrowForward,
} from "react-icons/io5";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  isPopular?: boolean;
  popularBadgeText?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
}

interface EnterprisePlan {
  title: string;
  description: string;
  buttonText: string;
  footnote: string;
}

interface Pricing3Props {
  badgeText?: string;
  title: string;
  subtitle: string;
  enterprisePlan: EnterprisePlan;
  plans: PricingPlan[];
  footerText?: string;
}

export function Pricing3({
  badgeText,
  title,
  subtitle,
  enterprisePlan,
  plans,
  footerText,
}: Pricing3Props) {
  return (
    <section className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-8">
          <div className="flex max-w-2xl flex-col items-start gap-5">
            {badgeText && (
              <Badge
                variant="outline"
                className="text-muted-foreground border-border bg-muted/50 flex items-center gap-2 rounded-full px-2 py-1.5 text-sm"
              >
                <IoPricetag className="text-foreground h-4 w-4" />
                <span className="text-foreground font-medium">{badgeText}</span>
              </Badge>
            )}
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
              {subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 pt-2 lg:w-1/3">
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              {enterprisePlan.title}
              <IoStar className="text-primary h-4 w-4" />
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              {enterprisePlan.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button variant="outline" className="group rounded-full">
                {enterprisePlan.buttonText}
                <IoArrowForward className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <span className="bg-muted-foreground/50 h-1 w-1 rounded-full" />
                {enterprisePlan.footnote}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-card relative flex flex-col gap-8 rounded-4xl border p-6 transition-all duration-300 sm:flex-row sm:p-8 md:p-10 ${plan.isPopular ? "border-primary ring-primary/20 ring-1" : "border-border"}`}
            >
              {plan.isPopular && plan.popularBadgeText && (
                <div className="bg-primary text-primary-foreground absolute -top-3 left-6 rounded-md px-4 py-1 text-xs font-medium   shadow-sm sm:left-10">
                  {plan.popularBadgeText}
                </div>
              )}

              <div className="border-border flex flex-1 flex-col items-start border-b pb-8 sm:border-r sm:border-b-0 sm:pr-8 sm:pb-0">
                <Badge
                  variant="outline"
                  className="bg-muted/30 mb-4 rounded-full px-3  text-xs font-medium "
                >
                  {plan.name}
                </Badge>
                <div className="text-foreground mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
                  {plan.price}
                </div>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed md:text-base">
                  {plan.description}
                </p>
                <div className="mt-auto w-full">
                  <Button
                    variant={plan.buttonVariant || "default"}
                    className="group h-12 w-full rounded-full px-6 sm:w-auto"
                  >
                    {plan.buttonText}
                    <IoArrowForward className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center sm:pl-2">
                <ul className="space-y-4 md:space-y-5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <IoCheckmarkCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                      <span className="text-foreground text-sm font-medium md:text-base">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {footerText && (
          <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              {footerText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
