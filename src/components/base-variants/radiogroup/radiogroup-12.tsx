import { useId } from "react";

import { FaUser, FaCrown } from "react-icons/fa";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup12 = () => {
  const id = useId();

  return (
    <RadioGroup
      className="w-full max-w-96 justify-items-center sm:grid-cols-2"
      defaultValue="starter"
    >
      <div className="border-input has-data-[state=checked]:border-primary/60 has-data-[state=checked]:bg-accent/40 relative flex w-full max-w-50 flex-col items-center gap-3 rounded-lg border p-4 shadow-xs transition">
        <RadioGroupItem
          value="starter"
          id={`${id}-starter`}
          className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3"
          aria-describedby={`${id}-starter-description`}
        />
        <div className="grid grow justify-items-center gap-2 text-center">
          <FaUser className="text-muted-foreground size-5" />
          <Label
            htmlFor={`${id}-starter`}
            className="justify-center font-medium"
          >
            Starter
          </Label>
          <p
            id={`${id}-starter-description`}
            className="text-muted-foreground text-xs leading-snug"
          >
            Great for personal use and small tasks.
          </p>
        </div>
      </div>

      <div className="border-input has-data-[state=checked]:border-primary/60 has-data-[state=checked]:bg-accent/40 relative flex w-full max-w-50 flex-col items-center gap-3 rounded-lg border p-4 shadow-xs transition">
        <RadioGroupItem
          value="pro"
          id={`${id}-pro`}
          className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3"
          aria-describedby={`${id}-pro-description`}
        />
        <div className="grid grow justify-items-center gap-2 text-center">
          <FaCrown className="text-primary size-5" />
          <Label htmlFor={`${id}-pro`} className="justify-center font-medium">
            Pro
          </Label>
          <p
            id={`${id}-pro-description`}
            className="text-muted-foreground text-xs leading-snug"
          >
            Built for teams with advanced features.
          </p>
        </div>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup12;
