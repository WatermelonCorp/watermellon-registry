import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const creativeStudio = [
  {
    name: 'Illustrate',
    value: 'illustrate',
    content: (
      <>
        Bring your{' '}
        <span className="text-foreground font-semibold">visual stories</span> to
        life. Use advanced vector tools, custom brushes, and layered
        compositions to create stunning artwork from scratch.
      </>
    ),
  },
  {
    name: 'Design',
    value: 'design',
    content: (
      <>
        Structure your{' '}
        <span className="text-foreground font-semibold">
          digital interfaces
        </span>
        . Build reusable component libraries, interactive prototypes, and
        scalable layouts for web and mobile platforms.
      </>
    ),
  },
  {
    name: 'Animate',
    value: 'animate',
    content: (
      <>
        Master the{' '}
        <span className="text-foreground font-semibold">art of motion</span>.
        Add fluid transitions, physically-driven physics, and keyframe-based
        timelines to captivate your audience.
      </>
    ),
  },
];

const Tabs8 = () => {
  return (
    <Tabs defaultValue="illustrate" className="w-full gap-4 px-1">
      <div className="w-fit max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide py-0.5">
        <TabsList className="bg-transparent flex w-max justify-start gap-1">
          {creativeStudio.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-full px-6 py-3 text-xs uppercase transition-all data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-indigo-600"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {creativeStudio.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="animate-in slide-in-from-bottom-2 fade-in"
        >
          <h6 className="mb-2 text-xl font-black tracking-tighter text-indigo-600 italic dark:text-indigo-400">
            {tab.name}
          </h6>
          <p className="text-muted-foreground/90 text-sm leading-relaxed">
            {tab.content}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tabs8;
