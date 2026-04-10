import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sheet5 = () => {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline">Quick Setup</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Workspace</SheetTitle>
          <SheetDescription>
            Set up a new workspace to organize your projects and collaborate
            with your team.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input id="workspace-name" placeholder="e.g. Growth Team" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="workspace-slug">Workspace URL</Label>
            <Input id="workspace-slug" placeholder="growth-team" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="workspace-owner">Owner Email</Label>
            <Input id="workspace-owner" placeholder="team@company.com" />
          </div>
        </div>

        <SheetFooter>
          <Button type="submit">Create Workspace</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sheet5;
