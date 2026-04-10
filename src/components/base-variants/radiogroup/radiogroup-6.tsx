import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup6 = () => {
  const id = useId();

  return (
    <RadioGroup className="w-full max-w-96 gap-2" defaultValue="starter">
      <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-primary/5 relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="starter"
          id={`${id}-starter`}
          aria-describedby={`${id}-starter-description`}
          className="size-5 after:absolute after:inset-0 [&_svg]:size-3"
        />
        <div className="grid grow gap-2">
          <Label htmlFor={`${id}-starter`} className="justify-between">
            Starter{" "}
            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
              Free
            </span>
          </Label>
          <p
            id={`${id}-starter-description`}
            className="text-muted-foreground text-xs"
          >
            Good for personal projects and basic usage.
          </p>
        </div>
      </div>

      <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-primary/5 relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none">
        <RadioGroupItem
          value="pro"
          id={`${id}-pro`}
          aria-describedby={`${id}-pro-description`}
          className="size-5 after:absolute after:inset-0 [&_svg]:size-3"
        />
        <div className="grid grow gap-2">
          <Label htmlFor={`${id}-pro`} className="justify-between">
            Pro{" "}
            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
              $10/mo
            </span>
          </Label>
          <p
            id={`${id}-pro-description`}
            className="text-muted-foreground text-xs"
          >
            Best for teams with more features and flexibility.
          </p>
        </div>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup6;
