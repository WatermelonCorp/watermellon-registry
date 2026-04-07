import { IconBuildingFactory, IconBuildingSkyscraper, IconHome2 } from '@tabler/icons-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const properties = [
  {
    name: 'Residential',
    value: 'residential',
    icon: IconHome2,
    content: (
      <>
        Explore luxury <span className='text-foreground font-semibold'>family homes</span>. Browse single-family houses,
        modern apartments, and quiet suburban estates designed for comfortable living and long-term value.
      </>
    )
  },
  {
    name: 'Commercial',
    value: 'commercial',
    icon: IconBuildingSkyscraper,
    content: (
      <>
        Expand your <span className='text-foreground font-semibold'>business footprint</span>. Discover premium office
        spaces, high-traffic retail locations, and versatile mixed-use properties in the heart of the city.
      </>
    )
  },
  {
    name: 'Industrial',
    value: 'industrial',
    icon: IconBuildingFactory,
    content: (
      <>
        Optimize your <span className='text-foreground font-semibold'>logistics network</span>. Find spacious
        warehouses, advanced manufacturing facilities, and strategically located distribution centers.
      </>
    )
  }
]

const Tabs15 = () => {
  return (
    <Tabs defaultValue='residential' orientation='vertical' className='flex flex-row w-full max-w-2xl gap-3 sm:gap-8 px-1'>
      <TabsList className='flex flex-col h-auto bg-transparent gap-2 p-0 shrink-0 border-l-2 border-muted/50 rounded-none w-max'>
        {properties.map(({ icon: Icon, name, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className='group relative flex w-full items-center justify-start gap-1.5 sm:gap-3 rounded-none rounded-r-xl border border-transparent px-1.5 sm:px-3 py-2 sm:py-1 text-[10px] sm:text-sm font-semibold transition-all hover:bg-muted/30 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none! -ml-[2px]'
          >
            <div className='absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 opacity-0 transition-all duration-300 group-data-[state=active]:scale-y-100 group-data-[state=active]:opacity-100' />
            <Icon size={16} className='sm:size-[18px]' />
            {name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className='flex-1 py-1'>
        {properties.map(tab => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className='m-0 animate-in fade-in slide-in-from-bottom-2 duration-500'
          >
            <div className='flex items-start sm:items-center gap-1.5 sm:gap-3 mb-4 sm:mb-5'>
              <div className='p-1.5 sm:p-2 rounded-xl bg-primary text-primary-foreground shadow-sm'>
                <tab.icon size={12} className='sm:size-[15px]' stroke={2} />
              </div>
              <h4 className='text-sm sm:text-base tracking-tight'>{tab.name} Real Estate</h4>
            </div>
            <p className='text-muted-foreground leading-relaxed text-[13px] sm:text-sm'>
              {tab.content}
            </p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

export default Tabs15
