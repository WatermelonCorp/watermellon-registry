import {
  IconCloudUpload,
  IconDownload,
  IconSettings,
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

const documentation = [
  {
    name: 'Installation',
    value: 'installation',
    icon: IconDownload,
    title: 'Getting Started',
    content:
      'Our package requires Node.js v16+ and a modern package manager. Run the installation script in your terminal to automatically configure the necessary dependencies, add utility functions, and inject boilerplate code directly into your current workspace.',
  },
  {
    name: 'Configuration',
    value: 'config',
    icon: IconSettings,
    title: 'Tailoring the Setup',
    content:
      'Out of the box, our system provides sensible, secure defaults. However, you can override any setting by creating a unified config file at the root of your project. This allows you to customize the underlying themes, routing logic, and compiler options.',
  },
  {
    name: 'Deployment',
    value: 'deployment',
    icon: IconCloudUpload,
    title: 'Going Live',
    content:
      'When you are ready to ship, our CLI wraps your application into an optimized, minified production build. You can deploy it to Vercel, Netlify, or any standard Node server environment simply by passing the production build flag.',
  },
];

const Tabs21 = () => {
  return (
    <Tabs
      defaultValue="installation"
      orientation="vertical"
      className="flex gap-10"
    >
      <TabsList className="bg-muted h-auto flex-col items-center gap-2 rounded-2xl p-1">
        {documentation.map(({ icon: Icon, name, value }) => (
          <Tooltip key={value}>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger
                  value={value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:hover:bg-muted dark:data-[state=active]:bg-primary relative flex size-8 items-center justify-center rounded-full py-1 transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <Icon size={22} stroke={2} />
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent
              className="px-3 py-1.5 text-xs font-bold"
              side="right"
            >
              {name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TabsList>

      <div className="flex-1">
        {documentation.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in slide-in-from-right-8 fade-in m-0 duration-500"
          >
            {/* Typographic Layout - No Card Wrapper */}
            <h3 className="text-foreground text-2xl font-semibold tracking-tighter">
              {tab.title}.
            </h3>

            <div className="bg-primary my-2.5 h-1 w-12 rounded-full" />

            <p className="text-muted-foreground text-sm">{tab.content}</p>

            <div className="border-border mt-4 border-t border-dashed pt-2">
              <p className="text-muted-foreground/50 text-xs font-semibold">
                Documentation • Last updated today
              </p>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Tabs21;
