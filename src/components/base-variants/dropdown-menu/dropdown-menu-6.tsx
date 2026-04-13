"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const listItems = [
  {
    src: "https://github.com/ThePrimeagen.png",
    fallback: "TP",
    name: "ThePrimeagen",
    message: "just shipped a new vim config 🚀",
    time: "2m ago",
    newMessages: 2,
  },
  {
    src: "https://github.com/leerob.png",
    fallback: "LR",
    name: "Lee Robinson",
    message: "Next.js update is live",
    time: "10m ago",
    newMessages: 1,
  },
  {
    src: "https://github.com/gaearon.png",
    fallback: "DA",
    name: "Dan Abramov",
    message: "thinking about React again...",
    time: "1h ago",
    newMessages: null,
  },
  {
    src: "https://github.com/t3dotgg.png",
    fallback: "T3",
    name: "Theo (t3.gg)",
    message: "typesafety > everything",
    time: "3h ago",
    newMessages: 3,
  },
  {
    src: "https://github.com/sindresorhus.png",
    fallback: "SR",
    name: "Sindre Sorhus",
    message: "published 3 new packages today",
    time: "5h ago",
    newMessages: null,
  },
];

const DropdownMenu6 = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Dev Inbox
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover w-80 rounded-lg border p-1 shadow-md"
          align="center"
        >
          <DropdownMenuLabel className="px-2 pb-1 text-sm font-semibold">
            Messages
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            {listItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className="group dark:hover:bg-muted/50! flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all"
              >
                <Avatar className="h-9 w-9 transition-transform duration-200 group-hover:scale-105 ">
                  <AvatarImage src={item.src} alt={item.name} />
                  <AvatarFallback className="text-xs">
                    {item.fallback}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="text-popover-foreground text-sm font-medium">
                    {item.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {item.message}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-muted-foreground text-xs">
                    {item.time}
                  </span>

                  {item.newMessages && (
                    <Badge className="h-5 min-w-5 rounded-sm px-1 text-[10px] text-white! ">
                      {item.newMessages}
                    </Badge>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu6;
