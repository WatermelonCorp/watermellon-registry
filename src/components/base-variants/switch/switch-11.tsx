import { useState } from "react";

import { FiRefreshCw } from "react-icons/fi";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Switch11 = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div
      data-state={checked ? "checked" : "unchecked"}
      className="group border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
    >
      <Switch
        id="auto-sync"
        checked={checked}
        onCheckedChange={setChecked}
        className="order-1 after:absolute after:inset-0 data-[size=default]:h-4 data-[size=default]:w-6 [&_span]:group-data-[size=default]/switch:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
        aria-describedby="auto-sync-description"
      />

      <div className="flex grow items-center gap-3">
        <FiRefreshCw className="text-muted-foreground rotate-0 self-start transition-transform duration-700 ease-in-out group-data-[state=checked]:rotate-[360deg]" />

        <div className="grid grow gap-2">
          <Label htmlFor="auto-sync">Auto Sync</Label>
          <p
            id="auto-sync-description"
            className="text-muted-foreground text-xs"
          >
            Automatically sync your data across devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Switch11;
