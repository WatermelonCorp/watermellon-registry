import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { LucideIcon } from 'lucide-react'
import { GraduationCapIcon, LibraryBigIcon, PlusIcon, UsersIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  icon: LucideIcon
  title: string
  subtitle: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    icon: GraduationCapIcon,
    title: 'Why do students struggle to stay on track?',
    subtitle: 'Learning Journey',
    content:
      'Students usually lose momentum when lessons, deadlines, and progress signals are scattered across too many places. A stronger learning experience makes the next step visible and keeps milestones easy to review.'
  },
  {
    value: 'item-2',
    icon: LibraryBigIcon,
    title: 'How should course materials be organized?',
    subtitle: 'Curriculum Structure',
    content:
      'Course content works better when readings, assignments, and supporting resources are grouped by topic instead of being added as a long list. Clear structure helps learners spend more time studying and less time searching.'
  },
  {
    value: 'item-3',
    icon: UsersIcon,
    title: 'What improves collaboration in cohort programs?',
    subtitle: 'Community Experience',
    content:
      'Cohort learning becomes stronger when discussion spaces, peer feedback, and live session notes are connected to the same workflow. Students engage more when collaboration feels like part of the course instead of an extra step.'
  }
] as const

const Accordion8 = () => {
  return (
    <Accordion className='w-full' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionPrimitive.Header className='flex'>
              <AccordionPrimitive.Trigger
                data-slot='accordion-trigger'
                className='group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50'
              >
                <span className='flex items-center gap-4'>
                  <span
                    className='flex size-10 shrink-0 items-center justify-center rounded-md border'
                    aria-hidden='true'
                  >
                    <Icon className='size-4' />
                  </span>
                  <span className='flex flex-col space-y-0.5'>
                    <span>{item.title}</span>
                    <span className='font-normal text-muted-foreground'>{item.subtitle}</span>
                  </span>
                </span>
                <PlusIcon className='pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45' />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className='text-muted-foreground'>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordion8
