'use client';

import * as React from 'react';
import { Accordion as AccordionPrime } from 'radix-ui';
import { ChevronDownIcon } from 'lucide-react';

import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

type AccordionProps = AccordionPrimitiveProps;

function Accordion(props: AccordionProps) {
  return <AccordionPrimitive {...props} />;
}

type AccordionItemProps = AccordionItemPrimitiveProps;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionItemPrimitive
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = AccordionTriggerPrimitiveProps & {
  showArrow?: boolean;
};

function AccordionTrigger({
  className,
  children,
  showArrow = true,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionHeaderPrimitive className="flex">
      <AccordionTriggerPrimitive
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        )}
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  );
}

type AccordionContentProps = AccordionContentPrimitiveProps;

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionContentPrimitive {...props}>
      <div className={cn('text-sm pt-0 pb-4', className)}>{children}</div>
    </AccordionContentPrimitive>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
};




type AccordionContextType = {
  value: string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
};

type AccordionItemContextType = {
  value: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const [AccordionProvider, useAccordion] =
  getStrictContext<AccordionContextType>('AccordionContext');

const [AccordionItemProvider, useAccordionItem] =
  getStrictContext<AccordionItemContextType>('AccordionItemContext');

type AccordionPrimitiveProps = React.ComponentProps<typeof AccordionPrime.Root>;

function AccordionPrimitive(props: AccordionPrimitiveProps) {
  const [value, setValue] = useControlledState<string | string[] | undefined>({
    value: props?.value,
    defaultValue: props?.defaultValue,
    onChange: props?.onValueChange as (
      value: string | string[] | undefined,
    ) => void,
  });

  return (
    <AccordionProvider value={{ value, setValue }}>
      <AccordionPrime.Root
        data-slot="accordion"
        {...props}
        onValueChange={setValue}
      />
    </AccordionProvider>
  );
}

type AccordionItemPrimitiveProps = React.ComponentProps<typeof AccordionPrime.Item>;

function AccordionItemPrimitive(props: AccordionItemPrimitiveProps) {
  const { value } = useAccordion();
  const [isOpen, setIsOpen] = React.useState(
    value?.includes(props?.value) ?? false,
  );

  React.useEffect(() => {
    setIsOpen(value?.includes(props?.value) ?? false);
  }, [value, props?.value]);

  return (
    <AccordionItemProvider value={{ isOpen, setIsOpen, value: props.value }}>
      <AccordionPrime.Item data-slot="accordion-item" {...props} />
    </AccordionItemProvider>
  );
}

type AccordionHeaderPrimitiveProps = React.ComponentProps<
  typeof AccordionPrime.Header
>;

function AccordionHeaderPrimitive(props: AccordionHeaderPrimitiveProps) {
  return <AccordionPrime.Header data-slot="accordion-header" {...props} />;
}

type AccordionTriggerPrimitiveProps = React.ComponentProps<
  typeof AccordionPrime.Trigger
>;

function AccordionTriggerPrimitive(props: AccordionTriggerPrimitiveProps) {
  return (
    <AccordionPrime.Trigger data-slot="accordion-trigger" {...props} />
  );
}

type AccordionContentPrimitiveProps = Omit<
  React.ComponentProps<typeof AccordionPrime.Content>,
  'asChild' | 'forceMount'
> &
  HTMLMotionProps<'div'> & {
    keepRendered?: boolean;
  };

function AccordionContentPrimitive({
  keepRendered = false,
  transition = { duration: 0.35, ease: 'easeInOut' },
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItem();

  return (
    <AnimatePresence>
      {keepRendered ? (
        <AccordionPrime.Content asChild forceMount>
          <motion.div
            key="accordion-content"
            data-slot="accordion-content"
            initial={{ height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }}
            animate={
              isOpen
                ? { height: 'auto', opacity: 1, '--mask-stop': '100%', y: 0 }
                : { height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }
            }
            transition={transition}
            style={{
              maskImage:
                'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
              WebkitMaskImage:
                'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
              overflow: 'hidden',
            }}
            {...props}
          />
        </AccordionPrime.Content>
      ) : (
        isOpen && (
          <AccordionPrime.Content asChild forceMount>
            <motion.div
              key="accordion-content"
              data-slot="accordion-content"
              initial={{ height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }}
              animate={{
                height: 'auto',
                opacity: 1,
                '--mask-stop': '100%',
                y: 0,
              }}
              exit={{ height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }}
              transition={transition}
              style={{
                maskImage:
                  'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                WebkitMaskImage:
                  'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                overflow: 'hidden',
              }}
              {...props}
            />
          </AccordionPrime.Content>
        )
      )}
    </AnimatePresence>
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
