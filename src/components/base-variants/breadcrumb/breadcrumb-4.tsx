import { DotIcon } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

type BreadcrumbSegment =
  | {
      label: string
      href: string
      current?: false
    }
  | {
      label: string
      current: true
      href?: never
    }

const segments: readonly BreadcrumbSegment[] = [
  { label: 'Library', href: '#' },
  { label: 'Resources', href: '#' },
  { label: 'Design Notes', current: true }
] as const

const Breadcrumb4 = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList className='gap-1.5 text-sm'>
        {segments.map((segment, index) => (
          <BreadcrumbItem key={segment.label}>
            {'href' in segment ? (
              <BreadcrumbLink href={segment.href} className='rounded-sm px-1.5 py-0.5 hover:text-foreground'>
                {segment.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className='rounded-sm bg-muted/40 px-1.5 py-0.5 font-medium'>
                {segment.label}
              </BreadcrumbPage>
            )}
            {index < segments.length - 1 ? (
              <BreadcrumbSeparator className='text-muted-foreground/60'>
                <DotIcon className='size-3.5' />
              </BreadcrumbSeparator>
            ) : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumb4
