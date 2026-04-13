"use client";

import { useState } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { value: "light", label: "Light", icon: FaSun },
  { value: "dark", label: "Dark", icon: FaMoon },
  { value: "system", label: "System", icon: FaDesktop, disabled: true },
];

const DropdownMenu9 = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Theme
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover w-60 rounded-lg border p-1 shadow-md"
          align="center"
        >
          <DropdownMenuLabel className="px-1 pb-1 text-sm font-semibold">
            Appearance
          </DropdownMenuLabel>

          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            {themes.map((item) => {
              const Icon = item.icon;

              return (
                <DropdownMenuRadioItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg p-1 data-[disabled]:opacity-40"
                >
                  <Icon className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:scale-110" />

                  <span className="flex-1 text-sm font-medium">
                    {item.label}
                  </span>
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu9;
