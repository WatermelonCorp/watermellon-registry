"use client";

import { FaCheckDouble } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Enter the complete 6-digit verification code.",
  }),
});

const Form1 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit() {
    toast.custom(() => (
      <Alert className="border-success text-success sm:w-100">
        <FaCheckDouble />
        <AlertTitle>Access granted. You're all set to continue.</AlertTitle>
      </Alert>
    ));
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-xs space-y-6"
    >
      <Field>
        <FieldLabel>Enter Verification Code</FieldLabel>
        <FieldContent>
          <Controller
            control={form.control}
            name="pin"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-sm *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot
                    index={0}
                    className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                  <InputOTPSlot
                    index={1}
                    className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                  <InputOTPSlot
                    index={2}
                    className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                </InputOTPGroup>
                <InputOTPSeparator className="text-primary" />
                <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-sm *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot
                    index={3}
                    className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                  <InputOTPSlot
                    index={4}
                    className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                  <InputOTPSlot
                    index={5}
                    className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </FieldContent>
        <FieldDescription>
          We’ve sent a secure code to your device. Enter it here to verify your
          identity.
        </FieldDescription>
        <FieldError className="bg-destructive/10 border-destructive/50 rounded-sm border p-1 text-xs shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
          {form.formState.errors.pin?.message}
        </FieldError>
      </Field>

      <Button
        type="submit"
        className="w-full rounded-sm shadow-[0px_1px_0.5px_rgba(41,41,41,0.04),0px_3px_3px_-1.5px_rgba(41,41,41,0.04),0px_6px_6px_-3px_rgba(41,41,41,0.04),0px_12px_12px_-6px_rgba(41,41,41,0.04),0px_24px_24px_-12px_rgba(41,41,41,0.04),0px_48px_48px_-24px_rgba(41,41,41,0.04),inset_0_1px_0px_0_rgba(255,255,255,0.3),inset_0_-1px_0px_0_rgba(0,0,0,0.3)]"
      >
        Verify Code
      </Button>
    </form>
  );
};

export default Form1;
