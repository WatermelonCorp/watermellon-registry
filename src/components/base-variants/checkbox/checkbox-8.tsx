'use client'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const technologies = ['Design', 'Marketing', 'Product'] as const

type Technology = (typeof technologies)[number]

const Checkbox8 = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>(
    []
  )

  const handleCheckedChange = (technology: Technology, checked: boolean) => {
    setSelectedTechnologies((previousSelectedTechnologies) =>
      checked
        ? previousSelectedTechnologies.includes(technology)
          ? previousSelectedTechnologies
          : [...previousSelectedTechnologies, technology]
        : previousSelectedTechnologies.filter(
            (selectedTechnology) => selectedTechnology !== technology
          )
    )
  }

  return (
    <div className='space-y-4'>
      <Label className='font-semibold'>Team roles</Label>
      <div className='flex flex-wrap items-center gap-x-5 gap-y-2.5'>
        {technologies.map((technology) => (
          <div key={technology} className='flex items-center gap-2'>
            <Checkbox
              id={technology}
              checked={selectedTechnologies.includes(technology)}
              onCheckedChange={(checked) =>
                handleCheckedChange(technology, checked === true)
              }
              className='data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
            />
            <Label htmlFor={technology} className='text-sm'>
              {technology}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checkbox8
