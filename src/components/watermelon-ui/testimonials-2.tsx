"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    text: "Setting up smart spend limits and approvals took minutes — now our team moves faster.",
    name: "Guillermo Rauch",
    avatar: "https://github.com/rauchg.png",
    fallback: "GR",
  },
  {
    text: "Love how fast we integrated our banks, wallets, and started tracking expenses in real-time.",
    name: "Lee Robinson",
    avatar: "https://github.com/leerob.png",
    fallback: "LR",
  },
  {
    text: "Audit prep went from painful to painless. This tool just works and saves hours every week.",
    name: "Dan Abramov",
    avatar: "https://github.com/gaearon.png",
    fallback: "DA",
  },
  {
    text: "We automated multi-step approvals and finally stopped chasing down manual receipts.",
    name: "Kent C. Dodds",
    avatar: "https://github.com/kentcdodds.png",
    fallback: "KD",
  },
  {
    text: "Smart controls, simple interface. It’s the only tool our finance ops actually enjoy using.",
    name: "Evan You",
    avatar: "https://github.com/yyx990803.png",
    fallback: "EY",
  },
  {
    text: "Vendor payments used to be messy. Now we track, approve, and sync everything instantly.",
    name: "Theo Browne",
    avatar: "https://github.com/t3dotgg.png",
    fallback: "TB",
  },
];

export default function Testimonials2() {
  return (
    <section className="theme-injected bg-background px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-foreground text-4xl font-semibold md:text-5xl">
          Trusted by teams who move money
        </h2>

        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          Reduce risk, gain visibility, and help your finance team stay focused
          — not buried in approvals.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="group border-primary/20 dark:border-primary/30 from-primary/30 to-primary/25 dark:from-primary/50 dark:to-primary/40 relative z-0 h-full overflow-hidden rounded-4xl border bg-gradient-to-b p-2 text-left ring-0"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 scale-[1.5] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.15),transparent_40%),radial-gradient(circle_at_80%_30%,hsl(var(--primary)/0.1),transparent_40%),radial-gradient(circle_at_50%_80%,hsl(var(--primary)/0.12),transparent_40%)] transition-transform duration-500 group-hover:scale-100" />
              </div>

              <CardContent className="relative z-10 flex h-full flex-col rounded-3xl bg-white px-4 py-4 shadow-[0_0_4px_2px_rgba(0,0,0,0.04),0_0_0px_1px_rgba(0,0,0,0.05),inset_0_1px_4px_1px_rgba(255,255,255,1)] dark:bg-zinc-950 dark:shadow-[inset_0_1px_0px_1px_rgba(255,255,255,0.1),0_0_4px_2px_rgba(0,0,0,0.14),0_0_0px_2px_rgba(0,0,0,0.15)]">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="fill-primary text-primary h-4 w-4"
                    />
                  ))}
                </div>

                <p className="text-foreground flex-1 text-2xl leading-relaxed">
                  "{t.text}"
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.fallback}</AvatarFallback>
                  </Avatar>
                  <span className="text-foreground text-sm">{t.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-10">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground decoration-primary flex items-center justify-center gap-1 underline-offset-4 transition hover:underline"
          >
            See all testimonials
            <ChevronRight />
          </a>
        </div>
      </div>
    </section>
  );
}
