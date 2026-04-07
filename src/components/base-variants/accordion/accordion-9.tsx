import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  title: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    title: 'Why are property listings going stale so quickly?',
    content:
      'Listings usually become outdated when status changes, pricing updates, and agent notes are managed in separate places. A stronger real estate workflow keeps availability, media, and listing metadata synced across every channel.'
  },
  {
    value: 'item-2',
    title: 'How can brokers reduce friction during inquiry handoff?',
    content:
      'Lead handoff often breaks when inquiry details, preferred move-in dates, and follow-up history are incomplete. A better handoff flow gives every broker the right context before the first conversation starts.'
  },
  {
    value: 'item-3',
    title: 'What makes scheduling property visits harder than it should be?',
    content:
      'Scheduling gets messy when agent calendars, tenant availability, and buyer interest are not aligned in one place. Clearer availability windows and confirmation updates help visits feel coordinated instead of manual.'
  }
] as const

const Accordion9 = () => {
  return (
    <Accordion className='w-full space-y-2' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className='rounded-md border bg-background shadow-sm transition-shadow has-[button[aria-expanded=true]]:shadow-md'
        >
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger
              data-slot='accordion-trigger'
              className='group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md px-5 py-4 text-left text-sm font-medium outline-none transition-all focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              <span className='flex items-center gap-3'>
                <span className='relative size-4 shrink-0 text-muted-foreground'>
                  <ChevronRightIcon className='absolute inset-0 size-4 group-aria-expanded/accordion-trigger:hidden' />
                  <ChevronDownIcon className='absolute inset-0 hidden size-4 group-aria-expanded/accordion-trigger:block' />
                </span>
                <span>{item.title}</span>
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className='px-5 pl-12 text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion9
