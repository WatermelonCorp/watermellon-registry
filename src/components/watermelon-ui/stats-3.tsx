'use client';


import { FaStar, FaBolt, FaServer, FaRocket } from 'react-icons/fa';
import { SiVercel, SiProducthunt } from 'react-icons/si';

const metrics = [
  {
    icon: FaServer,
    iconColor: 'text-emerald-500',
    value: '99.99%',
    label: 'uptime SLA',
  },
  {
    icon: FaRocket,
    iconColor: 'text-blue-500',
    value: '2.4M',
    label: 'deployments',
  },
  {
    icon: FaBolt,
    iconColor: 'text-amber-500',
    value: '<50ms',
    label: 'avg latency',
  },
];

const endorsements = [
  {
    icon: SiProducthunt,
    iconClass: 'text-orange-500',
    score: '#1',
    name: 'Product Hunt',
  },
  {
    icon: FaStar,
    iconClass: 'text-amber-400',
    score: '4.8',
    name: 'G2 Reviews',
  },
  { icon: SiVercel, iconClass: '', score: 'Featured', name: 'Vercel' },
];

export default function Stats3() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="group/section w-full px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-foreground mt-4 text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl">
            Infrastructure that{' '}
            <span className="relative z-10 inline font-bold after:absolute after:bottom-1 after:left-0 after:z-0 after:h-1.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-indigo-500/20 after:to-purple-500/20 after:transition-transform after:duration-500 after:ease-out group-hover/section:after:scale-x-100 dark:after:from-indigo-500/50 dark:after:to-purple-500/50">
              scales with you
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-base leading-relaxed">
            Battle-tested by engineering teams shipping to millions of users
            every single day.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="group from-muted to-muted/60 text-foreground relative flex cursor-default items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-b px-7 py-4 shadow-[inset_0_1px_0_0.5px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(0,0,0,0),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1500 group-hover:translate-x-[200%] dark:via-white/10" />
                <m.icon
                  className={`size-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${m.iconColor}`}
                />
                <span className="text-2xl font-bold tracking-tight transition-all duration-500 ease-out group-hover:tracking-normal md:text-3xl">
                  {m.value}
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-2">
            {endorsements.map((e, index) => (
              <div key={e.name} className="flex items-center">
                <div className="group hover:bg-muted/60 hover:text-foreground flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors duration-300">
                  <e.icon
                    className={`size-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 ${e.iconClass}`}
                  />
                  <span className="font-medium">{e.score}</span>
                  <span>{e.name}</span>
                </div>
                {index < endorsements.length - 1 && (
                  <div className="bg-border mx-1 h-4 w-px" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
