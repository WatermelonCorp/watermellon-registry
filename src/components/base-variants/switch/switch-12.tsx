import { FiShield, FiBell, FiMoon } from "react-icons/fi";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const settings = [
  { label: "Privacy Mode", icon: FiShield },
  { label: "Notifications", icon: FiBell },
  { label: "Dark Theme", icon: FiMoon },
];

const Switch12 = () => {
  return (
    <fieldset className="w-full max-w-96 space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">
        Manage your preferences:
      </legend>
      <ul className="flex w-full flex-col divide-y rounded-md border">
        {settings.map(({ label, icon: Icon }) => (
          <li key={label}>
            <Label
              htmlFor={label}
              className="flex items-center justify-between gap-2 px-5 py-3"
            >
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                {label}
              </span>
              <Switch id={label} />
            </Label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Switch12;
