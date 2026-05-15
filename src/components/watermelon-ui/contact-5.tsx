import { type IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ContactMethod {
  id: string;
  icon: IconType;
  title: string;
  description: string;
  details: string;
}

export interface Contact5Props {
  badge?: string;
  heading: string;
  description?: string;
  contactMethods: ContactMethod[];
  footerText?: string;
}

export function Contact5({
  badge,
  heading,
  description,
  contactMethods,
  footerText,
}: Contact5Props) {
  return (
    <section className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          {badge && (
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium">
              {badge}
            </Badge>
          )}
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg md:text-xl">
              {description}
            </p>
          )}
        </div>

        <div className="divide divide-border border-border grid grid-cols-1 divide-y border-t border-b md:grid-cols-3 md:divide-x md:divide-y-0 md:mask-r-from-95% md:mask-l-from-95%">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={cn(
                  "flex flex-col items-center px-4 py-8 text-center md:px-8 md:py-4",
                  idx % 2 === 0 ? "bg-background" : "bg-muted/50",
                )}
              >
                <div className="bg-primary/30 text-primary border-primary/30 mb-5 rounded-xl border p-3 shadow-[inset_0_2px_6px_0_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0),0px_1px_2px_-1px_rgba(0,0,0,0.03),0px_2px_4px_0px_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_4px_6px_0_rgba(0,0,0,0.4),0px_0px_0px_1px_rgba(0,0,0,0),0px_1px_2px_-1px_rgba(0,0,0,0.03),0px_2px_4px_0px_rgba(0,0,0,0.03),inset_0_-4px_6px_0_rgba(0,0,0,0.1),inset_0_4px_6px_0_rgba(255,255,255,0.3)]">
                  <Icon className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <h3 className="text-foreground mb-3 text-lg font-semibold md:text-xl">
                  {method.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed md:text-base">
                  {method.description}
                </p>
                <p className="text-foreground mt-auto text-base font-medium md:text-lg">
                  {method.details}
                </p>
              </div>
            );
          })}
        </div>

        {footerText && (
          <div className="mt-12 text-center md:mt-12">
            <p className="text-muted-foreground mx-auto max-w-xl text-sm md:text-base">
              {footerText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
