import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarClockIcon,
  HeartPulseIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
} from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion'

type AccordionItemData = {
  value: string
  icon: LucideIcon
  title: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    icon: CalendarClockIcon,
    title: 'Why are appointment slots disappearing so quickly?',
    content:
      'Appointment availability can change fast when multiple patients, staff members, and scheduling rules are interacting at once...'
  },
  {
    value: 'item-2',
    icon: ShieldCheckIcon,
    title: 'How do we keep patient records secure?',
    content:
      'Patient records need strong access controls, encrypted storage, and clear audit trails...'
  },
  {
    value: 'item-3',
    icon: HeartPulseIcon,
    title: 'What causes delays in lab result updates?',
    content:
      'Lab result delays often happen when data has to move between systems...'
  }
]

const Accordion6 = () => {
  return (
    <Accordion type="multiple" defaultValue={[items[0].value]} className="w-full">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <AccordionItem key={item.value} value={item.value}>
            
            {/* ✅ Radix correct structure */}
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group flex flex-1 items-start gap-4 py-4 text-left text-sm font-medium">
                
                <span className="relative mt-0.5 size-4 shrink-0 text-muted-foreground">
                  <PlusIcon className="absolute inset-0 group-data-[state=open]:hidden" />
                  <MinusIcon className="absolute inset-0 hidden group-data-[state=open]:block" />
                </span>

                <span className="flex items-center gap-4">
                  <Icon className="size-4 shrink-0" />
                  {item.title}
                </span>

              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="pl-8 text-muted-foreground">
              {item.content}
            </AccordionContent>

          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordion6