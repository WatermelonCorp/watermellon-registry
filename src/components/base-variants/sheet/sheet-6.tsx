"use client";

import { useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import { toast } from "sonner";

import { Alert, AlertTitle } from "@/components/ui/alert";
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

const Sheet6 = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.mobileNumber ||
      !form.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    toast.custom(() => (
      <Alert className="border-primary text-primary">
        <FaCheckCircle className="shrink-0" />
        <AlertTitle>Account created 🚀</AlertTitle>
      </Alert>
    ));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Get Started</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center text-xl font-semibold">
            Create your account
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex h-full w-full flex-col">
          <div className="flex-1 space-y-4 p-4 pt-0">
            <div className="flex flex-col gap-0.5">
              <label className="flex items-center gap-2 text-sm">
                <FaUser className="text-muted-foreground size-3 shrink-0" />
                First Name
              </label>
              <Input
                placeholder="John"
                className="rounded-sm"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="flex items-center gap-2 text-sm">
                <FaUser className="text-muted-foreground size-3 shrink-0" />
                Last Name
              </label>
              <Input
                placeholder="Doe"
                value={form.lastName}
                className="rounded-sm"
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="flex items-center gap-2 text-sm">
                <FaEnvelope className="text-muted-foreground size-3 shrink-0" />
                Email
              </label>
              <Input
                placeholder="you@example.com"
                value={form.email}
                className="rounded-sm"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="flex items-center gap-2 text-sm">
                <FaPhone className="text-muted-foreground size-3 shrink-0" />
                Phone
              </label>
              <Input
                type="tel"
                placeholder="9876543210"
                value={form.mobileNumber}
                className="rounded-sm"
                onChange={(e) =>
                  handleChange(
                    "mobileNumber",
                    e.target.value.replace(/[^\d]/g, "").slice(0, 10)
                  )
                }
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="flex items-center gap-2 text-sm">
                <FaLock className="text-muted-foreground size-3 shrink-0" />
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                className="rounded-sm"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>

          <SheetFooter className="">
            <Button type="submit">Create Account</Button>

            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default Sheet6;
