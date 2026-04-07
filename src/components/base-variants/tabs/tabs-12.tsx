import { IconApps, IconBrush, IconCode } from '@tabler/icons-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const services = [
  {
    name: 'Branding',
    value: 'branding',
    icon: IconBrush,
    content: (
      <>
        Define your <span className='text-foreground font-semibold'>visual identity</span>. We craft memorable logos,
        stunning color palettes, and comprehensive style guides that resonate with your target audience.
      </>
    )
  },
  {
    name: 'Development',
    value: 'dev',
    icon: IconCode,
    content: (
      <>
        Build your <span className='text-foreground font-semibold'>digital core</span>. Our engineering team delivers
        highly-performant web applications, custom API integrations, and robust e-commerce solutions.
      </>
    )
  },
  {
    name: 'UX Design',
    value: 'ux',
    icon: IconApps,
    content: (
      <>
        Optimize <span className='text-foreground font-semibold'>user journeys</span>. We design intuitive interfaces and
        seamless workflows that convert visitors into loyal customers through user-centric research.
      </>
    )
  }
]

const Tabs12 = () => {
  return (
    <Tabs defaultValue='branding' className='w-full gap-4 px-1'>
      <div className='w-fit max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide py-0.5'>
        <TabsList className='h-auto bg-transparent border-b rounded-none p-0 gap-2 flex w-max justify-start'>
          {services.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='relative rounded-none border-b-2 border-transparent bg-transparent px-2  text-xs font-semibold uppercase transition-all data-[state=active]:border-primary data-[state=active]:rounded-t-lg data-[state=active]:text-primary data-[state=active]:shadow-none! hover:text-foreground/80'
            >
              <div className='flex items-center gap-2'>
                <Icon size={18} stroke={2} />
                {name}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {services.map(tab => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='animate-in fade-in duration-700'
        >
          <div className='max-w-2xl'>
            <h3 className='mb-2 text-xl font-semibold tracking-tighter'>
              Elevate your {tab.name}
            </h3>
            <p className='text-muted-foreground text-sm leading-relaxed'>{tab.content}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Tabs12
