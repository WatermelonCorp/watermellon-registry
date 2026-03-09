import { Search } from "lucide-react"

import { Label } from "./ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
    return (
        <form {...props}>
            <SidebarGroup className="pt-2 pb-1">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Search"
                        className="pl-8 bg-neutral-500/5 dark:bg-neutral-500/10 border-border/50 rounded transition-colors duration-200 focus:bg-background focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 outline-none shadow-none"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground select-none" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
