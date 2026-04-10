'use client'

import {
  type ComponentType,
  type SVGProps,
  useState
} from 'react'

import { DiamondIcon, HexagonIcon, TriangleIcon } from 'lucide-react'

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

type IconCheckboxOption = {
  activeClassName: string
  ariaLabel: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  id: string
}

const iconCheckboxOptions: readonly IconCheckboxOption[] = [
  {
    id: 'triangle',
    ariaLabel: 'Triangle icon',
    icon: TriangleIcon,
    activeClassName: 'fill-rose-500 stroke-rose-500 dark:fill-rose-400 dark:stroke-rose-400'
  },
  {
    id: 'diamond',
    ariaLabel: 'Diamond icon',
    icon: DiamondIcon,
    activeClassName:
      'fill-cyan-500 stroke-cyan-500 dark:fill-cyan-400 dark:stroke-cyan-400'
  },
  {
    id: 'hexagon',
    ariaLabel: 'Hexagon icon',
    icon: HexagonIcon,
    activeClassName:
      'fill-violet-500 stroke-violet-500 dark:fill-violet-400 dark:stroke-violet-400'
  }
]

const Checkbox11 = () => {
  const [checkedIcons, setCheckedIcons] = useState<Record<string, boolean>>({
    triangle: true,
    diamond: true,
    hexagon: true
  })

  const handleCheckedChange = (
    id: IconCheckboxOption['id'],
    checked: boolean
  ) => {
    setCheckedIcons((previousCheckedIcons) => ({
      ...previousCheckedIcons,
      [id]: checked
    }))
  }

  return (
    <div className='flex items-center gap-3'>
      {iconCheckboxOptions.map((option) => {
        const Icon = option.icon
        const isChecked = checkedIcons[option.id]

        return (
          <CheckboxPrimitive.Root
            key={option.id}
            data-slot='checkbox'
            checked={isChecked}
            onCheckedChange={(checked) =>
              handleCheckedChange(option.id, checked === true)
            }
            className='group rounded-md outline-none transition-transform hover:scale-[1.03] focus-visible:ring-3 focus-visible:ring-ring/50'
            aria-label={option.ariaLabel}
          >
            <Icon
              className={`size-5 stroke-1 transition-colors ${
                isChecked ? option.activeClassName : ''
              }`}
            />
          </CheckboxPrimitive.Root>
        )
      })}
    </div>
  )
}

export default Checkbox11
