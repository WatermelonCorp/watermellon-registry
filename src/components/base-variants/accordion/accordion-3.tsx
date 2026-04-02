import {
  AlertTriangleIcon,
  ShieldAlertIcon,
  WalletCardsIcon,
} from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const items = [
  {
    value: 'item-1',
    icon: WalletCardsIcon,
    title: 'Why do payment settlements feel delayed?',
    content:
      'Settlement delays usually come from multiple banking layers, cutoff windows, and reconciliation checks between processors and internal ledgers. A fintech product needs clearer transaction states so users know whether funds are pending, processing, or fully available.'
  },
  {
    value: 'item-2',
    icon: ShieldAlertIcon,
    title: 'How do we reduce false fraud alerts?',
    content:
      'False positives often happen when fraud rules are too rigid and do not account for user context. Better risk scoring, device intelligence, and behavior-based review flows help reduce unnecessary account blocks while still protecting sensitive transactions.'
  },
  {
    value: 'item-3',
    icon: AlertTriangleIcon,
    title: 'What causes confusion around failed transfers?',
    content:
      'Users usually see a failure message without enough explanation. Stronger error mapping, retry guidance, and status updates tied to specific banking rails make failed transfer experiences easier to understand and recover from.'
  }
] as const

const Accordion3 = () => {
  return (
    <Accordion className='w-full' type="multiple" defaultValue={[items[0].value]}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>
              <span className='flex items-center gap-4'>
                <Icon className='size-4 shrink-0 text-muted-foreground' />
                <span>{item.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordion3
