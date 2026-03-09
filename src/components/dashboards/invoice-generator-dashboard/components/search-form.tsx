import { Search } from "lucide-react"

import { Label } from "./ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "./ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0 px-0">
        <SidebarGroupContent className="relative ">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search Anything"
            className="pl-10 h-12 placeholder:text-muted-foreground text-foreground tracking-tight placeholder:text-[15px] bg-secondary/50 rounded-xl border-border focus-visible:ring-0!"
          />
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
