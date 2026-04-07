'use client'

import { useState } from 'react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type FaqItem = {
  answer: string
  question: string
}

const faqItems: readonly FaqItem[] = [
  {
    question: 'How do I share the latest draft with my team?',
    answer:
      'Open the project, copy the review link, and send it to your team from the share panel. Everyone with access will see the latest saved version.'
  },
  {
    question: 'Can I pause a review and come back later?',
    answer:
      'Yes. Your comments, selected screens, and review status stay saved so you can return later without starting over.'
  }
] as const

type FaqRowProps = {
  defaultOpen?: boolean
  item: FaqItem
}

const FaqRow = ({ defaultOpen = false, item }: FaqRowProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  return (
    <div className='space-y-1 border-b border-border/60 py-4 last:border-b-0'>
      <p className='text-base font-medium tracking-tight'>{item.question}</p>
      <Collapsible open={open} onOpenChange={setOpen} className='space-y-2'>
        <CollapsibleContent>
          <p className='max-w-[52ch] text-sm leading-6 text-muted-foreground'>{item.answer}</p>
        </CollapsibleContent>
        <CollapsibleTrigger>
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.12em] ${
              open ? 'text-rose-600 dark:text-rose-400' : 'text-sky-600 dark:text-sky-400'
            }`}
          >
            {open ? 'Hide answer' : 'Show answer'}
          </span>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  )
}

const Collapsible6 = () => {
  return (
    <div className='w-full max-w-[420px]'>
      {faqItems.map((item, index) => (
        <FaqRow key={item.question} item={item} defaultOpen={index === 0} />
      ))}
    </div>
  )
}

export default Collapsible6
