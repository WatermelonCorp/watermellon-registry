import {
  ListFilter,
  LayoutPanelLeft,
  User,
  BarChart2,
  Tag,
  CircleDot,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function TaskListHeader() {
  return (
    <div className="flex  h-12 items-center justify-between border-r border-b border-border bg-background px-1 shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 px-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center justify-center cursor-pointer active:scale-95"
          >
            <ListFilter className="size-3" />
            Filter

          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[180px] p-1 shadow-md border-muted"
        >
          <DropdownMenuLabel className="text-[11px] font-medium text-muted-foreground px-2 py-1.5 uppercase tracking-wider">
            Filter by
          </DropdownMenuLabel>

          <DropdownMenuItem className="text-[12px] gap-2 px-2 py-1.5 focus:bg-muted cursor-pointer">
            <CircleDot className="size-3.5 text-muted-foreground" />
            Status
          </DropdownMenuItem>

          <DropdownMenuItem className="text-[12px] gap-2 px-2 py-1.5 focus:bg-muted cursor-pointer">
            <User className="size-3.5 text-muted-foreground" />
            Assignee
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-muted/50" />

          <DropdownMenuItem className="text-[12px] gap-2 px-2 py-1.5 focus:bg-muted cursor-pointer">
            <BarChart2 className="size-3.5 text-muted-foreground" />
            Priority
          </DropdownMenuItem>

          <DropdownMenuItem className="text-[12px] gap-2 px-2 py-1.5 focus:bg-muted cursor-pointer">
            <Tag className="size-3.5 text-muted-foreground" />
            Label
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 px-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center justify-center cursor-pointer active:scale-95"
          >
            <LayoutPanelLeft className="size-3" />
            Display
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3" align="end">
          <PopoverHeader className="mb-2">
            <PopoverTitle className="text-xs uppercase tracking-wider text-muted-foreground">Display Settings</PopoverTitle>
          </PopoverHeader>
          <div className="grid gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px]">Density</Label>
              <Select defaultValue="comfortable">
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Density" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact" className="text-xs">Compact</SelectItem>
                  <SelectItem value="comfortable" className="text-xs">Comfortable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px]">Group By</Label>
              <Select defaultValue="status">
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Group by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status" className="text-xs">Status</SelectItem>
                  <SelectItem value="assignee" className="text-xs">Assignee</SelectItem>
                  <SelectItem value="priority" className="text-xs">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
