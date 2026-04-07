import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type MediaCard = {
  description: string
  imageAlt: string
  imageSrc: string
  primaryAction: string
  secondaryAction: string
  title: string
}

const mediaCard: MediaCard = {
  description: 'A high-contrast abstract light painting with a darker palette and a more cinematic surface.',
  imageAlt: 'Red white and blue abstract light painting on black background',
  imageSrc: 'https://unsplash.com/photos/fFVfa7ZDTCc/download?force=true&w=1200',
  primaryAction: 'View Details',
  secondaryAction: 'Save Reference',
  title: 'Afterglow Motion'
}

const Card5 = () => {
  return (
    <Card className='max-w-md overflow-hidden border-border/70 bg-muted/10 pt-0 shadow-sm'>
      <CardContent className='px-0'>
        <img src={mediaCard.imageSrc} alt={mediaCard.imageAlt} className='aspect-4/3 h-72 w-full object-cover' />
      </CardContent>
      <CardHeader className='space-y-1 pb-4'>
        <CardTitle className='text-lg'>{mediaCard.title}</CardTitle>
        <CardDescription className='leading-6'>{mediaCard.description}</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 border-t border-border/60 pt-5 max-sm:flex-col max-sm:items-stretch'>
        <Button className='bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400'>
          {mediaCard.primaryAction}
        </Button>
        <Button variant='outline'>{mediaCard.secondaryAction}</Button>
      </CardFooter>
    </Card>
  )
}

export default Card5
