"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { SiImdb, SiRottentomatoes, SiMetacritic } from "react-icons/si";

const stats = [
  {
    icon: SiImdb,
    iconColor: "#F5C518",
    label: "IMDb",
    sublabel: "User Rating",
    badgeBg: "rgba(245,197,24,0.1)",
    badgeBorder: "rgba(245,197,24,0.3)",
    badgeText: "#b8960e",
    metric: "8.7",
    metricSuffix: "/10",
    subtext: "Audience favorite score",
    description:
      "Rated by millions of moviegoers worldwide — one of the highest user-reviewed scores this year.",
    starColor: "text-yellow-400",
    ratingCount: 5,
    gradient:
      "repeating-linear-gradient(135deg, rgba(245,197,24,0.08) 0px, rgba(245,197,24,0.08) 1px, transparent 1px, transparent 6px, rgba(245,197,24,0.04) 6px, rgba(245,197,24,0.04) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: SiRottentomatoes,
    iconColor: "#FA320A",
    label: "Rotten Tomatoes",
    sublabel: "Tomatometer",
    badgeBg: "rgba(250,50,10,0.08)",
    badgeBorder: "rgba(250,50,10,0.25)",
    badgeText: "#c42a0a",
    metric: "94",
    metricSuffix: "%",
    subtext: "Certified Fresh",
    description:
      "Critics agree — a must-watch experience with near-universal acclaim from top-tier reviewers.",
    starColor: "text-red-500",
    ratingCount: 5,
    gradient:
      "repeating-linear-gradient(135deg, rgba(250,50,10,0.08) 0px, rgba(250,50,10,0.08) 1px, transparent 1px, transparent 6px, rgba(250,50,10,0.04) 6px, rgba(250,50,10,0.04) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: SiMetacritic,
    iconColor: "#FFCC34",
    label: "Metacritic",
    sublabel: "Metascore",
    badgeBg: "rgba(102,195,75,0.08)",
    badgeBorder: "rgba(102,195,75,0.3)",
    badgeText: "#4a8a36",
    metric: "87",
    metricSuffix: "/100",
    subtext: "Universal acclaim",
    description:
      "Aggregated from leading publications — a Metascore that places it among the year's best.",
    starColor: "text-emerald-500",
    ratingCount: 5,
    gradient:
      "repeating-linear-gradient(135deg, rgba(102,195,75,0.08) 0px, rgba(102,195,75,0.08) 1px, transparent 1px, transparent 6px, rgba(255,204,52,0.05) 6px, rgba(255,204,52,0.05) 7px, transparent 7px, transparent 12px)",
  },
];

export default function Stats1() {
  return (
    <section className="theme-injected w-full px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-foreground mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
          Critic scores, audience approved
        </h2>

        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
          See how top review platforms rate the experience — trusted by millions
          of viewers and leading critics.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="group relative overflow-hidden rounded-4xl p-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] ring-0 transition-all duration-300 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_0px_rgba(0,0,0,0.1)]"
              style={{ backgroundImage: stat.gradient }}
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-center">
                  <div
                    className="inline-flex items-center gap-3 rounded-xl px-3.5 py-2"
                    style={{
                      backgroundColor: stat.badgeBg,
                      border: `1px solid ${stat.badgeBorder}`,
                    }}
                  >
                    <stat.icon
                      className="size-5 shrink-0"
                      style={{ color: stat.iconColor }}
                    />
                    <div className="flex flex-col items-start leading-none">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: stat.badgeText }}
                      >
                        {stat.label}
                      </span>
                      <span className="text-muted-foreground mt-0.5 text-[10px] tracking-widest uppercase">
                        {stat.sublabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-baseline gap-0.5 text-left">
                  <span className="text-foreground text-6xl font-bold tracking-tighter">
                    {stat.metric}
                  </span>
                  <span className="text-muted-foreground text-2xl font-medium">
                    {stat.metricSuffix}
                  </span>
                </div>

                <p className="text-foreground mt-5 text-left text-sm font-semibold">
                  {stat.subtext}
                </p>

                <p className="text-muted-foreground mt-2 text-left text-sm leading-relaxed">
                  {stat.description}
                </p>

                <div className="mt-auto flex gap-1 pt-6">
                  {Array.from({ length: stat.ratingCount }).map((_, i) => (
                    <FaStar key={i} className={`size-4 ${stat.starColor}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
