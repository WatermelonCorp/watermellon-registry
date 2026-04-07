import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const travelOptions = [
  {
    name: 'Stays',
    value: 'stays',
    price: 'From $80/night',
    content:
      'Find the perfect place to rest. From cozy budget hostels to five-star luxury resorts, browse thousands of accommodations worldwide to match your travel style.'
  },
  {
    name: 'Flights',
    value: 'flights',
    price: 'Deals Daily',
    content:
      'Take to the skies without breaking the bank. Compare prices across hundreds of airlines and book your next adventure with our seamless ticketing system.'
  },
  {
    name: 'Experiences',
    value: 'experiences',
    price: 'Top Rated',
    content:
      'Immerse yourself in local culture. Book guided tours, adventurous excursions, and exclusive culinary events curated by local experts.'
  }
]

const Tabs19 = () => {
  return (
    <Tabs defaultValue='stays' orientation='vertical' className='w-full flex gap-3 sm:gap-8 min-h-[200px] px-1'>
      <TabsList className='bg-transparent flex-col h-auto shrink-0 gap-2 rounded-none border-l-2 border-amber-200/50 p-0 pl-0 dark:border-amber-900/50'>
        {travelOptions.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='data-[state=active]:border-amber-500 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 dark:data-[state=active]:bg-amber-900/20 dark:data-[state=active]:text-amber-400 -ml-[2px] w-full justify-start rounded-none rounded-r-xl border border-transparent border-l-2 px-2 sm:px-3 py-1 font-bold transition-all data-[state=active]:shadow-none! text-[11px] sm:text-sm'
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className='flex-1'>
        {travelOptions.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className='m-0 animate-in fade-in slide-in-from-bottom-2 duration-700'>
            <div className='relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-amber-200/80 bg-amber-50/50 p-4 sm:p-6 dark:border-amber-900/50 dark:bg-amber-950/20'>
              <div className='absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-300/40 blur-3xl dark:bg-amber-700/30' />
              <div className='flex items-baseline justify-between'>
                <h4 className='text-xl sm:text-2xl font-semibold tracking-tight text-amber-950 dark:text-amber-50'>
                  {tab.name}
                </h4>
              </div>
              <p className='z-10 text-[13px] sm:text-sm leading-relaxed text-amber-900/80 dark:text-amber-100/70'>
                {tab.content}
              </p>
              <div className='z-10 mt-2'>
                <button className='rounded-full bg-amber-500 px-4 py-2 text-[10px] sm:px-6 sm:py-2.5 sm:text-xs font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0 dark:bg-amber-600'>
                  Explore {tab.name}
                </button>
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

export default Tabs19
