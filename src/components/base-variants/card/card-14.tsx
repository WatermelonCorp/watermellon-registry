'use client'

import { useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import { SparklesIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PromoCard = {
  ctaLabel: string
  icon: LucideIcon
  message: string
  title: string
}

const promoCard: PromoCard = {
  ctaLabel: 'Book a review',
  icon: SparklesIcon,
  message: 'Share your early direction, open questions, or rough ideas and we will help shape them into a clearer next step.',
  title: 'Need feedback on a concept?'
}

const Card14 = () => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const Icon = promoCard.icon

  if (!isActive) return null

  return (
    <Card className='relative max-w-lg border-border/70 shadow-sm'>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setIsActive(false)}
        className='absolute top-2 right-2 rounded-full'
      >
        <XIcon className='size-4' />
        <span className='sr-only'>Close</span>
      </Button>
      <CardHeader className='items-center pb-3 text-center'>
        <div className='mb-2 flex size-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'>
          <Icon className='size-5' />
        </div>
        <CardTitle>{promoCard.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 text-center'>
        <p className='text-sm leading-6 text-muted-foreground'>{promoCard.message}</p>
        <Button className='self-center bg-sky-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.18),0_8px_18px_rgba(14,165,233,0.24)] hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400'>
          {promoCard.ctaLabel}
        </Button>
      </CardContent>
    </Card>
  )
}

export default Card14
