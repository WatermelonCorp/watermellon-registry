import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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

const Accordion5 = () => {
  return (
    <Accordion className='w-full' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className='has-[button[aria-expanded=true]]:border-blue-600 not-last:has-[button[aria-expanded=true]]:border-b-2 dark:has-[button[aria-expanded=true]]:border-blue-400'
        >
          <AccordionTrigger className='hover:no-underline aria-expanded:text-blue-600 dark:aria-expanded:text-blue-400 [&[aria-expanded=true]>svg]:text-blue-600 dark:[&[aria-expanded=true]>svg]:text-blue-400'>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className='text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion5
