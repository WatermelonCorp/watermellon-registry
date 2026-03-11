import {
    IconCalendar,
    IconClock,
    IconBuilding,
    IconVideo,
    IconDotsVertical,
    IconBrandSlack,
    IconBrandGoogleFilled,
    IconVideoFilled,
    IconVideoPlusFilled,
    IconBrandDiscordFilled
} from "@tabler/icons-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
    IconEdit,
    IconTrash,
    IconCalendarPlus,
    IconVideo as IconJoin
} from "@tabler/icons-react"

const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
        case "meet": return <IconVideoFilled className="size-7 text-blue-500" />
        case "zoom": return <IconVideoPlusFilled className="size-7 text-blue-600" />
        case "discord": return <IconBrandDiscordFilled className="size-7 text-indigo-500" />
        case "slack": return <IconBrandSlack className="size-7 text-[#4A154B]" />
        case "google": return <IconBrandGoogleFilled className="size-7 text-red-500" />
        default: return <IconVideo className="size-7" />
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MeetingCard = ({ meeting }: { meeting: any }) => (
    <Card className="border-[1.3px] border-neutral-200/80 bg-neutral-100/60 dark:bg-neutral-800/50 dark:border-neutral-800 shadow-none px-2 pt-1.5 pb-2.5 gap-2 transition-colors duration-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/80 cursor-pointer group outline-none">
        <CardHeader className="p-0! flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-1.5 overflow-hidden">
                <PlatformIcon platform={meeting.platform} />
                <CardTitle className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 truncate tracking-tight">{meeting.title}</CardTitle>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-6 text-neutral-400 dark:text-neutral-500 transition-colors opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 outline-none focus-visible:ring-0">
                        <IconDotsVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Card Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-blue-500 dark:text-blue-400 focus:text-blue-600 focus:bg-blue-50/50 dark:focus:bg-blue-900/20">
                        <IconJoin className="mr-2 h-4 w-4" />
                        <span>Join Meeting</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconEdit className="mr-2 h-4 w-4" />
                        <span>Edit Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IconCalendarPlus className="mr-2 h-4 w-4" />
                        <span>Reschedule</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 dark:text-red-400 focus:text-red-600 focus:bg-red-50/50 dark:focus:bg-red-900/20">
                        <IconTrash className="mr-2 h-4 w-4" />
                        <span>Cancel Meeting</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0 px-0.5 space-y-3">
            <div className="space-y-1">
                <p className="text-[13px] tracking-tight font-medium text-neutral-400 dark:text-neutral-500">Date</p>
                <div className="flex items-center gap-1.5 text-[12px] tracking-tight font-medium text-neutral-600 dark:text-neutral-400">
                    <IconCalendar className="size-4 text-neutral-400 dark:text-neutral-500" />
                    {meeting.date}
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-[13px] font-medium text-neutral-400 dark:text-neutral-500 tracking-tight">Meeting Host</p>
                <div className="flex items-center gap-1.5 text-[12px] text-neutral-600 dark:text-neutral-400 font-medium tracking-tight">
                    <Avatar className="size-4">
                        <AvatarImage src={meeting.host.avatar} />
                        <AvatarFallback className="text-[9px] bg-neutral-200 dark:bg-neutral-800">{meeting.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {meeting.host.name} {meeting.host.isMe && <span className="text-neutral-400 dark:text-neutral-500 font-normal">(You)</span>}
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-[12px] font-medium text-neutral-400 dark:text-neutral-500 tracking-tight">Meeting Duration</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-tight">
                    <IconClock className="size-4 text-neutral-400 dark:text-neutral-500" />
                    {meeting.duration}
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-[12px] font-medium text-neutral-400 dark:text-neutral-500 tracking-tight">Related To</p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-tight">
                    <IconBuilding className="size-4 text-neutral-400 dark:text-neutral-500" />
                    <span className="truncate">{meeting.relatedTo}</span>
                </div>
            </div>
        </CardContent>
    </Card>
)
