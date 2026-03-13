'use client';


import * as React from 'react';
import { HoverCard as HoverCardPrime } from 'radix-ui';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
  type HTMLMotionProps,
  type SpringOptions,
} from 'motion/react';
import { cn } from '@/lib/utils';

type PreviewLinkCardProps = PreviewLinkCardPrimitiveProps;

function PreviewLinkCard(props: PreviewLinkCardProps) {
  return <PreviewLinkCardPrimitive {...props} />;
}

type PreviewLinkCardTriggerProps = PreviewLinkCardTriggerPrimitiveProps;

function PreviewLinkCardTrigger(props: PreviewLinkCardTriggerProps) {
  return <PreviewLinkCardTriggerPrimitive {...props} />;
}

type PreviewLinkCardContentProps = PreviewLinkCardContentPrimitiveProps;

function PreviewLinkCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: PreviewLinkCardContentProps) {
  return (
    <PreviewLinkCardPortalPrimitive>
      <PreviewLinkCardContentPrimitive
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 origin-(--radix-hover-card-content-transform-origin) rounded-md border shadow-md outline-hidden overflow-hidden',
          className,
        )}
        {...props}
      />
    </PreviewLinkCardPortalPrimitive>
  );
}

type PreviewLinkCardImageProps = PreviewLinkCardImagePrimitiveProps;

function PreviewLinkCardImage(props: PreviewLinkCardImageProps) {
  return <PreviewLinkCardImagePrimitive {...props} />;
}

export {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
  type PreviewLinkCardProps,
  type PreviewLinkCardTriggerProps,
  type PreviewLinkCardContentProps,
  type PreviewLinkCardImageProps,
};

type PreviewLinkCardContextType = {
  href: string;
  src?: string;
  width?: number;
  height?: number;
};

const [PreviewLinkCardProvider, usePreviewLinkCard] =
  getStrictContext<PreviewLinkCardContextType>('PreviewLinkCardContext');

type PreviewLinkCardPrimitiveProps = HoverCardPrimitiveProps & {
  href: string;
  src?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  colorScheme?: 'light' | 'dark';
};

function PreviewLinkCardPrimitive({
  href,
  src,
  width = 240,
  height = 135,
  deviceScaleFactor = 1,
  colorScheme = 'light',
  ...props
}: PreviewLinkCardProps) {
  const imageSrc =
    src ??
    `https://api.microlink.io/?${buildQueryString({
      url: href,
      screenshot: true,
      meta: false,
      embed: 'screenshot.url',
      colorScheme,
      'viewport.isMobile': true,
      'viewport.deviceScaleFactor': deviceScaleFactor,
      'viewport.width': width * 3,
      'viewport.height': height * 3,
    })}`;

  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageSrc;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [imageSrc]);

  return (
    <PreviewLinkCardProvider value={{ href, src: imageSrc, width, height }}>
      <HoverCardPrimitive data-slot="preview-link-card" {...props} />
    </PreviewLinkCardProvider>
  );
}

type PreviewLinkCardTriggerPrimitiveProps = HoverCardTriggerPrimitiveProps &
  React.ComponentProps<'a'>;

function PreviewLinkCardTriggerPrimitive({
  asChild,
  children,
  href: hrefProp,
  ...props
}: PreviewLinkCardTriggerProps) {
  const { href } = usePreviewLinkCard();

  return (
    <HoverCardTriggerPrimitive
      data-slot="preview-link-card-trigger"
      asChild
      {...props}
    >
      {asChild ? children : <a href={hrefProp ?? href}>{children}</a>}
    </HoverCardTriggerPrimitive>
  );
}

type PreviewLinkCardPortalProps = HoverCardPortalPrimitiveProps;

function PreviewLinkCardPortalPrimitive(props: PreviewLinkCardPortalProps) {
  return (
    <HoverCardPortalPrimitive data-slot="preview-link-card-portal" {...props} />
  );
}

function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>,
) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    sp.append(k, String(v));
  }
  return sp.toString();
}

type PreviewLinkCardContentPrimitiveProps = HoverCardContentProps &
  React.ComponentProps<'a'>;

