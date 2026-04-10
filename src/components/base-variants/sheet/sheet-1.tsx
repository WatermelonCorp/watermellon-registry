"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBell, FaPalette, FaGlobe } from "react-icons/fa";

const Sheet1 = () => {
  const [settings, setSettings] = useState({
    username: "",
    theme: "",
    language: "",
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Preferences</Button>
      </SheetTrigger>

      <SheetContent className="theme-injected rounded-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FaBell />
            App Preferences
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6 px-4">
          <div className="bg-muted/50 flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaPalette />
              Appearance
            </div>
            <Input
              placeholder="Light / Dark / System"
              value={settings.theme}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value })
              }
            />
          </div>

          <div className="bg-muted/50 flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaGlobe />
              Language
            </div>
            <Input
              placeholder="e.g. English"
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            />
          </div>

          <div className="bg-muted/50 flex flex-col gap-3 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaBell />
              Notification Name
            </div>
            <Input
              placeholder="Enter display name"
              value={settings.username}
              onChange={(e) =>
                setSettings({ ...settings, username: e.target.value })
              }
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <Button className="w-full">Apply Changes</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Dismiss
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sheet1;
