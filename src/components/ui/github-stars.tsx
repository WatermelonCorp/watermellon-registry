'use client';

import * as React from 'react';
import {
  useSpring,
  useTransform,
  motion,
  useMotionValue,
  type MotionValue,
  type SpringOptions,
  type HTMLMotionProps,
  type UseInViewOptions,
  isMotionComponent,
  useInView,
  AnimatePresence,
} from 'motion/react';
import useMeasure from 'react-use-measure';

import { cva, type VariantProps } from 'class-variance-authority';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        accent: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/90',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonStarVariants = cva('', {
  variants: {
    variant: {
      default:
        'fill-neutral-700 stroke-neutral-700 dark:fill-neutral-300 dark:stroke-neutral-300',
      accent:
        'fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700',
      outline:
        'fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700',
      ghost:
        'fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type GitHubStarsButtonProps = Omit<
  ButtonPrimitiveProps & GithubStarsProps,
  'asChild' | 'children'
> &
  VariantProps<typeof buttonVariants>;

function GitHubStarsButton({
  className,
  username,
  repo,
  value,
  delay,
  inView,
  inViewMargin,
  inViewOnce,
  variant,
  size,
  ...props
}: GitHubStarsButtonProps) {
  return (
    <GithubStars
      asChild
      username={username}
      repo={repo}
      value={value}
      delay={delay}
      inView={inView}
      inViewMargin={inViewMargin}
      inViewOnce={inViewOnce}
    >
      <ButtonPrimitive
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <GithubStarsLogo />
        <GithubStarsNumber />
        <GithubStarsParticles className="text-yellow-500">
          <GithubStarsIcon
            icon={StarIcon}
            data-variant={variant}
            className={cn(buttonStarVariants({ variant }))}
            activeClassName="text-yellow-500"
            size={18}
          />
        </GithubStarsParticles>
      </ButtonPrimitive>
    </GithubStars>
  );
}

export { GitHubStarsButton, type GitHubStarsButtonProps };

type GithubStarsContextType = {
  stars: number;
  setStars: (stars: number) => void;
  currentStars: number;
  setCurrentStars: (stars: number) => void;
  isCompleted: boolean;
  isLoading: boolean;
};

const [GithubStarsProvider, useGithubStars] =
  getStrictContext<GithubStarsContextType>('GithubStarsContext');

type GithubStarsProps = WithAsChild<
  {
    children: React.ReactNode;
    username?: string;
    repo?: string;
    value?: number;
    delay?: number;
  } & UseIsInViewOptions &
    HTMLMotionProps<'div'>
>;

function GithubStars({
  ref,
  children,
  username,
  repo,
  value,
  delay = 0,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  asChild = false,
  ...props
}: GithubStarsProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    { inView, inViewOnce, inViewMargin },
  );

  const [stars, setStars] = React.useState(value ?? 0);
  const [currentStars, setCurrentStars] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const isCompleted = React.useMemo(
    () => currentStars === stars,
    [currentStars, stars],
  );

  const Component = asChild ? Slot : motion.div;

  React.useEffect(() => {
    if (value !== undefined && username && repo) return;
    if (!isInView) {
      setStars(0);
      setIsLoading(true);
      return;
    }

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
  }, [username, repo, value, isInView, delay]);

  return (
    <GithubStarsProvider
      value={{
        stars,
        currentStars,
        isCompleted,
        isLoading,
        setStars,
        setCurrentStars,
      }}
    >
      {!isLoading && (
        <Component ref={localRef} {...props}>
          {children}
        </Component>
      )}
    </GithubStarsProvider>
  );
}

type GithubStarsNumberProps = Omit<SlidingNumberProps, 'number' | 'fromNumber'>;

function GithubStarsNumber({
  padStart = true,
  ...props
}: GithubStarsNumberProps) {
  const { stars, setCurrentStars } = useGithubStars();

  return (
    <SlidingNumber
      number={stars}
      fromNumber={0}
      onNumberChange={setCurrentStars}
      padStart={padStart}
      {...props}
    />
  );
}

type GithubStarsIconProps<T extends React.ElementType> = {
  icon: React.ReactElement<T>;
  color?: string;
  activeClassName?: string;
} & React.ComponentProps<T>;

function GithubStarsIcon<T extends React.ElementType>({
  icon: Icon,
  color = 'currentColor',
  activeClassName,
  className,
  ...props
}: GithubStarsIconProps<T>) {
  const { stars, currentStars, isCompleted } = useGithubStars();
  const fillPercentage = (currentStars / stars) * 100;

  return (
    <div style={{ position: 'relative' }}>
      <Icon aria-hidden="true" className={cn(className)} {...props} />
      <Icon
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fill: color,
          stroke: color,
          clipPath: `inset(${100 - (isCompleted ? fillPercentage : fillPercentage - 10)}% 0 0 0)`,
        }}
        className={cn(className, activeClassName)}
        {...props}
      />
    </div>
  );
}

type GithubStarsParticlesProps = ParticlesEffectProps & {
  children: React.ReactElement;
  size?: number;
};

function GithubStarsParticles({
  children,
  size = 4,
  style,
  ...props
}: GithubStarsParticlesProps) {
  const { isCompleted } = useGithubStars();

  return (
    <Particles animate={isCompleted}>
      {children}
      <ParticlesEffect
        style={{
          backgroundColor: 'currentcolor',
          borderRadius: '50%',
          width: size,
          height: size,
          ...style,
        }}
        {...props}
      />
    </Particles>
  );
}

type GithubStarsLogoProps = React.SVGProps<SVGSVGElement>;

function GithubStarsLogo(props: GithubStarsLogoProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label="GitHub"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
    </svg>
  );
}


type ButtonPrimitiveProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function ButtonPrimitive({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonPrimitiveProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  );
}



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
