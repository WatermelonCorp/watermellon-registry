import { useId } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaUser, FaUsers, FaBuilding } from "react-icons/fa6";

const RadioGroup5 = () => {
  const id = useId();

  const items = [
    { value: "1", label: "Individual", price: "Free", icon: FaUser },
    { value: "2", label: "Team Workspace", price: "₹999/mo", icon: FaUsers },
    { value: "3", label: "Organization", price: "Custom", icon: FaBuilding },
  ];

  return (
    <RadioGroup
      className="w-full max-w-96 gap-0 -space-y-px rounded-md shadow-xs"
      defaultValue="2"
    >
      {items.map((item) => (
        <div
          key={`${id}-${item.value}`}
          className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent dark:has-data-[state=checked]:bg-card relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10 has-data-[state=checked]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),inset_0_-1px_2px_rgba(255,255,255,0.1)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                className="after:absolute after:inset-0"
                aria-label={`plan-radio-${item.value}`}
                aria-describedby={`${`${id}-${item.value}`}-price`}
              />
              <Label
                className="inline-flex items-center"
                htmlFor={`${id}-${item.value}`}
              >
                <item.icon className="text-muted-foreground shrink-0" />
                {item.label}
                {item.value === "2" && (
                  <Badge className="rounded-sm px-1.5 py-px text-xs hidden sm:block">
                    Best Seller
                  </Badge>
                )}
              </Label>
            </div>
            <div
              id={`${`${id}-${item.value}`}-price`}
              className="text-muted-foreground text-xs leading-[inherit]"
            >
              {item.price}
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroup5;
