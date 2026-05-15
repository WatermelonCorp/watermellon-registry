import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type ReactNode } from "react";

export interface ActionItem {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline";
}

export interface RecoveryLink {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface MissingStateProps {
  badge?: string;
  title: string;
  description: string;
  actions?: ActionItem[];
  links?: RecoveryLink[];
}

function RecoveryCard({ title, description, icon }: RecoveryLink) {
  return (
    <Card className="bg-muted hover:bg-muted/70 rounded shadow-xs ring-0 transition-opacity duration-200">
      <div className="flex items-start gap-4 px-4">
        <div className="bg-secondary text-secondary-foreground flex items-center justify-center rounded-lg">
          {icon}
        </div>

        <div className="space-y-1">
          <h3 className="text-foreground text-sm font-semibold">{title}</h3>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  variant = "default",
}: ActionItem) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="rounded shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.1),inset_0_2px_4px_0_rgba(255,255,255,0.08)]"
    >
      <span className="flex items-center gap-0.5">
        {icon}
        <span>{label}</span>
      </span>
    </Button>
  );
}

export function MissingState({
  title,
  description,
  actions = [],
  links = [],
}: MissingStateProps) {
  return (
    <section className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div className="bg-background absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 lg:items-center">
        <div className="space-y-8">
          <div className="mx-auto max-w-xl space-y-5 text-center">
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-4xl lg:text-4xl">
              {title}
            </h1>

            <p className="text-muted-foreground sm:text-md mx-auto max-w-md text-base leading-7">
              {description}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            {actions.map((action) => (
              <ActionButton key={action.label} {...action} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {links.map((link) => (
            <RecoveryCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MissingState;
