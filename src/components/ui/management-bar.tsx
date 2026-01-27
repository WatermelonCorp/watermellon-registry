'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Ban,
  X,
  Command,
  IdCard,
} from 'lucide-react';

import { motion, type Variants, type Transition, type HTMLMotionProps, type SpringOptions, type UseInViewOptions, useInView, useMotionValue, useSpring, MotionValue, useTransform } from 'motion/react';
import useMeasure from 'react-use-measure';

const TOTAL_PAGES = 10;

const BUTTON_MOTION_CONFIG = {
  initial: 'rest',
  whileHover: 'hover',
  whileTap: 'tap',
  variants: {
    rest: { maxWidth: '40px' },
    hover: {
      maxWidth: '140px',
      transition: { type: 'spring', stiffness: 200, damping: 35, delay: 0.15 },
    },
    tap: { scale: 0.95 },
  },
  transition: { type: 'spring', stiffness: 250, damping: 25 },
} as const;

const LABEL_VARIANTS: Variants = {
  rest: { opacity: 0, x: 4 },
  hover: { opacity: 1, x: 0, visibility: 'visible' },
  tap: { opacity: 1, x: 0, visibility: 'visible' },
};

const LABEL_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

function ManagementBar() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePrevPage = React.useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleNextPage = React.useCallback(() => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1);
  }, [currentPage]);

  return (
    <div className="@container/wrapper w-full flex justify-center">
      <div className="flex w-fit flex-col @xl/wrapper:flex-row items-center gap-y-2 rounded-2xl border border-border bg-background p-2 shadow-lg">
        <div className="mx-auto flex flex-col @lg/wrapper:flex-row shrink-0 items-center">
          <div className="flex h-10">
            <button
              disabled={currentPage === 1}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground disabled:text-muted-foreground/30 disabled:hover:text-muted-foreground/30"
              onClick={handlePrevPage}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="mx-2 flex items-center space-x-1 text-sm tabular-nums">
              <SlidingNumber
                className="text-foreground"
                padStart
                number={currentPage}
              />
              <span className="text-muted-foreground">/ {TOTAL_PAGES}</span>
            </div>
            <button
              disabled={currentPage === TOTAL_PAGES}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground disabled:text-muted-foreground/30 disabled:hover:text-muted-foreground/30"
              onClick={handleNextPage}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="mx-3 h-6 w-px bg-border rounded-full hidden @lg/wrapper:block" />

          <motion.div
            layout
            layoutRoot
            className="mx-auto flex flex-wrap space-x-2 sm:flex-nowrap"
          >
            <motion.button
              {...BUTTON_MOTION_CONFIG}
              className="flex h-10 items-center space-x-2 overflow-hidden whitespace-nowrap rounded-lg bg-neutral-200/60 dark:bg-neutral-600/80 px-2.5 py-2 text-neutral-600 dark:text-neutral-200"
              aria-label="Blacklist"
            >
              <Ban size={20} className="shrink-0" />
              <motion.span
                variants={LABEL_VARIANTS}
                transition={LABEL_TRANSITION}
                className="invisible text-sm"
              >
                Blacklist
              </motion.span>
            </motion.button>

            <motion.button
              {...BUTTON_MOTION_CONFIG}
              className="flex h-10 items-center space-x-2 overflow-hidden whitespace-nowrap rounded-lg bg-red-200/60 dark:bg-red-800/80 px-2.5 py-2 text-red-600 dark:text-red-300"
              aria-label="Reject"
            >
              <X size={20} className="shrink-0" />
              <motion.span
                variants={LABEL_VARIANTS}
                transition={LABEL_TRANSITION}
                className="invisible text-sm"
              >
                Reject
              </motion.span>
            </motion.button>

            <motion.button
              {...BUTTON_MOTION_CONFIG}
              className="flex h-10 items-center space-x-2 overflow-hidden whitespace-nowrap rounded-lg bg-green-200/60 dark:bg-green-800/80 px-2.5 py-2 text-green-600 dark:text-green-300"
              aria-label="Hire"
            >
              <IdCard size={20} className="shrink-0" />
              <motion.span
                variants={LABEL_VARIANTS}
                transition={LABEL_TRANSITION}
                className="invisible text-sm"
              >
                Hire
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        <div className="mx-3 hidden h-6 w-px bg-border @xl/wrapper:block rounded-full" />

        <motion.button
          whileTap={{ scale: 0.975 }}
          className="flex h-10 text-sm cursor-pointer items-center justify-center rounded-lg bg-teal-500 dark:bg-teal-600/80 px-3 py-2 text-white transition-colors duration-300 dark:hover:bg-teal-800 hover:bg-teal-600 w-full @xl/wrapper:w-auto"
        >
          <span className="mr-1 text-neutral-200">Move to:</span>
          <span>Interview I</span>
          <div className="mx-3 h-5 w-px bg-white/40 rounded-full" />
          <div className="flex items-center gap-1 rounded-md bg-white/20 px-1.5 py-0.5 -mr-1">
            <Command size={14} />E
          </div>
        </motion.button>
      </div>
    </div>
  );
}

