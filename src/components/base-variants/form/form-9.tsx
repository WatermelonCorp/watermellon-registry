"use client";

import { FaCheckDouble, FaEnvelopeOpenText } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

const Form9 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = () => {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>
          Invitation sent! Check your inbox to get started.
        </AlertTitle>
      </Alert>
    ));
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-xs space-y-6"
    >
      <Field>
        <FieldLabel className="flex items-center gap-2">
          <FaEnvelopeOpenText className="text-muted-foreground" />
          Invite a Teammate
        </FieldLabel>

        <FieldContent>
          <Input
            placeholder="Enter teammate's email"
            {...form.register("email")}
            className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 rounded-sm transition-all focus:scale-[1.01]"
          />
        </FieldContent>

        <FieldDescription>
          Send an invite to collaborate and start working together instantly.
        </FieldDescription>

        <FieldError className="bg-destructive/10 border-destructive/50 rounded-sm border p-1 text-xs shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
          {form.formState.errors.email?.message}
        </FieldError>
      </Field>

      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm transition-all active:scale-98"
      >
        Send Invite
      </Button>
    </form>
  );
};

export default Form9;
