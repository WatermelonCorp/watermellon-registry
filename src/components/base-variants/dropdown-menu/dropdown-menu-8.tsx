"use client";

import {
  FaUser,
  FaBell,
  FaShieldHalved,
  FaCreditCard,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items = [
  { label: "Profile", icon: FaUser },
  { label: "Notifications", icon: FaBell },
  { label: "Security", icon: FaShieldHalved },
  { label: "Billing", icon: FaCreditCard },
  { label: "Settings", icon: FaGear },
];

const DropdownMenu8 = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-lg">
            Account
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-popover w-64 rounded-lg border p-1 shadow-md">
          <DropdownMenuLabel className="px-1 pb-1 text-sm font-semibold">
            My Account
          </DropdownMenuLabel>

          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                key={index}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-all"
              >
                <Icon className="text-muted-foreground group-hover:text-foreground transition-all duration-200 group-hover:scale-103" />

                <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                  {item.label}
                </span>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuItem className="group text-destructive focus:text-destructive mt-1 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1">
            <FaRightFromBracket className="transition-all duration-200 group-hover:translate-x-1" />
            <span className="text-sm font-medium">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu8;