export { ManagementBar };
type SlidingNumberRollerProps = {
  prevValue: number;
  value: number;
  place: number;
  transition: SpringOptions;
  delay?: number;
};

function SlidingNumberRoller({
  prevValue,
  value,
  place,
  transition,
  delay = 0,
}: SlidingNumberRollerProps) {
  const startNumber = Math.floor(prevValue / place) % 10;
  const targetNumber = Math.floor(value / place) % 10;
  const animatedValue = useSpring(startNumber, transition);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      animatedValue.set(targetNumber);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [targetNumber, animatedValue, delay]);

  const [measureRef, { height }] = useMeasure();

  return (
    <span
      ref={measureRef}
      data-slot="sliding-number-roller"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '1ch',
        overflowX: 'visible',
        overflowY: 'clip',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <span style={{ visibility: 'hidden' }}>0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <SlidingNumberDisplay
          key={i}
          motionValue={animatedValue}
          number={i}
          height={height}
          transition={transition}
        />
      ))}
    </span>
  );
}

type SlidingNumberDisplayProps = {
  motionValue: MotionValue<number>;
  number: number;
  height: number;
  transition: SpringOptions;
};

function SlidingNumberDisplay({
  motionValue,
  number,
  height,
  transition,
}: SlidingNumberDisplayProps) {
  const y = useTransform(motionValue, (latest) => {
    if (!height) return 0;
    const currentNumber = latest % 10;
    const offset = (10 + number - currentNumber) % 10;
    let translateY = offset * height;
    if (offset > 5) translateY -= 10 * height;
    return translateY;
  });

  if (!height) {
    return (
      <span style={{ visibility: 'hidden', position: 'absolute' }}>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      data-slot="sliding-number-display"
      style={{
        y,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      transition={{ ...transition, type: 'spring' }}
    >
      {number}
    </motion.span>
  );
}


type SlidingNumberProps = Omit<HTMLMotionProps<'span'>, 'children'> & {
  number: number;
  fromNumber?: number;
  onNumberChange?: (number: number) => void;
  padStart?: boolean;
  decimalSeparator?: string;
  decimalPlaces?: number;
  thousandSeparator?: string;
  transition?: SpringOptions;
  delay?: number;
  initiallyStable?: boolean;
} & UseIsInViewOptions;
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

function SlidingNumber({
  ref,
  number,
  fromNumber,
  onNumberChange,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  padStart = false,
  decimalSeparator = '.',
  decimalPlaces = 0,
  thousandSeparator,
  transition = { stiffness: 200, damping: 20, mass: 0.4 },
  delay = 0,
  initiallyStable = false,
  ...props
}: SlidingNumberProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const initialNumeric = Math.abs(Number(number));
  const prevNumberRef = React.useRef<number>(
    initiallyStable ? initialNumeric : 0,
  );

  const hasAnimated = fromNumber !== undefined;

  const motionVal = useMotionValue(
    initiallyStable ? initialNumeric : (fromNumber ?? 0),
  );
  const springVal = useSpring(motionVal, { stiffness: 90, damping: 50 });

  const skippedInitialWhenStable = React.useRef(false);

  React.useEffect(() => {
    if (!hasAnimated) return;
    if (initiallyStable && !skippedInitialWhenStable.current) {
      skippedInitialWhenStable.current = true;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (isInView) motionVal.set(number);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [hasAnimated, initiallyStable, isInView, number, motionVal, delay]);

  const [effectiveNumber, setEffectiveNumber] = React.useState<number>(
    initiallyStable ? initialNumeric : 0,
  );

  React.useEffect(() => {
    if (hasAnimated) {
      const inferredDecimals =
        typeof decimalPlaces === 'number' && decimalPlaces >= 0
          ? decimalPlaces
          : (() => {
              const s = String(number);
              const idx = s.indexOf('.');
              return idx >= 0 ? s.length - idx - 1 : 0;
            })();

      const factor = Math.pow(10, inferredDecimals);

      const unsubscribe = springVal.on('change', (latest: number) => {
        const newValue =
          inferredDecimals > 0
            ? Math.round(latest * factor) / factor
            : Math.round(latest);

        if (effectiveNumber !== newValue) {
          setEffectiveNumber(newValue);
          onNumberChange?.(newValue);
        }
      });
      return () => unsubscribe();
    } else {
      setEffectiveNumber(
        initiallyStable ? initialNumeric : !isInView ? 0 : initialNumeric,
      );
    }
  }, [
    hasAnimated,
    springVal,
    isInView,
    number,
    decimalPlaces,
    onNumberChange,
    effectiveNumber,
    initiallyStable,
    initialNumeric,
  ]);

  const formatNumber = React.useCallback(
    (num: number) =>
      decimalPlaces != null ? num.toFixed(decimalPlaces) : num.toString(),
    [decimalPlaces],
  );

  const numberStr = formatNumber(effectiveNumber);
  const [newIntStrRaw, newDecStrRaw = ''] = numberStr.split('.');

  const finalIntLength = padStart
    ? Math.max(
        Math.floor(Math.abs(number)).toString().length,
        newIntStrRaw.length,
      )
    : newIntStrRaw.length;

  const newIntStr = padStart
    ? newIntStrRaw.padStart(finalIntLength, '0')
    : newIntStrRaw;

  const prevFormatted = formatNumber(prevNumberRef.current);
  const [prevIntStrRaw = '', prevDecStrRaw = ''] = prevFormatted.split('.');
  const prevIntStr = padStart
    ? prevIntStrRaw.padStart(finalIntLength, '0')
    : prevIntStrRaw;

  const adjustedPrevInt = React.useMemo(() => {
    return prevIntStr.length > finalIntLength
      ? prevIntStr.slice(-finalIntLength)
      : prevIntStr.padStart(finalIntLength, '0');
  }, [prevIntStr, finalIntLength]);

  const adjustedPrevDec = React.useMemo(() => {
    if (!newDecStrRaw) return '';
    return prevDecStrRaw.length > newDecStrRaw.length
      ? prevDecStrRaw.slice(0, newDecStrRaw.length)
      : prevDecStrRaw.padEnd(newDecStrRaw.length, '0');
  }, [prevDecStrRaw, newDecStrRaw]);

  React.useEffect(() => {
    if (isInView || initiallyStable) {
      prevNumberRef.current = effectiveNumber;
    }
  }, [effectiveNumber, isInView, initiallyStable]);

  const intPlaces = React.useMemo(
    () =>
      Array.from({ length: finalIntLength }, (_, i) =>
        Math.pow(10, finalIntLength - i - 1),
      ),
    [finalIntLength],
  );
  const decPlaces = React.useMemo(
    () =>
      newDecStrRaw
        ? Array.from({ length: newDecStrRaw.length }, (_, i) =>
            Math.pow(10, newDecStrRaw.length - i - 1),
          )
        : [],
    [newDecStrRaw],
  );

  const newDecValue = newDecStrRaw ? parseInt(newDecStrRaw, 10) : 0;
  const prevDecValue = adjustedPrevDec ? parseInt(adjustedPrevDec, 10) : 0;

  return (
    <motion.span
      ref={localRef}
      data-slot="sliding-number"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
      {...props}
    >
      {isInView && Number(number) < 0 && (
        <span style={{ marginRight: '0.25rem' }}>-</span>
      )}

      {intPlaces.map((place, idx) => {
        const digitsToRight = intPlaces.length - idx - 1;
        const isSeparatorPosition =
          typeof thousandSeparator !== 'undefined' &&
          digitsToRight > 0 &&
          digitsToRight % 3 === 0;

        return (
          <React.Fragment key={`int-${place}`}>
            <SlidingNumberRoller
              prevValue={parseInt(adjustedPrevInt, 10)}
              value={parseInt(newIntStr ?? '0', 10)}
              place={place}
              transition={transition}
            />
            {isSeparatorPosition && <span>{thousandSeparator}</span>}
          </React.Fragment>
        );
      })}

      {newDecStrRaw && (
        <>
          <span>{decimalSeparator}</span>
          {decPlaces.map((place) => (
            <SlidingNumberRoller
              key={`dec-${place}`}
              prevValue={prevDecValue}
              value={newDecValue}
              place={place}
              transition={transition}
              delay={delay}
            />
          ))}
        </>
      )}
    </motion.span>
  );
}

export { SlidingNumber, type SlidingNumberProps };
