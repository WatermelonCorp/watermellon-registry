import {
  AddIcon,
  CalendarIcon,
  DeleteIcon,
  DeveloperIcon,
  DocumentIcon,
  IndexesIcon,
  KeyIcon,
  ProjectIcon,
  SampleIcon,
} from './icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { indexes, projectSummary, projects } from '../../data'
import { cn } from '@/lib/utils'

const metaChipClassName =
  'flex h-11 items-center justify-center gap-2 rounded-lg border bg-secondary px-3 text-muted-foreground max-md:text-sm md:justify-start md:px-4'

const defaultProject = projects[0]
const indexesLabel = `${projectSummary.indexesUsed}/${projectSummary.indexesLimit} Indexes`
const indexesUsedLabel = `${projectSummary.indexesUsed} / ${projectSummary.indexesLimit} Indexes Used`

export function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 p-4 md:gap-11 md:p-8">
      <div className="flex flex-col md:gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your indexes for {defaultProject.name}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center md:justify-between">
        <div className="contents md:flex md:flex-wrap md:items-center md:gap-2">
          <div className={cn(metaChipClassName, 'font-medium text-foreground')}>
            <ProjectIcon />
            {defaultProject.name}
          </div>
          <div className={metaChipClassName}>
            <DeveloperIcon />
            {projectSummary.tier}
          </div>
          <div className={metaChipClassName}>
            <IndexesIcon />
            {indexesLabel}
          </div>
        </div>

        <Button
          variant="destructive"
          className="h-11 gap-2 px-3 font-normal max-md:text-sm md:px-4 dark:bg-destructive/10 dark:hover:bg-destructive/20"
        >
          <DeleteIcon />
          Delete Project
        </Button>
      </div>

      <div className="border-t" />

      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <IndexesIcon />
              <h2 className="font-medium">Search Indexes</h2>
              <Badge className="h-auto rounded-lg bg-info/10 py-1.5 font-normal text-info">
                {indexesUsedLabel}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground md:pl-7">
              Manage search indexes for {defaultProject.name}
            </p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              className="h-11 flex-1 gap-2 px-4 font-normal md:w-auto md:flex-none"
            >
              <SampleIcon />
              Created from sample
            </Button>
            <Button className="h-11 flex-1 gap-2 px-4 font-normal md:w-auto md:flex-none">
              <AddIcon />
              Create Index
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-medium">{indexes.length} Index</h3>
            <Badge className="h-auto rounded-lg bg-info/10 py-1.5 font-normal text-info">
              Active
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            {indexes.map((index) => (
              <div
                key={index.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-card px-3 py-3 transition-colors hover:bg-(--card-hover) md:pr-4"
              >
                <div className="flex items-center gap-3 overflow-hidden md:gap-4">
                  <div className="flex size-11 items-center justify-center rounded-lg border bg-sidebar text-muted-foreground">
                    <DocumentIcon />
                  </div>
                  <div className="flex flex-col gap-1.5 overflow-hidden md:gap-2">
                    <p className="truncate text-sm tracking-tight">{index.name}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground md:gap-x-4">
                      <span className="flex items-center gap-1">
                        <CalendarIcon />
                        <span className="md:hidden">{index.updatedAt}</span>
                        <span className="hidden md:inline">
                          Updated {index.updatedAt}
                        </span>
                      </span>
                      <span className="size-1 rounded-full bg-muted-foreground" />
                      <span>{index.docs} docs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-9">
                    <KeyIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/10 hover:text-destructive"
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
