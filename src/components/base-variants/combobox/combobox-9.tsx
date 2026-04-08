'use client'

import { useId, useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui//command'
import { Label } from '@/components/ui//label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui//popover'

type CountryOption = {
  flag: string
  label: string
  value: string
}

const countries = [
  {
    value: 'india',
    label: 'India',
    flag: 'https://flagcdn.com/w40/in.png'
  },
  {
    value: 'japan',
    label: 'Japan',
    flag: 'https://flagcdn.com/w40/jp.png'
  },
  {
    value: 'canada',
    label: 'Canada',
    flag: 'https://flagcdn.com/w40/ca.png'
  },
  {
    value: 'germany',
    label: 'Germany',
    flag: 'https://flagcdn.com/w40/de.png'
  },
  {
    value: 'brazil',
    label: 'Brazil',
    flag: 'https://flagcdn.com/w40/br.png'
  },
  {
    value: 'france',
    label: 'France',
    flag: 'https://flagcdn.com/w40/fr.png'
  }
] as const satisfies readonly CountryOption[]

type CountryValue = (typeof countries)[number]['value']

const countryByValue: Record<CountryValue, (typeof countries)[number]> = {
  india: countries[0],
  japan: countries[1],
  canada: countries[2],
  germany: countries[3],
  brazil: countries[4],
  france: countries[5]
}

const isCountryValue = (value: string): value is CountryValue =>
  countries.some((country) => country.value === value)

const Combobox9 = () => {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryValue | ''>('')

  const selectedCountryOption = selectedCountry
    ? countryByValue[selectedCountry]
    : undefined

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='text-sm font-medium'>
        Country picker
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          role='combobox'
          aria-expanded={open}
          className='flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-background px-3.5 text-sm shadow-xs outline-none transition-colors hover:bg-accent/20 focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          {selectedCountryOption ? (
            <span className='flex min-w-0 items-center gap-2'>
              <img
                src={selectedCountryOption.flag}
                alt={`${selectedCountryOption.label} flag`}
                className='h-4 w-5 rounded-[2px] object-cover'
              />
              <span className='truncate'>{selectedCountryOption.label}</span>
            </span>
          ) : (
            <span className='text-muted-foreground'>Select country</span>
          )}
          <ChevronDownIcon
            className='text-muted-foreground/80 size-4 shrink-0'
            aria-hidden='true'
          />
        </PopoverTrigger>
        <PopoverContent
          className='w-full min-w-(--radix-popper-anchor-width) rounded-xl border-border/60 p-0 shadow-sm'
          align='start'
        >
          <Command>
            <CommandInput placeholder='Search country...' className='h-9 px-1' />
            <CommandList className='mt-2 rounded-lg px-1 pb-1'>
              <CommandEmpty>No country found.</CommandEmpty>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  data-checked={selectedCountry === country.value}
                  onSelect={(currentValue) => {
                    if (currentValue === selectedCountry) {
                      setSelectedCountry('')
                      setOpen(false)
                      return
                    }

                    if (!isCountryValue(currentValue)) {
                      return
                    }

                    setSelectedCountry(currentValue)
                    setOpen(false)
                  }}
                className='rounded-lg pr-2'
                >
                  <img
                    src={country.flag}
                    alt={`${country.label} flag`}
                    className='h-4 w-5 rounded-[2px] object-cover'
                  />
                  <span className='min-w-0 flex-1 truncate'>{country.label}</span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox9
