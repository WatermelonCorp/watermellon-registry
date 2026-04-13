"use client";

import {
  FaUser,
  FaGear,
  FaUsers,
  FaShareNodes,
  FaEnvelope,
  FaLink,
  FaCircleQuestion,
  FaRightFromBracket,
} from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownMenu12 = () => {
  return (
    <div className=" ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Workspace
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover sm:w-72  w-[220px] rounded-lg border p-1 shadow-md"
          align="end"
        >
          <DropdownMenuLabel className="flex items-center gap-3 rounded-lg p-1">
            <div className="relative">
              <Avatar className="h-9 w-9 rounded-md">
                <AvatarImage
                  src="https://github.com/ThePrimeagen.png"
                  alt="ThePrimeagen"
                  className="rounded-md"
                />
                <AvatarFallback className="text-xs">TP</AvatarFallback>
              </Avatar>
              <span className="border-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border bg-green-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-popover-foreground text-sm font-medium">
                ThePrimeagen
              </span>
              <span className="text-muted-foreground text-xs">
                prime@dev.io
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem className="group flex items-center gap-3 rounded-lg p-2">
              <FaUser className="text-muted-foreground group-hover:text-foreground transition-all group-hover:scale-110" />
              <span className="text-sm font-medium">My Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="group flex items-center gap-3 rounded-lg p-2">
              <FaUsers className="text-muted-foreground group-hover:text-foreground transition-all group-hover:scale-110" />
              <span className="text-sm font-medium">Team</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="group flex items-center gap-3 rounded-lg p-2">
              <FaGear className="text-muted-foreground group-hover:text-foreground transition-all group-hover:rotate-45" />
              <span className="text-sm font-medium">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="group flex items-center gap-3 rounded-lg p-2">
                <FaShareNodes className="text-muted-foreground group-hover:text-foreground transition-all group-hover:scale-110" />
                <span className="text-sm font-medium">Share Workspace</span>
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-popover rounded-sm border p-1 shadow-md">
                  <DropdownMenuItem className="flex items-center gap-1 rounded-sm p-1">
                    <FaEnvelope />
                    Email
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-1 rounded-sm p-1">
                    <FaLink />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem className="group flex items-center gap-3 rounded-lg p-2">
              <FaCircleQuestion className="text-muted-foreground group-hover:text-foreground transition-all group-hover:scale-110" />
              <span className="text-sm font-medium">Help Center</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="group text-destructive flex items-center gap-3 rounded-lg p-2 "
              variant="destructive"
            >
              <FaRightFromBracket className="transition-all group-hover:translate-x-1" />
              <span className="text-sm font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu12;
