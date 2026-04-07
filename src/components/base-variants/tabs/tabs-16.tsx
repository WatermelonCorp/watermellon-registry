import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const cloudServices = [
  {
    name: 'Compute',
    value: 'compute',
    title: 'Elastic Compute Power',
    content:
      'Dynamically scale your application workload with our high-performance compute instances. Optimized for memory-intensive operations and machine learning tasks.'
  },
  {
    name: 'Storage',
    value: 'storage',
    title: 'Scalable Object Storage',
    content:
      'Store and retrieve any amount of data securely. Our distributed storage architecture ensures 99.999% availability and automatic geographic redundancy.'
  },
  {
    name: 'Database',
    value: 'database',
    title: 'Managed Relational DB',
    content:
      'Deploy fully managed databases in seconds. We handle the heavy lifting of provisioning, patching, and backups so you can focus on building.'
  }
]

const Tabs16 = () => {
  return (
    <div className='w-full max-w-xl px-1'>
      <Tabs defaultValue='compute' orientation='vertical' className='flex gap-3 sm:gap-8'>
        <TabsList className='h-full flex-col bg-muted p-1 sm:p-2 rounded-2xl gap-2'>
          {cloudServices.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className='justify-start px-1.5 sm:px-2 py-1 rounded-xl font-medium text-[11px] sm:text-sm'>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className='flex-1'>
          {cloudServices.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className='m-0 animate-in fade-in zoom-in-95 duration-500'>
              <div className='rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3.5 sm:p-6 shadow-sm dark:border-indigo-900/30 dark:bg-indigo-900/10'>
                <h4 className='mb-3 text-sm sm:text-lg font-bold text-indigo-900 dark:text-indigo-400'>
                  {tab.title}
                </h4>
                <p className='text-[12px] sm:text-sm text-indigo-950/70 dark:text-indigo-200/70'>
                  {tab.content}
                </p>
                <button className='mt-5 rounded-lg bg-indigo-600 px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 flex-shrink-0 font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 dark:bg-indigo-500'>
                  Deploy Service
                </button>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default Tabs16
