import { IconActivity, IconCloudLock, IconServer } from '@tabler/icons-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const systems = [
  {
    name: 'Performance',
    value: 'performance',
    icon: IconActivity,
    content: (
      <>
        Monitor your <span className='text-foreground font-semibold'>real-time throughput</span>. Track latency, request
        per second, and hardware utilization across your distributed cluster nodes.
      </>
    )
  },
  {
    name: 'Infrastructure',
    value: 'infra',
    icon: IconServer,
    content: (
      <>
        Scale your <span className='text-foreground font-semibold'>cloud resources</span>. Manage container orchestration,
        provision new instances, and oversee your global network topology from a single interface.
      </>
    )
  },
  {
    name: 'Security',
    value: 'security',
    icon: IconCloudLock,
    content: (
      <>
        Enforce <span className='text-foreground font-semibold'>zero-trust access</span>. Audit firewall logs, manage
        SSL certificates, and investigate potential threats with our advanced anomaly detection engine.
      </>
    )
  }
]

const Tabs11 = () => {
  return (
    <Tabs defaultValue='performance' className='w-full gap-6 px-1'>
      <div className='w-fit max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide py-0.5'>
        <TabsList className='h-auto bg-transparent flex w-max justify-start gap-3 border-b p-0'>
          {systems.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none!'
            >
              <Icon size={24} stroke={1.5} />
              <span className='text-xs font-bold tracking-tight'>{name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {systems.map(tab => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='animate-in fade-in slide-in-from-top-1 duration-500'
        >
          <div className='p-6 rounded-3xl border bg-muted/5 border-dashed'>
            <h4 className='mb-3 text-lg font-bold flex items-start gap-2'>
              <tab.icon size={20} className='text-primary shrink-0 mt-1' />
              {tab.name} Operational Metrics
            </h4>
            <p className='text-muted-foreground text-sm leading-relaxed max-w-lg'>{tab.content}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Tabs11
