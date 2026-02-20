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
                        className="pl-8 bg-neutral-500/5 dark:bg-neutral-500/10 border-border/50 rounded"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground select-none" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
