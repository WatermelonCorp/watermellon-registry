import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type OverlayCard = {
  description: string
  imageAlt: string
  imageSrc: string
  title: string
}

const overlayCard: OverlayCard = {
  description:
    'Build moodboards, gather visual references, and shape early concepts in one shared creative surface.',
  imageAlt: 'Creative desk with sketches and materials',
  imageSrc: 'https://picsum.photos/seed/creative-catalyst/1200/900',
  title: 'Creative Catalyst'
}

const Card7 = () => {
  return (
    <Card className='relative max-w-md overflow-hidden border-0 py-0 shadow-sm'>
      <CardContent className='px-0'>
        <img src={overlayCard.imageSrc} alt={overlayCard.imageAlt} className='h-72 w-full object-cover' />
      </CardContent>
      <div className='absolute inset-x-0 bottom-0 h-40 backdrop-blur-md mask-[linear-gradient(to_top,black_50%,transparent_100%)]' />
      <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent' />
      <div className='absolute inset-x-0 bottom-0 z-10'>
        <CardHeader className='space-y-2 text-white pb-4'>
          <CardTitle className='text-xl'>{overlayCard.title}</CardTitle>
          <p className='max-w-sm text-sm leading-5 text-white/80'>{overlayCard.description}</p>
        </CardHeader>
      </div>
    </Card>
  )
}

export default Card7
