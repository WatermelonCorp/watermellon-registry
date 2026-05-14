import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export interface PricingTier {
  id: string;
  title: string;
  currency?: string;
  amount: string;
  period: string;
  description: string;
  isPopular?: boolean;
  popularText?: string;
}

export interface PricingTab {
  id: string;
  label: string;
  tiers: PricingTier[];
}

export interface PricingFeature {
  id: string;
  title: string;
  description: string;
}

export interface Pricing4Props {
  badge?: string;
  title?: string;
  tabs?: PricingTab[];
  features?: PricingFeature[];
}

const defaultTabs: PricingTab[] = [
  {
    id: "startup",
    label: "Startup",
    tiers: [
      {
        id: "startup-monthly",
        title: "Monthly",
        currency: "$",
        amount: "49",
        period: "per user",
        description: "When Paid Annually",
      },
      {
        id: "startup-quarterly",
        title: "Quarterly",
        currency: "$",
        amount: "39",
        period: "per user",
        description: "When Paid Annually",
        isPopular: true,
        popularText: "Most Popular",
      },
      {
        id: "startup-annually",
        title: "Annually",
        currency: "$",
        amount: "29",
        period: "per user",
        description: "When Paid Annually",
      },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    tiers: [
      {
        id: "enterprise-monthly",
        title: "Monthly",
        currency: "$",
        amount: "99",
        period: "per user",
        description: "When Paid Annually",
      },
      {
        id: "enterprise-quarterly",
        title: "Quarterly",
        currency: "$",
        amount: "89",
        period: "per user",
        description: "When Paid Annually",
        isPopular: true,
        popularText: "Most Popular",
      },
      {
        id: "enterprise-annually",
        title: "Annually",
        currency: "$",
        amount: "79",
        period: "per user",
        description: "When Paid Annually",
      },
    ],
  },
];

const defaultFeatures: PricingFeature[] = [
  {
    id: "f1",
    title: "Unlimited Projects",
    description:
      "Create as many projects as you need without any restrictions.",
  },
  {
    id: "f2",
    title: "Advanced Analytics",
    description: "Get deep insights into your team's performance metrics.",
  },
  {
    id: "f3",
    title: "Custom Integrations",
    description: "Connect with your favorite tools using our flexible API.",
  },
  {
    id: "f4",
    title: "Priority Support",
    description: "24/7 dedicated support via email and Slack channels.",
  },
  {
    id: "f5",
    title: "Role-based Access",
    description: "Set granular permissions for all your team members easily.",
  },
  {
    id: "f6",
    title: "Data Export",
    description: "Export your data anytime in standard formats securely.",
  },
  {
    id: "f7",
    title: "Audit Logs",
    description: "Track all changes and activities across your workspace.",
  },
  {
    id: "f8",
    title: "SSO Authentication",
    description: "Secure enterprise login with SAML and Google Workspace.",
  },
  {
    id: "f9",
    title: "Custom Onboarding",
    description: "Dedicated success manager to get your team started fast.",
  },
];

export default function Pricing4({
  badge = "Flexible Plans",
  title = "Simple, predictable pricing",
  tabs = defaultTabs,
  features = defaultFeatures,
}: Pricing4Props) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || "");
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section className="bg-background w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          {badge && (
            <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h2>
          )}
        </div>
        {tabs.length > 1 && (
          <div className="mb-16 flex justify-center">
            <div className="bg-muted/40 border-border/50 inline-flex items-center rounded-full border p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "rounded-full px-8 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out",
                    activeTabId === tab.id
                      ? "bg-primary/25 backdrop-blur-sm text-foreground border border-primary/50  shadow-sm "
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  aria-pressed={activeTabId === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {activeTab.tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "group relative rounded-4xl p-2 transition-all duration-300 md:p-3",
                tier.isPopular
                  ? "bg-primary/20 dark:bg-primary/50 border-primary/10 border"
                  : "bg-muted/30 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_0px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_1px_2px_-1px_rgba(255,255,255,0.1),0px_0px_4px_0px_rgba(255,255,255,0.1)]",
              )}
            >
              <div className="bg-muted dark:bg-card flex h-full flex-col rounded-[1.25rem] p-8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.06),inset_0_2px_0_0_rgba(255,255,255,0.45)] transition-shadow duration-300 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_-2px_0px_0px_rgba(255,255,255,0.08)]">
                <div className="mb-6 flex min-h-[32px] items-start justify-between">
                  <h3 className="text-foreground text-lg font-medium">
                    {tier.title}
                  </h3>
                  {tier.isPopular && tier.popularText && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full border-none px-3 py-1 text-xs font-semibold"
                    >
                      {tier.popularText}
                    </Badge>
                  )}
                </div>

                <div className="mb-2 flex items-start gap-1">
                  {tier.currency && (
                    <span className="text-foreground mt-1.5 text-xl font-bold">
                      {tier.currency}
                    </span>
                  )}
                  <span className="text-foreground text-6xl font-bold tracking-tighter">
                    {tier.amount}
                  </span>
                </div>

                {tier.period && (
                  <div className="text-foreground/80 mt-1 mb-6 text-sm font-medium">
                    {tier.period}
                  </div>
                )}

                <div className="mt-auto">
                  {tier.description && (
                    <p className="text-muted-foreground text-sm font-medium">
                      {tier.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {features && features.length > 0 && (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-10 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex gap-4">
                <FaCheckCircle className="text-primary/80 mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <span className="text-foreground mr-1.5 font-bold">
                    {feature.title}:
                  </span>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
