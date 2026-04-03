import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { PlusIcon, XIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  title: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    title: 'Why do support queues grow unexpectedly in SaaS products?',
    content:
      'Support queues usually spike when billing issues, onboarding blockers, and product questions all land in the same channel. Clearer triage and self-serve guidance help teams resolve simple requests before they become backlog.'
  },
  {
    value: 'item-2',
    title: 'How can onboarding flows reduce early drop-off?',
    content:
      'Early drop-off often happens when users are asked to do too much before they see value. Simpler setup, clearer progress states, and fewer decisions in the first session help new users stay engaged longer.'
  },
  {
    value: 'item-3',
    title: 'What makes feature discovery feel more natural?',
    content:
      'Feature discovery works best when guidance appears at the right moment instead of being packed into one tour. Small, contextual prompts help users learn the product without interrupting the task they came to complete.'
  }
] as const

const Accordion14 = () => {
  return (
    <Accordion className='w-full space-y-1.5' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className='rounded-md border border-border/80 bg-background px-4'
        >
          <AccordionPrimitive.Header className='flex'>
            <AccordionPrimitive.Trigger
              data-slot='accordion-trigger'
              className='group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium outline-none transition-all hover:no-underline focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50'
            >
              <span className='pr-4'>{item.title}</span>

              <span className='relative flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors group-aria-expanded/accordion-trigger:bg-muted'>
                <PlusIcon className='absolute inset-0 m-auto size-4 group-aria-expanded/accordion-trigger:hidden' />
                <XIcon className='absolute inset-0 m-auto hidden size-4 group-aria-expanded/accordion-trigger:block' />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className='pb-4 text-sm leading-6 text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion14
