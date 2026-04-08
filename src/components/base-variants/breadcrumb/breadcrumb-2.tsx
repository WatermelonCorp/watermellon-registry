import { LayoutGridIcon } from 'lucide-react'

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
  { label: 'Portal', href: '#' },
  { label: 'Orders', href: '#' },
  { label: 'Shipment Status', current: true }
] as const

const Breadcrumb2 = () => {
  const [home, ...rest] = segments

  return (
    <Breadcrumb>
      <BreadcrumbList className='px-1 py-1'>
        {'href' in home ? (
          <BreadcrumbItem>
            <BreadcrumbLink href={home.href} className='flex items-center gap-2 font-medium'>
              <LayoutGridIcon className='size-3.5' />
              {home.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : null}

        {rest.map((segment) => (
          <BreadcrumbItem key={segment.label}>
            <BreadcrumbSeparator className='text-muted-foreground/70'>/</BreadcrumbSeparator>
            {'href' in segment ? (
              <BreadcrumbLink href={segment.href} className='text-muted-foreground'>
                {segment.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className='font-medium underline underline-offset-4'>
                {segment.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumb2
