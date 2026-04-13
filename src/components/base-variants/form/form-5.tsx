"use client";

import { FaCheckDouble, FaRocket } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const FormSchema = z.object({
  agree: z.boolean().refine((val) => val === true, {
    message: "You need to confirm before continuing.",
  }),
});

const Form5 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { agree: false },
  });

  function onSubmit() {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>You’re all set! Let’s get started 🚀</AlertTitle>
      </Alert>
    ));
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-xs space-y-6"
    >
      <Field>
        <FieldContent>
          <Controller
            control={form.control}
            name="agree"
            render={({ field }) => (
              <div className="hover:bg-muted/40 flex items-start space-x-3 rounded-sm border p-3 transition-all">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(!!val)}
                  className="bg-muted/50"
                />

                <div className="space-y-1">
                  <FieldLabel className="flex items-center gap-2">
                    <FaRocket className="text-muted-foreground" />
                    Enable Your Workspace
                  </FieldLabel>

                  <FieldDescription>
                    Activate your workspace to unlock all features and start
                    building without limits.
                  </FieldDescription>
                </div>
              </div>
            )}
          />
        </FieldContent>

        <FieldError>{form.formState.errors.agree?.message}</FieldError>
      </Field>

      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm transition-all active:scale-98"
      >
        Get Started
      </Button>
    </form>
  );
};

export default Form5;
