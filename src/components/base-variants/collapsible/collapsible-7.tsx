'use client'

import { useState } from 'react'

import { ChevronUpIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type HelpCard = {
  answer: string
  imageAlt: string
  imageSrc: string
  question: string
}

const helpCard: HelpCard = {
  answer:
    'Once your shipment is packed, we will send a delivery link by email. You can open it any time to see the courier status and the latest package movement.',
  imageAlt: 'Package ready for shipment on a desk',
  imageSrc: 'https://images.pexels.com/photos/6169132/pexels-photo-6169132.jpeg?auto=compress&cs=tinysrgb&w=1200',
  question: 'How can I follow a shipment update?'
}

const Collapsible7 = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Card className='w-full max-w-md overflow-hidden border-border/70 p-0  shadow-xl rounded-none'>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className='flex items-center justify-between px-6 py-5'>
          <CardTitle className='text-base'>{helpCard.question}</CardTitle>
          <CardAction>
            <CollapsibleTrigger>
              <Button variant='outline' size='sm' className='border-border/70'>
                <span>{open ? 'Hide' : 'Show'}</span>
                <ChevronUpIcon className={`size-4 transition-transform ${open ? '' : 'rotate-180'}`} />
              </Button>
            </CollapsibleTrigger>
          </CardAction>
        </div>
        <CollapsibleContent>
          <CardContent className='space-y-3 px-0 pb-0'>
            <p className='px-6 text-sm leading-6 text-muted-foreground'>{helpCard.answer}</p>
            <img src={helpCard.imageSrc} alt={helpCard.imageAlt} className='aspect-video h-70 w-full object-cover' />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default Collapsible7
