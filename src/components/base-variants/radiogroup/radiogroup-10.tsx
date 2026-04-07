import { useId } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup10 = () => {
  const id = useId();

  const items = [
    { value: "1", label: "Starter", price: "Free" },
    { value: "2", label: "Growth", price: "$19/mo" },
    { value: "3", label: "Scale", price: "Custom" },
  ];

  return (
    <RadioGroup className="w-full max-w-96 gap-0 space-y-2" defaultValue="2">
      {items.map((item) => (
        <div
          key={`${id}-${item.value}`}
          className="border-input has-data-[state=checked]:bg-primary/10 dark:has-data-[state=checked]:bg-primary/20 has-data-[state=checked]:border-primary relative flex flex-col gap-3 rounded-full border p-4 shadow-[inset_0_-3px_4px_rgba(0,0,0,0.1),inset_0_2px_2px_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,0.05)] transition has-data-[state=checked]:z-10 dark:shadow-[inset_0_-3px_4px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.1),0_2px_6px_rgba(0,0,0,0.6)]"
        >
          <div className="group flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                aria-label={`plan-radio-${item.value}`}
                className="text-primary bg-background data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary after:absolute after:inset-0"
                aria-describedby={`${`${id}-${item.value}`}-price`}
              />
              <Label
                className="inline-flex items-center gap-2 font-medium"
                htmlFor={`${id}-${item.value}`}
              >
                {item.label}
                {item.value === "2" && (
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary rounded-md px-2 py-0.5 text-[10px] shadow-[inset_0px_1px_2px_rgba(255,255,255,0.1)]"
                  >
                    Popular
                  </Badge>
                )}
              </Label>
            </div>
            <div
              id={`${`${id}-${item.value}`}-price`}
              className="text-muted-foreground group-has-checked:text-foreground text-sm"
            >
              {item.price}
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroup10;
