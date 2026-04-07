import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const pipelineTasks = [
  {
    name: 'Deploy',
    value: 'deploy',
    content: (
      <>
        Ship your code with <span className='text-foreground font-semibold'>confidence and speed</span>. Automate your
        delivery pipeline to reach users faster while maintaining high reliability standards.
      </>
    )
  },
  {
    name: 'Builds',
    value: 'builds',
    content: (
      <>
        Monitor your <span className='text-foreground font-semibold'>compilation workflow</span>. Track build times,
        dependencies, and artifacts to ensure every release is optimized and secure.
      </>
    )
  },
  {
    name: 'Infrastructure',
    value: 'infrastructure',
    content: (
      <>
        Control your <span className='text-foreground font-semibold'>cloud assets</span>. Define and manage your scaling
        rules, databases, and network configurations from a single control plane.
      </>
    )
  }
]

const Tabs2 = () => {
  return (
      <Tabs defaultValue='deploy' className='gap-4'>
        <TabsList className='border bg-transparent px-1 py-1.5 rounded-2xl'>
          {pipelineTasks.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
             className='rounded-xl px-4 py-3 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {pipelineTasks.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <p className='text-muted-foreground/90 text-sm leading-6'>{tab.content}</p>
          </TabsContent>
        ))}
      </Tabs>
  )
}

export default Tabs2
