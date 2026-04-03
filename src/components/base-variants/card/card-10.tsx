import { Card, CardContent } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type CardTab = {
  content: string;
  label: string;
  value: 'overview' | 'activity' | 'files';
};

const tabs: readonly CardTab[] = [
  {
    label: 'Overview',
    value: 'overview',
    content:
      'Review the current project summary, key milestones, and the latest notes from the team before moving into detailed updates.',
  },
  {
    label: 'Activity',
    value: 'activity',
    content:
      'See the most recent edits, comments, and status changes so you can quickly understand what moved forward this week.',
  },
  {
    label: 'Files',
    value: 'files',
    content:
      'Browse shared assets, working drafts, and final exports collected for the project in one organized place. Share your files seamlessly with the team.',
  },
] as const;

const Card10 = () => {
  return (
    <Card className="border-border/70 w-max bg-neutral-100 shadow-sm dark:bg-neutral-900 py-3">
      <CardContent className="px-2">
        <Tabs defaultValue={tabs[0].value} className="w-full max-w-sm">
          <TabsList className="w-full justify-start gap-1 bg-transparent shadow-none">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-muted-foreground dark:data-[state=active]:border-border dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground h-9 rounded-md border border-transparent bg-transparent px-2 data-[state=active]:border-slate-300 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-950 data-[state=active]:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <p className="text-muted-foreground p-2 text-sm leading-6">
                {tab.content}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Card10;
