"use client";

import { useState } from "react";

import { HiMoon, HiSun } from "react-icons/hi2";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Switch17 = () => {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id="icon-label"
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Toggle switch"
      />
      <Label htmlFor="icon-label">
        <span className="sr-only">Toggle switch</span>
        {checked ? (
          <HiMoon className="size-4" aria-hidden="true" />
        ) : (
          <HiSun className="size-4" aria-hidden="true" />
        )}
      </Label>
    </div>
  );
};

export default Switch17;
