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
    title: 'Why do onboarding tasks get missed so often?',
    content:
      'HR onboarding usually breaks down when training, paperwork, and access setup live in separate tools. A stronger onboarding flow helps new hires see what is pending, who owns each step, and what needs to happen next.'
  },
  {
    value: 'item-2',
    title: 'How can managers keep performance reviews more consistent?',
    content:
      'Performance reviews become inconsistent when expectations, feedback notes, and historical context are scattered. Better review systems make goals visible, track feedback over time, and reduce bias introduced by missing context.'
  },
  {
    value: 'item-3',
    title: 'What makes time-off coordination harder for growing teams?',
    content:
      'Time-off planning gets messy when approvals, team coverage, and policy rules are not connected. A clearer HR workflow helps employees request leave confidently while giving managers enough visibility to plan around absences.'
  }
] as const

const Accordion12 = () => {
  return (
    <Accordion className='w-full space-y-2' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className='rounded-md border border-transparent bg-background px-5 transition-[border-color,box-shadow] duration-200 has-[button[aria-expanded=true]]:border-border has-[button[aria-expanded=true]]:shadow-md'
        >
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger
              data-slot='accordion-trigger'
              className='group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              {item.title}
              <span className='relative size-4 shrink-0 text-muted-foreground'>
                <ChevronDownIcon className='absolute inset-0 size-4 group-aria-expanded/accordion-trigger:hidden' />
                <ChevronUpIcon className='absolute inset-0 hidden size-4 group-aria-expanded/accordion-trigger:block' />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className='text-muted-foreground'>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion12
