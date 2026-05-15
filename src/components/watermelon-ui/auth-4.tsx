"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  brandName?: string;
  brandTagline?: string;
  onGoogleLogin?: () => void;
  onLogin?: (email: string, password: string, remember: boolean) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
  copyrightYear?: number;
  footerLinks?: { label: string; href: string }[];
}

export default function LoginPage({
  brandName = "Watermelon",
  onGoogleLogin,
  onLogin,
  onForgotPassword,
  onCreateAccount,
  copyrightYear = 2026,
  footerLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
  ],
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = () => {
    onLogin?.(email, password, remember);
  };

  return (
    <div className="bg-background flex  w-full min-h-screen flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="bg-background/50 relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-1/2">
          <>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
              alt="Modern workspace"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-1">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to pick up right where you left off.
              </p>
            </div>

            <Button
              variant="outline"
              className="bg-muted w-full gap-2 border-0 font-medium"
              onClick={onGoogleLogin}
            >
              <FcGoogle className="text-base" />
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-sm font-medium tracking-widest">
                or
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 border-transparent ring-0"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-primary text-xs underline-offset-4 transition-all hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 border-transparent pr-10 ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="remember"
                checked={remember}
                onCheckedChange={setRemember}
              />
              <Label
                htmlFor="remember"
                className="text-muted-foreground cursor-pointer text-sm select-none"
              >
                Keep me signed in for 30 days
              </Label>
            </div>

            <Button
              className="h-11 w-full text-base font-semibold"
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              New here?{" "}
              <button
                type="button"
                onClick={onCreateAccount}
                className="text-primary font-medium underline-offset-4 transition-all hover:underline"
              >
                Create a free account
              </button>
            </p>
          </div>
        </div>
      </div>

      <footer className="border-border text-muted-foreground flex flex-col items-center justify-between gap-2 border-t px-6 py-4 text-xs sm:flex-row">
        <span>
          © {copyrightYear} {brandName}. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
