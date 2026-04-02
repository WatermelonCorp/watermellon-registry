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
  { label: 'Dashboard', href: '#' },
  { label: 'Campaigns', href: '#' },
  { label: 'Spring Launch', current: true }
] as const

const Breadcrumb1 = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList className='rounded-full border border-border/70 bg-background px-3 py-1.5 shadow-sm'>
        {segments.map((segment, index) => (
          <BreadcrumbItem key={segment.label}>
            {'href' in segment ? (
              <BreadcrumbLink href={segment.href}>{segment.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{segment.label}</BreadcrumbPage>
            )}
            {index < segments.length - 1 ? <BreadcrumbSeparator /> : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumb1
