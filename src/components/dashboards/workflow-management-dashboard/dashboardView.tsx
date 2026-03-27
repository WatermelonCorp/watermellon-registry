"use client";

import Header from "./components/header";
import { TaskDetail } from "./components/task-detail";
import TaskDetailHeader from "./components/task-detail-header";
import { TaskList } from "./components/task-list";
import TaskListHeader from "./components/task-list-header";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTaskStore } from "./components/store/task-store";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const { tasks, selectedTaskId, selectTask } = useTaskStore();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasInitializedRef = useRef(false);

  const handleDrawerClose = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      selectTask(null);
    }
  };
  useEffect(() => {
    if (
      isMobile === false &&
      tasks.length > 0 &&
      !selectedTaskId &&
      !hasInitializedRef.current
    ) {
      selectTask(tasks[0].id);
      hasInitializedRef.current = true;
    }
  }, [tasks, selectedTaskId, isMobile, selectTask]);

  useEffect(() => {
    if (isMobile && selectedTaskId) {
      setTimeout(() => setDrawerOpen(true), 0);
    }
  }, [isMobile, selectedTaskId]);

  useEffect(() => {
    if (!selectedTaskId) {
      setTimeout(() => setDrawerOpen(false), 0);
    }
  }, [selectedTaskId]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Header />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex border-b">
          <div className="w-full md:w-[340px] border-r">
            <TaskListHeader />
          </div>
          <div className="flex-1 hidden md:block">
            <TaskDetailHeader />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-full md:w-[340px] border-r border-border shrink-0">
            <TaskList />
          </div>
          <div className="flex-1 hidden md:block">
            <TaskDetail />
          </div>
        </div>

        <Drawer open={drawerOpen} onOpenChange={handleDrawerClose}>
          <DrawerContent className="h-[90vh]">
            <div className="flex-1 f-full overflow-hidden">
              <TaskDetail />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
