import React from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { Button } from "./ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible"

export const FilterSection = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full border-[1.3px] rounded-lg bg-neutral-200/20 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 px-1">
            <CollapsibleTrigger asChild className={`h-fit ${isOpen ? "" : "pb-2"} px-0`}>
                <Button variant="ghost" className="w-full justify-between items-center px-2! hover:bg-transparent dark:hover:bg-transparent font-medium text-xs text-neutral-500/90 dark:text-neutral-300 uppercase tracking transition-all active:scale-[0.99]">
                    {title}
                    <IconChevronDown className={`w-4 h-4 transition-transform duration-200 dark:text-neutral-500 ${isOpen ? "" : "-rotate-90"}`} />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 px-0!">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}
