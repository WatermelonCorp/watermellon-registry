"use client";

import * as React from "react";
import { ArrowUpRight, Plus, Repeat2, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardTopbar() {
  const [network, setNetwork] = React.useState("ethereum");

  return (
    <header className="flex min-h-16 items-center justify-between gap-4">
      <div className="flex w-full max-w-sm items-center gap-2">
        <SidebarTrigger className="shrink-0 lg:hidden" />
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            aria-label="Search assets"
            className="border-border bg-muted h-9 w-full rounded-lg pl-9 text-sm"
            placeholder="search assets, pools, transaction..."
          />
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Select value={network} onValueChange={setNetwork}>
          <SelectTrigger className="bg-muted min-h-9 w-[210px] gap-3">
            <SelectValue placeholder="Select Network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">
              <div className="flex items-center gap-2">
                <Badge className="flex size-5 items-center justify-center rounded-full bg-indigo-500 p-0 text-white">
                  E
                </Badge>
                Ethereum Mainnet
              </div>
            </SelectItem>
            <SelectItem value="polygon">
              <div className="flex items-center gap-2">
                <Badge className="flex size-5 items-center justify-center rounded-full bg-purple-500 p-0 text-white">
                  P
                </Badge>
                Polygon
              </div>
            </SelectItem>
            <SelectItem value="arbitrum">
              <div className="flex items-center gap-2">
                <Badge className="flex size-5 items-center justify-center rounded-full bg-blue-500 p-0 text-white">
                  A
                </Badge>
                Arbitrum
              </div>
            </SelectItem>
            <SelectItem value="optimism">
              <div className="flex items-center gap-2">
                <Badge className="flex size-5 items-center justify-center rounded-full bg-red-500 p-0 text-white">
                  O
                </Badge>
                Optimism
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="bg-muted h-9">
          Deposit
          <Plus className="size-4" />
        </Button>
        <Button variant="outline" className="bg-muted h-9">
          Withdraw
          <ArrowUpRight className="size-4" />
        </Button>
        <Button className="bg-primary text-primary-foreground h-9 px-5 shadow-[inset_0_1px_6px_2px_rgba(255,255,255,0.1),inset_0_-1px_6px_2px_rgba(0,0,0,0.1)]">
          Swap
          <Repeat2 className="size-4" />
        </Button>
      </div>
    </header>
  );
}
