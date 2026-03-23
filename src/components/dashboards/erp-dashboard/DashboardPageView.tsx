import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Mail, RefreshCcw, Calendar, Download } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import OverviewTabContent from "./components/overview-tab-content"

export default function DashboardPageView() {
    return (
        <div className='flex flex-col'>
            <Tabs defaultValue="overview" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between min-h-[3.8rem] border-b px-7 max-md:p-4 py-2 md:py-0 gap-4">
                    <TabsList className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 group-data-[orientation=horizontal]/tabs:h-10 p-0 overflow-x-auto overflow-y-hidden max-w-full max-md:w-full justify-start md:justify-center">
                        <TabsTrigger value="overview" className="gap-2 px-3 data-[state=active]:bg-neutral-200/40 dark:data-[state=active]:bg-neutral-800/50! dark:data-[state=active]:border-r-neutral-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white border-r border-neutral-200 dark:border-neutral-800 rounded-none h-10 data-[state=active]:shadow-none! transition-colors duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 cursor-pointer">
                            <Mail className="size-4" />
                            <span>Overview</span>
                        </TabsTrigger>
                        <TabsTrigger disabled value="order" className="gap-2 px-3 data-[state=active]:bg-neutral-200/40 dark:data-[state=active]:bg-neutral-800/50! dark:data-[state=active]:border-r-neutral-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white border-r border-neutral-200 dark:border-neutral-800 rounded-none h-10 data-[state=active]:shadow-none! transition-colors duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 cursor-pointer">
                            <Mail className="size-4" />
                            <span>Order</span>
                        </TabsTrigger>
                        <TabsTrigger disabled value="sales" className="gap-2 px-3 data-[state=active]:bg-neutral-200/40 dark:data-[state=active]:bg-neutral-800/50! border-neutral-200 dark:border-neutral-800 rounded-none h-10 data-[state=active]:shadow-none! transition-colors duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 cursor-pointer">
                            <Mail className="size-4" />
                            <span>Sales</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 max-md:w-full max-md:justify-end">
                        <Button variant="ghost" size="icon" className="text-neutral-500 dark:text-neutral-200 bg-neutral-100/50 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 transition-colors duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 cursor-pointer group hover:text-indigo-600 dark:hover:text-indigo-400">
                            <RefreshCcw className="size-4" />
                        </Button>

                        <Select defaultValue="monthly">
                            <SelectTrigger
                                className="h-9 w-fit bg-neutral-100/50 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 px-2 gap-2 text-foreground data-[state=open]:bg-neutral-200 dark:data-[state=open]:bg-neutral-800 focus:ring-0 focus:ring-offset-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 shadow-none! transition-colors duration-300 cursor-pointer outline-none"
                            >
                                <Calendar className="size-4" />
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent position="popper" align="end" sideOffset={5} className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 min-w-[160px]">
                                <SelectItem value="daily" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-neutral-900 dark:focus:text-neutral-100">Daily</SelectItem>
                                <SelectItem value="weekly" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-neutral-900 dark:focus:text-neutral-100">Weekly</SelectItem>
                                <SelectItem value="monthly" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-neutral-900 dark:focus:text-neutral-100">Monthly</SelectItem>
                                <SelectItem value="yearly" className="focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:text-neutral-900 dark:focus:text-neutral-100">Yearly</SelectItem>
                            </SelectContent>
                        </Select>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="
                                    flex items-center rounded-md text-white hover:bg-blue-600 dark:hover:bg-blue-600
                                    bg-blue-700
                                    shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)]
                                    hover:shadow-[inset_2px_4px_12px_rgba(255,255,255,0.5),inset_-2px_-4px_12px_rgba(0,0,0,0.4),0_4px_12px_rgba(29,78,216,0.3)]
                                    transition-colors duration-300 cursor-pointer group
                                ">
                                    <Download className="size-4" />
                                    Download
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-50">
                                <DropdownMenuItem className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800">
                                    Download CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800">
                                    Download Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800">
                                    Download PDF
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <TabsContent value="overview" className="mt-0 p-0">
                    <OverviewTabContent />
                </TabsContent>
                <TabsContent value="order" className="mt-0">
                    {/* Order content will go here */}
                </TabsContent>
                <TabsContent value="sales" className="mt-0">
                    {/* Sales content will go here */}
                </TabsContent>
            </Tabs>
        </div>
    )
}
