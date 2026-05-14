"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Guillermo Rauch",
    role: "CEO, Vercel",
    avatar: "https://avatars.githubusercontent.com/u/13041",
    content:
      "Shipping faster without sacrificing quality is what matters. Tools like this make that balance actually achievable.",
  },
  {
    name: "Evan You",
    role: "Creator of Vue.js",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    content:
      "Developer experience is everything. When things just work, teams move significantly faster.",
  },
  {
    name: "Dan Abramov",
    role: "React Core Team",
    avatar: "https://avatars.githubusercontent.com/u/810438",
    content:
      "Good abstractions remove friction. This is the kind of tooling that helps teams focus on what actually matters.",
  },
  {
    name: "Kent C. Dodds",
    role: "Educator & OSS",
    avatar: "https://avatars.githubusercontent.com/u/1500684",
    content:
      "The simplicity here is what stands out. It solves real problems without getting in your way.",
  },
  {
    name: "Theo Browne",
    role: "T3 Stack Creator",
    avatar: "https://avatars.githubusercontent.com/u/11719236",
    content:
      "Speed, clarity, and solid defaults — that’s what good tools should deliver. This nails it.",
  },
  {
    name: "Lee Robinson",
    role: "VP, Vercel",
    avatar: "https://avatars.githubusercontent.com/u/9113740",
    content:
      "Performance and developer experience go hand in hand. This setup gets both right.",
  },
];

export default function Testimonials2() {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    [],
  );

  return (
    <section className="theme-injected bg-background w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-start space-y-4 text-left">
            <h2 className="text-foreground text-4xl font-semibold md:text-5xl">
              Trusted by teams who move money
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Reduce risk, gain visibility, and help your finance team stay
              focused — not buried in approvals.
            </p>
          </div>

          <div className="relative h-[400px] w-full rounded-lg lg:h-[500px]">
            <div className="from-background pointer-events-none absolute top-0 right-0 left-0 z-10 h-20 bg-gradient-to-b to-transparent" />

            <Carousel
              orientation="vertical"
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[plugin]}
              onMouseEnter={plugin.stop}
              onMouseLeave={() => plugin.reset()}
              className="h-full w-full [&_[data-slot=carousel-content]]:h-[400px] lg:[&_[data-slot=carousel-content]]:h-[500px]"
            >
              <CarouselContent className="-mt-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="basis-auto pt-4">
                    <Card className="bg-muted/50 rounded-3xl ring-0 transition-all duration-200">
                      <CardContent className="flex flex-col gap-4 p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="rounded-lg">
                              <AvatarImage
                                src={testimonial.avatar}
                                alt={testimonial.name}
                              />
                              <AvatarFallback>
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-foreground text-sm font-medium">
                                {testimonial.name}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                {testimonial.role}
                              </span>
                            </div>
                          </div>
                          <Quote className="h-5 w-5 fill-sky-500 text-sky-500" />
                        </div>
                        <p className="text-foreground text-sm leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-20 bg-gradient-to-t to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
