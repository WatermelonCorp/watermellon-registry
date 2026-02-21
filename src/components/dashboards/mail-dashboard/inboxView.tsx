import { IconMail } from "@tabler/icons-react"

export default function Page() {
  return (
    <div className="h-full w-full bg-background flex flex-col items-center justify-center p-8">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />
        <div className="relative size-24 rounded-3xl bg-card border border-border flex items-center justify-center shadow-2xl">
          <IconMail className="size-10 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" />
        </div>
      </div>
    </div>
  )
}
