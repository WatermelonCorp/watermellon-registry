"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCloud } from "react-icons/fa";

export interface StorageWidgetProps {
  title?: string;
  subtitle?: string;
  usedAmount?: string;
  totalAmount?: string;
  segments?: number;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
}

function getNumericValue(value: string) {
  return Number.parseFloat(value.replace(/,/g, ""));
}

export function StorageWidget({
  title = "Cloud Storage",
  subtitle = "Billing cycle: May 1 - May 31",
  usedAmount = "45 GB",
  totalAmount = "100 GB",
  segments = 5,
  actionLabel = "Upgrade",
  onActionClick,
  className = "",
}: StorageWidgetProps) {
  const segmentCount = Math.max(1, Math.floor(segments));
  const usedValue = getNumericValue(usedAmount);
  const totalValue = getNumericValue(totalAmount);
  const progress =
    Number.isFinite(usedValue) && Number.isFinite(totalValue) && totalValue > 0
      ? Math.min(Math.max(usedValue / totalValue, 0), 1)
      : 0;

  return (
    <Card
      className={`w-full max-w-sm gap-4 px-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-primary flex items-center gap-2">
            <FaCloud className="h-4 w-4" />
            <h3 className="text-foreground text-base font-semibold tracking-tight">
              {title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={onActionClick}
          className="shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
        >
          {actionLabel}
        </Button>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-foreground text-3xl font-bold tracking-tight tabular-nums">
            {usedAmount}
          </span>
          <span className="text-muted-foreground text-sm font-medium tabular-nums">
            of {totalAmount}
          </span>
        </div>

        <div className="flex h-2 w-full gap-1.5">
          {Array.from({ length: segmentCount }).map((_, index) => {
            const segmentProgress = Math.min(
              Math.max(progress * segmentCount - index, 0),
              1,
            );
            const isFull = segmentProgress === 1;
            const isEmpty = segmentProgress === 0;

            return (
              <div
                key={index}
                className="bg-primary/10 relative flex-1 overflow-hidden rounded-full"
              >
                <div
                  className={`bg-primary absolute inset-y-0 left-0 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.16)] ${
                    isFull ? "w-full" : isEmpty ? "w-0" : ""
                  }`}
                  style={
                    !isFull && !isEmpty
                      ? { width: `${segmentProgress * 100}%` }
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default StorageWidget;
