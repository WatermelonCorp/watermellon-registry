'use client'

import { useState, type ComponentType, type SVGProps } from 'react'

import { BriefcaseIcon, FolderKanbanIcon, PenToolIcon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type FruitOption = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
}

const fruits: readonly FruitOption[] = [
  { label: 'Planning', icon: FolderKanbanIcon },
  { label: 'Design', icon: PenToolIcon },
  { label: 'Operations', icon: BriefcaseIcon }
]

const Checkbox9 = () => {
  const [selectedFruits, setSelectedFruits] = useState<string[]>([])

  const handleCheckedChange = (fruitLabel: string, checked: boolean) => {
    setSelectedFruits((previousSelectedFruits) =>
      checked
        ? previousSelectedFruits.includes(fruitLabel)
          ? previousSelectedFruits
          : [...previousSelectedFruits, fruitLabel]
        : previousSelectedFruits.filter(
            (selectedFruit) => selectedFruit !== fruitLabel
          )
    )
  }

  return (
    <div className='space-y-4'>
      <Label className='font-semibold'>Focus areas</Label>
      <div className='flex flex-col gap-3.5'>
        {fruits.map(({ label, icon: Icon }) => (
          <div key={label} className='flex items-center gap-2.5'>
            <Checkbox
              id={label}
              checked={selectedFruits.includes(label)}
              onCheckedChange={(checked) => handleCheckedChange(label, checked === true)}
              className='data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
            />
            <Label htmlFor={label} className='flex items-center gap-2 text-sm'>
              <Icon className='size-4 text-muted-foreground' aria-hidden='true' />
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checkbox9
