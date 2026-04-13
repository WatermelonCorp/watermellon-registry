"use client";

import { useState } from "react";
import { HiSquares2X2, HiStar, HiPlus, HiCog6Tooth } from "react-icons/hi2";
import { HiChevronUpDown } from "react-icons/hi2";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiCheck } from "react-icons/hi";

const workspaces = [
  {
    id: 1,
    name: "Watermelonui",
    plan: "Pro Plan",
    members: 12,
    icon: "WU",
  },
  {
    id: 2,
    name: "Watermelon Showcase",
    plan: "Free Plan",
    members: 5,
    icon: "WS",
  },
  {
    id: 3,
    name: "Watermelon Studio",
    plan: "Startup Plan",
    members: 8,
    icon: "WS",
  },
];

const DropdownMenu14 = () => {
  const [selected, setSelected] = useState(workspaces[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-secondary flex w-[260px] items-center gap-3 rounded-lg px-2 py-2">
        <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold">
          {selected.icon}
        </div>

        <div className="flex flex-1 flex-col text-left leading-tight">
          <span className="text-sm font-semibold">{selected.name}</span>
          <span className="text-muted-foreground text-xs">{selected.plan}</span>
        </div>
        <div className="">
          <HiChevronUpDown className="size-6" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-[320px] rounded-lg p-2">
        <div className="px-2 py-2">
          <p className="text-sm font-semibold">Workspaces</p>
          <p className="text-muted-foreground text-xs">
            Switch between your workspaces
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex items-center gap-2 text-xs">
          <HiStar className="size-4" />
          Recent
        </DropdownMenuLabel>

        {[selected].map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => setSelected(ws)}
            className="hover:bg-accent/50! flex items-center gap-3 rounded-lg p-2"
          >
            <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold">
              {ws.icon}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{ws.name}</span>
              <span className="text-muted-foreground text-xs">
                {ws.members} members
              </span>
            </div>

            {selected.id === ws.id && (
              <HiCheck className="text-primary ml-auto size-4" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex items-center gap-2 text-xs">
          <HiSquares2X2 className="size-4" />
          All Workspaces
        </DropdownMenuLabel>

        {workspaces.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => setSelected(ws)}
            className="hover:bg-accent/50! flex items-center gap-3 rounded-lg p-2"
          >
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold">
              {ws.icon}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{ws.name}</span>
              <span className="text-muted-foreground text-xs">{ws.plan}</span>
            </div>

            <span className="text-muted-foreground ml-auto text-xs">
              {ws.members}
            </span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="hover:bg-accent/50! flex items-center gap-2 rounded-lg p-2">
          <HiPlus className="size-4" />
          Create Workspace
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-accent/50! flex items-center gap-2 rounded-lg p-2">
          <HiCog6Tooth className="size-4" />
          Manage Workspaces
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenu14;
