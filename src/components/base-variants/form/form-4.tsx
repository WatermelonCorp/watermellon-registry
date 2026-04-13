"use client";

import { FaBell, FaCheckDouble, FaMoon, FaStar } from "react-icons/fa";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  mode: z.string().min(1, {
    message: "Please choose a mode to continue.",
  }),
});

const options = [
  {
    value: "focus",
    label: "Focus Mode",
    desc: "Minimize distractions and stay productive.",
    icon: FaStar,
  },
  {
    value: "balanced",
    label: "Balanced Mode",
    desc: "A mix of productivity and updates.",
    icon: FaBell,
  },
  {
    value: "silent",
    label: "Silent Mode",
    desc: "Pause all interruptions for deep work.",
    icon: FaMoon,
  },
];

const Form4 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { mode: "" },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>Mode set to {data.mode}</AlertTitle>
      </Alert>
    ));
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-xs space-y-6"
    >
      <Field>
        <FieldLabel>Choose Your Experience Mode</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="mode"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-1"
              >
                {options.map((opt) => {
                  const Icon = opt.icon;
                  const active = field.value === opt.value;

                  return (
                    <label
                      key={opt.value}
                      htmlFor={opt.value}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm border p-2 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)] ${active ? "border-primary bg-muted/50" : "hover:bg-muted/40"}`}
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={opt.value}
                        className=""
                      />

                      <div className="flex flex-1 items-center gap-1">
                        <Icon
                          className={`text-sm transition-all ${
                            active
                              ? "text-primary scale-110"
                              : "text-muted-foreground"
                          }`}
                        />

                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{opt.label}</p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>
            )}
          />
        </FieldContent>

        <FieldDescription>
          Select how you'd like the app to behave during your sessions.
        </FieldDescription>

        <FieldError>{form.formState.errors.mode?.message}</FieldError>
      </Field>

      <Button
        type="submit"
        className="from-primary to-primary/80 flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-b shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.3),inset_0px_-1px_0px_0px_rgba(0,0,0,0.3)] transition-all active:scale-98 dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.3)]"
      >
        Apply Mode
      </Button>
    </form>
  );
};

export default Form4;
