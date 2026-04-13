"use client";

import { useState } from "react";
import { FaClock } from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

const people = [
  "https://github.com/ThePrimeagen.png",
  "https://github.com/leerob.png",
  "https://github.com/t3dotgg.png",
];

const sessions = [
  {
    time: "08:00",
    title: "Deep Work",
    desc: "Focus on core feature",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    time: "10:30",
    title: "Team Sync",
    desc: "Quick alignment call",
    color: "bg-green-500/10 text-green-500",
  },
  {
    time: "01:00",
    title: "Code Review",
    desc: "PR feedback session",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    time: "04:00",
    title: "Build & Ship",
    desc: "Deploy + monitor",
    color: "bg-amber-500/10 text-amber-500",
  },
];

const DropdownMeeting13 = () => {
  const [active, setActive] = useState(sessions.map(() => true));

  const toggle = (index: number) => {
    setActive((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Focus Planner
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-popover sm:w-[420px] w-full rounded-lg border p-1 shadow-md"
          align="center"
        >
          <DropdownMenuLabel className="px-2 pb-2 text-sm font-semibold">
            Today’s Schedule
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            {sessions.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={(e) => e.preventDefault()}
                className="group hover:bg-accent/50! flex cursor-pointer items-center gap-3 rounded-lg p-2"
              >
                <div
                  className={`rounded-md px-2 py-1 text-xs font-medium ${item.color}`}
                >
                  {item.time}
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {item.desc}
                  </span>
                </div>

                <div className="flex -space-x-2">
                  {people.map((src, i) => (
                    <Avatar key={i} className="ring-background h-6 w-6 ring-2">
                      <AvatarImage src={src} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <FaClock className="text-muted-foreground text-xs" />
                  <Switch
                    checked={active[index]}
                    onCheckedChange={() => toggle(index)}
                  />
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMeeting13;
