"use client";

import * as React from "react";
import { Tooltip as TooltipPrime } from "radix-ui";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type HTMLMotionProps,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

type TooltipProviderProps = TooltipProviderPrimitiveProps;

function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipProviderProps) {
  return <TooltipProviderPrimitive delayDuration={delayDuration} {...props} />;
}

type TooltipProps = TooltipPrimitiveProps & {
  delayDuration?: TooltipPrimitiveProps["delayDuration"];
};

function Tooltip({ delayDuration = 0, ...props }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipPrimitive {...props} />
    </TooltipProvider>
  );
}

type TooltipTriggerProps = TooltipTriggerPrimitiveProps;

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipTriggerPrimitive {...props} />;
}

type TooltipContentProps = TooltipContentPrimitiveProps;

function TooltipContent({
  className,
  sideOffset,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortalPrimitive>
      <TooltipContentPrimitive
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipArrowPrimitive className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipContentPrimitive>
    </TooltipPortalPrimitive>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
};

type TooltipContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
  followCursor?: boolean | "x" | "y";
  followCursorSpringOptions?: SpringOptions;
};

const [LocalTooltipProvider, useTooltip] =
  getStrictContext<TooltipContextType>("TooltipContext");

type TooltipProviderPrimitiveProps = React.ComponentProps<
  typeof TooltipPrime.Provider
>;

function TooltipProviderPrimitive(props: TooltipProviderPrimitiveProps) {
  return <TooltipPrime.Provider data-slot="tooltip-provider" {...props} />;
}

type TooltipPrimitiveProps = React.ComponentProps<typeof TooltipPrime.Root> & {
  followCursor?: boolean | "x" | "y";
  followCursorSpringOptions?: SpringOptions;
};

function TooltipPrimitive({
  followCursor = false,
  followCursorSpringOptions = { stiffness: 200, damping: 17 },
  ...props
}: TooltipPrimitiveProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <LocalTooltipProvider
      value={{
        isOpen,
        setIsOpen,
        x,
        y,
        followCursor,
        followCursorSpringOptions,
      }}
    >
      <TooltipPrime.Root
        data-slot="tooltip"
        {...props}
        onOpenChange={setIsOpen}
      />
    </LocalTooltipProvider>
  );
}

type TooltipTriggerPrimitiveProps = React.ComponentProps<
  typeof TooltipPrime.Trigger
>;

function TooltipTriggerPrimitive({
  onMouseMove,
  ...props
}: TooltipTriggerPrimitiveProps) {
  const { x, y, followCursor } = useTooltip();

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(event);

    const target = event.currentTarget.getBoundingClientRect();

    if (followCursor === "x" || followCursor === true) {
      const eventOffsetX = event.clientX - target.left;
      const offsetXFromCenter = (eventOffsetX - target.width / 2) / 2;
      x.set(offsetXFromCenter);
    }

    if (followCursor === "y" || followCursor === true) {
      const eventOffsetY = event.clientY - target.top;
      const offsetYFromCenter = (eventOffsetY - target.height / 2) / 2;
      y.set(offsetYFromCenter);
    }
  };

  return (
    <TooltipPrime.Trigger
      data-slot="tooltip-trigger"
      onMouseMove={handleMouseMove}
      {...props}
    />
  );
}

type TooltipPortalPrimitiveProps = Omit<
  React.ComponentProps<typeof TooltipPrime.Portal>,
  "forceMount"
>;

function TooltipPortalPrimitive(props: TooltipPortalPrimitiveProps) {
  const { isOpen } = useTooltip();

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrime.Portal forceMount data-slot="tooltip-portal" {...props} />
      )}
    </AnimatePresence>
  );
}

type TooltipContentPrimitiveProps = Omit<
  React.ComponentProps<typeof TooltipPrime.Content>,
  "forceMount" | "asChild"
> &
  HTMLMotionProps<"div">;

function TooltipContentPrimitive({
  onEscapeKeyDown,
  onPointerDownOutside,
  side,
  sideOffset,
  align,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  style,
  transition = { type: "spring", stiffness: 300, damping: 25 },
  className,
  children,
  ...props
}: TooltipContentPrimitiveProps) {
  const { x, y, followCursor, followCursorSpringOptions } = useTooltip();
  const translateX = useSpring(x, followCursorSpringOptions);
  const translateY = useSpring(y, followCursorSpringOptions);

  return (
    <TooltipPrime.Content
      forceMount
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      arrowPadding={arrowPadding}
      sticky={sticky}
      hideWhenDetached={hideWhenDetached}
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
    >
      <motion.div
        key="tooltip-content"
        data-slot="tooltip-content"
        className={className}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={transition}
        style={{
          x:
            followCursor === "x" || followCursor === true
              ? translateX
              : undefined,
          y:
            followCursor === "y" || followCursor === true
              ? translateY
              : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </motion.div>
    </TooltipPrime.Content>
  );
}

type TooltipArrowPrimitiveProps = React.ComponentProps<
  typeof TooltipPrime.Arrow
>;

function TooltipArrowPrimitive(props: TooltipArrowPrimitiveProps) {
  return <TooltipPrime.Arrow data-slot="tooltip-arrow" {...props} />;
}

function getStrictContext<T>(
  name?: string,
): readonly [
  ({
    value,
    children,
  }: {
    value: T;
    children?: React.ReactNode;
  }) => React.JSX.Element,
  () => T,
] {
  const Context = React.createContext<T | undefined>(undefined);

  const Provider = ({
    value,
    children,
  }: {
    value: T;
    children?: React.ReactNode;
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  const useSafeContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error(`useContext must be used within ${name ?? "a Provider"}`);
    }
    return ctx;
  };

  return [Provider, useSafeContext] as const;
}

export { getStrictContext };

interface CommonControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useControlledState<T, Rest extends any[] = []>(
  props: CommonControlledStateProps<T> & {
    onChange?: (value: T, ...args: Rest) => void;
  },
): readonly [T, (next: T, ...args: Rest) => void] {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = React.useState<T>(
    value !== undefined ? value : (defaultValue as T),
  );

  React.useEffect(() => {
    if (value !== undefined) setInternalState(value);
  }, [value]);

  const setState = React.useCallback(
    (next: T, ...args: Rest) => {
      setInternalState(next);
      onChange?.(next, ...args);
    },
    [onChange],
  );

  return [state, setState] as const;
}
