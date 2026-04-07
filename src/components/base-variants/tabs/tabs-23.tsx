import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const inbox = [
  {
    name: 'Mentions',
    value: 'mentions',
    count: 3,
    items: [
      {
        user: '@marcus_dev',
        time: '10m ago',
        text: 'Mentioned you in #frontend-team: "Could you review the new dropdown semantics?"',
      },
      {
        user: '@sarah',
        time: '1h ago',
        text: 'Mentioned you in PR #405: "Fixed the alignment issue here, what do you think?"',
      },
      {
        user: '@design_bot',
        time: '2h ago',
        text: 'Tagged you in Figma: "New assets uploaded for the dashboard redesign"',
      },
    ],
  },
  {
    name: 'Direct',
    value: 'direct',
    count: 1,
    items: [
      {
        user: '@alex_boss',
        time: '5m ago',
        text: '"Hey, do you have a minute for a quick sync before the client meeting?"',
      },
    ],
  },
  {
    name: 'System',
    value: 'system',
    count: 2,
    items: [
      {
        user: 'Security',
        time: 'Yesterday',
        text: 'New login detected from unusual location. Please review your active sessions.',
      },
      {
        user: 'Billing',
        time: '2 days ago',
        text: 'Your upcoming invoice is available. No action is required.',
      },
    ],
  },
];

const Tabs23 = () => {
  return (
    <Tabs defaultValue="mentions" orientation="vertical" className="w-full flex gap-3 sm:gap-8 min-h-[200px] px-1">
      <TabsList className="bg-muted h-full shrink-0 flex-col gap-2 rounded-2xl p-1">
        {inbox.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="group hover:bg-muted/50 data-[state=active]:border-primary/20 data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex w-full items-center justify-between gap-1 sm:gap-1.5 rounded-xl border border-transparent px-2 sm:px-3 py-1 font-medium transition-all data-[state=active]:shadow-sm text-[11px] sm:text-sm"
          >
            {tab.name}
            {tab.count > 0 && (
              <Badge className="group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground h-4 min-w-4 sm:h-5 sm:min-w-5 px-1 sm:px-1.5 tabular-nums transition-colors text-[9px] sm:text-[10px]">
                {tab.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1">
        {inbox.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in fade-in slide-in-from-right-4 m-0 duration-500"
          >
            <h4 className="text-foreground mb-4 sm:mb-6 text-lg sm:text-2xl font-bold tracking-tight">
              {tab.name}
            </h4>

            <div className="relative flex flex-col gap-4 sm:gap-6">
              <div className="bg-border/40 absolute top-4 bottom-4 left-[15px] sm:left-[19px] w-px" />

              {tab.items.map((item, idx) => (
                <div key={idx} className="group flex items-start gap-3 sm:gap-4">
                  <div className="bg-background border-muted group-hover:border-primary/50 z-10 flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-colors">
                    <span className="text-muted-foreground group-hover:text-primary text-[10px] sm:text-xs font-bold transition-colors">
                      {item.user
                        .charAt(item.user.startsWith('@') ? 1 : 0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-1.5 pt-0.5">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 hidden sm:block">
                      <span className="text-foreground font-semibold text-[12px] sm:text-sm mr-2">
                        {item.user}
                      </span>
                      <span className="bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 text-[8px] sm:text-[10px] tracking-wider uppercase">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground max-w-sm text-[11px] sm:text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Tabs23;
