"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FaChevronUp,
  FaChevronRight,
  FaChevronDown,
  FaChevronLeft,
  FaUserCircle,
} from "react-icons/fa";

const SheetContentBody = () => (
  <>
    <SheetHeader>
      <SheetTitle className="flex items-center gap-2">
        <FaUserCircle />
        Profile Setup
      </SheetTitle>
    </SheetHeader>

    <div className="grid gap-5 px-4 py-6">
      <div className="grid gap-2">
        <Label>Display Name</Label>
        <Input placeholder="Enter your name" />
      </div>

      <div className="grid gap-2">
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
      </div>

      <div className="grid gap-2">
        <Label>Bio</Label>
        <Input placeholder="Short description..." />
      </div>
    </div>

    <SheetFooter className="flex gap-2">
      <Button className="w-full">Save</Button>
      <SheetClose asChild>
        <Button variant="outline" className="w-full">
          Close
        </Button>
      </SheetClose>
    </SheetFooter>
  </>
);

const Sheet2 = () => {
  return (
    <div className="theme-injected flex flex-wrap gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <FaChevronUp />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="rounded-lg">
          <SheetContentBody />
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <FaChevronRight />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="rounded-lg">
          <SheetContentBody />
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <FaChevronDown />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-lg">
          <SheetContentBody />
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <FaChevronLeft />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="rounded-lg">
          <SheetContentBody />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sheet2;
