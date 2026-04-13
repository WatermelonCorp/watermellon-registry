"use client";

import { FaRegEdit, FaRegCopy, FaRegStar, FaTrashAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownMenu4 = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Options
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="bg-popover w-56 rounded-lg border p-1 shadow-md"
        >
          <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg p-2">
            <FaRegEdit className="text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Edit</span>
              <span className="text-muted-foreground text-xs">
                Modify details
              </span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg p-2">
            <FaRegCopy className="text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Duplicate</span>
              <span className="text-muted-foreground text-xs">
                Create a copy
              </span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-lg p-2">
            <FaRegStar className="text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Favorite</span>
              <span className="text-muted-foreground text-xs">
                Pin for quick access
              </span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            className="text-destructive   flex cursor-pointer items-center gap-3 rounded-lg p-2"
            variant="destructive"
          >
            <FaTrashAlt />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Delete</span>
              <span className="text-xs opacity-70">Permanently remove</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu4;
