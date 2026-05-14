"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FaBolt, FaRocket, FaShieldAlt } from "react-icons/fa";

const stats = [
  {
    icon: FaBolt,
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    pillBg: "bg-amber-500/10",
    pillText: "text-amber-600",
    glowColor: "rgba(245,158,11,0.15)",
    accentGradient: "from-amber-400 via-orange-400 to-rose-400",
    label: "Lines shipped per sprint",
    metric: "2.4M",
    subLabel: "Across all repos",
    description:
      "Engineering teams push more high-quality code with automated reviews and instant CI feedback loops.",
  },
  {
    icon: FaRocket,
    gradientFrom: "from-cyan-400",
    gradientTo: "to-blue-500",
    pillBg: "bg-cyan-500/10",
    pillText: "text-cyan-600",
    glowColor: "rgba(6,182,212,0.15)",
    accentGradient: "from-cyan-400 via-blue-400 to-indigo-400",
    label: "Deploys per day on average",
    metric: "12x",
    subLabel: "Faster releases",
    description:
      "Zero-downtime deploys with canary rollouts mean your team ships confidently, every single day.",
  },
  {
    icon: FaShieldAlt,
    gradientFrom: "from-emerald-400",
    gradientTo: "to-teal-500",
    pillBg: "bg-emerald-500/10",
    pillText: "text-emerald-600",
    glowColor: "rgba(16,185,129,0.15)",
    accentGradient: "from-emerald-400 via-teal-400 to-cyan-400",
    label: "Platform uptime guaranteed",
    metric: "99.9%",
    subLabel: "Reliability score",
    description:
      "Built on geo-distributed infrastructure with automatic failover — trusted by teams who never sleep.",
  },
];

export default function Stats2() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes metric-in {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .stat-card {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stat-card:hover .accent-bar {
          height: 100% !important;
          top: 0 !important;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stat-card .accent-bar {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stat-card:hover .card-glow {
          opacity: 1;
        }
        .card-glow {
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stat-card:hover .metric-value {
          animation: float 3s ease-in-out infinite;
        }
        .stat-card:hover .pill-badge {
          transform: scale(1.03);
          box-shadow: 0 0 0 1px currentColor;
        }
        .pill-badge {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stat-card:hover .shimmer-line {
          animation: shimmer 2s linear infinite;
          background-size: 200% 100%;
        }
        .stat-card:hover .stat-icon {
          transform: rotate(-8deg) scale(1.15);
        }
        .stat-icon {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stat-card:hover .desc-text {
          color: var(--foreground);
        }
        .desc-text {
          transition: color 0.4s ease;
        }
      `}</style>

      <section className="theme-injected w-full px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-foreground mt-8 text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-[3.5rem]">
            Built for teams that
            <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              ship relentlessly
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg">
            Stop drowning in tooling overhead. One platform to code, deploy, and
            monitor — so engineers can focus on building.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="stat-card group bg-background relative overflow-hidden rounded-none p-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] ring-0 transition-shadow duration-300 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_0px_rgba(0,0,0,0.1)]"
              >
                <div
                  className="card-glow pointer-events-none absolute inset-0 rounded-none opacity-0"
                  style={{
                    background: `radial-gradient(600px circle at 50% 0%, ${stat.glowColor}, transparent 60%)`,
                  }}
                />

                <div
                  className={`accent-bar absolute top-[20%] left-0 h-[60%] w-[3px] rounded-full bg-gradient-to-b ${stat.accentGradient}`}
                />

                <CardContent className="relative flex h-full flex-col p-7 text-left">
                  <div className="flex items-center">
                    <span
                      className={`pill-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase ${stat.pillBg} ${stat.pillText}`}
                    >
                      <stat.icon className="stat-icon size-3" />
                      {stat.label}
                    </span>
                  </div>

                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="metric-value text-foreground text-6xl font-bold tracking-tighter">
                      {stat.metric}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className={`shimmer-line h-[2px] w-8 rounded-full bg-gradient-to-r ${stat.accentGradient}`}
                      style={{
                        backgroundImage: `linear-gradient(90deg, transparent, currentColor, transparent)`,
                      }}
                    />
                    <p className="text-foreground text-sm font-medium">
                      {stat.subLabel}
                    </p>
                  </div>

                  <p className="desc-text text-muted-foreground mt-6 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
