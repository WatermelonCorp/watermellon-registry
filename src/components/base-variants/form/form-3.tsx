"use client";

import { FaCalendarAlt, FaCheckDouble } from "react-icons/fa";

import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

const FormSchema = z.object({
  dob: z.date().refine((val) => val !== undefined, {
    message: "Please select your date of birth.",
  }),
});

const Form3 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2 sm:w-100">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>Your personalized recommendations are ready 🎉</AlertTitle>
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
          <FaCalendarAlt className="text-muted-foreground" />
          Select Your Birth Date
        </FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="dob"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "bg-muted/50 w-full rounded-sm pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Choose your date</span>
                    )}
                    <FaCalendarAlt className="ml-auto opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="animate-in fade-in zoom-in-95 w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </FieldContent>

        <FieldDescription>
          Your date helps us personalize your experience and tailor content just
          for you.
        </FieldDescription>

        <FieldError className="text-destructive text-xs">
          {form.formState.errors.dob?.message}
        </FieldError>
      </Field>

      <Button
        type="submit"
        className="from-primary to-primary/70 flex w-full items-center justify-center gap-2 rounded-sm border border-black/10 bg-gradient-to-b shadow-sm transition-all text-shadow-xs active:scale-98"
      >
        Continue
      </Button>
    </form>
  );
};

export default Form3;
