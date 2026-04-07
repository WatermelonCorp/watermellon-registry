import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const subscriptionTiers = [
  {
    name: 'Standard',
    value: 'standard',
    content: (
      <>
        Everything you need to{' '}
        <span className="text-foreground font-semibold">get started</span>.
        Access core tools, basic support, and 5GB of storage to kickstart your
        personal journey.
      </>
    ),
  },
  {
    name: 'Premium',
    value: 'premium',
    content: (
      <>
        Unlock{' '}
        <span className="text-foreground font-semibold">
          advanced capabilities
        </span>
        . Experience high-speed processing, 50GB of storage, and priority access
        to our support team and beta features.
      </>
    ),
  },
  {
    name: 'Ultimate',
    value: 'ultimate',
    content: (
      <>
        Scale your{' '}
        <span className="text-foreground font-semibold">
          entire organization
        </span>
        . Get dedicated infrastructure, unlimited storage, and white-glove
        onboarding for your team.
      </>
    ),
  },
];

const Tabs9 = () => {
  return (
    <Tabs defaultValue="standard" className="gap-4">
      <TabsList className="rounded-2xl bg-transparent">
        {subscriptionTiers.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 rounded-full px-4 py-1 text-[11px] uppercase transition-all"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {subscriptionTiers.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="bg-muted/20 mt-0 rounded-3xl border-2 border-dashed p-6"
        >
          <h5 className="mb-4 text-2xl font-black tracking-tight">
            {tab.name}
          </h5>
          <p className="text-muted-foreground/80 border-primary border-l-2 pl-4 text-sm leading-6">
            {tab.content}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tabs9;
