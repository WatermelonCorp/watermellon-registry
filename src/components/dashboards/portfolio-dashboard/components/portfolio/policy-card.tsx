import { CalendarDays, CircleDollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export function PolicyCard({
  policy,
}: {
  policy: {
    initials: string;
    name: string;
    type: string;
    status: string;
    tone: string;
    price: string;
    detail: string;
  };
}) {
  const tones: Record<string, string> = {
    green: "bg-green-100 text-green-600 dark:bg-green-950",
    pink: "bg-pink-100 text-pink-600 dark:bg-pink-950",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-950",
    red: "bg-red-100 text-red-600 dark:bg-red-950",
  };
  return (
    <Card className="gap-5 rounded-2xl p-3 shadow-border transition-[box-shadow,scale] hover:shadow-border-hover active:scale-[0.96]">
      <div className="flex items-start justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-blue-100 text-sm text-primary dark:bg-blue-950">
          {policy.initials}
        </span>
        <Badge variant="secondary" className={tones[policy.tone]}>
          {policy.status}
        </Badge>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{policy.name}</h3>
        <p className="text-xs text-muted-foreground">{policy.type}</p>
      </div>
      <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs">
        <span className="flex items-center gap-1">
          <CircleDollarSign className="size-4" />
          {policy.price}
        </span>
        <span className="flex items-center gap-1 rounded-full px-2 py-1  border border-border shadow-xs">
          {policy.detail.startsWith("Due") ? (
            <CalendarDays className="size-4" />
          ) : null}
          {policy.detail}
        </span>
      </div>
    </Card>
  );
}
