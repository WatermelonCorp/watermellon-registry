import React, { useEffect, useRef, useState } from 'react';

import { CheckIcon, MailIcon } from 'lucide-react';

import { OTPInput, type SlotProps } from 'input-otp';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

const CORRECT_CODE = '11208';

const Dialog12: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [hasGuessed, setHasGuessed] = useState<boolean | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasGuessed) {
      closeButtonRef.current?.focus();
    }
  }, [hasGuessed]);

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault?.();
    inputRef.current?.select();
    await new Promise((r) => setTimeout(r, 100));
    setHasGuessed(value === CORRECT_CODE);
    setValue('');
    setTimeout(() => {
      inputRef.current?.blur();
    }, 20);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-2 font-medium text-zinc-700 shadow-xl transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          style={{
            boxShadow:
              '0 6px 32px 0 rgba(24,24,27,0.16), 0 1.5px 6px 0 rgba(24,24,27,0.10)',
          }}
        >
          Get OTP Code
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border bg-white p-6 shadow-2xl sm:max-w-md dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 shadow-lg dark:border-zinc-700 dark:bg-zinc-800',
              {
                'border-zinc-300 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-700':
                  hasGuessed,
              },
            )}
            aria-hidden="true"
          >
            {hasGuessed ? (
              <CheckIcon
                className="text-zinc-700 dark:text-zinc-200"
                strokeWidth={1}
              />
            ) : (
              <MailIcon
                className="text-zinc-400 dark:text-zinc-500"
                strokeWidth={1}
              />
            )}
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {hasGuessed ? 'OTP Verified' : 'Enter OTP Code'}
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-300">
              {hasGuessed ? (
                <span>
                  Your code was accepted.
                  <br />
                  Welcome! Verification complete.
                </span>
              ) : (
                <span>
                  Enter the 5-digit code sent to{' '}
                  <strong>exa**le@gmail.com</strong>.<br />
                  This helps keep your account secure.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {hasGuessed ? (
          <div className="mt-4 text-center">
            <DialogClose>
              <Button
                type="button"
                ref={closeButtonRef}
                className="rounded-2xl border-0 bg-zinc-800 px-6 py-2 font-semibold text-white shadow-xl transition-all duration-200 hover:bg-zinc-700"
              >
                Continue
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className="mt-2 space-y-4">
            <div className="flex justify-center">
              <OTPInput
                id="confirmation-code"
                ref={inputRef}
                value={value}
                onChange={setValue}
                containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                maxLength={5}
                onFocus={() => setHasGuessed(undefined)}
                render={({ slots }) => (
                  <div className="flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                )}
                onComplete={onSubmit}
              />
            </div>
            {hasGuessed === false && (
              <p
                className="text-center text-xs text-red-500 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                Invalid code. Please try again.
              </p>
            )}
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              Didn&apos;t get a code?{' '}
              <a
                className="text-zinc-700 hover:underline dark:text-zinc-200"
                href="#"
              >
                Resend
              </a>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'border-input flex size-9 items-center justify-center rounded-2xl border bg-zinc-50 font-medium text-zinc-900 shadow-md transition-[color,box-shadow] dark:bg-zinc-800 dark:text-zinc-100',
        {
          'z-10 border-zinc-500 ring-[3px] ring-zinc-200/50': props.isActive,
          'border-zinc-300 dark:border-zinc-700': !props.isActive,
        },
      )}
      style={{
        boxShadow: props.isActive
          ? '0 4px 16px 0 rgba(24,24,27,0.10)'
          : undefined,
      }}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export default Dialog12;
