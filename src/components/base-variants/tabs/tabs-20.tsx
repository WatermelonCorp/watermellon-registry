import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const audioFeatures = [
  {
    name: 'Playlists',
    value: 'playlists',
    song: 'Midnight Drive',
    artist: 'The Midnight',
    content:
      'Curate your perfect soundtrack. Organize your favorite tracks into custom playlists for every mood, workout, or late-night drive.',
  },
  {
    name: 'Podcasts',
    value: 'podcasts',
    song: 'Tech Today',
    artist: 'Developer Chronicles',
    content:
      'Stay informed and entertained. Subscribe to top-rated tech podcasts, download episodes for offline listening, and never miss an update.',
  },
  {
    name: 'Radio',
    value: 'radio',
    song: 'Lo-Fi Chill Beats',
    artist: 'Global Station',
    content:
      'Discover new music effortlessly. Tune into algorithm-generated stations based on your listening history and favorite genres.',
  },
];

const Tabs20 = () => {
  return (
    <Tabs
      defaultValue="playlists"
      orientation="vertical"
      className="flex gap-4"
    >
      <TabsList className="bg-background h-auto shrink-0 flex-col gap-1 rounded-none p-0">
        {audioFeatures.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex w-full justify-start rounded-none border-0 border-l-2 border-transparent px-3 py-1 font-medium transition-all data-[state=active]:border-rose-500 data-[state=active]:text-rose-700 data-[state=active]:shadow-none! dark:data-[state=active]:text-rose-400"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1">
        {audioFeatures.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in fade-in slide-in-from-right-4 m-0 duration-500"
          >
            <div className="rounded-3xl border border-rose-100 bg-rose-50/30 p-6 dark:border-rose-900/30 dark:bg-rose-950/20">
              <div className="mb-4 flex items-center gap-3">
                <div>
                  <h4 className="text-base font-bold tracking-tight text-rose-950 dark:text-rose-50">
                    Now Playing: {tab.song}
                  </h4>
                  <span className="text-[10px] font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                    {tab.artist}
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-rose-900/70 dark:text-rose-100/60">
                {tab.content}
              </p>

              <div className="mt-4 overflow-hidden rounded-full outline outline-1 outline-rose-200/50 dark:outline-rose-800/50">
                <div className="h-1.5 w-full bg-rose-200 dark:bg-rose-900/50">
                  <div className="h-full w-2/5 rounded-r-full bg-rose-500 dark:bg-rose-400" />
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Tabs20;
