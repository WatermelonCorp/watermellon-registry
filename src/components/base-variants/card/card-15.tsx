import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type GalleryCard = {
  description: string
  imageAlt: string
  imageSrc: string
  primaryAction: string
  secondaryAction: string
  title: string
}

const cards: readonly GalleryCard[] = [
  {
    description: 'A calm abstract study with soft light, layered curves, and a quieter palette for editorial layouts and better readability.',
    imageAlt: 'Soft blue abstract composition',
    imageSrc: 'https://picsum.photos/seed/editorial-blue/1200/900',
    primaryAction: 'View Piece',
    secondaryAction: 'Save',
    title: 'Still Blue Field'
  },
  {
    description: 'Warm transitions and glowing orange tones create a softer gradient scene with a cinematic surface and improved contrast.',
    imageAlt: 'Warm orange abstract composition',
    imageSrc: 'https://picsum.photos/seed/editorial-sunset/1200/900',
    primaryAction: 'View Piece',
    secondaryAction: 'Save',
    title: 'Warm Fade Study'
  },
  {
    description: 'Deep indigo and violet layers build a more atmospheric composition suited to moodboards and cover art.',
    imageAlt: 'Indigo and violet abstract composition',
    imageSrc: 'https://picsum.photos/seed/editorial-cosmic/1200/900',
    primaryAction: 'View Piece',
    secondaryAction: 'Save',
    title: 'Night Motion'
  }
] as const

const Card15 = () => {
  return (
    <div className='flex *:rounded-none *:shadow-none max-xl:flex-col max-xl:*:not-last:border-b-0 max-xl:*:first:rounded-t-xl max-xl:*:last:rounded-b-xl xl:*:not-last:border-r-0 xl:*:first:rounded-l-xl xl:*:last:rounded-r-xl'>
      {cards.map((card) => (
        <Card key={card.title} className='overflow-hidden border-border/70 pt-0'>
          <CardContent className='px-0'>
            <img src={card.imageSrc} alt={card.imageAlt} className='aspect-video w-[24rem] object-cover' />
          </CardContent>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription className='leading-6'>{card.description}</CardDescription>
          </CardHeader>
          <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch rounded-none'>
            <Button className='bg-sky-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.18),0_8px_18px_rgba(14,165,233,0.24)] hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400'>
              {card.primaryAction}
            </Button>
            <Button variant='outline'>{card.secondaryAction}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Card15
