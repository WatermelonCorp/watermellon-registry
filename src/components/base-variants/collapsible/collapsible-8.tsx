'use client'

import { useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import { ChevronRightIcon, DotIcon, FolderKanbanIcon, LogOutIcon, SettingsIcon, UserIcon, UsersIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type MenuLink = {
  icon: LucideIcon
  label: string
}

type MenuSection = {
  icon: LucideIcon
  items: readonly string[]
  label: string
}

const primaryLinks: readonly MenuLink[] = [{ icon: UserIcon, label: 'Profile' }] as const

const sections: readonly MenuSection[] = [
  {
    icon: SettingsIcon,
    label: 'Settings',
    items: ['Appearance', 'Notifications', 'Billing']
  },
  {
    icon: UsersIcon,
    label: 'Workspace',
    items: ['Members', 'Teams', 'Projects']
  }
] as const

const footerLink: MenuLink = {
  icon: LogOutIcon,
  label: 'Log out'
}

type SectionRowProps = {
  section: MenuSection
}

const SectionRow = ({ section }: SectionRowProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const SectionIcon = section.icon

  return (
    <Collapsible open={open} onOpenChange={setOpen} className='flex flex-col gap-1'>
      <CollapsibleTrigger className='flex items-center justify-between rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground'>
        <div className='flex items-center gap-2'>
          <SectionIcon className='size-4 text-muted-foreground' />
          <span>{section.label}</span>
        </div>
        <ChevronRightIcon className={`size-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className='pl-7'>
        <div className='flex flex-col gap-1 py-1'>
          {section.items.map((item) => (
            <button
              key={item}
              type='button'
              className='flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
            >
              <DotIcon className='size-4' />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const Collapsible8 = () => {
  const FooterIcon = footerLink.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='outline' className='border-border/70'>
          <FolderKanbanIcon className='size-4' />
          Workspace menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60'>
        {primaryLinks.map((link) => {
          const LinkIcon = link.icon

          return (
            <DropdownMenuItem key={link.label} className='text-sky-600 focus:text-sky-700 dark:text-sky-400 dark:focus:text-sky-300'>
              <LinkIcon className='size-4' />
              <span>{link.label}</span>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <div className='px-1 py-1'>
          {sections.map((section) => (
            <SectionRow key={section.label} section={section} />
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <FooterIcon className='size-4' />
          <span>{footerLink.label}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Collapsible8
