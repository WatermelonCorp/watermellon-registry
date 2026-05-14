import React from "react";
import {
  HiBell,
  HiCheckCircle,
  HiExclamationTriangle,
  HiInformationCircle,
  HiChatBubbleLeftEllipsis,
  HiUserPlus,
  HiRocketLaunch,
  HiArchiveBox,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ScrollArea } from "@/components/ui/scroll-area";

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "message"
  | "user"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isUnread?: boolean;
  avatar?: string;
  initials?: string;
}

export interface Notification1Props {
  badge?: string;
  heading?: string;
  description?: string;
  notifications?: Notification[];
  className?: string;
}

const IconMap: Record<NotificationType, React.ElementType> = {
  info: HiInformationCircle,
  success: HiCheckCircle,
  warning: HiExclamationTriangle,
  error: HiExclamationTriangle,
  message: HiChatBubbleLeftEllipsis,
  user: HiUserPlus,
  system: HiRocketLaunch,
};

const ColorMap: Record<NotificationType, string> = {
  info: "text-primary",
  success: "text-primary",
  warning: "text-primary",
  error: "text-destructive",
  message: "text-primary",
  user: "text-primary",
  system: "text-primary",
};

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "system",
    title: "New Version Available",
    description:
      "Version 2.4.0 has been deployed with performance improvements and new features.",
    timestamp: "2 mins ago",
    isUnread: true,
  },
  {
    id: "2",
    type: "message",
    title: "New Comment",
    description:
      'Alex commented on your "Design System" project: "This looks amazing! Can we add dark mode?"',
    timestamp: "3 hours ago",
    isUnread: false,
    initials: "AB",
  },
  {
    id: "3",
    type: "success",
    title: "Export Completed",
    description:
      "Your data export for Q1 Financials has been completed and is ready for download.",
    timestamp: "5 hours ago",
    isUnread: false,
  },
  {
    id: "4",
    type: "warning",
    title: "Storage Almost Full",
    description:
      "Your workspace is at 85% capacity. Consider upgrading your plan to avoid service interruption.",
    timestamp: "Yesterday",
    isUnread: false,
  },
];

export default function Notification1({
  notifications = defaultNotifications,
  className,
}: Notification1Props) {
  return (
    <section className={cn("bg-background py-24 md:py-32", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full">
          <Card className="border-border bg-card mx-auto max-w-sm gap-0 overflow-hidden rounded-[28px] p-0">
            <CardHeader className="p-2 px-4">
              <div className="my-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold">
                    Activity Feed
                  </CardTitle>
                </div>
                <Button variant={"secondary"}>See All</Button>
              </div>
            </CardHeader>
            <CardContent className="gap-0 p-0">
              <Tabs defaultValue="all" className="w-full">
                <div className="bg-muted/10 p-1">
                  <TabsList className="bg-muted grid w-full max-w-[400px] grid-cols-3 rounded-md p-1 shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:border-/50 data-[state=active]:bg-primary rounded-sm border-b-2 border-transparent text-sm font-medium data-[state=active]:shadow-none"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="unread"
                      className="data-[state=active]:border-/50 data-[state=active]:bg-primary rounded-sm border-b-2 border-transparent text-sm font-medium data-[state=active]:shadow-none"
                    >
                      Unread
                    </TabsTrigger>
                    <TabsTrigger
                      value="archived"
                      className="data-[state=active]:border-/50 data-[state=active]:bg-primary rounded-sm border-b-2 border-transparent text-sm font-medium data-[state=active]:shadow-none"
                    >
                      Archived
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-[250px]">
                  <TabsContent value="all" className="">
                    <div className="divide-border divide-y">
                      {notifications.map((notification) => (
                        <NotificationRow
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    <div className="divide-border divide-y">
                      {notifications
                        .filter((n) => n.isUnread)
                        .map((notification) => (
                          <NotificationRow
                            key={notification.id}
                            notification={notification}
                          />
                        ))}
                      {notifications.filter((n) => n.isUnread).length === 0 && (
                        <div className="flex h-64 flex-col items-center justify-center p-6 text-center">
                          <HiBell className="text-muted/20 mb-4 h-12 w-12" />
                          <p className="text-muted-foreground font-medium">
                            No unread notifications
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="archived" className="m-0">
                    <div className="flex h-64 flex-col items-center justify-center p-6 text-center">
                      <HiArchiveBox className="text-muted/20 mb-4 h-12 w-12" />
                      <p className="text-muted-foreground font-medium">
                        Your archive is empty
                      </p>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
            <div className="border-border bg-muted/30 border-t p-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground text-sm font-medium"
              >
                Mark all as read
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function NotificationRow({ notification }: { notification: Notification }) {
  const Icon = IconMap[notification.type];

  return (
    <div
      className={cn(
        "group hover:bg-muted/50 flex items-start gap-4 p-3 transition-colors",
      )}
    >
      <div className="relative mt-1">
        <div
          className={cn(
            "bg-muted flex h-10 w-10 items-center justify-center rounded-full shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04),inset_0px_1px_4px_0px_rgba(255,255,255,1),inset_0px_-1px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_0px_0px_0.5px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04),inset_0px_1px_4px_0px_rgba(255,255,255,0.1),inset_0px_-1px_4px_0px_rgba(0,0,0,0.1)]",
            ColorMap[notification.type],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {notification.isUnread && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="bg-primary relative inline-flex h-3 w-3 rounded-full"></span>
          </span>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={cn(
              "text-foreground text-sm font-semibold tracking-tight",
              notification.isUnread && "font-bold",
            )}
          >
            {notification.title}
          </h4>
          <span className="text-muted-foreground/60 text-xs font-medium">
            {notification.timestamp}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {notification.description}
        </p>
      </div>
    </div>
  );
}
