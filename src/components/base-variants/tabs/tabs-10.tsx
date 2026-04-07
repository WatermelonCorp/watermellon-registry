import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const cloudStorage = [
  {
    name: 'Recent',
    value: 'recent',
    content: (
      <>
        Access your{' '}
        <span className="text-foreground font-semibold">latest activity</span>.
        Revisit documents, spreadsheets, and images you've worked on in the last
        24 hours across all your devices.
      </>
    ),
  },
  {
    name: 'Shared',
    value: 'shared',
    content: (
      <>
        Collaborate on{' '}
        <span className="text-foreground font-semibold">mutual assets</span>.
        Review files that team members have granted you access to and manage
        permissions for your own shared folders.
      </>
    ),
  },
  {
    name: 'Archive',
    value: 'archive',
    content: (
      <>
        Manage your{' '}
        <span className="text-foreground font-semibold">legacy storage</span>.
        Securely store long-term records, completed projects, and backup data
        that isn't required for your daily operations.
      </>
    ),
  },
];

const Tabs10 = () => {
  return (
    <Tabs defaultValue="recent" className="gap-4">
      <TabsList className="h-12 gap-1 rounded-2xl bg-transparent">
        {cloudStorage.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:border-zinc-200 dark:data-[state=active]:border-zinc-800 flex-1 rounded-xl border-2 border-transparent px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all data-[state=active]:shadow-none!"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {cloudStorage.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="mb-3 flex items-center gap-2">
            <h6 className="text-muted-foreground text-[11px] font-bold uppercase">
              Cloud Explorer / {tab.name}
            </h6>
          </div>
          <p className="text-xs leading-5 font-medium text-zinc-600 italic dark:text-zinc-400">
            {tab.content}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tabs10;
