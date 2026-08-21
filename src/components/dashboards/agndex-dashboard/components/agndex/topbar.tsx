import { useState } from 'react'
import {
  CaretDownIcon,
  ProjectIcon,
} from './icons'
import { ThemeToggle } from './theme-toggle'
import { useDashboardNavigation } from './navigation'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { navigationGroups, projects, type Project } from '../../data'
import { cn } from '@/lib/utils'

const navigationItems = navigationGroups.flatMap((group) => group.items)

export function DashboardTopbar() {
  const { pathname } = useDashboardNavigation()
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])

  const currentPage =
    navigationItems.find(({ href }) =>
      href === '/'
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`),
    ) ?? navigationItems[0]

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-2 px-4 md:h-16 md:px-6">
      <div className="flex items-center gap-1">
        <SidebarTrigger className="size-9 md:hidden [&_svg]:size-5!" />
        <nav className="hidden items-center gap-1 text-base text-muted-foreground md:flex">
          <span>Agndex</span>
          <span className="text-border">|</span>
          <span>{selectedProject.name}</span>
          <span className="text-border">|</span>
          <span className="font-medium text-foreground/80">{currentPage.name}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'h-10 max-w-56 justify-between gap-2 px-3 data-[state=open]:[&>svg]:rotate-180 md:w-56',
            )}
          >
            <span className="flex items-center gap-1.5 overflow-hidden">
              <ProjectIcon />
              <span className="truncate">{selectedProject.name}</span>
            </span>
            <CaretDownIcon className="transition-transform" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="agndex-dashboard w-56">
            <DropdownMenuRadioGroup
              value={selectedProject.id}
              onValueChange={(id) => {
                const project = projects.find((item) => item.id === id)
                if (project) setSelectedProject(project)
              }}
            >
              {projects.map((project) => (
                <DropdownMenuRadioItem
                  key={project.id}
                  value={project.id}
                  className="font-normal text-muted-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
                >
                  {project.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  )
}
