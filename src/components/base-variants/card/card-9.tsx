import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TextCard = {
  body: string
  title: string
}

const textCard: TextCard = {
  body: 'Map early concepts, align the team around one clear direction, and turn rough ideas into a sharper narrative.',
  title: 'Concept Review'
}

const Card9 = () => {
  return (
    <Card className='max-w-md gap-0 rounded-none border-sky-500/60 bg-transparent shadow-2xl'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-sky-700 dark:text-sky-400'>{textCard.title}</CardTitle>
      </CardHeader>
      <CardContent className='text-sm leading-6 text-muted-foreground'>{textCard.body}</CardContent>
    </Card>
  )
}

export default Card9
