import React from "react";
import {
  RiBellFill,
  RiCheckDoubleFill,
  RiCircleFill,
} from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export type UpdateType = "pull_request" | "alert" | "team" | "deploy" | "doc";
export type UpdatePriority = "urgent" | "normal" | "low";
export type UpdateTab = "all" | "unread" | "mentions";

export interface UpdateAuthor {
  name: string;
  initials: string;
  avatar?: string;
}

export interface TeamUpdate {
  id: string;
  type: UpdateType;
  priority: UpdatePriority;
  author: UpdateAuthor;
  project: string;
  message: string;
  detail?: string;
  timestamp: string;
  isUnread: boolean;
  isMention: boolean;
}

export interface Notification2Props {
  heading?: string;
  updates?: TeamUpdate[];
  className?: string;
}



const TypeLabelMap: Record<UpdateType, string> = {
  pull_request: "Pull Request",
  alert: "Alert",
  team: "Team",
  deploy: "Deploy",
  doc: "Docs",
};

const PriorityBadgeMap: Record<UpdatePriority, string> = {
  urgent: "bg-destructive/10 text-destructive",
  normal: "bg-primary/10 text-primary",
  low: "bg-muted text-muted-foreground",
};

const defaultUpdates: TeamUpdate[] = [
  {
    id: "1",
    type: "alert",
    priority: "urgent",
    author: {
      name: "Ops Monitor",
      initials: "OM",
    },
    project: "Infrastructure",
    message: "Production database CPU spiked above 90%",
    detail:
      "Auto-scaling triggered. A new replica node has been provisioned and is now handling read traffic.",
    timestamp: "2m ago",
    isUnread: true,
    isMention: false,
  },
  {
    id: "2",
    type: "pull_request",
    priority: "normal",
    author: {
      name: "Leo Hayashi",
      initials: "LH",
      avatar: "https://assets.watermelon.sh/wm_alex.png",
    },
    project: "Nebula ui",
    message: "PR #241 — Refactor token pipeline ready for review",
    timestamp: "18m ago",
    isUnread: true,
    isMention: true,
  },
  {
    id: "3",
    type: "deploy",
    priority: "normal",
    author: {
      name: "CI Runner",
      initials: "CI",
    },
    project: "API Gateway",
    message: "v3.7.1 deployed to staging successfully",
    detail: "42 tests passed · Build time 1m 34s · No regressions detected.",
    timestamp: "1h ago",
    isUnread: true,
    isMention: false,
  },
  {
    id: "4",
    type: "team",
    priority: "low",
    author: {
      name: "Maya Osei",
      initials: "MO",
      avatar: "https://assets.watermelon.sh/wm_emma.png",
    },
    project: "Nebula ui",
    message: "Invited Priya Sharma to the Design Tokens workspace",
    timestamp: "3h ago",
    isUnread: false,
    isMention: false,
  },
  {
    id: "5",
    type: "doc",
    priority: "low",
    author: {
      name: "James Okafor",
      initials: "JO",
      avatar: "https://assets.watermelon.sh/wm_ben.png",
    },
    project: "API Gateway",
    message: "Updated the authentication flow runbook",
    timestamp: "Yesterday",
    isUnread: false,
    isMention: true,
  },
  {
    id: "6",
    type: "pull_request",
    priority: "normal",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      avatar: "https://assets.watermelon.sh/wm_mia.png",
    },
    project: "Infrastructure",
    message: "PR #198 — Kubernetes node pool migration merged",
    timestamp: "Yesterday",
    isUnread: false,
    isMention: false,
  },
];

