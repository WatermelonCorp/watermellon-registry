import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: 'Overview',
    value: 'overview',
    content: (
      <>
        Get a <span className='text-foreground font-semibold'>birds-eye view</span> of your creative project, from
        milestones to current progress. Keep your vision clear and your team aligned with real-time updates.
      </>
    )
  },
  {
    name: 'Roadmap',
    value: 'roadmap',
    content: (
      <>
        Plan your <span className='text-foreground font-semibold'>future trajectory</span> with a visual roadmap of
        upcoming features and releases. Track your long-term goals and stay ahead of the curve.
      </>
    )
  },
  {
    name: 'Backlog',
    value: 'backlog',
    content: (
      <>
        Manage your <span className='text-foreground font-semibold'>pending tasks</span> and ideas. Prioritize what
        matters most and ensure nothing falls through the cracks as your project grows.
      </>
    )
  }
]

const Tabs1 = () => {
  return (
      <Tabs defaultValue='overview' className='gap-4'>
        <TabsList className='bg-muted px-1 py-1.5 rounded-2xl'>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='rounded-xl px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-muted/80'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <p className='text-muted-foreground leading-relaxed'>{tab.content}</p>
          </TabsContent>
        ))}
      </Tabs>
  )
}

export default Tabs1
