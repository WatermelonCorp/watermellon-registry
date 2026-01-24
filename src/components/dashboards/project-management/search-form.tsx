import { Command, Search } from "lucide-react"

import { Label } from "@/component@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/component@/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search"
            className="pl-8 h-8 font-medium bg-neutral-300/20 border-neutral-400/50 !text-xs placeholder:text-xs"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          <div className="absolute top-1/2 right-2 flex items-center gap-0.5 -translate-y-1/2 text-xs text-neutral-500 bg-neutral-300/50 py-px px-1 rounded z-60">
            <Command className="size-3"/>
            <span className="font-medium">F</span>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}

