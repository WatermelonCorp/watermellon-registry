"use client";

import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  Fragment,
} from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Check } from "lucide-react";

function parseSelectionToIdSet(
  value: OptionListSelection | undefined,
  mode: "multi" | "single",
  maxSelections?: number,
): Set<string> {
  if (mode === "single") {
    const single =
      typeof value === "string"
        ? value
        : Array.isArray(value)
          ? value[0]
          : null;
    return single ? new Set([single]) : new Set();
  }

  const arr =
    typeof value === "string" ? [value] : Array.isArray(value) ? value : [];

  return new Set(maxSelections ? arr.slice(0, maxSelections) : arr);
}

function convertIdSetToSelection(
  selected: Set<string>,
  mode: "multi" | "single",
): OptionListSelection {
  if (mode === "single") {
    const [first] = selected;
    return first ?? null;
  }
  return Array.from(selected);
}

function areSetsEqual(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (const val of a) {
    if (!b.has(val)) return false;
  }
  return true;
}

interface SelectionIndicatorProps {
  mode: "multi" | "single";
  isSelected: boolean;
  disabled?: boolean;
}

function SelectionIndicator({
  mode,
  isSelected,
  disabled,
}: SelectionIndicatorProps) {
  const shape = mode === "single" ? "rounded-full" : "rounded";

  return (
    <div
      className={cn(
        "flex size-4 shrink-0 items-center justify-center border-2 transition-colors",
        shape,
        isSelected && "border-primary bg-primary text-primary-foreground",
        !isSelected && "border-muted-foreground/50",
        disabled && "opacity-50",
      )}
    >
      {mode === "multi" && isSelected && <Check className="size-3" />}
      {mode === "single" && isSelected && (
        <span className="size-2 rounded-full bg-current" />
      )}
    </div>
  );
}

