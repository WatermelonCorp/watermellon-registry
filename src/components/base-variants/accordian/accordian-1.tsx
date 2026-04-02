import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

const AccordionVariant1 = () => {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="flex-row-reverse justify-end gap-3 [&_[data-slot=accordion-trigger-icon]]:ml-0">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="pl-7 text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionVariant1