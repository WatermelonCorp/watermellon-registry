import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

const taskBoard = [
  {
    name: 'To-Do',
    value: 'todo',
    count: 12,
    badgeColor: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 group-data-[state=active]:bg-zinc-700 group-data-[state=active]:text-zinc-100 dark:group-data-[state=active]:bg-zinc-300 dark:group-data-[state=active]:text-zinc-900',
    content:
      'Review your pending items. Outstanding tasks that need your attention soon, including project briefs, design reviews, and client follow-ups.'
  },
  {
    name: 'In Progress',
    value: 'in-progress',
    count: 4,
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 group-data-[state=active]:bg-zinc-700 group-data-[state=active]:text-zinc-100 dark:group-data-[state=active]:bg-zinc-300 dark:group-data-[state=active]:text-zinc-900',
    content:
      'Track active assignments. Work that is currently being tackled by you or your team, along with real-time status updates and collaboration notes.'
  },
  {
    name: 'Done',
    value: 'done',
    count: 28,
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 group-data-[state=active]:bg-zinc-700 group-data-[state=active]:text-zinc-100 dark:group-data-[state=active]:bg-zinc-300 dark:group-data-[state=active]:text-zinc-900',
    content:
      'View completed objectives. A historical log of finished tasks and resolved tickets that have been verified, approved, and officially closed.'
  }
]

const Tabs18 = () => {
  return (
      <Tabs defaultValue='todo' orientation='vertical' className='w-full flex gap-2.5 sm:gap-6 min-h-[200px] px-1'>
        <TabsList className='bg-transparent h-full flex-col shrink-0 justify-start space-y-1 p-0 rounded-none'>
          {taskBoard.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='group w-full justify-between rounded-xl px-2 sm:px-4 py-1 data-[state=active]:bg-primary data-[state=active]:text-zinc-50 dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900 data-[state=active]:shadow-md dark:data-[state=active]:border-transparent transition-all'
            >
              <span className='font-semibold text-[11px] sm:text-sm'>{tab.name}</span>
              <span
                className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold tabular-nums transition-colors ${tab.badgeColor}`}
              >
                {tab.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className='flex-1 py-1'>
          {taskBoard.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className='m-0 animate-in slide-in-from-right-4 fade-in duration-500'>
              <div className='rounded-2xl border bg-card p-4 sm:p-6 flex flex-col gap-2'>
                <div className='flex items-center justify-between border-b border-border/50 pb-3'>
                  <h4 className='text-base sm:text-lg font-bold tracking-tight text-foreground'>
                    {tab.name} Queue
                  </h4>
                  <div className='text-muted-foreground hidden sm:block text-[10px] sm:text-xs font-bold bg-muted px-2 py-0.5 sm:px-3 sm:py-1 rounded-full'>
                    {tab.count} Items
                  </div>
                </div>
                <p className='mt-1 text-muted-foreground text-[13px] sm:text-sm'>
                  {tab.content}
                </p>
                <div className='flex justify-end'>
                  <Button variant="link" className='h-auto p-0 text-[11px] sm:text-xs font-semibold text-primary hover:underline underline-offset-4'>
                    View all {tab.name.toLowerCase()} tasks
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
  )
}

export default Tabs18
