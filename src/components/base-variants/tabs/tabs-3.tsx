import { IconBroadcast, IconFlame, IconSearch } from '@tabler/icons-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const feeds = [
  {
    name: 'Discovery',
    value: 'discovery',
    icon: IconSearch,
    content: (
      <>
        Explore <span className='text-foreground font-semibold'>original content</span>, rising creators, and niche
        communities worldwide. Dive into a personalized feed built from your interests and interactions.
      </>
    )
  },
  {
    name: 'Trending',
    value: 'trending',
    icon: IconFlame,
    content: (
      <>
        Stay on top of <span className='text-foreground font-semibold'>what&apos;s hot</span>. Find viral conversations,
        breaking discussions, and the most engaging moments happening right now.
      </>
    )
  },
  {
    name: 'Live Streams',
    value: 'live',
    icon: IconBroadcast,
    content: (
      <>
        Join <span className='text-foreground font-semibold'>real-time broadcasts</span>. Connect with your favorite
        hosts through live chat, interactive polls, and exclusive digital events.
      </>
    )
  }
]

const Tabs3 = () => {
  return (
    <div className='w-full max-w-md'>
      <Tabs defaultValue='discovery' className='gap-4'>
        <TabsList className='bg-muted h-10 gap-2 rounded-full px-1 !h-9'>
          {feeds.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='rounded-xl px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-muted/80'
            >
              <Icon size={14} stroke={2.5} />
              <span className='hidden sm:inline'>{name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {feeds.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className='animate-in fade-in slide-in-from-top-1 px-1'>
            <p className='text-muted-foreground/80 text-sm italic leading-relaxed'>{tab.content}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Tabs3
