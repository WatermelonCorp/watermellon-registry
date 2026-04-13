"use client";

import { FaCheckDouble } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const FormSchema = z.object({
  securityMode: z.boolean().refine((val) => val === true, {
    message: "Please enable security mode to continue.",
  }),
});

const Form5 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { securityMode: false },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>
          Security mode {data.securityMode ? "enabled" : "disabled"}{" "}
          successfully.
        </AlertTitle>
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
            name="securityMode"
            render={({ field }) => (
              <div className="hover:bg-muted/40 flex items-center justify-between rounded-sm border p-3 transition-all">
                <div className="flex items-center gap-2">
                  <div className="space-y-0.5">
                    <FieldLabel>Enable Secure Mode</FieldLabel>
                    <FieldDescription>
                      Adds an extra layer of protection to your account and
                      activity.
                    </FieldDescription>
                  </div>
                </div>

                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="bg-muted/50 self-start"
                />
              </div>
            )}
          />
        </FieldContent>

        <FieldError>{form.formState.errors.securityMode?.message}</FieldError>
      </Field>

      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm transition-all active:scale-95"
      >
        Continue
      </Button>
    </form>
  );
};

export default Form5;
