"use client";

import { useId } from "react";

import { HiCreditCard, HiCalendarDays, HiLockClosed } from "react-icons/hi2";

import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputMask4 = () => {
  const id = useId();

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Label className="flex items-center gap-2">Card Details</Label>

      <div>
        <div className="group relative focus-within:z-10">
          <Input
            {...getCardNumberProps()}
            id={`number-${id}`}
            placeholder="1234 5678 9012 3456"
            className="peer focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/20 rounded-b-none pr-10 shadow-none focus-visible:ring-2"
          />

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {meta.cardType ? (
              <svg
                className="w-6 overflow-hidden transition-transform duration-200 group-focus-within:scale-110"
                {...getCardImageProps({
                  images: images as unknown as CardImages,
                })}
              />
            ) : (
              <HiCreditCard className="text-muted-foreground group-focus-within:text-foreground size-4 transition-all duration-200 group-focus-within:scale-110" />
            )}
          </div>
        </div>

        <div className="-mt-px flex">
          <div className="group relative min-w-0 flex-1 focus-within:z-10">
            <Input
              {...getExpiryDateProps()}
              id={`expiry-${id}`}
              placeholder="MM / YY"
              className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 rounded-t-none rounded-r-none pl-9 shadow-none focus-visible:ring-2"
            />
            <HiCalendarDays className="text-muted-foreground group-focus-within:text-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transition-all duration-200 group-focus-within:scale-110" />
          </div>

          <div className="group relative -ms-px min-w-0 flex-1 focus-within:z-10">
            <Input
              {...getCVCProps()}
              id={`cvc-${id}`}
              placeholder="CVC"
              className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 rounded-t-none rounded-l-none pl-9 shadow-none focus-visible:ring-2"
            />
            <HiLockClosed className="text-muted-foreground group-focus-within:text-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transition-all duration-200 group-focus-within:scale-110" />
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        Enter your card details securely
      </p>
    </div>
  );
};

export default InputMask4;
