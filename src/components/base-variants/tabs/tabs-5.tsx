import {
  IconAdjustmentsHorizontal,
  IconShieldLock,
  IconUserCircle,
} from '@tabler/icons-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const settings = [
  {
    name: 'Profile',
    value: 'profile',
    icon: IconUserCircle,
    content: (
      <>
        Personalize your{' '}
        <span className="text-foreground font-semibold">digital identity</span>.
        Update your avatar, bio, and social links to show the world who you are
        and what you're building.
      </>
    ),
  },
  {
    name: 'Preferences',
    value: 'preferences',
    icon: IconAdjustmentsHorizontal,
    content: (
      <>
        Fine-tune your{' '}
        <span className="text-foreground font-semibold">user experience</span>.
        Adjust your theme, language, and notification settings to perfectly
        match your daily workflow.
      </>
    ),
  },
  {
    name: 'Security',
    value: 'security',
    icon: IconShieldLock,
    content: (
      <>
        Fortify your{' '}
        <span className="text-foreground font-semibold">account barriers</span>.
        Manage your passwords, two-factor authentication, and connected devices
        for maximum data privacy.
      </>
    ),
  },
];

const Tabs5 = () => {
  return (
    <Tabs
      defaultValue="profile"
      className="flex gap-4"
    >
      <TabsList className="bg-muted flex flex-row gap-2 rounded-2xl px-1 py-2 !h-10 sm:!h-14">
        {settings.map(({ icon: Icon, name, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:bg-muted/80 flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-[10px] font-bold tracking-wider uppercase transition-all data-[state=active]:shadow-lg h-8 sm:h-12"
          >
            <Icon size={20} stroke={2} />
            <span className="hidden sm:inline">{name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

        {settings.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in fade-in duration-500"
          >
            <h3 className="mb-2 text-lg font-bold tracking-tight">
              {tab.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tab.content}
            </p>
          </TabsContent>
        ))}
    </Tabs>
  );
};

export default Tabs5;
