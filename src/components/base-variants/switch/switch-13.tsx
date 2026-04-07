import { FiMail } from "react-icons/fi";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Switch13 = () => {
  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:ring-4 has-data-[state=checked]:ring-primary/20  relative flex w-full items-start gap-2 rounded-md border p-4 outline-none">
      <Switch
        id="email-updates"
        className="order-1 after:absolute after:inset-0 data-[size=default]:h-4 data-[size=default]:w-6 [&_span]:group-data-[size=default]/switch:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
        aria-describedby="email-updates-description"
      />
      <div className="flex grow items-center gap-3">
        <FiMail className="text-muted-foreground size-4 shrink-0 self-start" />
        <div className="grid grow gap-2">
          <Label htmlFor="email-updates">Email Updates</Label>
          <p
            id="email-updates-description"
            className="text-muted-foreground text-xs"
          >
            Receive important updates and notifications via email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Switch13;
