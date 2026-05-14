"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdLock, MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaGithub, FaMicrosoft, FaSlack } from "react-icons/fa";

export interface SocialProvider {
  /** Display name of the provider */
  name: string;
  /** React node for the provider icon */
  icon: React.ReactNode;
  /** Callback fired when this provider is clicked */
  onClick?: () => void;
}

export interface Auth1Props {
  /** Brand / product name */
  brandName?: string;
  /** Short descriptor below the brand */
  brandDescriptor?: string;
  /** Badge text shown above the heading */
  badgeText?: string;
  /** Main heading */
  heading?: string;
  /** Sub-copy below the heading */
  subheading?: string;
  /** Email field label */
  emailLabel?: string;
  /** Email field placeholder */
  emailPlaceholder?: string;
  /** Password field label */
  passwordLabel?: string;
  /** Password field placeholder */
  passwordPlaceholder?: string;
  /** Label for the primary submit button */
  submitLabel?: string;
  /** Social / OAuth providers */
  socialProviders?: SocialProvider[];
  /** Text between social buttons and email form */
  dividerText?: string;
  /** Forgot password link text */
  forgotPasswordText?: string;
  /** Callback when forgot password is clicked */
  onForgotPassword?: () => void;
  /** Bottom prompt text (before the link) */
  bottomPromptText?: string;
  /** Bottom prompt link text */
  bottomPromptLinkText?: string;
  /** Callback when bottom prompt link is clicked */
  onBottomPromptClick?: () => void;
  /** Callback when form is submitted */
  onSubmit?: (email: string, password: string) => void;
  /** Footer note text */
  footerNote?: string;
}

const DEFAULT_SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    name: "GitHub",
    icon: <FaGithub className="h-4 w-4" />,
  },
  {
    name: "Microsoft",
    icon: <FaMicrosoft className="h-4 w-4" />,
  },
  {
    name: "Slack",
    icon: <FaSlack className="h-4 w-4" />,
  },
];

export function Auth1({
  heading = "Access your workspace",
  subheading = "Connect with your team and deploy with confidence.",

  submitLabel = "Continue to workspace",
  socialProviders = DEFAULT_SOCIAL_PROVIDERS,
  dividerText = "or use your credentials",

  bottomPromptText = "First time here?",
  bottomPromptLinkText = "Request an invite",
  onBottomPromptClick,
  onSubmit,
}: Auth1Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-5">
        <Card className="border-border bg-muted dark:bg-muted gap-0 rounded-4xl p-2">
          <div className="bg-background h-full w-full rounded-3xl px-2 py-6 shadow-[0_2px_4px_0px_rgba(0,0,0,0.12)]">
            <CardHeader className="space-y-3 pb-4 text-center">
              <div className="space-y-1">
                <CardTitle className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  {heading}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {subheading}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="Auth1-email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-9 pl-10"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="Auth1-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-9 pr-10 pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="h-4 w-4" />
                      ) : (
                        <MdVisibility className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="from-primary to-primary/70 dark:to-primary/60 h-11 w-full bg-gradient-to-b text-sm font-semibold"
                >
                  {submitLabel}
                </Button>
              </form>
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-muted-foreground shrink-0 text-xs">
                  {dividerText}
                </span>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    type="button"
                    className="bg-muted h-10 gap-1.5 border-0 text-xs font-medium shadow-xs"
                    onClick={provider.onClick}
                  >
                    {provider.icon}
                  </Button>
                ))}
              </div>
            </CardContent>
          </div>

          <CardFooter className="justify-center border-0 pt-5">
            <p className="text-muted-foreground text-sm">
              {bottomPromptText}{" "}
              <button
                type="button"
                onClick={onBottomPromptClick}
                className="text-primary font-semibold underline-offset-4 transition-all hover:underline"
              >
                {bottomPromptLinkText}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
