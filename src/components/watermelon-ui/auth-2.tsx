"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  MdPerson,
  MdEmail,
  MdLock,
  MdArrowForward,
} from "react-icons/md";
import { FaGoogle, FaApple } from "react-icons/fa";

export interface TrustStat {
  value: string;
  label: string;
}

export interface Auth2Props {
  /** Brand / product name */
  brandName?: string;
  /** Short brand descriptor shown below the name */
  brandDescriptor?: string;
  /** Main heading of the form */
  heading?: string;
  /** Sub-copy below the heading */
  subheading?: string;
  /** Badge text displayed above the heading */
  badgeText?: string;
  /** Trust stats rendered in the bottom strip */
  trustStats?: TrustStat[];
  /** Label for the primary submit button */
  submitLabel?: string;
  /** Href for the sign-in link */
  signInHref?: string;
  /** Href for the terms of service */
  termsHref?: string;
  /** Href for the privacy policy */
  privacyHref?: string;
  /** Callback when form is submitted */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Auth2({
  heading = "Create your free account",
  subheading = "Join thousands of teams already building smarter, faster, and together.",

  submitLabel = "Get started for free",

  onSubmit,
}: Auth2Props) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 items-center justify-center px-2">
        <div className="bg-muted w-full max-w-md space-y-3 rounded-4xl p-3 shadow-[inset_0_0_2px_0.5px_rgba(0,0,0,0.05)]">
          <div className="bg-background rounded-3xl p-4 shadow-xs sm:p-8">
            <div className="mb-4 space-y-1">
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                {heading}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {subheading}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted rounded-xl p-1 shadow-[inset_0_0_2px_0.5px_rgba(0,0,0,0.05)]">
                <Button
                  variant="outline"
                  type="button"
                  className="hover:bg-background/80 dark:bg-background dark:hover:bg-background/80 h-11 w-full gap-2 border-none text-sm font-medium shadow-xs"
                >
                  <FaGoogle className="h-4 w-4" />
                  Google
                </Button>
              </div>
              <div className="bg-muted rounded-xl p-1 shadow-[inset_0_0_2px_0.5px_rgba(0,0,0,0.05)]">
                <Button
                  variant="outline"
                  type="button"
                  className="hover:bg-background/80 dark:bg-background dark:hover:bg-background/80 h-11 w-full gap-2 border-none text-sm font-medium shadow-xs"
                >
                  <FaApple className="h-4 w-4" />
                  Apple
                </Button>
              </div>
            </div>

            <div className="my-4 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-muted-foreground shrink-0 text-xs">
                or sign up with email
              </span>
              <Separator className="flex-1" />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth2-firstname"
                    className="text-sm font-medium"
                  >
                    First name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="auth2-firstname"
                      type="text "
                      placeholder="Alex"
                      autoComplete="given-name"
                      className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth2-lastname"
                    className="text-sm font-medium"
                  >
                    Last name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="auth2-lastname"
                      type="text"
                      placeholder="Rivera"
                      autoComplete="family-name"
                      className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="auth2-email" className="text-sm font-medium">
                  Work email
                </Label>
                <div className="relative">
                  <MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="auth2-email"
                    type="email"
                    placeholder="alex@company.io"
                    autoComplete="email"
                    className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="auth2-password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="auth2-password"
                    type="password"
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Use at least 8 characters with a mix of letters and numbers.
                </p>
              </div>
              <Button
                type="submit"
                className="from-primary to-primary/60 h-11 w-full gap-2 bg-linear-to-b font-semibold shadow-sm"
              >
                {submitLabel}
                <MdArrowForward className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
