import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { MinusIcon, PlusIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  title: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    title: 'Why do itinerary changes create so much confusion?',
    content:
      'Travel plans usually break down when flight updates, hotel changes, and local transfers are shown in different places. A better trip experience keeps every change in one timeline so travelers understand what changed and what action is needed.'
  },
  {
    value: 'item-2',
    title: 'How can booking support feel less reactive?',
    content:
      'Support works better when travelers can see booking status, policy details, and next-step guidance before they contact an agent. That context reduces repeat questions and helps teams focus on the cases that actually need intervention.'
  },
  {
    value: 'item-3',
    title: 'What makes multi-city planning harder than expected?',
    content:
      'Multi-city trips become difficult when reservations, check-in windows, and local logistics are managed separately. Stronger coordination tools help people compare timing, spot conflicts, and move through the journey with less friction.'
  }
] as const

const Accordion10 = () => {
  return (
    <Accordion className='w-full rounded-xl border' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger
              data-slot='accordion-trigger'
              className='group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium outline-none transition-all focus-visible:ring-[3px] aria-expanded:text-blue-600 dark:aria-expanded:text-blue-400 aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              <span>{item.title}</span>
              <span className='relative size-4 shrink-0 text-muted-foreground'>
                <PlusIcon className='absolute inset-0 size-4 group-aria-expanded/accordion-trigger:hidden' />
                <MinusIcon className='absolute inset-0 hidden size-4 group-aria-expanded/accordion-trigger:block' />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className='px-5 text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion10
