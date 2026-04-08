import type { LucideIcon } from 'lucide-react'
import { BookOpenIcon, GraduationCapIcon, UsersIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  icon: LucideIcon
  title: string
  content: string
  media: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    icon: GraduationCapIcon,
    title: 'How do students stay oriented in longer courses?',
    content:
      'Learning journeys feel smoother when weekly goals, lesson progress, and upcoming deadlines are visible in one place. Students usually stay more engaged when the platform clearly shows what has been completed and what comes next.',
    media:
      'https://images.unsplash.com/photo-1753892208880-7032f44ad6ea?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200'
  },
  {
    value: 'item-2',
    icon: BookOpenIcon,
    title: 'What makes digital learning resources easier to use?',
    content:
      'Course materials work better when readings, notes, and assignments are grouped by topic instead of being scattered across separate pages. Clear structure helps learners spend more time studying and less time searching.',
    media:
      'https://images.unsplash.com/photo-1741707596390-2f0c75580ca5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200'
  },
  {
    value: 'item-3',
    icon: UsersIcon,
    title: 'How can cohort collaboration feel more natural?',
    content:
      'Peer interaction improves when discussion, feedback, and shared milestones are built into the same flow as the coursework. Students are more likely to participate when collaboration feels like part of learning instead of an extra destination.',
    media:
      'https://images.unsplash.com/photo-1741699427706-7bfb38c716d8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200'
  }
] as const

const Accordion13 = () => {
  return (
    <Accordion className='w-full rounded-2xl border border-border/80 bg-background px-3' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <AccordionItem key={item.value} value={item.value} className='border-border/70'>
            <AccordionTrigger className='items-center py-4 hover:no-underline'>
              <span className='flex items-center gap-3'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'>
                  <Icon className='size-4' />
                </span>
                <span className='text-sm font-medium'>{item.title}</span>
              </span>
            </AccordionTrigger>

            <AccordionContent className='space-y-4 pb-4'>
              <p className='text-sm leading-6 text-muted-foreground'>{item.content}</p>
              <img
                src={item.media}
                alt={item.title}
                className='h-52 w-full rounded-xl object-cover'
                loading='lazy'
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordion13
