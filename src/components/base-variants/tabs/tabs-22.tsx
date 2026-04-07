import {
  IconGitBranch,
  IconGitCommit,
  IconGitMerge,
} from '@tabler/icons-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const changelog = [
  {
    name: 'Version 4.0',
    value: 'v4',
    icon: IconGitMerge,
    date: 'Today',
    features: [
      'Introduced a brand new dark mode theme engine with dynamic contrast adjustments.',
      'Completely rewrote the client-side routing system resulting in 40% faster page loads.',
      'Added comprehensive multi-language support (i18n) spanning 15+ new locales.',
      'Officially deprecated the legacy API endpoints and retired v1 documentation.',
    ],
  },
  {
    name: 'Version 3.2',
    value: 'v3.2',
    icon: IconGitCommit,
    date: 'Last Month',
    features: [
      'Resolved a critical memory leak that occurred during prolonged websocket connections.',
      'Optimized our image pipeline to leverage next-gen formats like WebP and AVIF.',
      'Added a new dashboard widget allowing administrators to export user analytics to CSV.',
    ],
  },
  {
    name: 'Version 3.0',
    value: 'v3',
    icon: IconGitBranch,
    date: 'August 2023',
    features: [
      'Executed a major structural overhaul of the database schema to handle extreme scale.',
      'Released the very first public beta of our highly requested mobile application.',
      'Introduced true end-to-end encryption for all peer-to-peer direct messages.',
    ],
  },
];

const Tabs22 = () => {
  return (
    <Tabs defaultValue="v4" orientation="vertical" className="w-full flex gap-3 sm:gap-8 min-h-[200px] px-1">
      <TabsList className="bg-muted h-full shrink-0 flex-col gap-1 rounded-2xl p-1">
        {changelog.map(({ icon: Icon, name, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="text-muted-foreground hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex w-full items-center justify-start gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-3 py-1 font-medium transition-all data-[state=active]:shadow-none text-[11px] sm:text-sm"
          >
            <Icon className="size-[14px] sm:size-[18px]" stroke={2.5} />
            {name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1 pb-4">
        {changelog.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in fade-in slide-in-from-bottom-2 m-0 duration-500"
          >
            <div className="border-border/50 mb-4 flex flex-col items-start justify-between gap-2 border-b pb-3 sm:flex-row sm:items-end">
              <h4 className="text-foreground text-lg sm:text-2xl font-bold tracking-tight">
                Release {tab.name}
              </h4>
            </div>

            <ul className="space-y-3">
              {tab.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-4">
                  <div className="bg-primary ring-primary/20 mt-1.5 sm:mt-2 flex h-1 w-1 sm:h-1.5 sm:w-1.5 shrink-0 items-center justify-center rounded-full ring-2 sm:ring-4" />
                  <span className="text-muted-foreground text-[11px] sm:text-xs">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Tabs22;
