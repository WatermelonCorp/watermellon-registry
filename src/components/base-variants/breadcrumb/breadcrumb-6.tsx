import type { LucideIcon } from 'lucide-react'
import { ChevronDownIcon, ChevronRightIcon, HomeIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type LinkSegment = {
  label: string
  href: string
  icon?: LucideIcon
}

const rootSegment: LinkSegment = {
  label: 'Home',
  href: '#',
  icon: HomeIcon
}

const sectionSegment: LinkSegment = {
  label: 'Projects',
  href: '#'
}

const currentSegment = {
  label: 'Design System',
  options: ['Tokens', 'Components', 'Patterns']
} as const

const Breadcrumb6 = () => {
  const RootIcon = rootSegment.icon

  return (
    <Breadcrumb>
      <BreadcrumbList className='gap-1.5'>
        <BreadcrumbItem>
          <BreadcrumbLink href={rootSegment.href}>
            <Badge
              variant='outline'
              className='inline-flex items-center gap-1.5 border-border/70 px-2.5 text-muted-foreground hover:text-foreground'
            >
              {RootIcon ? <RootIcon className='size-3' /> : null}
              {rootSegment.label}
            </Badge>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='text-muted-foreground/60'>
          <ChevronRightIcon className='size-3.5' />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href={sectionSegment.href}>
            <Badge variant='outline' className='border-border/70 px-2.5 text-muted-foreground hover:text-foreground'>
              {sectionSegment.label}
            </Badge>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='text-muted-foreground/60'>
          <ChevronRightIcon className='size-3.5' />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <DropdownMenu>
              <DropdownMenuTrigger className='inline-flex items-center gap-1 rounded-sm px-1 py-0.5 font-medium text-foreground outline-none'>
                {currentSegment.label}
                <ChevronDownIcon className='size-3.5 text-muted-foreground' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                {currentSegment.options.map((option) => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumb6
