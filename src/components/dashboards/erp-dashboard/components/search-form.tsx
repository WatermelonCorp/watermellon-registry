import { Command, Search } from "lucide-react"

import { Label } from "./ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "./ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-1 px-4">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search"
            className="pl-9 bg-neutral-100 dark:bg-neutral-800! border-neutral-200 dark:border-none text-neutral-600 dark:text-neutral-400 placeholder:text-neutral-500 h-9 rounded-sm"
          />
          <Search className="pointer-events-none absolute top-1/2 left-3 size-[1.1rem] -translate-y-1/2 text-neutral-400 dark:text-neutral-500 select-none" />
          <div className="absolute right-[2.1rem] top-1/2 -translate-y-1/2 flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 size-5 rounded pointer-events-none">
            <Command className="size-3 text-neutral-500 dark:text-neutral-400" />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-medium text-neutral-600 dark:text-neutral-500 bg-neutral-200 dark:bg-neutral-700 size-5 justify-center rounded pointer-events-none">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">K</span>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
