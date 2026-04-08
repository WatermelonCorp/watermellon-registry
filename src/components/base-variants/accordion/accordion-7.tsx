import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type AccordionItemData = {
  value: string
  name: string
  role: string
  avatarImage: string
  content: string
}

const items: readonly AccordionItemData[] = [
  {
    value: 'item-1',
    name: 'Maya Chen',
    role: 'Product Designer',
    avatarImage: 'https://i.pravatar.cc/160?img=28',
    content:
      'Maya focuses on simplifying dense workflows into cleaner interfaces. She usually starts by reducing friction in onboarding, navigation, and handoff states before adding any visual polish.'
  },
  {
    value: 'item-2',
    name: 'Owen Brooks',
    role: 'Engineering Lead',
    avatarImage: 'https://i.pravatar.cc/160?img=30',
    content:
      'Owen cares most about predictable systems. His approach is to keep components easy to extend, remove brittle abstractions, and make shared patterns reliable before scaling them across a product.'
  },
  {
    value: 'item-3',
    name: 'Sara Patel',
    role: 'Operations Manager',
    avatarImage: 'https://i.pravatar.cc/160?img=32',
    content:
      'Sara looks for clarity in day-to-day workflows. She prefers interfaces that surface status, ownership, and next steps quickly so teams can move without guessing what needs attention.'
  }
]

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Accordion7 = () => {
  return (
    <Accordion className='w-full rounded-2xl border bg-background px-3' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className='border-border/80'>
          <AccordionTrigger className='items-center py-4 hover:no-underline'>
            <span className='flex items-center gap-3'>
              <Avatar className='size-10 rounded-full ring-1 ring-border/70'>
                <AvatarImage src={item.avatarImage} alt={item.name} />
                <AvatarFallback className='text-xs'>{getInitials(item.name)}</AvatarFallback>
              </Avatar>

              <span className='flex flex-col'>
                <span className='text-sm font-medium'>{item.name}</span>
                <span className='text-xs font-normal text-muted-foreground'>{item.role}</span>
              </span>
            </span>
          </AccordionTrigger>

          <AccordionContent className='pb-4 pl-13 text-sm leading-6 text-muted-foreground'>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default Accordion7