function PreviewLinkCardContentPrimitive({
  side = 'top',
  sideOffset = 10,
  align = 'center',
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  asChild,
  children,
  href: hrefProp,
  style,
  ...props
}: PreviewLinkCardContentProps) {
  const { href } = usePreviewLinkCard();

  return (
    <HoverCardContentPrimitive
      data-slot="preview-link-card-content"
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      arrowPadding={arrowPadding}
      sticky={sticky}
      hideWhenDetached={hideWhenDetached}
      transition={transition}
      asChild={asChild}
      {...(asChild ? { style, ...props } : {})}
    >
      {asChild ? (
        children
      ) : (
        <a
          style={{
            display: 'block',
            ...style,
          }}
          href={hrefProp ?? href}
          {...props}
        >
          {children}
        </a>
      )}
    </HoverCardContentPrimitive>
  );
}

type PreviewLinkCardImagePrimitiveProps = Omit<
  React.ComponentProps<'img'>,
  'src' | 'width' | 'height'
>;

function PreviewLinkCardImagePrimitive({
  alt = 'preview image',
  ...props
}: PreviewLinkCardImageProps) {
  const { src, width, height } = usePreviewLinkCard();

  return <img src={src} width={width} height={height} alt={alt} {...props} />;
}


type HoverCardContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
  followCursor?: boolean | 'x' | 'y';
  followCursorSpringOptions?: SpringOptions;
};

const [HoverCardProvider, useHoverCard] =
  getStrictContext<HoverCardContextType>('HoverCardContext');

type HoverCardPrimitiveProps = React.ComponentProps<typeof HoverCardPrime.Root> & {
  followCursor?: boolean | 'x' | 'y';
  followCursorSpringOptions?: SpringOptions;
};

function HoverCardPrimitive({
  followCursor = false,
  followCursorSpringOptions = { stiffness: 200, damping: 17 },
  ...props
}: HoverCardPrimitiveProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <HoverCardProvider
      value={{
        isOpen,
        setIsOpen,
        x,
        y,
        followCursor,
        followCursorSpringOptions,
      }}
    >
      <HoverCardPrime.Root
        data-slot="hover-card"
        {...props}
        onOpenChange={setIsOpen}
      />
    </HoverCardProvider>
  );
}

type HoverCardTriggerPrimitiveProps = React.ComponentProps<
  typeof HoverCardPrime.Trigger
>;

function HoverCardTriggerPrimitive({ onMouseMove, ...props }: HoverCardTriggerPrimitiveProps) {
  const { x, y, followCursor } = useHoverCard();

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseMove?.(event);

    const target = event.currentTarget.getBoundingClientRect();

    if (followCursor === 'x' || followCursor === true) {
      const eventOffsetX = event.clientX - target.left;
      const offsetXFromCenter = (eventOffsetX - target.width / 2) / 2;
      x.set(offsetXFromCenter);
    }

    if (followCursor === 'y' || followCursor === true) {
      const eventOffsetY = event.clientY - target.top;
      const offsetYFromCenter = (eventOffsetY - target.height / 2) / 2;
      y.set(offsetYFromCenter);
    }
  };

  return (
    <HoverCardPrime.Trigger
      data-slot="hover-card-trigger"
      onMouseMove={handleMouseMove}
      {...props}
    />
  );
}

type HoverCardPortalPrimitiveProps = Omit<
  React.ComponentProps<typeof HoverCardPrime.Portal>,
  'forceMount'
>;

function HoverCardPortalPrimitive(props: HoverCardPortalPrimitiveProps) {
  const { isOpen } = useHoverCard();

  return (
    <AnimatePresence>
      {isOpen && (
        <HoverCardPrime.Portal
          forceMount
          data-slot="hover-card-portal"
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type HoverCardContentProps = React.ComponentProps<
  typeof HoverCardPrime.Content
> &
  HTMLMotionProps<'div'>;

function HoverCardContentPrimitive({
  align,
  alignOffset,
  side,
  sideOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  style,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}: HoverCardContentProps) {
  const { x, y, followCursor, followCursorSpringOptions } = useHoverCard();
  const translateX = useSpring(x, followCursorSpringOptions);
  const translateY = useSpring(y, followCursorSpringOptions);

  return (
    <HoverCardPrime.Content
      asChild
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
    >
      <motion.div
        key="hover-card-content"
        data-slot="hover-card-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={transition}
        style={{
          x:
            followCursor === 'x' || followCursor === true
              ? translateX
              : undefined,
          y:
            followCursor === 'y' || followCursor === true
              ? translateY
              : undefined,
          ...style,
        }}
        {...props}
      />
    </HoverCardPrime.Content>
  );
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
      throw new Error(`useContext must be used within ${name ?? 'a Provider'}`);
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
