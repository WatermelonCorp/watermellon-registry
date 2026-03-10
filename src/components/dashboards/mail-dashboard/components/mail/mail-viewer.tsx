import { mails } from "../../data"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
  IconChevronDown,
  IconPlus,
  IconFileText,
  IconFolder,
  IconX,
  IconBrandTelegram,
  IconSparkles,
  IconUserCircle,
  IconBookmark,
  IconChevronLeft,
  IconDotsVertical,
  IconShare,
  IconTrash,
  IconArchive
} from "@tabler/icons-react"
import { Textarea } from "../../components/ui/textarea"
import { Field, FieldContent } from "../../components/ui/field"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"

export function MailViewer({ id }: { id: string }) {
  const mail = mails.find((m) => m.id === id)

  if (!mail) return <div>Mail not found</div>

  return (
    <div className="flex flex-col h-full bg-background text-foreground px-8 py-6 max-md:px-4 max-md:py-4 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex items-center max-md:items-start gap-3 mb-7 border-b pb-2.5">
        <a
          href="/inbox"
          className="md:hidden p-2 -ml-2.5 hover:bg-muted rounded-full transition-colors "
        >
          <IconChevronLeft className="size-5 text-muted-foreground" />
        </a>
        <Avatar className="size-10 border border-border">
          <AvatarImage src={mail.avatar} className="object-cover" />
          <AvatarFallback className="bg-muted">{mail.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 max-md:flex-col max-md:items-start max-md:gap-0">
            <span className="font-medium text-foreground text-sm">{mail.name}</span>
            <span className="text-muted-foreground text-sm tracking-tight">{mail.email}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors rounded px-1 -ml-1">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium text-foreground/80 text-xs">{mail.to}</span>
                <IconChevronDown className="size-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px]">
              <div className="flex flex-col gap-2 p-2 text-sm">
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <span className="text-muted-foreground text-right">From:</span>
                  <span className="font-medium truncate">{mail.email}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <span className="text-muted-foreground text-right">To:</span>
                  <span className="font-medium truncate">{mail.to}</span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <span className="text-muted-foreground text-right">Date:</span>
                  <span className="font-medium truncate">{mail.date}</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-medium tracking-tight text-foreground leading-tight">
          {mail.subject}
        </h1>

        <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed text-[15px] border-b pb-6 mt-2">
          {mail.body}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 px-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-md transition-all active:scale-95">
                  <IconSparkles className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>AI Reply</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-md transition-all active:scale-95">
                <IconUserCircle className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>View Contact</DropdownMenuItem>
              <DropdownMenuItem>Add to VIPs</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Block Sender</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-md transition-all active:scale-95">
                  <IconBookmark className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bookmark</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-md transition-all active:scale-95">
                  <IconArchive className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-md transition-all active:scale-95 ml-auto">
                <IconDotsVertical className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2"><IconShare className="size-4" /> Forward</DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-red-500"><IconTrash className="size-4" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Message Input Area */}
        <Field className="mt-auto bg-muted/70 border border-border/60 rounded-2xl overflow-hidden focus-within:border-border/80 transition-colors p-1.5">
          <FieldContent className="gap-0">
            {/* Attachments Section */}
            <div className="flex items-center gap-2 px-1 pb-2 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 bg-background hover:bg-muted/50 px-2 py-1.5 rounded-md border border-border transition-all active:scale-[0.98] cursor-pointer group shrink-0 text-foreground shadow-sm">
                <IconFileText className="size-3.5 group-hover:text-foreground" />
                <span className="text-[11px] text-foreground/80 font-medium">agreement.pdf</span>
                <button className="text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20 transition-colors bg-muted rounded p-0.5 ml-0.5 active:scale-90">
                  <IconX className="size-3" />
                </button>
              </div>
              <div className="flex items-center gap-1 bg-background hover:bg-muted/50 px-2 py-1.5 rounded-md border border-border transition-all active:scale-[0.98] cursor-pointer group shrink-0 text-foreground shadow-sm">
                <IconFolder className="size-3.5 group-hover:text-foreground" />
                <span className="text-[11px] text-foreground/80 font-medium">Roadmap.pdf</span>
                <button className="text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20 transition-colors bg-muted rounded p-0.5 ml-0.5 active:scale-90">
                  <IconX className="size-3" />
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col bg-background rounded-xl border border-border">
              <Textarea
                placeholder="type message"
                className="w-full border-none bg-background! focus-visible:ring-0 px-4 py-2 min-h-[100px] max-md:min-h-[70px] text-sm text-foreground/80 placeholder:text-muted-foreground resize-none shadow-none rounded-xl"
              />
              {/* Footer Actions */}
              <div className="p-3 flex items-center justify-between">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground hover:shadow-sm transition-all active:scale-90">
                        <IconPlus className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Attach files</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white rounded-full px-4 h-9 gap-2 font-medium shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0">
                  <span>Send</span>
                  <IconBrandTelegram className="size-4" />
                </Button>
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>
    </div>
  )
}