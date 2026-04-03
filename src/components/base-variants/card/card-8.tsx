import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TextCard = {
  body: string
  title: string
}

const textCard: TextCard = {
  body: 'A focused sprint for concepts, critique, and quick iterations. Bring one strong direction and refine it through shared feedback.',
  title: 'Studio Review'
}

const Card8 = () => {
  return (
    <Card className='max-w-md gap-0 border-border/70 bg-sky-50/70 shadow-sm dark:bg-neutral-950/20'>
      <CardHeader className='pb-3'>
        <CardTitle>{textCard.title}</CardTitle>
      </CardHeader>
      <CardContent className='text-sm leading-6 text-muted-foreground'>{textCard.body}</CardContent>
    </Card>
  )
}

export default Card8
