import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MinusIcon, PlusIcon } from 'lucide-react'

const items = [
  {
    value: "item-1",
    title: "How secure is my data?",
    content:
      "We use industry-standard encryption and secure infrastructure to protect your data at every step. Your information is never shared without your consent.",
  },
  {
    value: "item-2",
    title: "How do transactions work?",
    content:
      "Transactions are processed instantly and reflected in your account in real time. You can view detailed history and insights anytime.",
  },
  {
    value: "item-3",
    title: "Can I manage everything in one place?",
    content:
      "Yes - track activity, manage settings, and control your account from a single, unified dashboard designed for clarity and speed.",
  },
] as const

const Accordion4 = () => {
  return (
    <Accordion className='w-full space-y-2' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className='rounded-sm border-b-0 bg-card shadow-sm transition-shadow data-[state=open]:shadow-lg'
        >
          <AccordionTrigger className='px-5 [&_[data-slot=accordion-trigger-icon]]:hidden'>
            <span className='flex w-full items-center justify-between gap-4'>
              <span>{item.title}</span>
              <span className='relative size-3 shrink-0 text-muted-foreground'>
                <PlusIcon className='absolute inset-0 size-3 group-aria-expanded/accordion-trigger:hidden' />
                <MinusIcon className='absolute inset-0 hidden size-3 group-aria-expanded/accordion-trigger:block' />
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className='px-5 text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion4
