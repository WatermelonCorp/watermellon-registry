"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent } from "@/components/ui/card";
import { MdPerson, MdMailOutline } from "react-icons/md";
import type { ReactNode } from "react";

export interface ContactMethod {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface ContactFormProps {
  topics: { value: string; label: string }[];
  submitButtonText?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface Contact2Props {
  badge?: string;
  heading: string;
  description: string;
  contactMethods: ContactMethod[];
  form: ContactFormProps;
  footerText?: string;
}

const CELL_COUNT = 1000;
const cellDelays = Array.from({ length: CELL_COUNT }).map(() =>
  Math.floor(Math.random() * 4000),
);

function GridBackground() {
  const [activeCells, setActiveCells] = useState<number[]>([]);

  useEffect(() => {
    const generateCells = () => {
      const cells = [];
      const count = Math.floor(Math.random() * 30) + 15;
      for (let i = 0; i < count; i++) {
        cells.push(Math.floor(Math.random() * CELL_COUNT));
      }
      setActiveCells(cells);
    };

    generateCells();
    const interval = setInterval(generateCells, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,white_0%,transparent_70%)]">
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))]">
        {Array.from({ length: CELL_COUNT }).map((_, i) => {
          const isActive = activeCells.includes(i);
          return (
            <div
              key={i}
              style={{ transitionDelay: `${cellDelays[i]}ms` }}
              className={`border-border/10 aspect-square border-[0.5px] opacity-20 transition-all duration-[200ms] ease-in-out ${
                isActive
                  ? "bg-primary [box-shadow:0_0_20px_5px_var(--primary)] brightness-150"
                  : "bg-transparent"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Contact2({ badge, heading, description, form }: Contact2Props) {
  return (
    <section className="bg-background relative flex w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="relative z-10 container px-4 md:px-6">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          {badge && (
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground hover:bg-muted/80 mb-6 rounded-full border-none px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {badge}
            </Badge>
          )}
          <h2 className="text-foreground mb-6 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            {description}
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <Card className="border-border/60 bg-background/50 overflow-hidden rounded-4xl shadow-lg backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 md:p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.onSubmit?.(e);
                }}
                className="space-y-4"
              >
                <div className="space-y-0.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Your full name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-muted-foreground/70 absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 h-11 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Work email address
                  </Label>
                  <div className="relative">
                    <MdMailOutline className="text-muted-foreground/70 absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 h-11 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="details" className="text-sm font-medium">
                    Message details
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Tell us more about your inquiry..."
                    className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 min-h-[140px] resize-y p-4"
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-2 h-12 w-full text-base font-medium"
                >
                  {form.submitButtonText || "Send message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <GridBackground />
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="bg-primary/5 absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl dark:opacity-20" />
      </div>
    </section>
  );
}
