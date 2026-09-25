import {
  TopbarCalendarIcon,
  TopbarChevronIcon,
  TopbarExportIcon,
} from './icons'
import { useDashboardNavigation } from './navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  dashboardPeriods,
  dashboardTopbarData,
  defaultDashboardPeriod,
  getPageTitle,
  type PeriodValue,
} from '../../data'

function isPeriodValue(value: string | null): value is PeriodValue {
  return dashboardPeriods.some((periodOption) => periodOption.value === value)
}

export function DashboardTopbar() {
  const { pathname, period, setPeriod } = useDashboardNavigation()
  const title = getPageTitle(pathname)
  const selectedPeriodValue = isPeriodValue(period) ? period : defaultDashboardPeriod

  const selectedPeriod =
    dashboardPeriods.find((periodOption) => periodOption.value === selectedPeriodValue) ??
    dashboardPeriods[0]

  function handlePeriodChange(nextPeriod: PeriodValue) {
    setPeriod(nextPeriod)
  }

  return (
    <header className="flex shrink-0 flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="size-8.5 shrink-0 md:hidden [&_svg]:size-5!" />

        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 md:flex-col md:items-start md:justify-center md:gap-1.5">
          <h1 className="truncate font-section text-lg leading-none font-semibold text-foreground md:text-xl">
            {title}
          </h1>
          <div className="flex shrink-0 items-center gap-1.5 font-section text-xs text-foreground md:gap-2 md:text-sm">
            <span className="whitespace-nowrap">
              <span className="hidden text-muted-foreground md:inline">
                Last updates{' '}
              </span>
              {dashboardTopbarData.lastUpdated}
            </span>
            <span className="size-2 shrink-0 rounded-full bg-muted-foreground/50" />
            <span className="shrink-0 font-medium">
              <span className="hidden font-normal text-muted-foreground md:inline">
                All values in{' '}
              </span>
              {dashboardTopbarData.currency}
            </span>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 gap-2 sm:flex sm:items-center md:shrink-0">
        <div className="flex min-w-0 items-center">
          <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-l-md border border-r-0 border-border bg-background px-2.5 text-sm text-muted-foreground shadow-xs dark:border-input dark:bg-input/30 md:px-3">
            <TopbarCalendarIcon className="size-4 shrink-0" />
            <span className="truncate">{dashboardTopbarData.dateRange}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-9 shrink-0 gap-2 rounded-l-none bg-card px-2.5 font-normal text-muted-foreground hover:bg-card hover:text-foreground md:px-3"
              >
                <span>{selectedPeriod.label}</span>
                <TopbarChevronIcon className="h-auto w-3 rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {dashboardPeriods.map((periodOption) => (
                <DropdownMenuItem
                  key={periodOption.value}
                  onClick={() => handlePeriodChange(periodOption.value)}
                >
                  {periodOption.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button className="sm:shrink-0">
          <span>Export</span>
          <TopbarExportIcon className="size-3 rotate-180" />
        </Button>
      </div>
    </header>
  )
}
