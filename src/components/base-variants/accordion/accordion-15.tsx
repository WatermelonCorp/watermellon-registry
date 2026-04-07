import type { ComponentType } from 'react'
import { ChevronDownIcon, ChevronUpIcon, ClipboardCheckIcon, FolderKanbanIcon, LifeBuoyIcon } from 'lucide-react'

import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type FaqItem = {
  title: string
  content: string
}

type AccordionCategory = {
  value: string
  category: string
  icon: ComponentType<{ className?: string }>
  faqs: readonly FaqItem[]
}

const items: readonly AccordionCategory[] = [
  {
    value: 'item-1',
    category: 'Project Planning',
    icon: FolderKanbanIcon,
    faqs: [
      {
        title: 'Why do project timelines slip so often?',
        content:
          'Timelines usually drift when dependencies are hidden or ownership is unclear. Planning tools work better when milestones, blockers, and approvals are visible in one place instead of being split across multiple updates.'
      },
      {
        title: 'How detailed should a kickoff plan be?',
        content:
          'A kickoff plan should be detailed enough to clarify scope, roles, and handoff points without turning into a long document nobody revisits. The best plans are easy to scan and easy to maintain.'
      },
      {
        title: 'What helps teams prioritize requests better?',
        content:
          'Prioritization gets easier when business impact, effort, and urgency are evaluated together. A shared framework prevents every request from feeling equally important.'
      }
    ] as const
  },
  {
    value: 'item-2',
    category: 'Team Operations',
    icon: ClipboardCheckIcon,
    faqs: [
      {
        title: 'How can recurring processes stay consistent?',
        content:
          'Recurring operations are more reliable when the team has clear checklists, known owners, and visible status updates. Small process gaps are easier to catch when the workflow is standardized.'
      },
      {
        title: 'What makes internal handoffs smoother?',
        content:
          'Handoffs improve when context is transferred with the work rather than explained later in messages. Teams move faster when next steps, due dates, and open questions are already attached to the task.'
      },
      {
        title: 'How do we reduce follow-up overhead?',
        content:
          'Follow-up overhead usually grows when updates are scattered and responsibilities are implied instead of assigned. Better visibility removes the need for repeated status checks.'
      }
    ] as const
  },
  {
    value: 'item-3',
    category: 'Client Support',
    icon: LifeBuoyIcon,
    faqs: [
      {
        title: 'Why do support conversations lose context?',
        content:
          'Context gets lost when history, decisions, and issue details are spread across channels. Support workflows feel stronger when the full thread stays connected to the request.'
      },
      {
        title: 'How can updates feel more proactive?',
        content:
          'Clients feel better informed when support teams share progress before being asked. Even short updates reduce uncertainty and make longer resolutions easier to tolerate.'
      },
      {
        title: 'What helps escalations move faster?',
        content:
          'Escalations move faster when severity, reproduction details, and ownership are defined upfront. Clear escalation paths prevent issues from bouncing between teams.'
      }
    ] as const
  }
] as const

const Accordion15 = () => {
  return (
    <Accordion className='w-full rounded-xl border border-border/80' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className='outline-none first:rounded-t-xl last:rounded-b-xl'
          >
            <AccordionPrimitive.Header className='flex'>
              <AccordionPrimitive.Trigger
                data-slot='accordion-trigger'
                className='group/accordion-trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium outline-none transition-all hover:no-underline aria-disabled:pointer-events-none aria-disabled:opacity-50'
              >
                <span className='flex items-center gap-3'>
                  <Icon className='size-4 shrink-0 text-muted-foreground' />
                  <span>{item.category}</span>
                </span>

                <span className='relative size-4 shrink-0 text-muted-foreground'>
                  <ChevronDownIcon className='absolute inset-0 size-4 group-aria-expanded/accordion-trigger:hidden' />
                  <ChevronUpIcon className='absolute inset-0 hidden size-4 group-aria-expanded/accordion-trigger:block' />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className='pb-0'>
              {item.faqs.map((faq) => (
                <Collapsible
                  key={faq.title}
                  className='border-t border-border/70 px-5 transition-colors has-[button[aria-expanded=true]]:bg-neutral-200/60 dark:has-[button[aria-expanded=true]]:bg-neutral-800'
                  defaultOpen={faq.title === item.faqs[0]?.title}
                >
                  <CollapsibleTrigger className='focus-visible:ring-ring/50 flex w-full items-center gap-3 py-4 text-left text-sm font-medium outline-none hover:no-underline focus-visible:ring-[3px]'>
                    <ChevronDownIcon className='size-4 shrink-0 text-muted-foreground transition-transform data-[state=open]:rotate-180' />
                    {faq.title}
                  </CollapsibleTrigger>
                  <CollapsibleContent className='overflow-hidden pb-4 pl-7 text-sm leading-6 text-muted-foreground'>
                    {faq.content}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordion15
