import { IconBook2, IconCertificate, IconVideo } from '@tabler/icons-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const learning = [
  {
    name: 'Curriculum',
    value: 'curriculum',
    icon: IconBook2,
    content: (
      <>
        Explore your <span className='text-foreground font-semibold'>learning path</span>. Access structured modules,
        downloadable resources, and interactive quizzes designed to master your chosen subject.
      </>
    )
  },
  {
    name: 'Live Lessons',
    value: 'lessons',
    icon: IconVideo,
    content: (
      <>
        Join our <span className='text-foreground font-semibold'>expert-led sessions</span>. Engage in real-time Q&A,
        participate in group discussions, and watch recorded sessions at your own convenience.
      </>
    )
  },
  {
    name: 'Certification',
    value: 'certification',
    icon: IconCertificate,
    content: (
      <>
        Earn your <span className='text-foreground font-semibold'>professional validation</span>. Complete the final
        assessment to receive a blockchain-verified certificate to showcase your skills to the world.
      </>
    )
  }
]

const Tabs13 = () => {
  return (
    <Tabs defaultValue='curriculum' className='w-full gap-4 px-1'>
      <div className='w-fit max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide py-0.5'>
        <TabsList className='bg-transparent flex w-max justify-start gap-1'>
          {learning.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='h-full px-6 flex items-center gap-2 rounded-b-none transition-all duration-300data-[state=active]:rounded-t data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-muted/80'
            >
              <Icon size={18} stroke={2} />
              <span className='font-bold text-xs tracking-tight'>{name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {learning.map(tab => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='animate-in fade-in slide-in-from-left-2 duration-500'
        >
          <div className='bg-background p-6 rounded-3xl border border-muted-foreground/10'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2.5 rounded-xl bg-primary/10 text-primary'>
                <tab.icon size={22} />
              </div>
              <h4 className='text-xl font-bold tracking-tight'>{tab.name}</h4>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed max-w-xl'>{tab.content}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Tabs13
