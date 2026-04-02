import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormField = {
  id: string
  label: string
  placeholder?: string
  type: 'email' | 'password'
}

const fields: readonly FormField[] = [
  {
    id: 'work-email',
    label: 'Work email',
    placeholder: 'team@studio.com',
    type: 'email'
  },
  {
    id: 'access-code',
    label: 'Access code',
    type: 'password'
  }
] as const

const Card1 = () => {
  return (
    <Card className='w-full max-w-md border-border/60 bg-background/95 shadow-xl'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-xl'>Sign in to your workspace</CardTitle>
        <CardDescription className='max-w-sm text-sm leading-6'>
          Use your work details to continue to the project dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex flex-col gap-5'>
            {fields.map((field) => (
              <div key={field.id} className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor={field.id} className='text-sm font-medium'>
                    {field.label}
                  </Label>
                  {field.id === 'access-code' ? (
                    <a href='#' className='ml-auto inline-block text-sm text-muted-foreground underline-offset-4 hover:underline'>
                      Reset it
                    </a>
                  ) : null}
                </div>
                <Input id={field.id} type={field.type} placeholder={field.placeholder} className='h-11 border-border/70' />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-col gap-2.5 pt-3'>
        <Button type='submit' className='h-11 w-full bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400'>
          Continue
        </Button>
        <Button variant='outline' className='h-11 w-full border-border/70'>
          Sign in with email link
        </Button>
        <div className='mt-3 text-center text-sm text-muted-foreground'>
          New here?{' '}
          <a href='#' className='text-foreground underline underline-offset-4'>
            Request access
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Card1
