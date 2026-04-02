'use client'

import { useState } from 'react'

import { HeartIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type ProductCard = {
  colorLabel: string
  description: string
  imageAlt: string
  imageSrc: string
  price: string
  sizeLabel: string
  title: string
}

const product: ProductCard = {
  colorLabel: 'Crimson / White',
  description:
    'A lightweight everyday runner with a bold profile, cushioned sole, and a shape that works on and off the track.',
  imageAlt: 'Red running shoe on red background',
  imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  price: '$84.00',
  sizeLabel: 'EU 39',
  title: 'Velocity Run One'
}

const Card12 = () => {
  const [liked, setLiked] = useState<boolean>(false)

  return (
    <div className='relative max-w-md overflow-hidden rounded-2xl shadow-lg'>
      <div className='relative h-72'>
        <img src={product.imageSrc} alt={product.imageAlt} className='size-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent' />
      </div>
      <Button
        size='icon'
        onClick={() => setLiked((current) => !current)}
        className='absolute top-4 right-4 rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-white'
      >
        <HeartIcon className={cn('size-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-foreground')} />
        <span className='sr-only'>Like</span>
      </Button>
      <Card className='rounded-t-none  border-none shadow-none'>
        <CardHeader className='space-y-2'>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription className='flex flex-wrap items-center gap-2'>
            <Badge variant='outline' className='rounded-sm border-border/70 bg-background/70'>
              {product.sizeLabel}
            </Badge>
            <Badge variant='outline' className='rounded-sm border-border/70 bg-background/70'>
              {product.colorLabel}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='leading-6 text-muted-foreground'>{product.description}</p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase text-muted-foreground'>Price</span>
            <span className='text-2xl font-semibold'>{product.price}</span>
          </div>
          <Button size='lg' className='bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400'>
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Card12
