import { ChevronDownIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type FaqItem = {
  title: string
  content: string
  open?: boolean
}

type AccordionCategory = {
  value: string
  category: string
  faqs: readonly FaqItem[]
}

const items: readonly AccordionCategory[] = [
  {
    value: 'item-1',
    category: 'Campaign Planning',
    faqs: [
      {
        title: 'Why do campaign launches miss their original dates?',
        content:
          'Launches usually slip when approvals, asset production, and messaging changes happen in parallel without one shared timeline. Campaign planning works better when teams can see dependencies before launch week arrives.',
        open: true
      },
      {
        title: 'How detailed should a campaign brief be?',
        content:
          'A useful brief should clarify audience, objective, core message, and success criteria without becoming too long to revisit. The best briefs guide decisions instead of documenting everything.'
      },
      {
        title: 'What helps teams align on launch priorities?',
        content:
          'Priorities become clearer when every activity is tied to a measurable objective. That makes it easier to decide what is essential for launch and what can wait.'
      }
    ] as const
  },
  {
    value: 'item-2',
    category: 'Content Workflow',
    faqs: [
      {
        title: 'Why do content reviews take longer than expected?',
        content:
          'Content reviews slow down when feedback is spread across separate docs, messages, and presentations. Teams move faster when edits, comments, and approvals happen in one workflow.',
        open: true
      },
      {
        title: 'How do we avoid duplicate content requests?',
        content:
          'Duplicate requests usually happen when briefs are not visible across teams. Shared intake and clear ownership reduce overlap and make planning easier.'
      },
      {
        title: 'What makes handoff to design smoother?',
        content:
          'Handoffs improve when narrative, hierarchy, and usage context are already clear before design begins. That reduces revision loops and keeps execution focused.'
      }
    ] as const
  },
  {
    value: 'item-3',
    category: 'Performance Tracking',
    faqs: [
      {
        title: 'Why do teams struggle to interpret campaign results?',
        content:
          'Results feel harder to interpret when traffic, conversion, and retention metrics live in different dashboards. Better reporting connects outcomes back to the campaign goal that mattered most.',
        open: true
      },
      {
        title: 'How often should reporting be shared?',
        content:
          'Reporting should be frequent enough to catch problems early, but not so frequent that teams are reacting to noise. A simple weekly rhythm is often easier to sustain.'
      },
      {
        title: 'What makes insights more actionable?',
        content:
          'Insights are more useful when they lead to a specific next step. Reporting should make it obvious what to continue, what to adjust, and what to stop.'
      }
    ] as const
  }
] as const

const Accordion16 = () => {
  return (
    <Accordion className='w-full rounded-xl border border-border/80' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => {
        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className='first:rounded-t-xl last:rounded-b-xl'
          >
            <AccordionTrigger className='items-center px-5 py-4 hover:no-underline focus-visible:ring-0'>
              <span>{item.category}</span>
            </AccordionTrigger>

            <AccordionContent className='pb-0'>
              {item.faqs.map((faq) => (
                <Collapsible
                  key={faq.title}
                  className='border-t border-border/70 px-6 transition-colors has-[button[aria-expanded=true]]:bg-neutral-200/60 dark:has-[button[aria-expanded=true]]:bg-neutral-800'
                  defaultOpen={faq.open}
                >
                  <CollapsibleTrigger className='group/collapsible focus-visible:ring-ring/50 flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-medium outline-none hover:no-underline focus-visible:ring-[3px]'>
                    <span>{faq.title}</span>
                    <ChevronDownIcon className='invisible size-4 shrink-0 text-muted-foreground group-data-[state=open]/collapsible:visible' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='overflow-hidden pb-4 text-sm leading-6 text-muted-foreground'>
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

export default Accordion16
