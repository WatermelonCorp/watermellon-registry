import { useTaskStore } from "./store/task-store";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function TaskDetail() {
  const { tasks, selectedTaskId, toggleSubTask } = useTaskStore();
  const task = tasks.find((t) => t.id === selectedTaskId);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Select a task to view details</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full  ">
      <ScrollArea className="flex-1 min-h-0 w-full">
        <div className="lg:px-24 lg:py-20 p-4 max-w-4xl space-y-4 mx-auto">
          <div className="space-y-2">
            <div className="size-12 border rounded-xs flex items-center justify-center shrink-0 shadow-sm">
              <div className="size-8 rounded-full border border-muted-foreground" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground">
              {task.title}
            </h2>
          </div>
          {task.waitingOn && (
            <div className="space-y-2">
              <div className="flex items-center ">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Waiting on us
                </h3>
              </div>

              <div className="bg-foreground/5  border rounded-none p-2">
                <div className="flex items-start gap-3">
                  <Avatar className="size-10 border-2 border-white shadow-sm rounded-none">
                    <AvatarFallback className="text-[11px] bg-blue-600 text-white font-bold rounded-none">
                      ET
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-start space-x-2 self-start">
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-foreground">
                            {task.waitingOn.author}
                          </span>

                          <span className="text-xs flex items-center font-medium font-mono mt-0.5 rounded text-muted-foreground  ">
                            ({task.waitingOn.platform})
                          </span>
                          <Separator
                            className="h-4 w-1 bg-border mt-0.5 "
                            orientation="vertical"
                          />
                          <span className="text-xs text-muted-foreground font-medium self-center mt-0.5">
                            {task.waitingOn.timestamp}
                          </span>
                        </div>
                        <p className="text-[14px] leading-relaxed text-foreground italic font-medium">
                          "{task.waitingOn.content}"
                        </p>
                      </div>
                    </div>

                    <p className="text-[14px] leading-relaxed text-gray-700 italic font-medium"></p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
              Next Moves
            </h3>
            <div className="space-y-4">
              {task.subTasks.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-3 p-3 bg-foreground/5 border border-border/50 rounded-none group hover:bg-muted transition-all duration-200 active:scale-[0.99] cursor-pointer"
                >
                  <Checkbox
                    id={sub.id}
                    checked={sub.completed}
                    onCheckedChange={() => toggleSubTask(task.id, sub.id)}
                    className="size-4 shrink-0 rounded-none border-muted-foreground/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-none shadow-card p-1 transition-all group-hover:border-blue-400"
                  />
                  <label
                    htmlFor={sub.id}
                    className={cn(
                      "text-sm font-medium cursor-pointer",
                      sub.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    )}
                  >
                    {sub.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex flex-col gap-4 ">
              <h3 className="text-md font-medium  tracking-wider text-muted-foreground/60">
                Timeline
              </h3>
              <div className="relative group">
                <Textarea
                  placeholder="Add a comment or update..."
                  className="min-h-[100px] bg-foreground/5 border-border shadow-card resize-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded-none p-4 text-sm"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-medium hidden group-focus-within:block">
                    Press ⌘ + Enter to post
                  </span>
                  <Button
                    size="sm"
                    className="h-8 w-8 rounded-none bg-blue-600 hover:bg-blue-700 transition-all active:scale-90"
                  >
                    <Send className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-2 ">
              {task.timeline?.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-between"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[14px] font-medium text-muted-foreground">
                      {item.event}
                    </p>
                    <time className="text-xs text-muted-foreground font-medium tabular-nums">
                      {item.date}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
