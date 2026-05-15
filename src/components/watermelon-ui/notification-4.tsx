import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface NotificationSource {
  name: string;
  initials: string;
  avatar?: string;
}

export interface NotificationEvent {
  id: string;
  source: NotificationSource;
  title: string;
  subtitle: string;
  timestamp: string;
  unread?: boolean;
}

export interface NotificationGroup {
  id: string;
  label: string;
  items: NotificationEvent[];
}

export interface Notification4Props {
  title?: string;
  countLabel?: string;
  groups?: NotificationGroup[];
  onDismiss?: () => void;
  className?: string;
}

const defaultGroups: NotificationGroup[] = [
  {
    id: "morning",
    label: "Morning",
    items: [
      {
        id: "launch-checklist",
        source: {
          name: "Ava Patel",
          initials: "AP",
          avatar: "https://assets.watermelon.sh/wm_mia.png",
        },
        title: "Ava approved the launch checklist",
        subtitle: "Mobile onboarding release",
        timestamp: "12m ago",
        unread: true,
      },
      {
        id: "priority-review",
        source: {
          name: "Mateo Cruz",
          initials: "MC",
          avatar: "https://assets.watermelon.sh/wm_alex.png",
        },
        title: "Mateo assigned a priority review",
        subtitle: "Security handoff notes",
        timestamp: "24m ago",
        unread: true,
      },
      {
        id: "customer-digest",
        source: {
          name: "Nora Singh",
          initials: "NS",
        },
        title: "Nora published the customer digest",
        subtitle: "Enterprise workspace summary",
        timestamp: "38m ago",
        unread: true,
      },
    ],
  },
  {
    id: "afternoon",
    label: "Afternoon",
    items: [
      {
        id: "revenue-notes",
        source: {
          name: "Kai Morgan",
          initials: "KM",
        },
        title: "Kai shared updated revenue notes",
        subtitle: "Forecast packet and risk log",
        timestamp: "1h ago",
        unread: true,
      },
      {
        id: "audit-task",
        source: {
          name: "Iris Chen",
          initials: "IC",
          avatar: "https://assets.watermelon.sh/wm_emma.png",
        },
        title: "Iris moved the audit task forward",
        subtitle: "Compliance queue",
        timestamp: "2h ago",
        unread: true,
      },
    ],
  },
];

export default function Notification4({
  title = "Notifications",
  countLabel,
  groups = defaultGroups,
  onDismiss,
  className,
}: Notification4Props) {
  const unreadCount = groups.reduce(
    (total, group) => total + group.items.filter((item) => item.unread).length,
    0,
  );

  return (
    <section
      className={cn(
        "bg-background flex min-h-screen items-center justify-center",
        className,
      )}
    >
      <Card className="bg-muted w-full max-w-sm gap-0 rounded-3xl pb-2 ring-0">
        <CardHeader className="flex flex-row items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <h2 className="text-foreground text-base font-semibold tracking-tight">
              {title}
            </h2>
            <Badge
              variant="ghost"
              className="text-primary hover:text-primary rounded-full text-xs font-medium tabular-nums"
            >
              {countLabel ?? `${unreadCount}+`}
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground rounded-full"
            aria-label="Close notifications"
            onClick={onDismiss}
          >
            <RiCloseFill className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-2 px-2">
          {groups.map((group) => (
            <NotificationGroupCard key={group.id} group={group} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function NotificationGroupCard({ group }: { group: NotificationGroup }) {
  return (
    <section className="bg-card overflow-hidden rounded-2xl">
      <div className="px-5 pt-4">
        <p className="text-muted-foreground text-sm font-medium">
          {group.label}
        </p>
      </div>

      <div className="px-4 pt-2 pb-2">
        {group.items.map((event) => (
          <React.Fragment key={event.id}>
            <NotificationEventRow event={event} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function NotificationEventRow({ event }: { event: NotificationEvent }) {
  return (
    <article className="group hover:bg-muted/50 flex items-center gap-2 rounded-md px-1 py-1 transition-colors sm:gap-3">
      <Avatar className="h-10 w-10 shrink-0 border-none ring-0">
        <AvatarImage
          src={event.source.avatar}
          alt={event.source.name}
          className="border-black/5 dark:border-white/5"
        />
        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
          {event.source.initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <h3 className="text-foreground truncate text-sm font-medium">
          {event.title}
        </h3>
        <p className="text-muted-foreground mt-0.5 truncate text-xs">
          {event.subtitle}
        </p>
      </div>

      <div className="flex shrink-0 items-center">
        <span className="text-muted-foreground text-xs">{event.timestamp}</span>
      </div>
    </article>
  );
}
