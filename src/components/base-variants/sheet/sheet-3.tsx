"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const Sheet3 = () => {
  const sections = Array.from({ length: 6 }, (_, i) => ({
    title: `Module ${i + 1}`,
    content:
      "This section outlines key system behaviors including performance handling, scalability patterns, and secure data flow. It highlights how different layers interact and maintain efficiency under load.",
  }));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Documentation</Button>
      </SheetTrigger>

      <SheetContent className="theme-injected p-0 sm:max-w-[540px]">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6">
            <SheetHeader>
              <SheetTitle className="text-lg">System Overview</SheetTitle>
              <SheetDescription>
                Key architectural insights and module breakdown.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-5">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-muted/40 space-y-3 rounded-lg border p-4"
                >
                  <h3 className="text-base font-semibold">{section.title}</h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {section.content}
                  </p>

                  <div className="bg-muted rounded-md px-3 py-2 font-mono text-xs">
                    REF-{index + 1} • ACTIVE
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex flex-col gap-2 pt-2 sm:flex-row">
              <SheetClose asChild>
                <Button className="w-full">Export</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Sheet3;
