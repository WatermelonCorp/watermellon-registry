import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Button } from "./components/ui/button"
import { Mail, RefreshCcw, Calendar, Download } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select"
import OverviewTabContent from "./components/overview-tab-content"

export default function DashboardPageView() {
    return (
        <div className='flex flex-col'>
            <Tabs defaultValue="overview" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between min-h-[3.8rem] border-b px-7 max-md:p-4 py-2 md:py-0 gap-4">
                    <TabsList className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 group-data-[orientation=horizontal]/tabs:h-10 p-0 overflow-x-auto overflow-y-hidden max-w-full max-md:w-full justify-start md:justify-center">
                        <TabsTrigger value="overview" className="gap-2 px-3 data-[state=active]:bg-neutral-200/40 dark:data-[state=active]:bg-neutral-800/50! dark:data-[state=active]:border-r-neutral-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white border-r border-neutral-200 dark:border-neutral-800 rounded-none h-10 data-[state=active]:shadow-none!">
                            <Mail className="size-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="order" className="gap-2 px-3 data-[state=active]:bg-neutral-200/40 dark:data-[state=active]:bg-neutral-800/50! dark:data-[state=active]:border-r-neutral-800 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white border-r border-neutral-200 dark:border-neutral-800 rounded-none h-10 data-[state=active]:shadow-none!">
                            <Mail className="size-4" />
                            Order
                        </TabsTrigger>
                        <TabsTrigger value="sales" className="gap-2 px-3 data-[state=active]:bg-neutral-200/40 dark:data-[state=active]:bg-neutral-800/50! border-neutral-200 dark:border-neutral-800 rounded-none h-10 data-[state=active]:shadow-none!">
                            <Mail className="size-4" />
                            Sales
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 max-md:w-full max-md:justify-end">
                        <Button variant="ghost" size="icon" className="text-neutral-500 dark:text-neutral-200 bg-neutral-100/50 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                            <RefreshCcw className="size-4" />
                        </Button>

                        <Select defaultValue="monthly">
                            <SelectTrigger
                                className="h-9 w-fit bg-neutral-100/50 dark:bg-neutral-800/50 border-t border-x-0 border-b-0 border-t-neutral-200 dark:border-t-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 gap-2 text-neutral-900 dark:text-neutral-100 data-[state=open]:bg-neutral-200 dark:data-[state=open]:bg-neutral-800 focus:ring-1 focus:ring-neutral-200 dark:focus:ring-neutral-700 shadow-none!"
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

                        <Button className="
                            flex items-center rounded-md text-white hover:bg-blue-700
                            bg-blue-700
                            shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.3)]
                            transition-all active:scale-[0.98] active:brightness-95
                        ">
                            <Download className="size-4" />
                            Download
                        </Button>
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
