import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const productInfo = [
  {
    name: 'Specifications',
    value: 'specs',
    data: [
      { label: 'Processor', value: 'M4 Pro (12-core CPU, 18-core GPU)' },
      { label: 'Memory', value: '32GB Unified Memory (LPDDR5X)' },
      { label: 'Storage', value: '2TB NVMe Solid State Drive' },
      { label: 'Display', value: '14.2-inch Liquid Retina XDR (120Hz)' },
      { label: 'Battery Life', value: 'Up to 22 hours video playback' }
    ]
  },
  {
    name: 'Dimensions',
    value: 'dimensions',
    data: [
      { label: 'Height', value: '0.61 inch (1.55 cm)' },
      { label: 'Width', value: '12.31 inches (31.26 cm)' },
      { label: 'Depth', value: '8.71 inches (22.12 cm)' },
      { label: 'Weight', value: '3.5 pounds (1.6 kg)' },
      { label: 'Form Factor', value: 'Unibody Recycled Aluminum' }
    ]
  },
  {
    name: 'In the Box',
    value: 'box',
    data: [
      { label: 'Computer', value: '14-inch Studio Pro Laptop' },
      { label: 'Power', value: '96W USB-C Power Adapter (Fast Charge)' },
      { label: 'Cable', value: 'USB-C to MagSafe 3 Cable (2m)' },
      { label: 'Documentation', value: 'Quick Start Guide & Warranty' }
    ]
  }
]

const Tabs26 = () => {
  return (
    <div className='w-full max-w-xl'>
      <Tabs defaultValue='specs' className='flex flex-col'>
        <div className='w-full overflow-x-auto overflow-y-hidden py-0.5 no-scrollbar'>
          <TabsList className='bg-transparent h-9 flex w-fit justify-start rounded-none border-b border-border/50 p-0 gap-4'>
            {productInfo.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className='h-full min-w-fit rounded-none border-0 border-b-2 border-transparent px-1 sm:px-3 py-1 font-medium text-muted-foreground transition-all hover:border-muted-foreground/30 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none! dark:hover:text-foreground text-sm'
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className='mt-4 w-full'>
          {productInfo.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className='m-0 animate-in fade-in slide-in-from-bottom-2 duration-300'>
              <div className='flex flex-col'>
                {tab.data.map((row, idx) => (
                  <div
                    key={idx}
                    className='group flex flex-col justify-between border-b border-dashed border-border/60 py-2.5 transition-colors sm:flex-row sm:items-center gap-1 sm:gap-4 last:border-0 hover:border-foreground/20'
                  >
                    <span className='text-[13px] sm:text-sm text-muted-foreground transition-colors group-hover:text-foreground/80'>
                      {row.label}
                    </span>
                    <span className='text-[13px] sm:text-sm font-medium text-foreground sm:text-right'>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default Tabs26
