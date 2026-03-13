'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrime } from 'radix-ui';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { CircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type RadioGroupProps = RadioGroupPrimitiveProps;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive className={cn('grid gap-3', className)} {...props} />
  );
}

type RadioGroupItemProps = RadioGroupItemPrimitiveProps;

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupItemPrimitive
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupIndicatorPrimitive className="relative flex items-center justify-center">
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupIndicatorPrimitive>
    </RadioGroupItemPrimitive>
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
  type RadioGroupItemProps,
};



type RadioGroupContextType = {
  value: string;
  setValue: (value: string) => void;
};

type RadioGroupItemContextType = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
};

const [RadioGroupProvider, useRadioGroup] =
  getStrictContext<RadioGroupContextType>('RadioGroupContext');

const [RadioGroupItemProvider, useRadioGroupItem] =
  getStrictContext<RadioGroupItemContextType>('RadioGroupItemContext');

type RadioGroupPrimitiveProps = React.ComponentProps<typeof RadioGroupPrime.Root>;

function RadioGroupPrimitive(props: RadioGroupPrimitiveProps) {
  const [value, setValue] = useControlledState({
    value: props.value ?? undefined,
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
  });

  return (
    <RadioGroupProvider value={{ value, setValue }}>
      <RadioGroupPrime.Root
        data-slot="radio-group"
        {...props}
        onValueChange={setValue}
      />
    </RadioGroupProvider>
  );
}

type RadioGroupIndicatorProps = Omit<
  React.ComponentProps<typeof RadioGroupPrime.Indicator>,
  'asChild' | 'forceMount'
> &
  HTMLMotionProps<'div'>;

function RadioGroupIndicatorPrimitive({
  transition = { type: 'spring', stiffness: 200, damping: 16 },
  ...props
}: RadioGroupIndicatorProps) {
  const { isChecked } = useRadioGroupItem();

  return (
    <AnimatePresence>
      {isChecked && (
        <RadioGroupPrime.Indicator
          data-slot="radio-group-indicator"
          asChild
          forceMount
        >
          <motion.div
            key="radio-group-indicator-circle"
            data-slot="radio-group-indicator-circle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={transition}
            {...props}
          />
        </RadioGroupPrime.Indicator>
      )}
    </AnimatePresence>
  );
}

type RadioGroupItemPrimitiveProps = Omit<
  React.ComponentProps<typeof RadioGroupPrime.Item>,
  'asChild'
> &
  HTMLMotionProps<'button'>;

function RadioGroupItemPrimitive({
  value: valueProps,
  disabled,
  required,
  ...props
}: RadioGroupItemPrimitiveProps) {
  const { value } = useRadioGroup();
  const [isChecked, setIsChecked] = React.useState(value === valueProps);

  React.useEffect(() => {
    setIsChecked(value === valueProps);
  }, [value, valueProps]);

  return (
    <RadioGroupItemProvider value={{ isChecked, setIsChecked }}>
      <RadioGroupPrime.Item
        asChild
        value={valueProps}
        disabled={disabled}
        required={required}
      >
        <motion.button
          data-slot="radio-group-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        />
      </RadioGroupPrime.Item>
    </RadioGroupItemProvider>
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

