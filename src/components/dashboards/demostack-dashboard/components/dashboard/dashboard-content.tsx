'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, X } from 'lucide-react';
import {
  BgFolderVector,
  DashboardFolderPlusIcon,
  DashboardImagesIcon,
  DashboardVideoIcon,
  FigGraduationIcon,
  FigLightbulbIcon,
  FigPlayIcon,
  FigSparkleIcon,
  InspireFourIcon,
  InspireOneIcon,
  InspireThreeIcon,
  InspireTwoIcon,
} from '../../assets/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const dashboardActions = [
  {
    title: 'Create a Demostack',
    description: 'Record an example Demostack in under 2 minutes',
    image: 'https://assets.watermelon.sh/components/bg-element-wave.webp',
    icon: DashboardFolderPlusIcon,
  },
  {
    title: 'Interactive Tutorial',
    description: 'Get a high-level platform overview in a few clicks',
    image: 'https://assets.watermelon.sh/components/bg-element-neon.webp',
    icon: DashboardVideoIcon,
  },
  {
    title: 'Explore Gallery',
    description: 'Get inspired with examples and use cases',
    image: 'https://assets.watermelon.sh/components/bg-element-sky.webp',
    icon: DashboardImagesIcon,
  },
] as const;

const dashboardTips = [
  {
    title: 'Use case tips from the CEO',
    description: 'Our high-level recommendation',
    image: 'https://assets.watermelon.sh/components/demostack-tip-1.webp',
  },
  {
    title: 'Personalized outbound',
    description: 'Use variables to send personalized demos at scale',
    image: 'https://assets.watermelon.sh/components/demostack-tip-2.webp',
  },
  {
    title: 'Tradeshow and expo demos',
    description: 'Include in email sequences or follow-ups',
    image: 'https://assets.watermelon.sh/components/demostack-tip-3.webp',
  },
  {
    title: 'Modular onboarding emails',
    description: 'Include in email sequences or follow-ups',
    image: 'https://assets.watermelon.sh/components/demostack-tip-4.webp',
  },
] as const;

const inspiredDemos = [
  { title: 'Mobile App Demo', icon: InspireOneIcon },
  { title: 'Payment Flow Demo', icon: InspireTwoIcon },
  { title: 'Team Workspace Demo', icon: InspireThreeIcon },
  { title: 'Analytics Platform Demo', icon: InspireFourIcon },
] as const;

const dashboardResources = [
  { label: 'Learning Academy', icon: FigGraduationIcon },
  { label: 'Knowledge Base', icon: FigLightbulbIcon },
  { label: 'How we use Demostack', icon: FigPlayIcon },
  { label: 'Product Updates', icon: FigSparkleIcon },
] as const;

export function DashboardContent() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-9 px-4 py-6 sm:p-7">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {dashboardActions.map((action) => (
          <DashboardActionCard key={action.title} action={action} />
        ))}
      </section>

      <DashboardTips />

      <div className="flex flex-col gap-8 lg:flex-row">
        <ResourcesSection />
        <InspirationList />
      </div>
    </div>
  );
}

function DashboardActionCard({
  action,
}: {
  action: (typeof dashboardActions)[number];
}) {
  const Icon = action.icon;

  return (
    <Card className="shadow-border hover:shadow-border-hover gap-8 rounded-2xl py-4 ring-0 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none">
      <CardContent className="flex flex-col items-start gap-8">
        <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-lg">
          <img
            src={action.image}
            alt=""
            width={44}
            height={44}
            className="absolute inset-0 size-full object-cover"
          />
          <Icon className="text-primary-foreground relative z-10 size-6" />
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="font-medium">{action.title}</p>
          <p className="text-muted-foreground text-sm">{action.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardTips() {
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!visible) {
    return null;
  }

  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Demostack Tips</h2>
          <p className="text-muted-foreground">
            Drive successful outcomes across multiple departments and
            interactive demos
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVisible(false)}
          className="bg-card shadow-border rounded-full border-0"
          aria-label="Close tips"
        >
          Close
          <X />
        </Button>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {dashboardTips.map((tip) => (
            <article
              key={tip.title}
              className="flex w-64 shrink-0 flex-col items-start gap-4"
            >
              <div className="relative aspect-[3/2] w-64 overflow-hidden rounded-2xl">
                <img
                  src={tip.image}
                  alt=""
                  width={256}
                  height={176}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <h3 className="font-medium">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {tip.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="from-background via-background/70 absolute top-0 right-0 h-64 w-36 bg-gradient-to-l to-transparent" />
        <Button
          variant="outline"
          size="icon-lg"
          onClick={scrollRight}
          className="bg-card shadow-border absolute top-28 right-0 z-10 rounded-full border-0"
          aria-label="Show more tips"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="flex flex-1 flex-col items-start gap-8 lg:max-w-lg">
      <h2 className="text-lg font-semibold">Resources</h2>
      <div className="grid w-full grid-cols-2 gap-4">
        {dashboardResources.map((resource) => {
          const Icon = resource.icon;

          return (
            <article
              key={resource.label}
              className="group flex flex-col items-start gap-3"
            >
              <div className="bg-muted shadow-border group-hover:shadow-border-hover flex h-32 w-full items-center justify-center overflow-hidden rounded-xl transition-[transform,box-shadow] duration-200 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none">
                <div className="relative flex size-20 items-center justify-center transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:rotate-1 motion-reduce:transform-none">
                  <BgFolderVector className="absolute inset-0 size-full" />
                  <Icon className="relative z-10 mt-4 size-6 transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transform-none" />
                </div>
              </div>
              <h3 className="font-medium transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none">
                {resource.label}
              </h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function InspirationList() {
  return (
    <section className="flex flex-1 flex-col items-start gap-8">
      <h2 className="text-lg font-semibold">Get Inspired</h2>
      <div className="flex w-full flex-col gap-2">
        {inspiredDemos.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="bg-muted shadow-border hover:shadow-border-hover group flex h-18 w-full items-center justify-between rounded-2xl py-4 pr-8 pl-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center">
                  <Icon className="max-h-7 max-w-7 transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transform-none" />
                </div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <ArrowUpRight className="text-muted-foreground size-6 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