interface OptionItemProps {
  option: OptionListOption;
  isSelected: boolean;
  isDisabled: boolean;
  selectionMode: "multi" | "single";
  isFirst: boolean;
  isLast: boolean;
  onToggle: () => void;
  tabIndex?: number;
  onFocus?: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

function OptionItem({
  option,
  isSelected,
  isDisabled,
  selectionMode,
  isFirst,
  isLast,
  onToggle,
  tabIndex,
  onFocus,
  buttonRef,
}: OptionItemProps) {
  const hasAdjacentOptions = !isFirst && !isLast;

  return (
    <Button
      ref={buttonRef}
      data-id={option.id}
      variant="ghost"
      size="lg"
      role="option"
      aria-selected={isSelected}
      onClick={onToggle}
      onFocus={onFocus}
      tabIndex={tabIndex}
      disabled={isDisabled}
      className={cn(
        "peer group relative h-auto min-h-[50px] w-full justify-start text-left text-sm font-medium",
        "rounded-none border-0 bg-transparent px-0 py-2 text-base shadow-none transition-none hover:bg-transparent! @md/option-list:text-sm",
        isFirst && "pb-2.5",
        hasAdjacentOptions && "py-2.5",
      )}
    >
      <span
        className={cn(
          "bg-primary/5 absolute inset-0 -mx-3 -my-0.5 rounded-xl opacity-0 transition-opacity group-hover:opacity-100",
        )}
      />
      <div className="relative flex items-start gap-3">
        <span className="flex h-6 items-center">
          <SelectionIndicator
            mode={selectionMode}
            isSelected={isSelected}
            disabled={option.disabled}
          />
        </span>
        {option.icon && (
          <span className="flex h-6 items-center">{option.icon}</span>
        )}
        <div className="flex flex-col text-left">
          <span className="leading-6 text-pretty">{option.label}</span>
          {option.description && (
            <span className="text-muted-foreground text-sm font-normal text-pretty">
              {option.description}
            </span>
          )}
        </div>
      </div>
    </Button>
  );
}

interface OptionListConfirmationProps {
  id: string;
  options: OptionListOption[];
  selectedIds: Set<string>;
  className?: string;
}

function OptionListConfirmation({
  id,
  options,
  selectedIds,
  className,
}: OptionListConfirmationProps) {
  const confirmedOptions = options.filter((opt) => selectedIds.has(opt.id));

  return (
    <div
      className={cn(
        "@container/option-list flex w-full max-w-md min-w-80 flex-col",
        "text-foreground",
        "motion-safe:animate-[fade-blur-in_300ms_cubic-bezier(0.16,1,0.3,1)_both]",
        className,
      )}
      data-slot="option-list"
      data-tool-ui-id={id}
      data-receipt="true"
      role="status"
      aria-label="Confirmed selection"
    >
      <div
        className={cn(
          "bg-card/60 flex w-full flex-col overflow-hidden rounded-2xl border px-5 py-2.5 shadow-xs",
        )}
      >
        {confirmedOptions.map((option, index) => (
          <Fragment key={option.id}>
            {index > 0 && <Separator orientation="horizontal" />}
            <div className="flex items-start gap-3 py-1">
              <span className="flex h-6 items-center">
                <Check className="text-primary size-4 shrink-0" />
              </span>
              {option.icon && (
                <span className="flex h-6 items-center">{option.icon}</span>
              )}
              <div className="flex flex-col text-left">
                <span className="text-base leading-6 font-medium text-pretty @md/option-list:text-sm">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-muted-foreground text-sm font-normal text-pretty">
                    {option.description}
                  </span>
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function OptionList({
  id,
  options,
  selectionMode = "multi",
  minSelections = 1,
  maxSelections,
  value,
  defaultValue,
  choice,
  onChange,
  onConfirm,
  onCancel,
  responseActions,
  onResponseAction,
  onBeforeResponseAction,
  className,
}: OptionListProps) {
  if (process.env["NODE_ENV"] !== "production") {
    if (value !== undefined && defaultValue !== undefined) {
      console.warn(
        "[OptionList] Both `value` (controlled) and `defaultValue` (uncontrolled) were provided. `defaultValue` is ignored when `value` is set.",
      );
    }
    if (value !== undefined && !onChange) {
      console.warn(
        "[OptionList] `value` was provided without `onChange`. This makes OptionList controlled; selection will not update unless the parent updates `value`.",
      );
    }
  }

  const effectiveMaxSelections = selectionMode === "single" ? 1 : maxSelections;

  const [uncontrolledSelected, setUncontrolledSelected] = useState<Set<string>>(
    () =>
      parseSelectionToIdSet(
        defaultValue,
        selectionMode,
        effectiveMaxSelections,
      ),
  );

  useEffect(() => {
    setUncontrolledSelected((prev) => {
      const normalized = parseSelectionToIdSet(
        Array.from(prev),
        selectionMode,
        effectiveMaxSelections,
      );
      return areSetsEqual(prev, normalized) ? prev : normalized;
    });
  }, [selectionMode, effectiveMaxSelections]);

  const selectedIds = useMemo(
    () =>
      value !== undefined
        ? parseSelectionToIdSet(value, selectionMode, effectiveMaxSelections)
        : uncontrolledSelected,
    [value, uncontrolledSelected, selectionMode, effectiveMaxSelections],
  );

  const selectedCount = selectedIds.size;

  const optionStates = useMemo(() => {
    return options.map((option) => {
      const isSelected = selectedIds.has(option.id);
      const isSelectionLocked =
        selectionMode === "multi" &&
        effectiveMaxSelections !== undefined &&
        selectedCount >= effectiveMaxSelections &&
        !isSelected;
      const isDisabled = option.disabled || isSelectionLocked;

      return { option, isSelected, isDisabled };
    });
  }, [
    options,
    selectedIds,
    selectionMode,
    effectiveMaxSelections,
    selectedCount,
  ]);

  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(() => {
    const firstSelected = optionStates.findIndex(
      (s) => s.isSelected && !s.isDisabled,
    );
    if (firstSelected >= 0) return firstSelected;
    const firstEnabled = optionStates.findIndex((s) => !s.isDisabled);
    return firstEnabled >= 0 ? firstEnabled : 0;
  });

  useEffect(() => {
    if (optionStates.length === 0) return;
    setActiveIndex((prev) => {
      if (
        prev < 0 ||
        prev >= optionStates.length ||
        optionStates[prev].isDisabled
      ) {
        const firstEnabled = optionStates.findIndex((s) => !s.isDisabled);
        return firstEnabled >= 0 ? firstEnabled : 0;
      }
      return prev;
    });
  }, [optionStates]);

  const updateSelection = useCallback(
    (next: Set<string>) => {
      const normalizedNext = parseSelectionToIdSet(
        Array.from(next),
        selectionMode,
        effectiveMaxSelections,
      );

      if (value === undefined) {
        if (!areSetsEqual(uncontrolledSelected, normalizedNext)) {
          setUncontrolledSelected(normalizedNext);
        }
      }

      onChange?.(convertIdSetToSelection(normalizedNext, selectionMode));
    },
    [
      effectiveMaxSelections,
      selectionMode,
      uncontrolledSelected,
      value,
      onChange,
    ],
  );

  const toggleSelection = useCallback(
    (optionId: string) => {
      const next = new Set(selectedIds);
      const isSelected = next.has(optionId);

      if (selectionMode === "single") {
        if (isSelected) {
          next.delete(optionId);
        } else {
          next.clear();
          next.add(optionId);
        }
      } else {
        if (isSelected) {
          next.delete(optionId);
        } else {
          if (effectiveMaxSelections && next.size >= effectiveMaxSelections) {
            return;
          }
          next.add(optionId);
        }
      }

      updateSelection(next);
    },
    [effectiveMaxSelections, selectedIds, selectionMode, updateSelection],
  );

  const handleConfirm = useCallback(async () => {
    if (!onConfirm) return;
    if (selectedCount === 0 || selectedCount < minSelections) return;
    await onConfirm(convertIdSetToSelection(selectedIds, selectionMode));
  }, [minSelections, onConfirm, selectedCount, selectedIds, selectionMode]);

  const handleCancel = useCallback(() => {
    const empty = new Set<string>();
    updateSelection(empty);
    onCancel?.();
  }, [onCancel, updateSelection]);

  const hasCustomResponseActions = responseActions !== undefined;

  const handleFooterAction = useCallback(
    async (actionId: string) => {
      if (actionId === "confirm") {
        await handleConfirm();
      } else if (actionId === "cancel") {
        handleCancel();
      }
      if (hasCustomResponseActions) {
        await onResponseAction?.(actionId);
      }
    },
    [handleConfirm, handleCancel, hasCustomResponseActions, onResponseAction],
  );

  const normalizedFooterActions = useMemo(() => {
    const normalized = normalizeActionsConfig(responseActions);
    if (normalized) return normalized;
    return {
      items: [
        { id: "cancel", label: "Clear", variant: "ghost" as const },
        { id: "confirm", label: "Confirm", variant: "default" as const },
      ],
      align: "right" as const,
    } satisfies ReturnType<typeof normalizeActionsConfig>;
  }, [responseActions]);

  const isConfirmDisabled =
    selectedCount < minSelections || selectedCount === 0;
  const hasNothingToClear = selectedCount === 0;

  const focusOptionAt = useCallback((index: number) => {
    const el = optionRefs.current[index];
    if (el) el.focus();
    setActiveIndex(index);
  }, []);

  const findFirstEnabledIndex = useCallback(() => {
    const idx = optionStates.findIndex((s) => !s.isDisabled);
    return idx >= 0 ? idx : 0;
  }, [optionStates]);

  const findLastEnabledIndex = useCallback(() => {
    for (let i = optionStates.length - 1; i >= 0; i--) {
      if (!optionStates[i].isDisabled) return i;
    }
    return 0;
  }, [optionStates]);

  const findNextEnabledIndex = useCallback(
    (start: number, direction: 1 | -1) => {
      const len = optionStates.length;
      if (len === 0) return 0;
      for (let step = 1; step <= len; step++) {
        const idx = (start + direction * step + len) % len;
        if (!optionStates[idx].isDisabled) return idx;
      }
      return start;
    },
    [optionStates],
  );

  const handleListboxKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (optionStates.length === 0) return;

      const key = e.key;

      if (key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        focusOptionAt(findNextEnabledIndex(activeIndex, 1));
        return;
      }

      if (key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        focusOptionAt(findNextEnabledIndex(activeIndex, -1));
        return;
      }

      if (key === "Home") {
        e.preventDefault();
        e.stopPropagation();
        focusOptionAt(findFirstEnabledIndex());
        return;
      }

      if (key === "End") {
        e.preventDefault();
        e.stopPropagation();
        focusOptionAt(findLastEnabledIndex());
        return;
      }

      if (key === "Enter" || key === " ") {
        e.preventDefault();
        e.stopPropagation();
        const current = optionStates[activeIndex];
        if (!current || current.isDisabled) return;
        toggleSelection(current.option.id);
        return;
      }

      if (key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        if (!hasNothingToClear) {
          handleCancel();
        }
      }
    },
    [
      activeIndex,
      findFirstEnabledIndex,
      findLastEnabledIndex,
      findNextEnabledIndex,
      focusOptionAt,
      handleCancel,
      hasNothingToClear,
      optionStates,
      toggleSelection,
    ],
  );

  const actionsWithDisabledState = useMemo((): Action[] => {
    return normalizedFooterActions.items.map((action) => {
      const isDisabledByValidation =
        (action.id === "confirm" && isConfirmDisabled) ||
        (action.id === "cancel" && hasNothingToClear);
      return {
        ...action,
        disabled: action.disabled || isDisabledByValidation,
        label:
          action.id === "confirm" &&
          selectionMode === "multi" &&
          selectedCount > 0
            ? `${action.label} (${selectedCount})`
            : action.label,
      };
    });
  }, [
    normalizedFooterActions.items,
    isConfirmDisabled,
    hasNothingToClear,
    selectionMode,
    selectedCount,
  ]);

  const isReceipt = choice !== undefined && choice !== null;
  const viewKey = isReceipt ? `receipt-${String(choice)}` : "interactive";

  return (
    <div key={viewKey} className="contents">
      {isReceipt ? (
        <OptionListConfirmation
          id={id}
          options={options}
          selectedIds={parseSelectionToIdSet(choice, selectionMode)}
          className={className}
        />
      ) : (
        <div
          className={cn(
            "@container/option-list flex w-full max-w-md min-w-80 flex-col gap-3",
            "text-foreground",
            className,
          )}
          data-slot="option-list"
          data-tool-ui-id={id}
          role="group"
          aria-label="Option list"
        >
          <div
            className={cn(
              "group/list bg-card flex w-full flex-col overflow-hidden rounded-2xl border px-4 py-1.5 shadow-xs",
            )}
            role="listbox"
            aria-multiselectable={selectionMode === "multi"}
            onKeyDown={handleListboxKeyDown}
          >
            {optionStates.map(({ option, isSelected, isDisabled }, index) => {
              return (
                <Fragment key={option.id}>
                  {index > 0 && (
                    <Separator
                      className="transition-opacity [@media(hover:hover)]:[&:has(+_:hover)]:opacity-0 [@media(hover:hover)]:[.peer:hover+&]:opacity-0"
                      orientation="horizontal"
                    />
                  )}
                  <OptionItem
                    option={option}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    selectionMode={selectionMode}
                    isFirst={index === 0}
                    isLast={index === optionStates.length - 1}
                    tabIndex={index === activeIndex ? 0 : -1}
                    onFocus={() => setActiveIndex(index)}
                    buttonRef={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    onToggle={() => toggleSelection(option.id)}
                  />
                </Fragment>
              );
            })}
          </div>

          <div className="@container/actions">
            <ActionButtons
              actions={actionsWithDisabledState}
              align={normalizedFooterActions.align}
              confirmTimeout={normalizedFooterActions.confirmTimeout}
              onAction={handleFooterAction}
              onBeforeAction={
                hasCustomResponseActions ? onBeforeResponseAction : undefined
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}


import * as SeparatorPrimitive from "@radix-ui/react-separator"


function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        homeCTA: "rounded-full px-6 py-3 text-lg w-fit text-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };


/**
 * Tool UI conventions:
 * - Serializable schemas are JSON-safe (no callbacks/ReactNode/`className`).
 * - Schema: `SerializableXSchema`
 * - Parser: `parseSerializableX(input: unknown)`
 * - Actions: `responseActions`, `onResponseAction`, `onBeforeResponseAction`
 * - Root attrs: `data-tool-ui-id` + `data-slot`
 */

/**
 * Schema for tool UI identity.
 *
 * Every tool UI should have a unique identifier that:
 * - Is stable across re-renders
 * - Is meaningful (not auto-generated)
 * - Is unique within the conversation
 *
 * Format recommendation: `{component-type}-{semantic-identifier}`
 * Examples: "data-table-expenses-q3", "option-list-deploy-target"
 */
export const ToolUIIdSchema = z.string().min(1);

export type ToolUIId = z.infer<typeof ToolUIIdSchema>;

/**
 * Primary role of a Tool UI surface in a chat context.
 */
export const ToolUIRoleSchema = z.enum([
  "information",
  "decision",
  "control",
  "state",
  "composite",
]);

export type ToolUIRole = z.infer<typeof ToolUIRoleSchema>;

export const ToolUIReceiptOutcomeSchema = z.enum([
  "success",
  "partial",
  "failed",
  "cancelled",
]);

export type ToolUIReceiptOutcome = z.infer<typeof ToolUIReceiptOutcomeSchema>;

/**
 * Optional receipt metadata: a durable summary of an outcome.
 */
export const ToolUIReceiptSchema = z.object({
  outcome: ToolUIReceiptOutcomeSchema,
  summary: z.string().min(1),
  identifiers: z.record(z.string(), z.string()).optional(),
  at: z.string().datetime(),
});

export type ToolUIReceipt = z.infer<typeof ToolUIReceiptSchema>;

/**
 * Base schema for Tool UI payloads (id + optional role/receipt).
 */
export const ToolUISurfaceSchema = z.object({
  id: ToolUIIdSchema,
  role: ToolUIRoleSchema.optional(),
  receipt: ToolUIReceiptSchema.optional(),
});

export type ToolUISurface = z.infer<typeof ToolUISurfaceSchema>;

export const ActionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  /**
   * Canonical narration the assistant can use after this action is taken.
   *
   * Example: "I exported the table as CSV." / "I opened the link in a new tab."
   */
  sentence: z.string().optional(),
  confirmLabel: z.string().optional(),
  variant: z
    .enum(["default", "destructive", "secondary", "ghost", "outline"])
    .optional(),
  icon: z.custom<ReactNode>().optional(),
  loading: z.boolean().optional(),
  disabled: z.boolean().optional(),
  shortcut: z.string().optional(),
});

export type Action = z.infer<typeof ActionSchema>;

export const ActionButtonsPropsSchema = z.object({
  actions: z.array(ActionSchema).min(1),
  align: z.enum(["left", "center", "right"]).optional(),
  confirmTimeout: z.number().positive().optional(),
  className: z.string().optional(),
});

export const SerializableActionSchema = ActionSchema.omit({ icon: true });
export const SerializableActionsSchema = ActionButtonsPropsSchema.extend({
  actions: z.array(SerializableActionSchema),
}).omit({ className: true });

export interface ActionsConfig {
  items: Action[];
  align?: "left" | "center" | "right";
  confirmTimeout?: number;
}

export const SerializableActionsConfigSchema = z.object({
  items: z.array(SerializableActionSchema).min(1),
  align: z.enum(["left", "center", "right"]).optional(),
  confirmTimeout: z.number().positive().optional(),
});

export type SerializableActionsConfig = z.infer<
  typeof SerializableActionsConfigSchema
>;

export type SerializableAction = z.infer<typeof SerializableActionSchema>;



export type ActionsProp = ActionsConfig | Action[];

const NEGATORY_ACTION_IDS = new Set([
  "cancel",
  "dismiss",
  "skip",
  "no",
  "reset",
  "close",
  "decline",
  "reject",
  "back",
  "later",
  "not-now",
  "maybe-later",
]);

function inferVariant(action: Action): Action {
  if (action.variant) return action;
  if (NEGATORY_ACTION_IDS.has(action.id)) {
    return { ...action, variant: "ghost" };
  }
  return action;
}

export function normalizeActionsConfig(
  actions?: ActionsProp,
): ActionsConfig | null {
  if (!actions) return null;

  const rawItems = Array.isArray(actions) ? actions : (actions.items ?? []);

  if (rawItems.length === 0) {
    return null;
  }

  const items = rawItems.map(inferVariant);

  return Array.isArray(actions)
    ? { items }
    : {
        items,
        align: actions.align,
        confirmTimeout: actions.confirmTimeout,
      };
}


export interface ActionButtonsProps {
  actions: Action[];
  onAction: (actionId: string) => void | Promise<void>;
  onBeforeAction?: (actionId: string) => boolean | Promise<boolean>;
  confirmTimeout?: number;
  align?: "left" | "center" | "right";
  className?: string;
}

export function ActionButtons({
  actions,
  onAction,
  onBeforeAction,
  confirmTimeout = 3000,
  align = "right",
  className,
}: ActionButtonsProps) {
  const { actions: resolvedActions, runAction } = useActionButtons({
    actions,
    onAction,
    onBeforeAction,
    confirmTimeout,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        "@sm/actions:flex-row @sm/actions:flex-wrap @sm/actions:items-center @sm/actions:gap-2",
        align === "left" && "@sm/actions:justify-start",
        align === "center" && "@sm/actions:justify-center",
        align === "right" && "@sm/actions:justify-end",
        className,
      )}
    >
      {resolvedActions.map((action) => {
        const label = action.currentLabel;
        const variant = action.variant || "default";

        return (
          <Button
            key={action.id}
            variant={variant}
            onClick={() => runAction(action.id)}
            disabled={action.isDisabled}
            className={cn(
              "rounded-full px-4!",
              "justify-center",
              "min-h-11 w-full text-base",
              "@sm/actions:min-h-0 @sm/actions:w-auto @sm/actions:px-3 @sm/actions:py-2 @sm/actions:text-sm",
              action.isConfirming &&
                "ring-destructive ring-2 ring-offset-2 motion-safe:animate-pulse",
            )}
            aria-label={
              action.shortcut ? `${label} (${action.shortcut})` : label
            }
          >
            {action.isLoading && (
              <svg
                className="mr-2 h-4 w-4 motion-safe:animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {action.icon && !action.isLoading && (
              <span className="mr-2">{action.icon}</span>
            )}
            {label}
            {action.shortcut && !action.isLoading && (
              <kbd className="border-border bg-muted ml-2.5 hidden rounded-lg border px-2 py-0.5 font-mono text-xs font-medium sm:inline-block">
                {action.shortcut}
              </kbd>
            )}
          </Button>
        );
      })}
    </div>
  );
}



export type UseActionButtonsOptions = {
  actions: Action[];
  onAction: (actionId: string) => void | Promise<void>;
  onBeforeAction?: (actionId: string) => boolean | Promise<boolean>;
  confirmTimeout?: number;
};

export type UseActionButtonsResult = {
  actions: Array<
    Action & {
      currentLabel: string;
      isConfirming: boolean;
      isExecuting: boolean;
      isDisabled: boolean;
      isLoading: boolean;
    }
  >;
  runAction: (actionId: string) => Promise<void>;
  confirmingActionId: string | null;
  executingActionId: string | null;
};

export function useActionButtons(
  options: UseActionButtonsOptions,
): UseActionButtonsResult {
  const {
    actions,
    onAction,
    onBeforeAction,
    confirmTimeout = 3000,
  } = options;

  const [confirmingActionId, setConfirmingActionId] = useState<string | null>(
    null,
  );
  const [executingActionId, setExecutingActionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!confirmingActionId) return;
    const id = setTimeout(() => setConfirmingActionId(null), confirmTimeout);
    return () => clearTimeout(id);
  }, [confirmingActionId, confirmTimeout]);

  useEffect(() => {
    if (!confirmingActionId) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setConfirmingActionId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmingActionId]);

  const runAction = useCallback(
    async (actionId: string) => {
      const action = actions.find((a) => a.id === actionId);
      if (!action) return;

      const isAnyActionExecuting = executingActionId !== null;
      if (action.disabled || action.loading || isAnyActionExecuting) {
        return;
      }

      if (action.confirmLabel && confirmingActionId !== action.id) {
        setConfirmingActionId(action.id);
        return;
      }

      if (onBeforeAction) {
        const shouldProceed = await onBeforeAction(action.id);
        if (!shouldProceed) {
          setConfirmingActionId(null);
          return;
        }
      }

      try {
        setExecutingActionId(action.id);
        await onAction(action.id);
      } finally {
        setExecutingActionId(null);
        setConfirmingActionId(null);
      }
    },
    [actions, confirmingActionId, executingActionId, onAction, onBeforeAction],
  );

  const resolvedActions = useMemo(
    () =>
      actions.map((action) => {
        const isConfirming = confirmingActionId === action.id;
        const isThisActionExecuting = executingActionId === action.id;
        const isLoading = action.loading || isThisActionExecuting;
        const isDisabled =
          action.disabled || (executingActionId !== null && !isThisActionExecuting);
        const currentLabel =
          isConfirming && action.confirmLabel
            ? action.confirmLabel
            : action.label;

        return {
          ...action,
          currentLabel,
          isConfirming,
          isExecuting: isThisActionExecuting,
          isDisabled,
          isLoading,
        };
      }),
    [actions, confirmingActionId, executingActionId],
  );

  return {
    actions: resolvedActions,
    runAction,
    confirmingActionId,
    executingActionId,
  };
}


export const OptionListOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
  icon: z.custom<ReactNode>().optional(),
  disabled: z.boolean().optional(),
});

export const OptionListPropsSchema = z.object({
  /**
   * Unique identifier for this tool UI instance in the conversation.
   *
   * Used for:
   * - Assistant referencing ("the options above")
   * - Receipt generation (linking selections to their source)
   * - Narration context
   *
   * Should be stable across re-renders, meaningful, and unique within the conversation.
   *
   * @example "option-list-deploy-target", "format-selection"
   */
  id: ToolUIIdSchema,
  role: ToolUIRoleSchema.optional(),
  receipt: ToolUIReceiptSchema.optional(),
  options: z.array(OptionListOptionSchema).min(1),
  selectionMode: z.enum(["multi", "single"]).optional(),
  /**
   * Controlled selection value (advanced / runtime only).
   *
   * For Tool UI tool payloads, prefer `defaultValue` (initial selection) and
   * `choice` (receipt state). Controlled `value` is intentionally excluded
   * from `SerializableOptionListSchema` to avoid accidental "controlled but
   * non-interactive" states when an LLM includes `value` in args.
   */
  value: z.union([z.array(z.string()), z.string(), z.null()]).optional(),
  defaultValue: z.union([z.array(z.string()), z.string(), z.null()]).optional(),
  /**
   * When set, renders the component in receipt state showing the user's choice.
   *
   * In receipt state:
   * - Only the chosen option(s) are shown
   * - Response actions are hidden
   * - The component is read-only
   *
   * Use this with assistant-ui's `addResult` to show the outcome of a decision.
   *
   * @example
   * ```tsx
   * // In makeAssistantToolUI render:
   * if (result) {
   *   return <OptionList {...args} choice={result} />;
   * }
   * ```
   */
  choice: z.union([z.array(z.string()), z.string(), z.null()]).optional(),
  responseActions: z
    .union([z.array(ActionSchema), SerializableActionsConfigSchema])
    .optional(),
  minSelections: z.number().min(0).optional(),
  maxSelections: z.number().min(1).optional(),
});

export type OptionListSelection = string[] | string | null;

export type OptionListOption = z.infer<typeof OptionListOptionSchema>;

export type OptionListProps = Omit<
  z.infer<typeof OptionListPropsSchema>,
  "value" | "defaultValue" | "choice"
> & {
  /** @see OptionListPropsSchema.id */
  id: string;
  value?: OptionListSelection;
  defaultValue?: OptionListSelection;
  /** @see OptionListPropsSchema.choice */
  choice?: OptionListSelection;
  onChange?: (value: OptionListSelection) => void;
  onConfirm?: (value: OptionListSelection) => void | Promise<void>;
  onCancel?: () => void;
  responseActions?: ActionsProp;
  onResponseAction?: (actionId: string) => void | Promise<void>;
  onBeforeResponseAction?: (actionId: string) => boolean | Promise<boolean>;
  className?: string;
};

export const SerializableOptionListSchema = OptionListPropsSchema.omit({
  // Exclude controlled selection from tool/LLM payloads.
  value: true,
}).extend({
  options: z.array(OptionListOptionSchema.omit({ icon: true })),
  responseActions: z
    .union([z.array(SerializableActionSchema), SerializableActionsConfigSchema])
    .optional(),
});

export type SerializableOptionList = z.infer<
  typeof SerializableOptionListSchema
>;

export function parseSerializableOptionList(
  input: unknown,
): SerializableOptionList {
  return parseWithSchema(SerializableOptionListSchema, input, "OptionList");
}


import { z } from "zod";
import { cn } from "@/lib/utils";

function formatZodPath(path: Array<string | number | symbol>): string {
  if (path.length === 0) return "root";
  return path
    .map((segment) =>
      typeof segment === "number" ? `[${segment}]` : String(segment),
    )
    .join(".");
}

/**
 * Format Zod errors into a compact `path: message` string.
 */
export function formatZodError(error: z.ZodError): string {
  const parts = error.issues.map((issue) => {
    const path = formatZodPath(issue.path);
    return `${path}: ${issue.message}`;
  });

  return Array.from(new Set(parts)).join("; ");
}

/**
 * Parse unknown input and throw a readable error.
 */
export function parseWithSchema<T>(
  schema: z.ZodType<T>,
  input: unknown,
  name: string,
): T {
  const res = schema.safeParse(input);
  if (!res.success) {
    throw new Error(`Invalid ${name} payload: ${formatZodError(res.error)}`);
  }
  return res.data;
}
