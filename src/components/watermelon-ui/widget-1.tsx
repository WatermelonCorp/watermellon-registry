import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa6";

export interface ApiUsageWidgetProps {
  title?: string;
  limitValue?: string;
  progressLabel?: string;
  progressValue?: number;
  usedLabel?: string;
  usedValue?: string;
  remainingLabel?: string;
  remainingValue?: string;
  buttonText?: string;
  onAction?: () => void;
  planOptions?: string[];
  defaultPlan?: string;
}

export function ApiUsageWidget({
  title = "Api Requests Quota",
  limitValue = "100,000",
  progressLabel = "Monthly Request Limit",
  progressValue = 45.23,
  usedLabel = "Used",
  usedValue = "45,231",
  remainingLabel = "Remaining",
  remainingValue = "54,769",
  buttonText = "Upgrade Plan",
  onAction,
  planOptions = ["Pro", "Enterprise", "Basic"],
  defaultPlan = "Pro",
}: ApiUsageWidgetProps) {
  const [selectedPlan, setSelectedPlan] = React.useState(defaultPlan);

  return (
    <div className="bg-muted flex w-full max-w-sm rounded-[40px] p-2">
      <Card className="bg-card/80 w-full rounded-[32px] ring-0">
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-sm font-normal">
              {title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 rounded-md border-none px-3 py-2 text-xs font-medium tracking-wide shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)] focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {selectedPlan}{" "}
                  <FaChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-background/20 rounded-xl border shadow-sm ring-0 backdrop-blur-2xl"
              >
                {planOptions.map((plan) => (
                  <DropdownMenuItem
                    key={plan}
                    onClick={() => setSelectedPlan(plan)}
                    className="cursor-pointer rounded-md bg-transparent text-xs font-medium"
                  >
                    {plan}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <div className="text-foreground text-3xl font-semibold tracking-tight tabular-nums">
              {limitValue}
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-muted-foreground text-sm font-normal">
              {progressLabel}
            </p>
            <Progress
              value={progressValue}
              className="bg-muted h-2 w-full **:data-[slot=progress-indicator]:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2),0px_4px_24px_0px_rgba(0,0,0,0.1),0px_2px_12px_0px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex flex-col leading-tight">
              <span className="text-muted-foreground">{usedLabel}</span>
              <span className="text-foreground text-base font-semibold">
                {usedValue}
              </span>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-muted-foreground">{remainingLabel}</span>
              <span className="text-foreground text-base font-semibold">
                {remainingValue}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <Button
              onClick={onAction}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full rounded-full text-base font-semibold shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2),0px_4px_24px_0px_rgba(0,0,0,0.1),0px_2px_12px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]"
              size="lg"
            >
              {buttonText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
