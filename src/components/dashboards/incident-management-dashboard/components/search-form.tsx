import { CommandIcon, Search } from "lucide-react"

import { Label } from "./ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "./ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="pb-1 pt-2 pl-4 pr-2">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search"
            className="pl-8 bg-white! dark:bg-neutral-900! border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 h-9 rounded-lg"
          />
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 select-none" />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 pointer-events-none rounded-sm shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,1)] dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]">
            <span className="font-medium"><CommandIcon className="size-3" /></span>
            <span className="text-[12px] font-medium">K</span>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