export default function Notification2({
  heading = "Team Updates",
  updates = defaultUpdates,
  className,
}: Notification2Props) {
  const unreadCount = updates.filter((u) => u.isUnread).length;
  const mentionCount = updates.filter((u) => u.isMention).length;

  return (
    <section
      className={cn(
        "bg-background flex min-h-screen items-center justify-center p-4 md:p-8",
        className,
      )}
    >
      <Card className="w-full max-w-sm gap-1 overflow-hidden rounded-4xl p-2">
        <CardHeader className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-xl">
                <RiBellFill className="text-primary h-4 w-4" />
              </div>
              <div>
                <h2 className="text-foreground text-base font-bold tracking-tight">
                  {heading}
                </h2>
                <p className="text-muted-foreground text-xs font-medium">
                  {unreadCount} unread · {updates.length} total
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/5 gap-1 rounded-lg text-xs font-semibold"
              >
                <RiCheckDoubleFill className="h-3.5 w-3.5" />
                Mark all read
              </Button>
            </div>
          </div>
        </CardHeader>
        <Tabs defaultValue="all" className="w-full">
          <div className="px-2">
            <TabsList className="bg-muted h-auto gap-0 rounded-full">
              <TabItem value="all" label="All" count={updates.length} />
              <TabItem value="unread" label="Unread" count={unreadCount} />
              <TabItem value="mentions" label="Mentions" count={mentionCount} />
            </TabsList>
          </div>

          <CardContent className="p-0">
            <ScrollArea className="h-[300px] w-full">
              <TabsContent
                value="all"
                className="m-0 focus-visible:outline-none"
              >
                <UpdateList updates={updates} />
              </TabsContent>
              <TabsContent
                value="unread"
                className="m-0 focus-visible:outline-none"
              >
                <UpdateList updates={updates.filter((u) => u.isUnread)} />
              </TabsContent>
              <TabsContent
                value="mentions"
                className="m-0 focus-visible:outline-none"
              >
                <UpdateList updates={updates.filter((u) => u.isMention)} />
              </TabsContent>
            </ScrollArea>
          </CardContent>
        </Tabs>
      </Card>
    </section>
  );
}

function TabItem({
  value,
  label,
  count,
}: {
  value: string;
  label: string;
  count: number;
}) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "text-muted-foreground data-[state=active]:text-foreground relative flex items-center gap-1.5 rounded-full border-transparent px-4 py-2.5 text-sm font-medium transition-colors",
        "data-[state=active]:border-transparent",
        "hover:text-foreground",
        "bg-transparent shadow-none",
      )}
    >
      {label}
      {count > 0 && (
        <span
          className={cn(
            "flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums",
            "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </TabsTrigger>
  );
}

function UpdateList({ updates }: { updates: TeamUpdate[] }) {
  if (updates.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
          <RiBellFill className="text-muted-foreground h-5 w-5 opacity-40" />
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Nothing here yet
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {updates.map((update) => (
        <React.Fragment key={update.id}>
          <UpdateRow update={update} />
        </React.Fragment>
      ))}
    </div>
  );
}

function UpdateRow({ update }: { update: TeamUpdate }) {
  return (
    <div
      className={cn(
        "group relative flex gap-4 rounded-md px-5 py-4 transition-colors duration-150",
        "hover:bg-muted/40",
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10 border-none">
          <AvatarImage
            src={update.author.avatar}
            alt={update.author.name}
            className="border border-white/10"
          />
          <AvatarFallback className="text-secondary-foreground bg-transparent text-xs font-bold">
            {update.author.initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-foreground truncate text-sm font-semibold">
              {update.author.name}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "h-4 shrink-0 rounded-full border-0 px-1.5 text-[10px] font-bold",
                PriorityBadgeMap[update.priority],
              )}
            >
              {TypeLabelMap[update.type]}
            </Badge>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-muted-foreground/50 text-xs font-medium tabular-nums">
              {update.timestamp}
            </span>
            {update.isUnread && (
              <RiCircleFill className="text-primary h-2 w-2 animate-pulse" />
            )}
          </div>
        </div>

        <span className="text-muted-foreground/60 text-xs font-medium">
          {update.project}
        </span>

        <p className="text-foreground/80 mt-0.5 text-sm leading-snug font-normal">
          {update.message}
        </p>
        {update.detail && (
          <div className="border-border bg-muted/30 group-hover:bg-muted/50 mt-2 rounded-lg border p-2 transition-colors">
            <p className="text-muted-foreground text-xs leading-relaxed">
              {update.detail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
