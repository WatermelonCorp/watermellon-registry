import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  title: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    title: 'Why do reservation updates create guest confusion?',
    content:
      'Hospitality systems often separate booking details, upgrade notes, and late arrival changes across multiple tools. A clearer reservation flow helps guests understand what changed before they arrive at the property.'
  },
  {
    value: 'item-2',
    title: 'How can hotel staff handle requests more efficiently?',
    content:
      'Service requests move faster when housekeeping, concierge, and front desk teams share the same status view. That visibility reduces repeated check-ins and helps staff resolve requests without extra handoff friction.'
  },
  {
    value: 'item-3',
    title: 'What causes delays during check-in peaks?',
    content:
      'Check-in bottlenecks usually happen when identity checks, payment confirmation, and room readiness are not aligned in one flow. Better pre-arrival coordination helps staff shorten wait times and reduce lobby congestion.'
  }
] as const

const Accordion11 = () => {
  return (
    <Accordion className='w-full space-y-2' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className='rounded-md border border-border/80 bg-background px-5 transition-colors duration-200 has-[button[aria-expanded=true]]:bg-neutral-100 dark:has-[button[aria-expanded=true]]:bg-neutral-950/30'
        >
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger
              data-slot='accordion-trigger'
              className='group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium outline-none transition-all focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              <span>{item.title}</span>

              <span className='relative size-4 shrink-0 text-muted-foreground'>
                <ChevronDownIcon className='absolute inset-0 size-4 group-aria-expanded/accordion-trigger:hidden' />
                <ChevronUpIcon className='absolute inset-0 hidden size-4 group-aria-expanded/accordion-trigger:block' />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className='text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion11
