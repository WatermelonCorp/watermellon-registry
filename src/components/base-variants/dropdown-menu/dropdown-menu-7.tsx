"use client";

import { FaMinus } from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const members = [
  {
    src: "https://github.com/ThePrimeagen.png",
    fallback: "TP",
    name: "ThePrimeagen",
    role: "Frontend Engineer",
    status: "online",
  },
  {
    src: "https://github.com/leerob.png",
    fallback: "LR",
    name: "Lee Robinson",
    role: "Platform Lead",
    status: "online",
  },
  {
    src: "https://github.com/t3dotgg.png",
    fallback: "T3",
    name: "Theo",
    role: "Fullstack Dev",
    status: "offline",
  },
  {
    src: "https://github.com/gaearon.png",
    fallback: "DA",
    name: "Dan Abramov",
    role: "React Core",
    status: "offline",
  },
];

const DropdownMenu7 = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Team
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover w-80 rounded-lg border p-1 shadow-md"
          align="center"
        >
          <DropdownMenuLabel className="px-2 pb-1 text-sm font-semibold">
            Team Members
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            {members.map((member, index) => (
              <DropdownMenuItem
                key={index}
                className="hover:bg-accent/50! flex cursor-pointer items-center gap-3 rounded-lg p-1"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.src} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.fallback}
                    </AvatarFallback>
                  </Avatar>

                  <span
                    className={`border-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border ${
                      member.status === "online"
                        ? "bg-green-500"
                        : "bg-muted-foreground"
                    }`}
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="text-popover-foreground text-sm font-medium">
                    {member.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {member.role}
                  </span>
                </div>

                <div className="bg-muted hover:bg-muted/70 flex h-7 w-7 items-center justify-center rounded-lg transition-all">
                  <FaMinus className="text-xs" />
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-2" />

          <DropdownMenuItem className="bg-transparent! p-0 hover:bg-transparent!">
            <Button
              variant={"ghost"}
              className="bg-primary hover:bg-primary/90! group flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 p-3 text-neutral-100! shadow-sm hover:text-neutral-200! dark:border-black/20"
            >
              Add Member
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu7;
