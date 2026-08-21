import {
  ArrowRightIcon,
  CheckIcon,
  FlagIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { StatusWarningIcon, TimelineCheckIcon } from "./icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getTransactionDetails,
  type BatchStatus,
  type BatchTransaction,
  type MatchLineStatus,
} from "../../data";
import { cn } from "@/lib/utils";

const statusLabel: Record<BatchStatus, string> = {
  processing: "Processing",
  completed: "Completed",
  exception: "Exception",
};

const matchStatusConfig: Record<
  MatchLineStatus,
  { label: string; className: string; Icon: typeof CheckIcon }
> = {
  matched: {
    label: "Matched",
    className: "text-(--status-completed)",
    Icon: CheckIcon,
  },
  mismatched: {
    label: "Mismatched",
    className: "text-(--status-exception)",
    Icon: XIcon,
  },
  partial: {
    label: "Partial",
    className: "text-orange-500",
    Icon: TriangleAlertIcon,
  },
};

function OverviewCard({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-zinc-50 dark:bg-muted",
        large ? "justify-center p-4" : "p-3",
      )}
    >
      <p
        className={cn(
          "text-sm font-medium tracking-tight",
          large ? "opacity-70" : "opacity-60",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "font-medium leading-none",
          large ? "text-3xl" : "text-lg",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function MatchField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="truncate text-base font-medium tracking-tight">{value}</p>
    </div>
  );
}

function MatchBlock({
  title,
  status,
  fields,
}: {
  title: string;
  status: MatchLineStatus;
  fields: [string, string][];
}) {
  const config = matchStatusConfig[status];
  const Icon = config.Icon;

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 px-1 pt-2 pb-1 dark:bg-muted">
      <div className="flex items-center justify-between px-2">
        <p className="text-base font-medium tracking-tight">{title}</p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl px-2 py-1 text-sm font-medium",
            config.className,
          )}
        >
          <Icon className="size-3.5" />
          {config.label}
        </span>
      </div>
      <div className="flex items-start gap-3 rounded-xl border bg-background p-4">
        {fields.map(([label, value]) => (
          <MatchField key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}

export function TransactionDetailsSheet({
  transaction,
  open,
  onOpenChange,
}: {
  transaction: BatchTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const details = transaction ? getTransactionDetails(transaction) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {transaction && details ? (
        <SheetContent
          side="right"
          showCloseButton={false}
          className="tallie-dashboard gap-0 p-0 data-[side=right]:w-full data-[side=right]:max-w-130 data-[side=right]:sm:max-w-130"
        >
          <SheetHeader className="flex-row items-center justify-between border-b p-6">
            <div className="flex min-w-0 flex-col">
              <SheetTitle className="text-lg">Transaction Details</SheetTitle>
              <SheetDescription className="sr-only">
                Full details for {transaction.transactionId}
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Close">
                <XIcon className="size-5" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto">
            <div className="flex flex-col gap-3 px-6 pt-7">
              <h2 className="text-2xl leading-snug font-medium tracking-tight">
                {transaction.transactionId}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-2.5 rounded px-3 py-1 text-sm font-medium",
                    transaction.status === "exception" &&
                      "bg-(--status-exception)/15 text-(--status-exception)",
                    transaction.status === "completed" &&
                      "bg-(--status-completed)/15 text-(--status-completed)",
                    transaction.status === "processing" &&
                      "bg-(--status-processing)/15 text-(--status-processing)",
                  )}
                >
                  {transaction.status === "exception" ? (
                    <StatusWarningIcon className="size-4" />
                  ) : null}
                  {statusLabel[transaction.status]}
                </span>
                <span className="rounded bg-(--source-sharepoint)/15 px-3 py-1 text-sm text-(--source-sharepoint)">
                  {transaction.confidence}% confidence
                </span>
                {details.flagged ? (
                  <span className="inline-flex items-center gap-2 rounded-xl py-1 pr-4 pl-3 text-sm font-medium">
                    <span className="size-2.5 rounded-full bg-(--status-exception)" />
                    Flagged
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-8 px-6">
              <div className="flex flex-col gap-3">
                <OverviewCard label="Amount" value={transaction.amount} large />
                <div className="grid grid-cols-2 gap-3">
                  <OverviewCard label="Customer" value={details.customer} />
                  <OverviewCard label="Vendor" value={transaction.vendor} />
                  <OverviewCard label="Batch ID" value={details.batchId} />
                  <OverviewCard label="Date" value={details.date} />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-base font-medium tracking-tight">
                  Three-way Match Breakdown
                </h3>
                <MatchBlock
                  title="Purchase Order"
                  status={details.purchaseOrder.status}
                  fields={[
                    ["Amount", details.purchaseOrder.amount],
                    ["PO no.", details.purchaseOrder.reference],
                    ["Source", details.purchaseOrder.source],
                  ]}
                />
                <MatchBlock
                  title="Invoice"
                  status={details.invoice.status}
                  fields={[
                    ["Amount", details.invoice.amount],
                    ["Invoice no.", details.invoice.reference],
                    ["Delta vs PO", details.invoice.deltaVsPo],
                  ]}
                />
                <MatchBlock
                  title="Goods Receipt"
                  status={details.goodsReceipt.status}
                  fields={[
                    ["Amount", details.goodsReceipt.amount],
                    ["PO number", details.goodsReceipt.reference],
                    ["Source", details.goodsReceipt.fulfillment],
                  ]}
                />
              </div>

              <div className="flex flex-col gap-4 pb-7">
                <h3 className="text-base font-medium tracking-tight">
                  Activity Timeline
                </h3>
                <ol className="flex flex-col gap-8">
                  {details.timeline.map((item, index) => (
                    <li
                      key={`${item.title}-${index}`}
                      className="relative flex gap-4"
                    >
                      {index < details.timeline.length - 1 ? (
                        <span
                          aria-hidden
                          className="absolute top-8 left-4 h-[calc(100%+1rem)] w-px bg-border"
                        />
                      ) : null}
                      <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-muted">
                        <TimelineCheckIcon />
                      </span>
                      <div className="flex min-w-0 flex-col gap-1 pt-0.5">
                        <p className="text-base font-medium tracking-tight">
                          {item.title}
                        </p>
                        <p className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                          {item.parts.map((part, partIndex) => (
                            <span
                              key={`${part}-${partIndex}`}
                              className="inline-flex items-center gap-1"
                            >
                              {partIndex > 0 ? (
                                <span
                                  aria-hidden
                                  className="size-1 rounded-full bg-muted-foreground/50"
                                />
                              ) : null}
                              {part}
                            </span>
                          ))}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <SheetFooter className="gap-3 border-t p-6">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 gap-2">
                <CheckIcon />
                Approve anyway
              </Button>
              <Button
                variant="outline"
                className="h-12 gap-2 text-(--status-exception) hover:text-(--status-exception)"
              >
                <FlagIcon />
                Flag for Review
              </Button>
            </div>
            <Button className="h-12 w-full gap-2">
              Request Correction
              <ArrowRightIcon />
            </Button>
          </SheetFooter>
        </SheetContent>
      ) : null}
    </Sheet>
  );
}
