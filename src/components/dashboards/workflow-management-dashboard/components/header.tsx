import { Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "@/components/ui/switch";

export default function Header() {
  return (
    <div className="flex h-14 items-center justify-between border-b border-border bg-background px-3 md:px-4">
      <div className="flex items-center justify-between  w-full">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <p className="text-foreground">Tasks</p>
          </div>
          <Separator
            className="h-4 w-1 bg-border mt-2 "
            orientation="vertical"
          />
          <div className=" hidden md:block">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="h-8 w-full justify-start bg-transparent p-0 gap-1">
                <TabsTrigger
                  value="all"
                  className="h-7 px-3 text-[12px] rounded-md data-[state=active]:bg-neutral-100 data-[state=active]:border-border data-[state=active]:border data-[state=active]:text-muted-foreground transition-colors hover:bg-muted"
                >
                  All tasks
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  disabled
                  className="h-7 px-3 text-[12px] rounded-md data-[state=active]:bg-neutral-100 data-[state=active]:border-border data-[state=active]:border data-[state=active]:text-muted-foreground transition-colors hover:bg-muted"
                >
                  Tasks team
                </TabsTrigger>
                <TabsTrigger
                  value="sales"
                  disabled
                  className="h-7 px-3 text-[12px] rounded-md data-[state=active]:bg-neutral-100 data-[state=active]:border-border data-[state=active]:border data-[state=active]:text-muted-foreground transition-colors hover:bg-muted"
                >
                  Sales
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground font-medium mr-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-transparent text-muted-foreground hover:bg-muted/50 transition-colors group shadow-none">
                <Settings className=" size-4" />
                <span className="text-sm">Configure</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Configure Board</DialogTitle>
                <DialogDescription>
                  Adjust your board settings and workflow preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="show-labels" className="flex flex-col space-y-1">
                    <span>Show Labels</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Display task labels on the card overview.
                    </span>
                  </Label>
                  <Switch id="show-labels" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-assign" className="flex flex-col space-y-1">
                    <span>Auto-assign Tasks</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Automatically assign new tasks to team members.
                    </span>
                  </Label>
                  <Switch id="auto-assign" />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Separator
            className="h-4 w-1 bg-border mt-2 "
            orientation="vertical"
          />
          {/* <MessageCircle className="text-muted-foreground size-4" /> */}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
