import {
  IconSettings2,
  IconSmartHome,
  IconUserCheck,
} from '@tabler/icons-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navigation = [
  {
    name: 'Home',
    value: 'home',
    icon: IconSmartHome,
    content: (
      <>
        Return to your{' '}
        <span className="text-foreground font-semibold">central dashboard</span>
        . See your most relevant data, current alerts, and a summary of your
        workspace activity at a single glance.
      </>
    ),
  },
  {
    name: 'Identity',
    value: 'identity',
    icon: IconUserCheck,
    content: (
      <>
        Manage your{' '}
        <span className="text-foreground font-semibold">
          verified credentials
        </span>
        . Protect your identity, review access logs, and control who has
        permission to view your private data.
      </>
    ),
  },
  {
    name: 'Preferences',
    value: 'preferences',
    icon: IconSettings2,
    content: (
      <>
        Configure your{' '}
        <span className="text-foreground font-semibold">
          environment settings
        </span>
        . From API keys to notifications, fine-tune every aspect of your system
        for a perfectly tailored experience.
      </>
    ),
  },
];

const Tabs7 = () => {
  return (
      <Tabs defaultValue="home" className="gap-4">
        <TabsList className="bg-muted !h-10 gap-1 rounded-full">
          {navigation.map(({ icon: Icon, name, value }) => (
            <Tooltip key={value}>
              <TooltipTrigger asChild>
                <span>
                  <TabsTrigger
                    value={value}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:hover:bg-muted dark:data-[state=active]:bg-primary relative flex size-8 items-center justify-center rounded-full transition-all duration-300 data-[state=active]:shadow-lg"
                    aria-label={name}
                  >
                    <Icon size={22} stroke={2} />
                    <div className="border-background absolute -top-1 -right-1 h-3 w-3 scale-0 rounded-full border-2 bg-red-500 transition-transform data-[state=active]:scale-0" />
                  </TabsTrigger>
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase"
              >
                {name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TabsList>

        {navigation.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in zoom-in-95 duration-300"
          >
            <h5 className="text-primary mb-2 text-sm font-bold tracking-tight">
              {tab.name}
            </h5>
            <p className="text-muted-foreground text-[13px] leading-relaxed">
              {tab.content}
            </p>
          </TabsContent>
        ))}
      </Tabs>
  );
};

export default Tabs7;
