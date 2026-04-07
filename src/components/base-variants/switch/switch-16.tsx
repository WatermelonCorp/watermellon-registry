"use client";

import { useState } from "react";

import { HiSun, HiMoon } from "react-icons/hi";

import { Switch } from "@/components/ui/switch";

const Switch16 = () => {
  const [checked, setChecked] = useState(true);

  const toggleSwitch = () => setChecked((prev) => !prev);

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={checked ? "checked" : "unchecked"}
    >
      <span
        id="theme-light"
        className="group-data-[state=checked]:text-muted-foreground/70 cursor-pointer text-left text-sm font-medium"
        aria-controls="theme-toggle"
        onClick={() => setChecked(false)}
      >
        <HiSun className="size-5" />
      </span>

      <Switch
        id="theme-toggle"
        checked={checked}
        onCheckedChange={toggleSwitch}
        aria-labelledby="theme-dark theme-light"
        aria-label="Toggle between dark and light mode"
      />

      <span
        id="theme-dark"
        className="group-data-[state=unchecked]:text-muted-foreground/70 cursor-pointer text-right text-sm font-medium"
        aria-controls="theme-toggle"
        onClick={() => setChecked(true)}
      >
        <HiMoon className="size-5" />
      </span>
    </div>
  );
};

export default Switch16;
