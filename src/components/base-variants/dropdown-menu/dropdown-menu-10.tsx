"use client";

import { useState } from "react";
import { FaCode, FaBug, FaBell, FaBolt } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { key: "autoSave", label: "Auto Save", icon: FaBolt },
  { key: "notifications", label: "Notifications", icon: FaBell },
  { key: "debugMode", label: "Debug Mode", icon: FaBug, disabled: true },
  { key: "codeHints", label: "Code Hints", icon: FaCode },
];

const DropdownMenu10 = () => {
  const [state, setState] = useState({
    autoSave: true,
    notifications: false,
    debugMode: false,
    codeHints: true,
  });

  const toggle = (key: string) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Preferences
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover w-64 rounded-lg border p-1 shadow-md"
          align="center"
        >
          <DropdownMenuLabel className="px-1 pb-1 text-sm font-semibold">
            Dev Preferences
          </DropdownMenuLabel>

          {options.map((item) => {
            const Icon = item.icon;
            const checked = state[item.key as keyof typeof state];

            return (
              <DropdownMenuCheckboxItem
                key={item.key}
                checked={checked}
                onCheckedChange={() => toggle(item.key)}
                disabled={item.disabled}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-1 data-[disabled]:opacity-40"
              >
                <Icon className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:scale-110" />

                <span className="flex-1 text-sm font-medium">{item.label}</span>
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu10;
