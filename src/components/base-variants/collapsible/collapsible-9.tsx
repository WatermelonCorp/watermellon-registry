'use client'

import { useId, useState } from 'react'

import type { ReactNode } from 'react'
import { ChevronDownIcon, CreditCardIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

type AddressField = {
  id: string
  label: string
  placeholder?: string
  type: 'number' | 'text'
}

type DeliveryOption = {
  description: string
  label: string
  price: string
  value: string
}

const addressFields: readonly AddressField[] = [
  { id: 'full-name', label: 'Full Name', type: 'text' },
  { id: 'pin-code', label: 'Pin Code', type: 'number' },
  { id: 'city-name', label: 'City', type: 'text' },
  { id: 'landmark', label: 'Landmark', type: 'text' }
] as const

const deliveryOptions: readonly DeliveryOption[] = [
  { value: '1', label: 'Standard 3-5 Days', description: 'Friday, 15 June - Tuesday, 19 June', price: 'Free' },
  { value: '2', label: 'Express', description: 'Friday, 15 June - Sunday, 17 June', price: '$5.00' },
  { value: '3', label: 'Overnight', description: 'Tomorrow', price: '$10.00' }
] as const

type SectionProps = {
  children: ReactNode
  defaultOpen?: boolean
  title: string
}

const Section = ({ children, defaultOpen = false, title }: SectionProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-4 px-4'>
        <div className='text-sm font-semibold'>{title}</div>
        <CollapsibleTrigger>
          <Button variant='ghost' size='icon-sm'>
            <ChevronDownIcon className={`size-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
            <span className='sr-only'>Toggle {title}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='flex flex-col gap-3 px-4 pb-1 pt-3'>{children}</CollapsibleContent>
    </Collapsible>
  )
}

const Collapsible9 = () => {
  const id = useId()

  return (
    <div className='w-full space-y-3 flex items-center justify-center'>
      <div className='w-full max-w-md space-y-3 rounded-md border border-border/70 py-4 shadow-sm'>
        <Section title='Delivery Address' defaultOpen={false}>
          {addressFields.slice(0, 1).map((field) => (
            <div key={field.id} className='group relative w-full'>
              <label
                htmlFor={field.id}
                className='absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm text-muted-foreground transition-all group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'
              >
                <span className='inline-flex bg-background px-1'>{field.label}</span>
              </label>
              <Input id={field.id} type={field.type} placeholder=' ' className='border-border/70 bg-muted/20 dark:bg-background' />
            </div>
          ))}
          <div className='group relative w-full space-y-2'>
            <label
              htmlFor='address'
              className='absolute top-0 block translate-y-2 cursor-text px-2 text-sm text-muted-foreground transition-all group-focus-within:-translate-y-1/2 group-focus-within:text-xs group-focus-within:font-medium has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium'
            >
              <span className='inline-flex bg-background px-1'>Address</span>
            </label>
            <Textarea id='address' placeholder=' ' className='border-border/70 !bg-muted/20 dark:!bg-background' />
          </div>
          {addressFields.slice(1).map((field) => (
            <div key={field.id} className='group relative w-full'>
              <label
                htmlFor={field.id}
                className='absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm text-muted-foreground transition-all group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'
              >
                <span className='inline-flex bg-background px-1'>{field.label}</span>
              </label>
              <Input id={field.id} type={field.type} placeholder=' ' className='border-border/70 bg-muted/20 dark:bg-background' />
            </div>
          ))}
        </Section>
        <Separator />
        <Section title='Delivery Options' defaultOpen={false}>
          <RadioGroup className='w-full gap-0 -space-y-px rounded-md shadow-xs' defaultValue='2'>
            {deliveryOptions.map((option) => (
              <div
                key={`${id}-${option.value}`}
                className='border-input has-data-[state=checked]:border-primary/30 has-data-[state=checked]:bg-muted/30 relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10'
              >
                <div className='flex items-center justify-between gap-1.5'>
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem
                      id={`${id}-${option.value}`}
                      value={option.value}
                      className='after:absolute after:inset-0'
                      aria-label={`plan-radio-${option.value}`}
                      aria-describedby={`${id}-${option.value}-price`}
                    />
                    <div className='space-y-1'>
                      <Label className='inline-flex items-center' htmlFor={`${id}-${option.value}`}>
                        {option.label}
                      </Label>
                      <p className='text-sm text-muted-foreground'>{option.description}</p>
                    </div>
                  </div>
                  <div id={`${id}-${option.value}-price`} className='text-xs leading-[inherit] text-muted-foreground'>
                    {option.price}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </Section>
        <Separator />
        <Section title='Payment' defaultOpen={false}>
          <div className='w-full space-y-2'>
            <Label>Card details</Label>
            <div>
              <div className='relative focus-within:z-1'>
                <Input id={`number-${id}`} type='text' placeholder='1234 1234 1234 1234' className='peer rounded-b-none border-border/70 bg-muted/20 pr-9 shadow-none dark:bg-background' />
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-muted-foreground peer-disabled:opacity-50'>
                  <CreditCardIcon className='size-4' />
                  <span className='sr-only'>Card Provider</span>
                </div>
              </div>
              <div className='-mt-px flex'>
                <div className='min-w-0 flex-1 focus-within:z-1'>
                  <Input id={`expiry-${id}`} type='text' placeholder='MM / YY' className='rounded-t-none rounded-r-none border-border/70 bg-muted/20 shadow-none dark:bg-background' />
                </div>
                <div className='-ms-px min-w-0 flex-1 focus-within:z-1'>
                  <Input id={`cvc-${id}`} type='text' placeholder='CVC' className='rounded-t-none rounded-l-none border-border/70 bg-muted/20 shadow-none dark:bg-background' />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default Collapsible9
