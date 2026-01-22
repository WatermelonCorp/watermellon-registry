'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';


import { cn } from '@/lib/utils';
import { useInView, type UseInViewOptions } from 'motion/react';


type CodeContextType = {
  code: string;
};

const [CodeProvider, useCode] =
  getStrictContext<CodeContextType>('CodeContext');

type CodeProps = React.ComponentProps<'div'> & {
  code: string;
};

function Code({ className, code, ...props }: CodeProps) {
  return (
    <CodeProvider value={{ code }}>
      <div
        className={cn(
          'relative flex flex-col overflow-hidden border bg-accent/50 rounded-lg',
          className,
        )}
        {...props}
      />
    </CodeProvider>
  );
}

type CodeHeaderProps = React.ComponentProps<'div'> & {
  icon?: React.ElementType;
  copyButton?: boolean;
};

function CodeHeader({
  className,
  children,
  icon: Icon,
  copyButton = false,
  ...props
}: CodeHeaderProps) {
  const { code } = useCode();

  return (
    <div
      className={cn(
        'bg-accent shrink-0 gap-x-2 border-b border-border/75 dark:border-border/50 text-sm flex text-muted-foreground items-center px-4 w-full h-10',
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
      {copyButton && (
        <CopyButton
          content={code}
          size="xs"
          variant="ghost"
          className="ml-auto w-auto h-auto p-2 -mr-2"
        />
      )}
    </div>
  );
}

type CodeBlockProps = Omit<CodeBlockPropsPrimitive, 'code'> & {
  cursor?: boolean;
};

function CodeBlock({ cursor, className, ...props }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const { code } = useCode();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <CodeBlockPrimitive
      ref={scrollRef}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      scrollContainerRef={scrollRef}
      className={cn(
        'relative text-sm p-4 overflow-auto',
        '[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-[13px] [&_code_.line]:!px-0',
        cursor &&
          "data-[done=false]:[&_.line:last-of-type::after]:content-['|'] data-[done=false]:[&_.line:last-of-type::after]:inline-block data-[done=false]:[&_.line:last-of-type::after]:w-[1ch] data-[done=false]:[&_.line:last-of-type::after]:-translate-px",
        className,
      )}
      code={code}
      {...props}
    />
  );
}

export {
  Code,
  CodeHeader,
  CodeBlock,
  type CodeProps,
  type CodeHeaderProps,
  type CodeBlockProps,
};


type CodeBlockPropsPrimitive = React.ComponentProps<'div'> & {
  code: string;
  lang: string;
  theme?: 'light' | 'dark';
  themes?: { light: string; dark: string };
  writing?: boolean;
  duration?: number;
  delay?: number;
  onDone?: () => void;
  onWrite?: (info: { index: number; length: number; done: boolean }) => void;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
} & UseIsInViewOptions;

function CodeBlockPrimitive({
  ref,
  code,
  lang,
  theme = 'light',
  themes = {
    light: 'github-light',
    dark: 'github-dark',
  },
  writing = false,
  duration = 5000,
  delay = 0,
  onDone,
  onWrite,
  scrollContainerRef,
  inView = false,
  inViewOnce = true,
  inViewMargin = '0px',
  ...props
}: CodeBlockPropsPrimitive) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const [visibleCode, setVisibleCode] = React.useState('');
  const [highlightedCode, setHighlightedCode] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    if (!visibleCode.length || !isInView) return;

    const loadHighlightedCode = async () => {
      try {
        const { codeToHtml } = await import('shiki');

        const highlighted = await codeToHtml(visibleCode, {
          lang,
          themes,
          defaultColor: theme,
        });

        setHighlightedCode(highlighted);
      } catch (e) {
        console.error(`Language "${lang}" could not be loaded.`, e);
      }
    };

    loadHighlightedCode();
  }, [lang, themes, writing, isInView, duration, delay, visibleCode, theme]);

  React.useEffect(() => {
    if (!writing) {
      setVisibleCode(code);
      onDone?.();
      onWrite?.({ index: code.length, length: code.length, done: true });
      return;
    }

    if (!code.length || !isInView) return;

    const characters = Array.from(code);
    let index = 0;
    const totalDuration = duration;
    const interval = totalDuration / characters.length;
    let intervalId: any;

    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < characters.length) {
          setVisibleCode(() => {
            const nextChar = characters.slice(0, index + 1).join('');
            onWrite?.({
              index: index + 1,
              length: characters.length,
              done: false,
            });
            index += 1;
            return nextChar;
          });
          localRef.current?.scrollTo({
            top: localRef.current?.scrollHeight,
            behavior: 'smooth',
          });
        } else {
          clearInterval(intervalId);
          setIsDone(true);
          onDone?.();
          onWrite?.({
            index: characters.length,
            length: characters.length,
            done: true,
          });
        }
      }, interval);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalId);
    };
  }, [code, duration, delay, isInView, writing, onDone, onWrite, localRef]);

  React.useEffect(() => {
    if (!writing || !isInView) return;
    const el =
      scrollContainerRef?.current ??
      (localRef.current?.parentElement as HTMLElement | null) ??
      (localRef.current as unknown as HTMLElement | null);

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    });
  }, [highlightedCode, writing, isInView, scrollContainerRef, localRef]);

  return (
    <div
      ref={localRef}
      data-slot="code-block"
      data-writing={writing}
      data-done={isDone}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      {...props}
    />
  );
}

export { CodeBlockPrimitive, type CodeBlockPropsPrimitive };



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



import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'motion/react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from './button';


const buttonVariants = cva(
  "flex items-center justify-center rounded-md transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        accent: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'size-9',
        xs: "size-7 [&_svg:not([class*='size-'])]:size-3.5 rounded-md",
        sm: 'size-8 rounded-md',
        lg: 'size-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type CopyButtonProps = Omit<any, 'children'> &
  VariantProps<typeof buttonVariants> & {
    content: string;
    copied?: boolean;
    onCopiedChange?: (copied: boolean, content?: string) => void;
    delay?: number;
  };

function CopyButton({
  className,
  content,
  copied,
  onCopiedChange,
  onClick,
  variant,
  size,
  delay = 3000,
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useControlledState({
    value: copied,
    onChange: onCopiedChange,
  });

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (copied) return;
      if (content) {
        navigator.clipboard
          .writeText(content)
          .then(() => {
            setIsCopied(true);
            onCopiedChange?.(true, content);
            setTimeout(() => {
              setIsCopied(false);
              onCopiedChange?.(false);
            }, delay);
          })
          .catch((error) => {
            console.error('Error copying command', error);
          });
      }
    },
    [onClick, copied, content, setIsCopied, onCopiedChange, delay],
  );

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      data-slot="copy-button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleCopy}
      {...props}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={isCopied ? 'check' : 'copy'}
          data-slot="copy-button-icon"
          initial={{ scale: 0, opacity: 0.4, filter: 'blur(4px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0, opacity: 0.4, filter: 'blur(4px)' }}
          transition={{ duration: 0.25 }}
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

export { CopyButton, buttonVariants, type CopyButtonProps };


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
