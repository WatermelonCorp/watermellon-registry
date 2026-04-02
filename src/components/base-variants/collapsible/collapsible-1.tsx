import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type CollapsibleItem = {
  label: string
}

type CollapsibleGroup = {
  hiddenItems: readonly CollapsibleItem[]
  leadItem: CollapsibleItem
  title: string
}

const group: CollapsibleGroup = {
  hiddenItems: [{ label: 'project-brief.md' }, { label: 'brand-notes.md' }],
  leadItem: { label: 'launch-plan.md' },
  title: 'Studio team shared 3 notes'
}

const Collapsible1 = () => {
  return (
    <Collapsible className='flex w-full max-w-[350px] flex-col gap-2 rounded-lg border border-border/70 bg-background p-2 shadow-sm'>
      <div className='flex items-center justify-between gap-4 px-2 py-1'>
        <div className='text-sm font-semibold'>{group.title}</div>
        <CollapsibleTrigger>
          <Button variant='ghost' size='icon-sm'>
            <ChevronsUpDownIcon className='size-4' />
            <span className='sr-only'>Toggle notes</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-md border border-border/70 px-4 py-2 font-mono text-sm'>{group.leadItem.label}</div>
      <CollapsibleContent className='flex flex-col gap-2'>
        {group.hiddenItems.map((item) => (
          <div key={item.label} className='rounded-md border border-border/70 px-4 py-2 font-mono text-sm'>
            {item.label}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Collapsible1
