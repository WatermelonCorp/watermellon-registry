import { useTaskStore, type Task } from "./store/task-store";

import { AlertCircle, Check, Ellipsis, X, Share2, Trash2, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function TaskDetailHeader() {
  const { tasks, selectedTaskId, selectTask } = useTaskStore();
  const task = tasks.find((t: Task) => t.id === selectedTaskId);
  if (!task) {
    return null;
  }
  return (
    <div className="hidden w-full h-12 items-center justify-between border-r border-b border-border bg-background px-3 md:flex    ">
      <div className="flex items-center  gap-1  ">
        <Button
          variant="ghost"
          size="sm"
          className=" p-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => selectTask(null)}
        >
          <X className="size-4 transition-transform hover:rotate-90" />
        </Button>
        <p className="text-md w-[250px] truncate ">{task.mainTitle}</p>
      </div>
      <div className="hidden items-center gap-1 mr-1 lg:flex">
        <Button
          variant="ghost"
          size="sm"
          className=" text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <Check className="size-4 hover:bg-muted/50 cursor-pointer" />
          <p>close as completed</p>
        </Button>
        <Separator className="h-4 w-1 bg-border mt-2 " orientation="vertical" />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="  text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <AlertCircle className="size-4" />
              <p>View Details</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>
                Detailed overview of task metadata and history.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 border-y border-border/50 my-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">ID</span>
                <span className="col-span-3 text-sm font-mono">{task.id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Created</span>
                <span className="col-span-3 text-sm">{task.date}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Tags</span>
                <div className="col-span-3 flex gap-2">
                  {task.tags.map((tag: { label: string; icon: string }) => (
                    <Badge key={tag.label} variant="outline" className="text-[10px]">{tag.label}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">Open full page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Separator className="h-4 w-1 bg-border mt-2 " orientation="vertical" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className=" text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Ellipsis className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Share2 className="size-3.5" />
              <span>Share task</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Copy className="size-3.5" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive cursor-pointer">
              <Trash2 className="size-3.5" />
              <span>Delete task</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
