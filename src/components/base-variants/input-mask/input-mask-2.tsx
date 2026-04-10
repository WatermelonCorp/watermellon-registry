"use client";

import { useId } from "react";

import { HiCreditCard } from "react-icons/hi2";

import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputMask2 = () => {
  const id = useId();
  const { meta, getCardNumberProps, getCardImageProps } = usePaymentInputs();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor={id}>Card Number</Label>

      <div className="relative">
        <Input
          {...getCardNumberProps()}
          id={id}
          placeholder="1234 5678 9012 3456"
          className="peer focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 pr-11 focus-visible:ring-2"
        />

        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
          {meta.cardType ? (
            <svg
              className="bg-muted/50 w-6 overflow-hidden shadow-md"
              {...getCardImageProps({
                images: images as unknown as CardImages,
              })}
            />
          ) : (
            <HiCreditCard className="size-4" />
          )}
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        Enter your card number as shown on your card
      </p>
    </div>
  );
};

export default InputMask2;
