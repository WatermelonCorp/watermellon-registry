import { useTaskStore, type Task, type SubTask } from "./store/task-store";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  CornerDownRight,
  Calendar,
  ChevronsUp,
  BadgeCent,
  Inbox,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function TaskList() {
  const { tasks, selectedTaskId, selectTask, toggleSubTask } = useTaskStore();




  return (
    <div className="flex flex-col h-full bg-foreground/5 dark:bg-black overflow-hidden">
      <TooltipProvider delayDuration={300}>
        <ScrollArea className="flex-1 min-h-0 w-full">
          <div className="p-2.5 space-y-1">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] px-6 text-center">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Inbox className="size-6 text-muted-foreground/60" />
                </div>
                <h3 className="text-sm font-medium text-foreground">No tasks found</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  Try adjusting your filters or create a new task to get started.
                </p>
                <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
                  <Plus className="size-3.5" />
                  New Task
                </Button>
              </div>
            ) : (
              tasks.map((task: Task) => (
                <div key={task.id} className="flex flex-col">
                  <div
                    onClick={() => selectTask(task.id)}
                    className={cn(
                      "p-3 rounded-none border cursor-pointer transition-colors duration-200 mb-1 shadow-card group/card",
                      selectedTaskId === task.id
                        ? "border-blue-400 bg-card ring-1 ring-blue-400/20"
                        : "bg-card hover:bg-muted/40 border-border"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                        <span>{task.id}</span>
                        <span>/</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-muted-foreground" />
                          {task.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-500">
                        <ChevronsUp className="size-4 stroke-3" />
                        <BadgeCent className="size-4 stroke-3" />
                      </div>
                    </div>

                    <h3 className="text-sm font-medium leading-tight mb-2.5 break-all line-clamp-3">
                      {task.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <div className="size-5 border rounded-xs flex items-center justify-center shrink-0">
                        <div className="size-2 rounded-full border border-muted-foreground" />
                      </div>
                      <div className="flex gap-1.5 overflow-hidden">
                        {task.tags.map((tag: { label: string; icon: string }) => (
                          <Tooltip key={tag.label}>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="outline"
                                className="px-1.5 text-xs font-normal gap-1 bg-card rounded-none shrink-0 cursor-help hover:bg-muted/50 transition-colors"
                              >
                                <span className="size-3 rounded-xs bg-muted flex items-center justify-center text-[8px] font-bold">
                                  {tag.icon}
                                </span>
                                {tag.label}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                              Filter by {tag.label}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col gap-1 mb-3">
                    {task.subTasks.map((subTask: SubTask) => (
                      <div
                        key={subTask.id}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-none bg-muted shadow-card transition-colors hover:bg-muted/80"
                      >
                        <CornerDownRight className="size-3.5 text-muted-foreground/50 shrink-0" />

                        <div className="flex items-center gap-2 flex-1">
                          <Checkbox
                            checked={subTask.completed}
                            onCheckedChange={() =>
                              toggleSubTask(task.id, subTask.id)
                            }
                            className="size-4 shrink-0 rounded-none border-muted-foreground/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none  dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-none shadow-card p-1 transition-all"
                          />
                          <p
                            className={cn(
                              "text-[12px] font-medium transition-colors truncate w-[250px]",
                              subTask.completed
                                ? "text-muted-foreground/60 line-through"
                                : "text-foreground/80"
                            )}
                          >
                            {subTask.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </TooltipProvider>
    </div>
  );
}
