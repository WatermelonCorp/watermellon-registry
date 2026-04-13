"use client";

import { useState } from "react";

import { FaCheckDouble, FaLayerGroup } from "react-icons/fa";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  HiPaintBrush,
  HiCodeBracket,
  HiMegaphone,
  HiBanknotes,
  HiCog6Tooth,
} from "react-icons/hi2";
import { FaHeadphones } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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

const categories = [
  { value: "design", label: "Design", icon: HiPaintBrush },
  { value: "development", label: "Development", icon: HiCodeBracket },
  { value: "marketing", label: "Marketing", icon: HiMegaphone },
  { value: "finance", label: "Finance", icon: HiBanknotes },
  { value: "operations", label: "Operations", icon: HiCog6Tooth },
  { value: "support", label: "Customer Support", icon: FaHeadphones },
];

const FormSchema = z.object({
  category: z.string().min(1, "Please select a category."),
});

const Form8 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [open, setOpen] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.custom(() => (
      <Alert className="border-success text-success flex items-center gap-2">
        <FaCheckDouble className="animate-pulse" />
        <AlertTitle>{data.category} selected successfully</AlertTitle>
      </Alert>
    ));
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-xs space-y-3"
    >
      <Field>
        <FieldLabel className="flex items-center gap-2">
          <FaLayerGroup className="text-muted-foreground" />
          Select Category
        </FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between rounded-sm transition-all hover:scale-[1.01]"
                  >
                    {field.value ? (
                      (() => {
                        const selected = categories.find(
                          (c) => c.value === field.value
                        );
                        if (!selected) return null;
                        const Icon = selected.icon;
                        return (
                          <span className="flex items-center gap-2">
                            <Icon className="size-4" />
                            {selected.label}
                          </span>
                        );
                      })()
                    ) : (
                      <span className="text-muted-foreground">
                        Select category...
                      </span>
                    )}
                    <ChevronsUpDownIcon className="opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-(--radix-popper-anchor-width) rounded-sm p-0">
                  <Command className="p-0">
                    <CommandInput
                      placeholder="Search category..."
                      className="rounded-sm p-0"
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>

                      <CommandGroup>
                        {categories.map((item) => {
                          const Icon = item.icon;
                          return (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={() => {
                                field.onChange(item.value);
                                setOpen(false);
                              }}
                              className="flex items-center justify-between rounded-sm"
                            >
                              <span className="flex items-center gap-2">
                                <Icon className="size-4" />
                                {item.label}
                              </span>

                              <CheckIcon
                                className={cn(
                                  "transition-all",
                                  field.value === item.value
                                    ? "scale-100 opacity-100"
                                    : "scale-75 opacity-0"
                                )}
                              />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </FieldContent>

        <FieldDescription>
          Choose the category that best fits your selection.
        </FieldDescription>

        <FieldError>{form.formState.errors.category?.message}</FieldError>
      </Field>

      <Button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm border border-black/5 shadow-xs transition-all text-shadow-xs active:scale-98"
      >
        Continue
      </Button>
    </form>
  );
};

export default Form8;
