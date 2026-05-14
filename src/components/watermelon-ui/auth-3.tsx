"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
} from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";

export interface Auth3SocialProvider {
  /** Unique key for the provider */
  id: string;
  /** Display label */
  label: string;
  /** Filled icon node */
  icon: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

export interface Auth3Props {
  /** Brand / product name */
  brandName?: string;
  /** One-line brand descriptor */
  brandDescriptor?: string;
  /** Social OAuth providers shown above the form */
  socialProviders?: Auth3SocialProvider[];
  /** Divider text between social and email form */
  dividerText?: string;
  /** Label for the sign-in submit button */
  signInLabel?: string;
  /** Label for the sign-up submit button */
  signUpLabel?: string;
  /** Forgot-password link text */
  forgotPasswordText?: string;
  /** Callback when forgot-password is clicked */
  onForgotPassword?: () => void;
  /** Callback when sign-in form is submitted */
  onSignIn?: (email: string, password: string) => void;
  /** Callback when sign-up form is submitted */
  onSignUp?: (name: string, email: string, password: string) => void;
  /** Terms of service link href */
  termsHref?: string;
  /** Privacy policy link href */
  privacyHref?: string;
}

const DEFAULT_SOCIAL_PROVIDERS: Auth3SocialProvider[] = [
  {
    id: "google",
    label: "Google",
    icon: <FaGoogle className="h-4 w-4" />,
  },
  {
    id: "github",
    label: "GitHub",
    icon: <FaGithub className="h-4 w-4" />,
  },
];

interface PasswordInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}

function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
      <Input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 rounded-none border-transparent pr-10 pl-10 shadow-none"
        required
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <MdVisibilityOff className="h-4 w-4" />
        ) : (
          <MdVisibility className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export function Auth3({
  socialProviders = DEFAULT_SOCIAL_PROVIDERS,
  dividerText = "or",
  signInLabel = "Sign in",
  signUpLabel = "Create account",
  forgotPasswordText = "Forgot password?",
  onForgotPassword,
  onSignIn,
  onSignUp,
  termsHref = "#",
  privacyHref = "#",
}: Auth3Props) {
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignIn?.(siEmail, siPassword);
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignUp?.(suName, suEmail, suPassword);
  };

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="border-border bg-card rounded-none border shadow-sm">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="border-border bg-muted grid h-12! w-full grid-cols-2 rounded-t-none rounded-b-none border-b p-1">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-background rounded-none text-sm font-medium data-[state=active]:shadow-sm"
              >
                Sign in
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-background rounded-none text-sm font-medium data-[state=active]:shadow-sm"
              >
                Create account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="p-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {socialProviders.map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outline"
                      type="button"
                      className="bg-muted h-10 gap-2 rounded-none border-0 text-sm font-medium shadow-none"
                      onClick={provider.onClick}
                    >
                      {provider.icon}
                      {provider.label}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {dividerText}
                  </span>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth3-si-email"
                    className="text-sm font-medium"
                  >
                    Email address
                  </Label>
                  <div className="relative">
                    <MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="auth3-si-email"
                      type="email"
                      placeholder="you@company.com"
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      autoComplete="email"
                      className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 rounded-none border-transparent pl-10 shadow-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="auth3-si-password"
                      className="text-sm font-medium"
                    >
                      Password
                    </Label>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-primary rounded-none text-xs underline-offset-4 transition-all hover:underline"
                    >
                      {forgotPasswordText}
                    </button>
                  </div>
                  <PasswordInput
                    id="auth3-si-password"
                    placeholder="••••••••••"
                    value={siPassword}
                    onChange={setSiPassword}
                    autoComplete="current-password"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-10 w-full gap-2 rounded-none font-semibold shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
                >
                  {signInLabel}
                  <MdArrowForward className="h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-5 p-6">
              <div className="grid grid-cols-2 gap-3">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    variant="outline"
                    type="button"
                    className="bg-muted h-10 gap-2 rounded-none border-0 text-sm font-medium shadow-none"
                    onClick={provider.onClick}
                  >
                    {provider.icon}
                    {provider.label}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-muted-foreground shrink-0 text-xs">
                  {dividerText}
                </span>
                <Separator className="flex-1" />
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth3-su-name"
                    className="text-sm font-medium"
                  >
                    Full name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="auth3-su-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                      autoComplete="name"
                      className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 rounded-none border-0 border-transparent pl-10 shadow-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth3-su-email"
                    className="text-sm font-medium"
                  >
                    Work email
                  </Label>
                  <div className="relative">
                    <MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="auth3-su-email"
                      type="email"
                      placeholder="jane@company.com"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 rounded-none border-0 border-transparent pl-10 shadow-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth3-su-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <PasswordInput
                    id="auth3-su-password"
                    placeholder="At least 8 characters"
                    value={suPassword}
                    onChange={setSuPassword}
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-2 h-10 w-full gap-2 rounded-none font-semibold shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
                >
                  {signUpLabel}
                  <MdArrowForward className="h-4 w-4" />
                </Button>

                <p className="text-muted-foreground text-center text-xs leading-relaxed">
                  By creating an account you agree to our{" "}
                  <a
                    href={termsHref}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href={privacyHref}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
