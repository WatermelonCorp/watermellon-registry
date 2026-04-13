"use client";

import { FaCheckDouble, FaEnvelope } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const accounts = [
  {
    email: "user1@gmail.com",
    avatar: "https://i.pravatar.cc/40?img=1",
    fallback: "U1",
  },
  {
    email: "user007@gmail.com",
    avatar: "https://i.pravatar.cc/40?img=2",
    fallback: "U7",
  },
  {
    email: "user69@outlook.com",
    avatar: "https://i.pravatar.cc/40?img=3",
    fallback: "U6",
  },
];

const FormSchema = z.object({
  email: z.string().email("Select a valid account"),
});

const Form2 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2 sm:w-110">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>
          Recovery link sent. Check your inbox to continue.
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
          <FaEnvelope className="text-muted-foreground" />
          Select Account
        </FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-muted/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 w-full rounded-sm border pl-1 text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05),0px_0px_4px_0px_rgba(0,0,0,0.1)] transition-all focus:scale-[1.01] focus-visible:ring-2! data-[active=true]:scale-105 dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
                  <SelectValue placeholder="Choose your account" />
                </SelectTrigger>

                <SelectContent className="rounded-sm">
                  {accounts.map((acc) => (
                    <SelectItem
                      key={acc.email}
                      value={acc.email}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={acc.avatar}
                            className="rounded-sm"
                          />
                          <AvatarFallback>{acc.fallback}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{acc.email}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FieldContent>

        <FieldDescription>
          Pick the account you want to recover. We'll send a secure reset link.
        </FieldDescription>

        <FieldError className="bg-destructive/10 border-destructive/50 rounded-sm border p-1 text-xs shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
          {form.formState.errors.email?.message}
        </FieldError>
      </Field>

      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm shadow-[0px_1px_0.5px_rgba(0,0,0,0.04),0px_3px_3px_-1.5px_rgba(0,0,0,0.04),0px_6px_6px_-3px_rgba(0,0,0,0.04),0px_12px_12px_-6px_rgba(0,0,0,0.04),0px_24px_24px_-12px_rgba(0,0,0,0.04),0px_48px_48px_-24px_rgba(0,0,0,0.04),inset_0_1px_0px_0_rgba(255,255,255,0.3),inset_0_-1px_1px_0_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02]"
      >
        Send Link
      </Button>
    </form>
  );
};

export default Form2;
