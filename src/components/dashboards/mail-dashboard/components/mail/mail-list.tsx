"use client"

import { IconBrandSlack, IconClockFilled, IconMailFilled, IconPlus, IconSearch } from "@tabler/icons-react"
import { SidebarInput, SidebarTrigger } from "../../components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { mails as mailData, pinnedUsers, type Mail } from "../../data"
import { cn } from "@/lib/utils"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"

export function MailList({
  mails = mailData,
  selectedMailId,
  onSelectMail
}: {
  mails?: Mail[]
  selectedMailId?: string | null
  onSelectMail?: (id: string) => void
}) {
  return (
    <div className="flex flex-col h-full bg-sidebar text-foreground overflow-hidden">
      {/* Search Header */}
      <div className="flex flex-col">
        <div className="relative group border-b p-3 flex items-center gap-2">
          <SidebarTrigger className="md:hidden size-9" />
          <div className="relative flex-1 group">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/60 group-focus-within:text-foreground transition-colors" />
            <SidebarInput
              placeholder="search"
              className="pl-9 bg-muted-foreground/10 border-none focus:bg-background transition-colors dark:bg-muted-foreground/10 h-9 rounded-lg"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5  rounded bg-muted border border-border/50 text-[10px] text-muted-foreground font-medium shadow">
              <span className="text-sm">⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Pinned Section */}
        <div className="flex flex-col gap-3 p-3">
          <div className="text-[11px] font-bold text-muted-foreground uppercase px-1">
            Pinned
          </div>
          <div className="flex items-center justify-between overflow-x-auto px-1">
            {pinnedUsers.map((user) => (
              <div key={user.name} className="flex flex-col items-center gap-2">
                <Avatar className="size-9 hover:scale-105 cursor-pointer">
                  <AvatarImage src={user.avatar} className="object-cover" />
                  <AvatarFallback className="bg-muted text-[10px]">{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground font-medium">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="email" className="flex-1 flex flex-col min-h-0 ">
        <div className="px-3 max-md:px-5 border-y border-border">
          <TabsList variant="line" className="w-full bg-transparent justify-between gap-6 p-0 h-11!">
            <TabsTrigger
              value="email"
              className="bg-transparent border-none p-0 flex items-center gap-2.5 text-xs  text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent transition-colors font-normal max-w-fit px-2.5 data-[state=active]:font-normal"
            >
              <IconMailFilled className="size-5" />
              Email
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="slack"
              className="bg-transparent border-none p-0 flex items-center gap-2.5 text-xs text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent transition-colors font-normal max-w-fit px-2.5 data-[state=active]:font-normal"
            >
              <IconBrandSlack className="size-5" />
              Slack
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              disabled
              className="bg-transparent border-none p-0 flex items-center gap-2.5 text-xs text-muted-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent transition-colors font-normal max-w-fit px-2.5 data-[state=active]:font-normal"
            >
              <IconClockFilled className="size-5" />
              Unread
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Action Button */}
        <div className="px-2 py-2 border-b ">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex justify-start gap-3 w-full h-full pb-2 pt-0 text-muted-foreground hover:text-foreground transition-colors group hover:bg-transparent!">
                <IconPlus className="size-5" />
                <span className="text-sm font-medium text-foreground tracking-tight">New message</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
                <DialogDescription>
                  Compose a new email or message.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="to">To</Label>
                  <Input id="to" placeholder="recipient@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" className="mr-auto">Save Draft</Button>
                <Button type="submit">Send Message</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden  scrollbar-thin scrollbar-thumb-muted">
          <TabsContent value="email" className="m-0 focus-visible:outline-none flex flex-col gap-1">
            {mails.map((mail) => {
              const isActive = selectedMailId === mail.id
              return (
                <button
                  key={mail.id}
                  type="button"
                  onClick={() => onSelectMail?.(mail.id)}
                  className={cn(
                    "w-full text-left",
                  )}
                >
                  <div className={cn("flex gap-3 p-2 max-md:px-4 transition-colors hover:bg-muted-foreground/5", isActive ? "bg-muted-foreground/10" : "")}>
                    <Avatar className="size-5 shrink-0 border border-border">
                      <AvatarImage src={mail.avatar} className="object-cover" />
                      <AvatarFallback className="bg-muted">{mail.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-1 border-b pb-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <span className={cn(
                            "text-[11px] font-medium truncate text-foreground/80",
                          )}>
                            {mail.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {mail.unread && (
                            <div className="size-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                          )}
                          <span className="text-[10px] text-muted-foreground font-medium shrink-0">
                            {mail.date}
                          </span>
                        </div>
                      </div>
                      <h4 className={cn(
                        "text-[13px] font-medium truncate leading-tight text-foreground"
                      )}>
                        {mail.subject}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                        {mail.teaser}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </TabsContent>
          <TabsContent value="slack" className="m-0 p-8 text-center text-sm text-muted-foreground">
            No slack messages yet.
          </TabsContent>
          <TabsContent value="unread" className="m-0 p-8 text-center text-sm text-muted-foreground">
            No unread messages yet.
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
