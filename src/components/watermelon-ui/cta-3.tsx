"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MdArrowOutward,
  MdPlayArrow,
  MdDashboardCustomize,
  MdAutoAwesomeMosaic,
  MdWaves,
  MdDonutSmall,
  MdHexagon,
  MdBlurOn,
} from "react-icons/md";
import type { IconType } from "react-icons";

export interface ProductCardItem {
  id: string;
  name: string;
  icon: IconType;
}

export interface HeroProductSectionProps {
  badgeText?: string;
  headline?: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  products?: ProductCardItem[];
}

const DEFAULT_PRODUCTS: ProductCardItem[] = [
  { id: "synergy", name: "Synergy™", icon: MdDashboardCustomize },
  { id: "apex", name: "Apex™", icon: MdAutoAwesomeMosaic },
  { id: "horizon", name: "Horizon™", icon: MdWaves },
  { id: "catalyst", name: "Catalyst™", icon: MdDonutSmall },
  { id: "phoenix", name: "Phoenix™", icon: MdHexagon },
  { id: "pulse", name: "Pulse™", icon: MdBlurOn },
];

function ProductCard({ name, icon: Icon }: Omit<ProductCardItem, "id">) {
  return (
    <Card className="group dark:shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]' relative flex h-24 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-none bg-zinc-100 p-1 shadow-[inset_0_0_2px_2px_rgba(255,255,255,0),inset_0_0_0_1px_rgba(0,0,0,0),0px_0px_0px_1px_rgba(0,0,0,0),0px_1px_2px_-1px_rgba(0,0,0,0),0px_2px_4px_0px_rgba(0,0,0,0)] transition-all duration-300 dark:bg-zinc-800">
      <div className="bg-background flex size-full flex-col items-center justify-center gap-2">
        <div className="from-primary/[0.03] absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="rounded-mone bg-transaprent text-muted-foreground/80 group-hover:bg-primary-600 group-hover:text-primary group-hover:ring-primary-600 relative flex h-10 w-10 scale-200 items-center justify-center transition-all duration-300">
          <Icon className="text-2xl" />
        </div>

        <span className="text-foreground relative z-10 text-[15px] font-semibold tracking-tight transition-colors duration-300">
          {name}
        </span>
      </div>
    </Card>
  );
}

export default function Cta3({
  headline = "Explore what's next",
  subtitle = "Transform your workflow with intuitive tools.",
  primaryCta = { label: "Start your free trial" },
  secondaryCta = { label: "How it works?" },
  products = DEFAULT_PRODUCTS,
}: HeroProductSectionProps) {
  return (
    <section className="bg-background flex min-h-screen items-center px-6 py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
              {headline}
            </h1>

            <p className="text-muted-foreground max-w-md text-base sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              className="bg-primary/60 border-primary/80 text-md h-12 rounded-none border-dashed px-6 font-semibold text-white shadow-[inset_0_0px_4px_2px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_0px_4px_2px_rgba(0,0,0,0.4)]"
              onClick={primaryCta.onClick}
              asChild={!!primaryCta.href}
            >
              {primaryCta.href ? (
                <a
                  href={primaryCta.href}
                  className="flex items-center justify-center gap-2"
                >
                  {primaryCta.label}
                  <MdArrowOutward className="h-4 w-4" />
                </a>
              ) : (
                <button className="flex items-center justify-center gap-2">
                  {primaryCta.label}
                  <MdArrowOutward className="h-4 w-4" />
                </button>
              )}
            </Button>

            <Button
              variant="secondary"
              className="bg-muted/60 text-foreground hover:bg-muted/80 h-12 gap-2 rounded-none border-dashed border-black/50 px-6 text-[15px] font-medium shadow-none dark:border-zinc-400"
              onClick={secondaryCta.onClick}
              asChild={!!secondaryCta.href}
            >
              {secondaryCta.href ? (
                <a
                  href={secondaryCta.href}
                  className="flex items-center justify-center gap-2"
                >
                  <MdPlayArrow className="text-muted-foreground size-5" />
                  {secondaryCta.label}
                </a>
              ) : (
                <button className="flex items-center justify-center gap-2">
                  <MdPlayArrow className="text-muted-foreground size-5" />
                  {secondaryCta.label}
                </button>
              )}
            </Button>
          </div>
        </div>

        <div className="border-border bg-muted grid grid-cols-2 gap-2 border p-1 sm:grid-cols-3">
          {products.map(({ id, ...rest }) => (
            <ProductCard key={id} {...rest} />
          ))}
        </div>
      </div>
    </section>
  );
}
