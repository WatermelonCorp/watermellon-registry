"use client";

import {
  FaFolderOpen,
  FaFileCirclePlus,
  FaClockRotateLeft,
  FaDownload,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownMenu5 = () => {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Workspace
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-popover w-64 rounded-lg border p-2 shadow-md"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FaFileCirclePlus className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:scale-110 group-hover:-rotate-6" />
              <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                New File
              </span>
              <DropdownMenuShortcut>⌘ N</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FaFolderOpen className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:scale-105" />
              <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                Open Project
              </span>
              <DropdownMenuShortcut>⌘ O</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FaClockRotateLeft className="text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:rotate-180" />
              <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                Recent
              </span>
              <DropdownMenuShortcut>⌘ R</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FaDownload className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:translate-y-[1px] group-hover:scale-105" />
              <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                Downloads
              </span>
              <DropdownMenuShortcut>⌘ ⇧ D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuGroup>
            <DropdownMenuItem className="group flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FaGear className="text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:rotate-90" />
              <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                Settings
              </span>
              <DropdownMenuShortcut>⌘ ,</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem className="group text-destructive focus:text-destructive flex cursor-pointer items-center gap-3 rounded-lg p-2">
              <FaRightFromBracket className="transition-all duration-200 group-hover:translate-x-1 group-hover:scale-110" />
              <span className="text-sm font-medium">Logout</span>
              <DropdownMenuShortcut>⌘ ⇧ Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu5;
