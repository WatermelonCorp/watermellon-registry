import {
  IconDeviceDesktop,
  IconShirt,
  IconHome,
  IconBallBasketball,
  IconSparkles,
  IconCar,
  IconBook,
  IconMoodSmile
} from '@tabler/icons-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const categories = [
  {
    name: 'Electronics',
    value: 'electronics',
    icon: IconDeviceDesktop,
    content: (
      <>
        Upgrade your <span className='text-foreground font-semibold'>digital lifestyle</span>. Discover the latest
        smartphones, high-performance laptops, and cutting-edge home entertainment systems.
      </>
    )
  },
  {
    name: 'Apparel',
    value: 'apparel',
    icon: IconShirt,
    content: (
      <>
        Refresh your <span className='text-foreground font-semibold'>wardrobe</span>. Shop seasonal fashion trends,
        comfortable basics, and premium designer luxury pieces for every occasion.
      </>
    )
  },
  {
    name: 'Home & Living',
    value: 'home',
    icon: IconHome,
    content: (
      <>
        Elevate your <span className='text-foreground font-semibold'>living space</span>. Find modern furniture,
        chic decor, and smart appliances that transform your house into a dream home.
      </>
    )
  },
  {
    name: 'Sports',
    value: 'sports',
    icon: IconBallBasketball,
    content: (
      <>
        Fuel your <span className='text-foreground font-semibold'>active routine</span>. Gear up with top-tier
        athletic equipment, breathable activewear, and performance-tracking accessories.
      </>
    )
  },
  {
    name: 'Beauty',
    value: 'beauty',
    icon: IconSparkles,
    content: (
      <>
        Enhance your <span className='text-foreground font-semibold'>natural glow</span>. Explore luxurious skincare
        routines, vibrant cosmetics, and professional-grade self-care essentials.
      </>
    )
  },
  {
    name: 'Automotive',
    value: 'auto',
    icon: IconCar,
    content: (
      <>
        Maintain your <span className='text-foreground font-semibold'>vehicle&apos;s performance</span>. Browse quality
        replacement parts, premium interior accessories, and professional detailing kits.
      </>
    )
  },
  {
    name: 'Books',
    value: 'books',
    icon: IconBook,
    content: (
      <>
        Expand your <span className='text-foreground font-semibold'>knowledge horizon</span>. Dive into gripping
        fiction, insightful biographies, and comprehensive academic textbooks.
      </>
    )
  },
  {
    name: 'Toys',
    value: 'toys',
    icon: IconMoodSmile,
    content: (
      <>
        Spark pure <span className='text-foreground font-semibold'>joy and creativity</span>. Find educational
        games, interactive playsets, and beloved character toys for kids of all ages.
      </>
    )
  }
]

const Tabs14 = () => {
  return (
    <Tabs defaultValue='electronics' className='w-full max-w-3xl gap-4'>
      <ScrollArea className='w-full max-w-full'>
        <TabsList className='!h-10 p-1 flex gap-3 w-max rounded-2xl'>
          {categories.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex  items-center gap-2 rounded-full border-2 border-transparent bg-muted/50 px-3 text-xs font-bold uppercase text-muted-foreground transition-all hover:bg-muted data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md'
            >
              <Icon size={16} stroke={2.5} />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation='horizontal' className='hidden' />
      </ScrollArea>

      {categories.map(tab => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='mt-2 animate-in slide-in-from-right-4 fade-in duration-500'
        >
          <div className='rounded-3xl border p-6 '>
            <h4 className='mb-4 flex items-center gap-3 text-xl font-semibold tracking-tight text-foreground'>
              <tab.icon size={28} className='text-primary' />
              {tab.name}
            </h4>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              {tab.content}
            </p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Tabs14
