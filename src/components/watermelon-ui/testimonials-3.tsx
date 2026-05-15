import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Heart, Repeat2 } from "lucide-react";

function XLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    name: "Dan Abramov",
    username: "@dan_abramov",
    avatar: "https://github.com/gaearon.png",
    text: "Honestly didn't expect onboarding to be this smooth. Everything just clicked without me reading docs.",
    date: "Dec 5, 2025",
    replies: 21,
    retweets: 48,
    likes: 390,
  },
  {
    name: "Evan You",
    username: "@youyuxi",
    avatar: "https://github.com/yyx990803.png",
    text: "The way it adapts to your workflow instead of forcing one is what sold me.",
    date: "Dec 5, 2025",
    replies: 11,
    retweets: 34,
    likes: 265,
  },
  {
    name: "Sindre Sorhus",
    username: "@sindresorhus",
    avatar: "https://github.com/sindresorhus.png",
    text: "Zero clutter, zero confusion. This is how tools should feel in 2025.",
    date: "Dec 5, 2025",
    replies: 15,
    retweets: 41,
    likes: 320,
  },
  {
    name: "Linus Torvalds",
    username: "@torvalds",
    avatar: "https://github.com/torvalds.png",
    text: "I care about efficiency. This actually removes friction instead of adding abstraction.",
    date: "Dec 5, 2025",
    replies: 33,
    retweets: 72,
    likes: 610,
  },
  {
    name: "David H. Hansson",
    username: "@dhh",
    avatar: "https://github.com/dhh.png",
    text: "Feels opinionated in the right places. You don't waste time deciding trivial things.",
    date: "Dec 5, 2025",
    replies: 14,
    retweets: 38,
    likes: 295,
  },
  {
    name: "Theo Browne",
    username: "@t3dotgg",
    avatar: "https://github.com/t3dotgg.png",
    text: "Setup took minutes, but what surprised me is how fast the team adopted it.",
    date: "Dec 5, 2025",
    replies: 27,
    retweets: 63,
    likes: 470,
  },
  {
    name: "Jeremy Ashkenas",
    username: "@jashkenas",
    avatar: "https://github.com/jashkenas.png",
    text: "Replaced 3 tools with this. Not going back.",
    date: "Dec 5, 2025",
    replies: 9,
    retweets: 22,
    likes: 205,
  },
  {
    name: "Guillermo Rauch",
    username: "@rauchg",
    avatar: "https://github.com/rauchg.png",
    text: "Fast, predictable, and well-designed. You can tell a lot of thought went into the UX.",
    date: "Dec 5, 2025",
    replies: 18,
    retweets: 50,
    likes: 380,
  },
  {
    name: "Addy Osmani",
    username: "@addyosmani",
    avatar: "https://github.com/addyosmani.png",
    text: "Performance is top-tier. No loading anxiety, no weird delays — just instant feedback.",
    date: "Dec 5, 2025",
    replies: 16,
    retweets: 44,
    likes: 340,
  },
];

export default function Testimonials3() {
  return (
    <section className="theme-injected bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="text-foreground mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Teams don’t go back after switching
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg">
            Real feedback from people using it every day — not curated quotes.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <Card
              key={idx}
              className="bg-muted/50 flex flex-col rounded-xl pb-4 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] ring-0 transition-all duration-200 hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_8px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.06),0px_0px_0px_1px_rgba(255,255,255,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.4),0px_2px_4px_0px_rgba(0,0,0,0.3)] dark:hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.06),0px_0px_0px_1px_rgba(255,255,255,0.1),0px_6px_8px_0px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start justify-between px-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="text-foreground text-sm font-semibold">
                        {t.name}
                      </span>
                      <CheckCircle className="h-3.5 w-3.5 fill-sky-500 text-sky-500" />
                    </div>

                    <span className="text-muted-foreground text-xs">
                      {t.username}
                    </span>
                  </div>
                </div>

                <XLogoIcon className="text-muted-foreground h-4 w-4" />
              </div>

              <p className="text-foreground text-md flex-1 px-4 leading-relaxed">
                {t.text}
              </p>

              <div className="flex flex-row items-center justify-between px-4">
                <div className="text-muted-foreground text-sm font-medium">
                  {t.date}
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-muted-foreground flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-500">
                    <Heart className="h-4 w-4" />
                    <span>{t.likes}</span>
                  </button>
                  <button className="text-muted-foreground flex items-center gap-1 text-sm font-medium transition-colors hover:text-green-500">
                    <Repeat2 className="h-4 w-4" />
                    <span>{t.retweets}</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
