import { FiCloud } from "react-icons/fi";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Switch14 = () => {
  return (
    <div className="border-input relative flex w-full items-start gap-2 rounded-md border bg-neutral-100 p-4 transition-all duration-200 ease-out outline-none has-data-[state=checked]:shadow-[0_5px_1px_0_rgba(0,0,0,1),inset_0_2px_1px_0_rgba(0,0,0,0.1)] has-data-[state=checked]:ring-2 has-data-[state=checked]:ring-black dark:bg-neutral-900 dark:has-data-[state=checked]:shadow-[0_5px_1px_0_rgba(255,255,255,1),inset_0_2px_1px_0_rgba(255,255,255,0.2)] dark:has-data-[state=checked]:ring-white">
      <Switch
        id="cloud-backup"
        className="order-1 bg-black after:absolute after:inset-0 data-[size=default]:h-4 data-[size=default]:w-6 [&_span]:group-data-[size=default]/switch:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
        aria-describedby="cloud-backup-description"
      />
      <div className="flex grow gap-3">
        <FiCloud className="text-muted-foreground size-4 shrink-0" />
        <div className="grid grow gap-2">
          <Label htmlFor="cloud-backup">Cloud Backup</Label>
          <p
            id="cloud-backup-description"
            className="text-muted-foreground text-xs"
          >
            Securely store your files, photos, and documents in the cloud.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Switch14;
