"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { MdLock, MdEmail, MdArrowForward, MdAutoAwesome } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export interface AuthFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Auth5Props {
  /** Brand / product name shown in the form panel */
  brandName?: string;
  /** Tag line shown below brand name */
  tagline?: string;
  /** Heading for the feature panel */
  panelHeading?: string;
  /** Sub-copy for the feature panel */
  panelSubtext?: string;
  /** List of features shown in the right panel */
  features?: AuthFeature[];
  /** Text for the primary CTA button */
  submitLabel?: string;
  /** Callback when the form is submitted */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Link href for the sign-up page */
  signUpHref?: string;
  /** Link href for forgot password */
  forgotPasswordHref?: string;
}

export function Auth5({
  brandName = "Nucleus",
  submitLabel = "Sign in",
  onSubmit,
  signUpHref = "#",
  forgotPasswordHref = "#",
}: Auth5Props) {
  return (
    <div className="flex min-h-screen w-full flex-col p-1 lg:flex-row">
      <section className="bg-background flex flex-1 flex-col items-center justify-center px-6 py-16 sm:px-10 lg:max-w-xl lg:px-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <MdAutoAwesome className="text-primary-foreground h-4 w-4" />
              </span>
              <span className="text-foreground text-xl font-bold tracking-tight">
                {brandName}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue to your workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              className="bg-muted dark:bg-muted h-10 gap-2 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0px_0px_0px_0.5px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0px_0px_0px_0.5px_rgba(255,255,255,0.03),0px_1px_2px_-1px_rgba(255,255,255,0.08),0px_2px_4px_0px_rgba(255,255,255,0.08)]"
            >
              <FcGoogle className="h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              className="bg-muted dark:bg-muted h-10 gap-2 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0px_0px_0px_0.5px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0px_0px_0px_0.5px_rgba(255,255,255,0.03),0px_1px_2px_-1px_rgba(255,255,255,0.08),0px_2px_4px_0px_rgba(255,255,255,0.08)]"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground shrink-0 text-xs">
              or continue with email
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
            <div className="space-y-1.5">
              <Label htmlFor="Auth5-email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="relative">
                <MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="Auth5-email"
                  type="email"
                  placeholder="you@company.com"
                  className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-11 border-0 pl-10 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_4px_0px_rgba(0,0,0,0.08)]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="Auth5-password" className="text-sm font-medium">
                  Password
                </Label>
                <a
                  href={forgotPasswordHref}
                  className="text-primary text-xs font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="Auth5-password"
                  type="password"
                  placeholder="••••••••••"
                  className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-11 border-0 pl-10 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_4px_0px_rgba(0,0,0,0.08)]"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="Auth5-remember" />
              <Label
                htmlFor="Auth5-remember"
                className="text-muted-foreground cursor-pointer text-sm"
              >
                Keep me signed in
              </Label>
            </div>

            <Button
              type="submit"
              className="from-primary to-primary/70 h-11 w-full gap-2 bg-linear-to-b font-semibold text-white shadow-sm"
            >
              {submitLabel}
              <MdArrowForward className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href={signUpHref}
              className="text-primary font-medium hover:underline"
            >
              Create one for free
            </a>
          </p>
        </div>
      </section>

      <section className="relative hidden flex-1 flex-col items-center justify-center overflow-hidden rounded-4xl bg-white p-10 lg:flex lg:p-16">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          alt="Developer workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>
    </div>
  );
}
