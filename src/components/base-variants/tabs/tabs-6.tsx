import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const analytics = [
  {
    name: 'Conversions',
    value: 'conversions',
    count: '12',
    content: (
      <>
        Track your{' '}
        <span className="text-foreground font-semibold">
          funnel success rate
        </span>
        . Analyze the percentage of users who complete a desired action, from
        sign-ups to successful purchases across your platform.
      </>
    ),
  },
  {
    name: 'Engagement',
    value: 'engagement',
    count: '8',
    content: (
      <>
        Measure your{' '}
        <span className="text-foreground font-semibold">
          audience stickiness
        </span>
        . Monitor daily active sessions, session time, and click-through rates
        on your most critical user interfaces.
      </>
    ),
  },
  {
    name: 'Bounce Rate',
    value: 'bounce',
    count: '24',
    content: (
      <>
        Optimize your{' '}
        <span className="text-foreground font-semibold">
          landing performance
        </span>
        . Identify pages where users are dropping off and implement design
        improvements to keep them browsing your site.
      </>
    ),
  },
];

const Tabs6 = () => {
  return (
    <Tabs defaultValue="conversions" className="gap-4">
      <TabsList className="!h-14 gap-1 rounded-2xl bg-zinc-100/80 px-1 py-1.5 shadow-inner dark:bg-zinc-900/50">
        {analytics.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-background data-[state=active]:text-foreground flex h-auto flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-xs font-semibold tracking-tight transition-all duration-300 data-[state=active]:shadow-md"
          >
            <Badge className="bg-primary flex size-5 items-center justify-center rounded-md border-0 p-0 text-[9px] font-bold tabular-nums">
              {tab.count}
            </Badge>
            <span className="text-muted-foreground group-data-[state=active]:text-foreground transition-colors">
              {tab.name}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {analytics.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex flex-wrap items-baseline gap-2">
            <h4 className="text-xl font-black tracking-tight">{tab.name}</h4>
            <span className="text-muted-foreground/60 text-xs font-medium">
              / Performance Metrics
            </span>
          </div>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            {tab.content}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tabs6;
