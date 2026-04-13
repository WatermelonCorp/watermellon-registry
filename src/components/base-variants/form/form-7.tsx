"use client";

import { FaCheckDouble, FaCommentDots } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  feedback: z
    .string()
    .min(30, "Please share a bit more detail (at least 30 characters).")
    .max(300, "Keep it concise (max 300 characters)."),
});

const Form7 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { feedback: "" },
  });

  function onSubmit() {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2 sm:w-110">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>
          Your input has been recorded. Thanks for helping us improve 🚀
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
        <FieldLabel className="flex items-center gap-2">
          <FaCommentDots className="text-muted-foreground" />
          Tell Us What You Think
        </FieldLabel>

        <FieldContent>
          <Textarea
            placeholder="Share your thoughts, ideas, or anything that could make your experience better..."
            {...form.register("feedback")}
            className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
          />
        </FieldContent>

        <FieldDescription>
          Your insights directly shape future improvements and features.
        </FieldDescription>

        <FieldError className="bg-destructive/10 border-destructive/50 rounded-sm border p-1 text-xs shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
          {form.formState.errors.feedback?.message}
        </FieldError>
      </Field>

      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm border border-black/5 shadow-xs transition-all text-shadow-xs active:scale-98"
      >
        Submit Feedback
      </Button>
    </form>
  );
};

export default Form7;
