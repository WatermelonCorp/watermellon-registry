import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconMinus,
} from '@tabler/icons-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const performanceOverview = [
  {
    name: 'Traffic',
    value: 'traffic',
    stats: [
      { label: 'Unique Visitors', value: '124.5K', trend: '+12%', type: 'up' },
      { label: 'Bounce Rate', value: '42.3%', trend: '-4%', type: 'down' },
      { label: 'Session Duration', value: '3m 14s', trend: '+2s', type: 'up' },
      { label: 'Direct Traffic', value: '28%', trend: '0%', type: 'neutral' },
    ],
  },
  {
    name: 'Sales',
    value: 'sales',
    stats: [
      { label: 'Gross Revenue', value: '$84,230', trend: '+18%', type: 'up' },
      { label: 'Refunds Issued', value: '$1,200', trend: '+2%', type: 'down' },
      { label: 'Avg Order Value', value: '$68.50', trend: '+5%', type: 'up' },
      { label: 'Conversion Rate', value: '3.2%', trend: '-0.4%', type: 'down' },
    ],
  },
  {
    name: 'Acquisition',
    value: 'acquisition',
    stats: [
      { label: 'Blended CAC', value: '$12.40', trend: '-8%', type: 'up' },
      { label: 'Organic Search', value: '45K', trend: '+14%', type: 'up' },
      { label: 'Social Media', value: '18K', trend: '+2%', type: 'up' },
      { label: 'Email Marketing', value: '22K', trend: '-1%', type: 'down' },
    ],
  },
];

const Tabs24 = () => {
  return (
    <Tabs defaultValue="traffic" orientation="vertical" className="w-full flex gap-3 sm:gap-10 min-h-[200px] px-1">
      <TabsList className="h-auto shrink-0 flex-col gap-2 rounded-none bg-transparent p-0">
        {performanceOverview.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-muted-foreground hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:text-foreground w-full !justify-center rounded-xl border border-transparent px-1.5 sm:px-2 py-1 text-center font-medium transition-all text-[11px] sm:text-sm"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1 pb-4">
        {performanceOverview.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in fade-in slide-in-from-left-4 m-0 duration-500"
          >
            <h4 className="text-foreground mb-8 text-lg sm:text-2xl font-bold tracking-tight">
              {tab.name} Metrics
            </h4>

            <div className="grid grid-cols-2 gap-x-2 sm:gap-x-8 gap-y-5 sm:gap-y-10">
              {tab.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-tight">
                    {stat.label}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-0.5 sm:gap-2">
                    <span className="text-foreground text-base sm:text-2xl font-bold tracking-tighter tabular-nums leading-none">
                      {stat.value}
                    </span>
                    <span
                      className={`flex items-center pb-0 sm:pb-1.5 text-[9px] sm:text-xs font-bold ${
                        stat.type === 'up'
                          ? 'text-emerald-500 dark:text-emerald-400'
                          : stat.type === 'down'
                            ? 'text-rose-500 dark:text-rose-400'
                            : 'text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {stat.type === 'up' && (
                        <IconArrowUpRight
                          className="size-[10px] sm:size-[14px] mr-0.5"
                          stroke={3}
                        />
                      )}
                      {stat.type === 'down' && (
                        <IconArrowDownRight
                          className="size-[10px] sm:size-[14px] mr-0.5"
                          stroke={3}
                        />
                      )}
                      {stat.type === 'neutral' && (
                        <IconMinus className="size-[10px] sm:size-[14px] mr-0.5" stroke={3} />
                      )}
                      {stat.trend}
                    </span>
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

export default Tabs24;
