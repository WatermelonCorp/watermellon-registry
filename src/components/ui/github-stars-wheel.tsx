'use client';

import * as React from 'react';
import { StarIcon } from 'lucide-react';
import { AnimatePresence,motion, type HTMLMotionProps, isMotionComponent, useInView, type UseInViewOptions, MotionValue, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

function percentageBetween(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

type GitHubStarsWheelProps = {
  username?: string;
  repo?: string;
  direction?: 'btt' | 'ttb';
  delay?: number;
  value?: number;
  step?: number;
} & Omit<
  ScrollingNumberContainerProps,
  'direction' | 'number' | 'step'
>;

function GitHubStarsWheel({
  username,
  repo,
  direction = 'btt',
  itemsSize = 35,
  sideItemsCount = 2,
  delay = 0,
  step = 100,
  value,
  className,
  ...props
}: GitHubStarsWheelProps) {
  const [stars, setStars] = React.useState(value ?? 0);
  const [currentStars, setCurrentStars] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const roundedStars = React.useMemo(
    () => Math.round(stars / step) * step,
    [stars, step],
  );
  const isCompleted = React.useMemo(
    () => currentStars === roundedStars,
    [currentStars, roundedStars],
  );
  const fillPercentage = React.useMemo(
    () => percentageBetween(currentStars, 0, roundedStars),
    [currentStars, roundedStars],
  );

  React.useEffect(() => {
    if (value !== undefined && username && repo) return;

    const timeout = setTimeout(() => {
      fetch(`https://api.github.com/repos/${username}/${repo}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && typeof data.stargazers_count === 'number') {
            setStars(data.stargazers_count);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }, delay);

    return () => clearTimeout(timeout);
  }, [username, repo, value, delay]);

  return (
    !isLoading && (
      <ScrollingNumberContainer
        key={direction}
        className={cn('w-28', className)}
        direction={direction}
        number={roundedStars}
        step={step}
        itemsSize={itemsSize}
        onNumberChange={setCurrentStars}
        {...props}
      >
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-t from-transparent to-background z-10"
          style={{
            height: `${itemsSize * sideItemsCount}px`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-background z-10"
          style={{
            height: `${itemsSize * sideItemsCount}px`,
          }}
        />
        <ScrollingNumber delay={delay}>
          <ScrollingNumberItems className="flex items-center justify-start pl-8" />
        </ScrollingNumber>
        <ScrollingNumberHighlight className="bg-accent/40 border rounded-md size-full flex items-center pl-2">
          <Particles animate={isCompleted}>
            <StarIcon
              aria-hidden="true"
              className="fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700 size-4"
            />
            <StarIcon
              aria-hidden="true"
              className="absolute top-0 left-0 size-4 fill-yellow-500 stroke-yellow-500"
              style={{
                clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
              }}
            />
            <ParticlesEffect
              delay={0.5}
              className="size-1 rounded-full bg-yellow-500"
            />
          </Particles>
        </ScrollingNumberHighlight>
      </ScrollingNumberContainer>
    )
  );
}

export { GitHubStarsWheel, type GitHubStarsWheelProps };


type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

type ParticlesContextType = {
  animate: boolean;
  isInView: boolean;
};

const [ParticlesProvider, useParticles] =
  getStrictContext<ParticlesContextType>('ParticlesContext');

type ParticlesProps = WithAsChild<
  Omit<HTMLMotionProps<'div'>, 'children'> & {
    animate?: boolean;
    children: React.ReactNode;
  } & UseIsInViewOptions
>;

function Particles({
  ref,
  animate = true,
  asChild = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  children,
  style,
  ...props
}: ParticlesProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    { inView, inViewOnce, inViewMargin },
  );

  const Component = asChild ? Slot : motion.div;

  return (
    <ParticlesProvider value={{ animate, isInView }}>
      <Component
        ref={localRef}
        style={{ position: 'relative', ...style }}
        {...props}
      >
        {children}
      </Component>
    </ParticlesProvider>
  );
}

type ParticlesEffectProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  side?: Side;
  align?: Align;
  count?: number;
  radius?: number;
  spread?: number;
  duration?: number;
  holdDelay?: number;
  sideOffset?: number;
  alignOffset?: number;
  delay?: number;
};

function ParticlesEffect({
  side = 'top',
  align = 'center',
  count = 6,
  radius = 30,
  spread = 360,
  duration = 0.8,
  holdDelay = 0.05,
  sideOffset = 0,
  alignOffset = 0,
  delay = 0,
  transition,
  style,
  ...props
}: ParticlesEffectProps) {
  const { animate, isInView } = useParticles();

  const isVertical = side === 'top' || side === 'bottom';
  const alignPct = align === 'start' ? '0%' : align === 'end' ? '100%' : '50%';

  const top = isVertical
    ? side === 'top'
      ? `calc(0% - ${sideOffset}px)`
      : `calc(100% + ${sideOffset}px)`
    : `calc(${alignPct} + ${alignOffset}px)`;

  const left = isVertical
    ? `calc(${alignPct} + ${alignOffset}px)`
    : side === 'left'
      ? `calc(0% - ${sideOffset}px)`
      : `calc(100% + ${sideOffset}px)`;

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top,
    left,
    transform: 'translate(-50%, -50%)',
  };

  const angleStep = (spread * (Math.PI / 180)) / Math.max(1, count - 1);

  return (
    <AnimatePresence>
      {animate &&
        isInView &&
        [...Array(count)].map((_, i) => {
          const angle = i * angleStep;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              style={{ ...containerStyle, ...style }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                x: `${x}px`,
                y: `${y}px`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration,
                delay: delay + i * holdDelay,
                ease: 'easeOut',
                ...transition,
              }}
              {...props}
            />
          );
        })}
    </AnimatePresence>
  );
}

export {
  Particles,
  ParticlesEffect,
  type ParticlesProps,
  type ParticlesEffectProps,
};



type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  'ref'
> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
} & DOMMotionProps<T>;

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...props
}: SlotProps<T>) {
  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = React.useMemo(
    () =>
      isAlreadyMotion
        ? (children.type as React.ElementType)
        : motion.create(children.type as React.ElementType),
    [isAlreadyMotion, children.type],
  );

  if (!React.isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props as AnyProps;

  const mergedProps = mergeProps(childProps, props);

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
  );
}

export {
  Slot,
  type SlotProps,
  type WithAsChild,
  type DOMMotionProps,
  type AnyProps,
};



interface UseIsInViewOptions {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
}

function useIsInView<T extends HTMLElement = HTMLElement>(
  ref: React.Ref<T>,
  options: UseIsInViewOptions = {},
) {
  const { inView, inViewOnce = false, inViewMargin = '0px' } = options;
  const localRef = React.useRef<T>(null);
  React.useImperativeHandle(ref, () => localRef.current as T);
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;
  return { ref: localRef, isInView };
}

export { useIsInView, type UseIsInViewOptions };


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
      throw new Error(`useContext must be used within ${name ?? 'a Provider'}`);
    }
    return ctx;
  };

  return [Provider, useSafeContext] as const;
}

export { getStrictContext };


const formatter = new Intl.NumberFormat('en-US');

function generateRange(
  max: number,
  step: number,
  sideItemsCount: number,
): number[] {
  const result: number[] = [];
  const end = max + sideItemsCount * step;
  for (let value = end; value >= 0; value -= step) {
    result.push(value);
  }
  return result;
}

type ScrollingNumberDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';

type ScrollingNumberContextType = {
  number: number;
  step: number;
  itemsSize: number;
  sideItemsCount: number;
  displayedItemsCount: number;
  isInView: boolean;
  direction: ScrollingNumberDirection;
  isVertical: boolean;
  range: number[];
  onNumberChange?: (value: number) => void;
};

const [ScrollingNumberProvider, useScrollingNumber] =
  getStrictContext<ScrollingNumberContextType>('ScrollingNumberContext');

type ScrollingNumberContainerProps = React.ComponentProps<'div'> & {
  number: number;
  step: number;
  itemsSize?: number;
  sideItemsCount?: number;
  direction?: ScrollingNumberDirection;
  onNumberChange?: (value: number) => void;
} & UseIsInViewOptions;

function ScrollingNumberContainer({
  ref,
  number,
  step,
  itemsSize = 30,
  sideItemsCount = 2,
  direction = 'btt',
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  onNumberChange,
  style,
  ...props
}: ScrollingNumberContainerProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const displayedItemsCount = React.useMemo(
    () => 1 + sideItemsCount * 2,
    [sideItemsCount],
  );
  const isVertical = React.useMemo(
    () => direction === 'btt' || direction === 'ttb',
    [direction],
  );
  const range = React.useMemo(
    () => generateRange(number, step, sideItemsCount),
    [number, step, sideItemsCount],
  );

  return (
    <ScrollingNumberProvider
      value={{
        number,
        step,
        itemsSize,
        sideItemsCount,
        displayedItemsCount,
        isInView,
        direction,
        isVertical,
        range,
        onNumberChange,
      }}
    >
      <div
        ref={localRef}
        data-slot="scrolling-number-container"
        data-direction={direction}
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: isVertical ? itemsSize * displayedItemsCount : undefined,
          width: !isVertical ? itemsSize * displayedItemsCount : undefined,
          ...style,
        }}
        {...props}
      />
    </ScrollingNumberProvider>
  );
}

type ScrollingNumberHighlightProps = React.ComponentProps<'div'>;

function ScrollingNumberHighlight({
  style,
  ...props
}: ScrollingNumberHighlightProps) {
  const { itemsSize, isVertical, direction } = useScrollingNumber();
  return (
    <div
      data-slot="scrolling-number-highlight"
      data-direction={direction}
      style={{
        position: 'absolute',
        height: isVertical ? itemsSize : undefined,
        width: !isVertical ? itemsSize : undefined,
        left: !isVertical ? '50%' : undefined,
        top: isVertical ? '50%' : undefined,
        transform: !isVertical ? 'translateX(-50%)' : 'translateY(-50%)',
        zIndex: 0,
        ...style,
      }}
      {...props}
    />
  );
}

type ScrollingNumberProps = HTMLMotionProps<'div'> & {
  delay?: number;
  onCompleted?: () => void;
};

function ScrollingNumber({
  transition = { stiffness: 90, damping: 30 },
  delay = 0,
  onCompleted,
  style,
  ...props
}: ScrollingNumberProps) {
  const {
    itemsSize,
    sideItemsCount,
    displayedItemsCount,
    isInView,
    direction,
    isVertical,
    range,
    step,
    number,
    onNumberChange,
  } = useScrollingNumber();

  const motionKey: 'x' | 'y' = isVertical ? 'y' : 'x';
  const initialOffset = itemsSize * sideItemsCount;
  const travel = itemsSize * (range.length - displayedItemsCount);

  let initialPosition: number;
  let finalPosition: number;

  switch (direction) {
    case 'btt':
      initialPosition = -initialOffset;
      finalPosition = travel;
      break;
    case 'ttb':
      initialPosition = initialOffset;
      finalPosition = -travel;
      break;
    case 'rtl':
      initialPosition = -initialOffset;
      finalPosition = travel;
      break;
    case 'ltr':
      initialPosition = initialOffset;
      finalPosition = -travel;
      break;
    default:
      initialPosition = -initialOffset;
      finalPosition = travel;
  }

  const posMotion: MotionValue<number> = useMotionValue(initialPosition);
  const posSpring = useSpring(posMotion, transition);

  React.useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      posMotion.set(finalPosition);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, finalPosition, posMotion, delay]);

  const currentIndex = useTransform(
    posSpring,
    (p) => Math.abs(p) / itemsSize + sideItemsCount,
  );
  const currentValue = useTransform(currentIndex, (idx) => idx * step);
  const snappedValue = useTransform(
    currentIndex,
    (idx) => Math.round(idx) * step,
  );

  const completedTransform = useTransform(
    currentValue,
    (val) => val >= number * 0.99,
  );

  React.useEffect(() => {
    const unsubscribe = completedTransform.on('change', (latest) => {
      if (latest) onCompleted?.();
    });
    return unsubscribe;
  }, [completedTransform, onCompleted]);

  React.useEffect(() => {
    const unsub = snappedValue.on('change', (val) => {
      const bounded = val < 0 ? 0 : val > number ? number : val;
      onNumberChange?.(bounded);
    });
    return unsub;
  }, [snappedValue, onNumberChange, number]);

  const directionMap: Record<
    ScrollingNumberDirection,
    React.CSSProperties['flexDirection']
  > = {
    btt: 'column',
    ttb: 'column-reverse',
    rtl: 'row',
    ltr: 'row-reverse',
  };

  return (
    <motion.div
      data-slot="scrolling-number"
      style={{
        position: 'absolute',
        top: direction === 'ttb' ? 0 : undefined,
        bottom: direction === 'btt' ? 0 : undefined,
        left: direction === 'ltr' ? 0 : undefined,
        right: direction === 'rtl' ? 0 : undefined,
        width: isVertical ? '100%' : undefined,
        height: !isVertical ? '100%' : undefined,
        display: 'flex',
        zIndex: 1,
        flexDirection: directionMap[direction],
        [motionKey]: posSpring,
        ...style,
      }}
      {...props}
    />
  );
}

type ScrollingNumberItemsProps = Omit<React.ComponentProps<'div'>, 'children'>;

function ScrollingNumberItems({ style, ...props }: ScrollingNumberItemsProps) {
  const { range, direction, itemsSize, isVertical } = useScrollingNumber();
  return range.map((value) => (
    <div
      key={value}
      data-slot="scrolling-number-item"
      data-value={value}
      data-direction={direction}
      style={{
        height: isVertical ? itemsSize : undefined,
        width: !isVertical ? itemsSize : undefined,
        ...style,
      }}
      {...props}
    >
      {formatter.format(value)}
    </div>
  ));
}

export {
  ScrollingNumberContainer,
  ScrollingNumber,
  ScrollingNumberHighlight,
  ScrollingNumberItems,
  useScrollingNumber,
  type ScrollingNumberContainerProps,
  type ScrollingNumberProps,
  type ScrollingNumberHighlightProps,
  type ScrollingNumberItemsProps,
  type ScrollingNumberDirection,
  type ScrollingNumberContextType,
};
