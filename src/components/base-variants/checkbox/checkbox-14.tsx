'use client'

import { useState, type ComponentType, type SVGProps } from 'react'

import { BadgeCheckIcon, BriefcaseBusinessIcon, PenToolIcon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type SkillOption = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  id: string
  label: string
}

const skills = [
  { label: 'Frontend Engineering', icon: PenToolIcon },
  { label: 'Business Insights', icon: BriefcaseBusinessIcon },
  { label: 'Visual Branding', icon: BadgeCheckIcon }
] as const satisfies readonly Omit<SkillOption, 'id'>[]

const skillOptions: readonly SkillOption[] = skills.map((skill) => ({
  ...skill,
  id: skill.label.toLowerCase().replace(/\s+/g, '-')
}))

const Checkbox14 = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const handleCheckedChange = (skillId: SkillOption['id'], checked: boolean) => {
    setSelectedSkills((previousSelectedSkills) =>
      checked
        ? previousSelectedSkills.includes(skillId)
          ? previousSelectedSkills
          : [...previousSelectedSkills, skillId]
        : previousSelectedSkills.filter(
            (selectedSkillId) => selectedSkillId !== skillId
          )
    )
  }

  return (
    <ul className='flex w-fit min-w-72 flex-col divide-y rounded-md border'>
      {skillOptions.map(({ id, label, icon: Icon }) => (
        <li key={id}>
          <Label
            htmlFor={id}
            className='flex items-center justify-between gap-2 px-5 py-3'
          >
            <span className='flex items-center gap-2'>
              <Icon className='size-4' /> {label}
            </span>
            <Checkbox
              id={id}
              checked={selectedSkills.includes(id)}
              onCheckedChange={(checked) => handleCheckedChange(id, checked  === true)}
              className='data-checked:border-sky-600 data-checked:bg-sky-600 dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500'
            />
          </Label>
        </li>
      ))}
    </ul>
  )
}

export default Checkbox14
