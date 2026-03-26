"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const colors = {
  bg: "bg-zinc-950",
  cardBg: "bg-zinc-900",
  border: "border-zinc-800",
  textMain: "text-zinc-100",
  textSub: "text-zinc-400",
  textMuted: "text-zinc-500",
  statusUp: "bg-sky-500",
  statusDown: "bg-rose-500",
  accent: "text-sky-400",
  highlightBg: "bg-zinc-800",
  faintBg: "bg-zinc-800/50",
  outline: "border-zinc-700",
  faintOutline: "border-zinc-800",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

type Incident = {
  id: string;
  message: string;
  region: string;
};

type ChatIncidentProps = {
  text: string;
  incidents: Incident[];
};

export const ChatIncident = ({ text, incidents }: ChatIncidentProps) => {
  return (
    <div className="mt-2 flex flex-col [mask-image:linear-gradient(to_bottom,black_0%,transparent),linear-gradient(to_right,black_0%,transparent)] p-4">
      <div className="flex gap-1">
        <div className="ml-0.5 size-10 shrink-0 rounded-full border border-slate-600/40 bg-slate-800/50" />

        <div className="w-fit rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-800/20 px-3 py-2 text-sm text-slate-200">
          {text}
        </div>
      </div>

      <div className="relative mt-1 gap-y-1 pl-4">
        {incidents.map((item) => (
          <div key={item.id} className="relative flex flex-col items-center">
            <div className="h-4 w-[2px] translate-x-[5px] self-start bg-slate-600/60" />
            <div className="flex w-full items-center gap-2 self-start">
              <div className="z-10 size-3 shrink-0 rounded-full bg-red-400" />

              <p className="truncate text-sm text-slate-200">{item.message}</p>

              <span className="ml-auto rounded-full bg-slate-700/20 px-2 py-1 text-[10px] whitespace-nowrap text-slate-400">
                {item.region}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Card3_BrowserMock = () => (
  <div className="h-full translate-x-[10%] translate-y-8 overflow-clip rounded-t-xl [mask-image:linear-gradient(to_top,transparent,black_100%)] p-2">
    <div
      className={`flex items-center gap-1.5 rounded-t-lg bg-neutral-900 p-1.5`}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
      <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
      <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
      <span className={`text-[8px] ${colors.textMuted} ml-auto font-mono`}>
        allpine.com
      </span>
      <span className={`text-[10px] ${colors.textMuted} mx-1`}>+</span>
    </div>
    <div
      className={`h-full border-t bg-gradient-to-b from-slate-800 to-transparent p-3`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className={`text-[10px] ${colors.textMain}`}>←</span>
        <span className={`text-[10px] ${colors.textMuted}`}>→</span>
        <span className={`text-[10px] ${colors.textMuted}`}>↻</span>
        <span
          className={`text-[10px] ${colors.textMuted} border font-mono ${colors.outline} truncate rounded px-2`}
        >
          www.corestack.com
        </span>
      </div>
      <div className={`rounded bg-slate-400/20 p-2 text-[10px]`}>
        <span className="text-green-400">connection is secure</span>
        <p className={colors.textMuted}>
          Your information is private when
          <br /> it is seen on this site
        </p>
      </div>
    </div>
  </div>
);

const Card4_IncidentsMock = () => (
  <div className={`h-full space-y-4 rounded-md py-6 pl-6`}>
    <div className="flex flex-col justify-center gap-1">
      <div className="flex items-center gap-4">
        <div
          className={`relative size-7 shrink-0 rounded ${colors.statusDown} `}
        >
          <div className="absolute left-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-[120%] bg-slate-600" />
          <div className="absolute left-1/2 h-3 w-0.5 -translate-x-1/2 translate-y-[250%] bg-slate-600" />
        </div>
        <div className="flex flex-col leading-tight">
          <p className={`text-md ${colors.textMain} font-semibold`}>
            10 similar incidents
          </p>
          <p className={`text-[9px] font-semibold ${colors.textMuted}`}>
            15 may 2025 at 06:04am
          </p>
        </div>
      </div>
    </div>
    <div
      className={`flex h-full flex-col border ${colors.faintOutline} relative overflow-clip rounded-l-md bg-gradient-to-br from-[#1B202B] to-transparent [mask-image:linear-gradient(to_top,transparent,black_60%)]`}
    >
      {[
        { name: "tesla.com", type: "Peer certificate cannot be authenticated" },
        { name: "around.co", type: "Peer certificate cannot be authenticated" },
      ].map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-2 p-2 first:border-b first:border-slate-700/80"
        >
          <div className="relative size-8 shrink-0 rounded-full bg-red-400/30 after:absolute after:inset-0 after:top-1/2 after:left-1/2 after:size-6 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-red-400/80 after:content-['']" />

          <div className="min-w-0">
            <p className={`text-xs ${colors.textMain} truncate`}>{item.name}</p>
            <p className={`text-[10px] ${colors.textMuted} truncate`}>
              {item.type}
            </p>
          </div>
        </div>
      ))}
      <div className="absolute top-0 size-90 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-slate-500 to-transparent opacity-60 blur-3xl"></div>
    </div>
  </div>
);

const Card5_StackMock = () => (
  <div
    className={`grid h-full w-full grid-cols-4 gap-x-6 border py-4 ${colors.faintOutline} rounded-md ${colors.faintBg} [mask-image:radial-gradient(ellipse_50%_50%_at_center,black_50%,transparent_100%)]`}
  >
    {["AWS", "Vercel", "Slack", "Linear"].map((stack) => (
      <div
        key={stack}
        className={`aspect-square translate-x-1/2 rounded bg-[#303847]`}
      />
    ))}
    {["Github", "Sentry", "Datadog", "Notion"].map((stack) => (
      <div
        key={stack}
        className={`aspect-square -translate-x-1/2 rounded bg-[#303847]`}
      />
    ))}
  </div>
);

type BackupItem = {
  id: string;
  label: string;
  active?: boolean;
};

type BackupListProps = {
  items: BackupItem[];
};

const backups = [
  { id: "1", label: "managed database backup" },
  { id: "2", label: "new database backup", active: true },
  { id: "3", label: "core database backup" },
];

export const BackupList = ({ items }: BackupListProps) => {
  return (
    <div className="space-y-2 [mask-image:linear-gradient(to_right,black_10%,transparent)] py-4 pl-6">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex w-full items-center gap-3 rounded-l-lg p-2 transition ${
            item.active
              ? "translate-x-4 bg-gradient-to-r from-slate-700/60 to-slate-800/20"
              : "translate-x-12 border border-white/5 bg-slate-800/60"
          }`}
        >
          <div
            className={`size-8 shrink-0 rounded-sm ${
              item.active
                ? "bg-blue-400"
                : "border border-slate-600 bg-slate-600"
            }`}
          />
          <span
            className={`truncate text-xs ${
              item.active ? "text-slate-100" : "text-slate-400"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

function IncidentsCard1() {
  return (
    <div className="relative flex h-full flex-col gap-2 p-6">
      <div className="absolute top-0 left-0 size-40 rounded-lg border border-red-500 bg-gradient-to-br from-slate-500 to-transparent opacity-40 blur-3xl"></div>

      <span className={`text-xs ${colors.textMuted}`}>Incidents</span>
      <div className="flex items-center gap-3">
        <div className={`h-7 w-7 shrink-0 rounded ${colors.statusUp}`} />
        <div className="flex min-w-0 flex-col">
          <span className={`text-xs ${colors.textMain} truncate`}>
            allpine.com/status
          </span>
          <p className={`flex gap-3 text-[10px] ${colors.textMuted}`}>
            <span className={colors.accent}>Up.</span>Checked every 25 sec
          </p>
        </div>
      </div>

      <div className={`mt-2`}>
        <div className="flex items-center justify-between gap-2 text-sm font-normal">
          <span className={colors.textMuted}>Response</span>
          <span
            className={`rounded-lg bg-slate-400/10 px-4 py-2 text-xs text-neutral-400`}
          >
            Screenshot
          </span>
          <span className={colors.textMuted}>Monitor</span>
        </div>
      </div>
    </div>
  );
}

const BentoGrid9 = () => {
  return (
    <div
      className={`min-h-screen ${colors.bg} flex items-center justify-center px-4 py-12 font-sans sm:px-8`}
    >
      <motion.div
        className="grid max-w-7xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <BentoCard
          title="Stop Guessing, Start Seeing"
          description="Don't just get an alert. Get the exact screenshot and error log at the moment of failure for instant diagnosis."
        >
          <IncidentsCard1 />
        </BentoCard>

        <BentoCard
          title="The Complete Post-Mortem"
          description="Instantly see who was alerted and what actions were taken with a second-by-second timeline for every incident."
        >
          <ChatIncident
            text="Could you check this out, Mike?"
            incidents={[
              { id: "1", message: "Monitor recovered.", region: "NA" },
              { id: "2", message: "Monitor recovered.", region: "NA" },
              { id: "3", message: "Monitor recovered.", region: "NA" },
            ]}
          />
        </BentoCard>

        <BentoCard
          title="Prevent the Obvious Outages"
          description="We monitor more than just uptime. Get proactive alerts on SSL/TLD expirations before your users see an error."
        >
          <Card3_BrowserMock />
        </BentoCard>

        <BentoCard
          title="Silence the Alert Storm"
          description="When a core service fails, get one smart alert, not fifty. Acknowledge once and fix the root cause without the noise."
        >
          <Card4_IncidentsMock />
        </BentoCard>

        <BentoCard
          title="Your Entire Stack in One Place"
          description="Connect to AWS, Vercel, Slack, and more in minutes. Get total visibility without changing your workflow."
        >
          <Card5_StackMock />
        </BentoCard>

        <BentoCard
          title="Find Your Silent Failures"
          description="Know instantly when a critical backup or background job fails. Don't let your silent workers let you down."
        >
          <BackupList items={backups} />
        </BentoCard>
      </motion.div>
    </div>
  );
};

function BentoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex max-w-[350px] flex-col gap-0 overflow-clip rounded-lg border border-slate-800 bg-[#171C27] p-0">
      <CardContent className="relative h-[200px] overflow-hidden p-0">
        {children}
      </CardContent>
      <CardFooter className="z-10 flex flex-col items-start space-y-2 border-none bg-transparent p-6 pt-2">
        <h3 className="text-lg leading-tight font-bold text-white">{title}</h3>
        <p className="text-xs font-semibold text-gray-400">{description}</p>
      </CardFooter>
    </Card>
  );
}

export default BentoGrid9;
