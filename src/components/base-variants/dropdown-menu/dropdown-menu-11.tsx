"use client";

import { useState } from "react";
import {
  FaBell,
  FaBellSlash,
  FaVolumeLow,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const levels = [
  {
    value: "all",
    label: "All Notifications",
    icon: FaBell,
    color: "text-foreground",
  },
  {
    value: "important",
    label: "Important Only",
    icon: FaVolumeHigh,
    color: "text-amber-500 ",
  },
  {
    value: "mentions",
    label: "Mentions Only",
    icon: FaVolumeLow,
    color: "text-blue-500",
  },
  {
    value: "silent",
    label: "Silent Mode",
    icon: FaVolumeXmark,
    color: "text-muted-foreground",
  },
  {
    value: "off",
    label: "Turn Off",
    icon: FaBellSlash,
    color: "text-destructive",
  },
];

const DropdownMenu11 = () => {
  const [selected, setSelected] = useState("all");

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Notifications
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover sm:w-64 w-56 rounded-lg border p-1 shadow-md"
          align="start"
        >
          <DropdownMenuLabel className="px-1 pb-1 text-sm font-semibold">
            Notification Level
          </DropdownMenuLabel>

          <DropdownMenuGroup className="flex flex-col gap-0.5">
            {levels.map((item) => {
              const Icon = item.icon;
              const active = selected === item.value;

              return (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => setSelected(item.value)}
                  className={`group flex cursor-pointer items-center gap-2 rounded-sm p-1 transition-all  ${
                    active ? "bg-accent" : ""
                  }`}
                >
                  <Icon
                    className={`${item.color} transition-transform duration-200 ${
                      active ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />

                  <span className="flex-1 text-sm font-medium">
                    {item.label}
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu11;
