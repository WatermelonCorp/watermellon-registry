import { mails } from "../../data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  IconChevronLeft
} from "@tabler/icons-react"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldContent } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

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
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <span className="text-muted-foreground">To:</span>
            <span className="font-medium text-foreground/80 text-xs">{mail.to}</span>
            <IconChevronDown className="size-4 text-muted-foreground" />
          </div>
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
        <div className="flex items-center gap-3 px-1">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <IconSparkles className="size-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <IconUserCircle className="size-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <IconBookmark className="size-5" />
          </button>
        </div>

        {/* Message Input Area */}
        <Field className="mt-auto bg-muted/70 border border-border/60 rounded-2xl overflow-hidden focus-within:border-border/80 transition-colors p-1.5">
          <FieldContent className="gap-0">
            {/* Attachments Section */}
            <div className="flex items-center gap-2 px-1 pb-2 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 bg-background hover:bg-background/80 px-2 py-1.5 rounded-md border border-border transition-colors cursor-pointer group shrink-0 text-foreground">
                <IconFileText className="size-3.5 group-hover:text-foreground" />
                <span className="text-[11px] text-foreground/80 font-medium">agreement.pdf</span>
                <span className="text-muted-foreground hover:text-foreground transition-colors bg-muted rounded p-0.5 ml-0.5">
                  <IconX className="size-3" />
                </span>
              </div>
              <div className="flex items-center gap-1 bg-background hover:bg-background/80 px-2 py-1.5 rounded-md border border-border transition-colors cursor-pointer group shrink-0 text-foreground">
                <IconFolder className="size-3.5 group-hover:text-foreground" />
                <span className="text-[11px] text-foreground/80 font-medium">Roadmap.pdf</span>
                <span className="text-muted-foreground hover:text-foreground transition-colors bg-muted rounded p-0.5 ml-0.5">
                  <IconX className="size-3" />
                </span>
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
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                  <IconPlus className="size-4" />
                </button>

                <Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white rounded-full p h-9 gap-1 font-medium shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all active:scale-95">
                  {/* <span className="text-xs">Send</span> */}
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

