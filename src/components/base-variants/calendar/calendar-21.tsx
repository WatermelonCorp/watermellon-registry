'use client'

import {
  type ComponentProps,
  type Dispatch,
  type HTMLAttributes,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'

import { eachMonthOfInterval, eachYearOfInterval, endOfYear, format, isAfter, isBefore, startOfYear } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import type { CaptionLabelProps, MonthGridProps } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

type CalendarClassNames = NonNullable<ComponentProps<typeof Calendar>['classNames']>

type MonthGridPanelProps = {
  children: ReactNode
  className?: string
  currentMonth: number
  currentYear: number
  endDate: Date
  isYearView: boolean
  onMonthSelect: (selectedMonth: Date) => void
  startDate: Date
  years: readonly Date[]
}

type CaptionLabelButtonProps = {
  isYearView: boolean
  setIsYearView: Dispatch<SetStateAction<boolean>>
} & HTMLAttributes<HTMLSpanElement>

type CollapsibleYearProps = {
  children: ReactNode
  open?: boolean
  title: string
}

const initialSelectedDate: Date = new Date()
const minimumAvailableMonth: Date = new Date(1980, 6)
const maximumAvailableMonth: Date = new Date(2030, 6)
const yearOptions: readonly Date[] = eachYearOfInterval({
  start: startOfYear(minimumAvailableMonth),
  end: endOfYear(maximumAvailableMonth)
})

const calendarClassNames = {
  month_caption: 'ml-2.5 mr-20 justify-start',
  nav: 'flex absolute w-fit right-0 items-center'
} satisfies CalendarClassNames

const Calendar21 = () => {
  const [visibleMonth, setVisibleMonth] = useState<Date>(initialSelectedDate)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialSelectedDate
  )
  const [isYearView, setIsYearView] = useState<boolean>(false)

  return (
    <div>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={visibleMonth}
        onMonthChange={setVisibleMonth}
        defaultMonth={initialSelectedDate}
        startMonth={minimumAvailableMonth}
        endMonth={maximumAvailableMonth}
        className='overflow-hidden rounded-[1.75rem] border border-border/60 bg-muted/10 p-3 shadow-sm'
        classNames={calendarClassNames}
        components={{
          CaptionLabel: (props: CaptionLabelProps) => (
            <CaptionLabel isYearView={isYearView} setIsYearView={setIsYearView} {...props} />
          ),
          MonthGrid: (props: MonthGridProps) => {
            return (
              <MonthGrid
                className={props.className}
                isYearView={isYearView}
                startDate={minimumAvailableMonth}
                endDate={maximumAvailableMonth}
                years={yearOptions}
                currentYear={visibleMonth.getFullYear()}
                currentMonth={visibleMonth.getMonth()}
                onMonthSelect={(selectedMonth: Date) => {
                  setVisibleMonth(selectedMonth)
                  setIsYearView(false)
                }}
              >
                {props.children}
              </MonthGrid>
            )
          }
        }}
      />
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Calendar with advance selection{' '}
        <a href='https://originui.com/calendar-date-picker' className='hover:text-primary underline' target='_blank'>
          Origin UI
        </a>
      </p>
    </div>
  )
}

function MonthGrid({
  className,
  children,
  isYearView,
  startDate,
  endDate,
  years,
  currentYear,
  currentMonth,
  onMonthSelect
}: MonthGridPanelProps) {
  const currentYearRef = useRef<HTMLDivElement>(null)
  const currentMonthButtonRef = useRef<HTMLButtonElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isYearView && currentYearRef.current && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector<HTMLElement>(
        '[data-radix-scroll-area-viewport]'
      )

      if (viewport) {
        const yearTop = currentYearRef.current.offsetTop

        viewport.scrollTop = yearTop
      }

      const focusTimeoutId = window.setTimeout(() => {
        currentMonthButtonRef.current?.focus()
      }, 100)

      return () => window.clearTimeout(focusTimeoutId)
    }
  }, [isYearView])

  return (
    <div className='relative'>
      <table className={className}>{children}</table>
      {isYearView && (
        <div className='absolute inset-0 z-20 -mx-3 -mb-3 rounded-b-[1.75rem] bg-background'>
          <ScrollArea ref={scrollAreaRef} className='h-full'>
            {years.map(year => {
              const months = eachMonthOfInterval({
                start: startOfYear(year),
                end: endOfYear(year)
              })

              const isCurrentYear = year.getFullYear() === currentYear

              return (
                <div key={year.getFullYear()} ref={isCurrentYear ? currentYearRef : undefined}>
                  <CollapsibleYear title={year.getFullYear().toString()} open={isCurrentYear}>
                    <div className='grid grid-cols-3 gap-2'>
                      {months.map(month => {
                        const isDisabled = isBefore(month, startDate) || isAfter(month, endDate)
                        const isCurrentMonth = month.getMonth() === currentMonth && year.getFullYear() === currentYear

                        return (
                          <Button
                            key={month.getTime()}
                            ref={isCurrentMonth ? currentMonthButtonRef : undefined}
                            variant={isCurrentMonth ? 'default' : 'outline'}
                            size='sm'
                            className='h-8 rounded-full border-border/60'
                            disabled={isDisabled}
                            onClick={() => onMonthSelect(month)}
                          >
                            {format(month, 'MMM')}
                          </Button>
                        )
                      })}
                    </div>
                  </CollapsibleYear>
                </div>
              )
            })}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

function CaptionLabel({
  children,
  isYearView,
  setIsYearView
}: CaptionLabelButtonProps) {
  return (
    <Button
      className='data-[state=open]:text-muted-foreground/80 -ms-2 flex items-center gap-2 text-sm font-medium hover:bg-transparent [&[data-state=open]>svg]:rotate-180'
      variant='ghost'
      size='sm'
      onClick={() => setIsYearView(prev => !prev)}
      data-state={isYearView ? 'open' : 'closed'}
    >
      {children}
      <ChevronDownIcon
        className='text-muted-foreground/80 shrink-0 transition-transform duration-200'
        aria-hidden='true'
      />
    </Button>
  )
}

function CollapsibleYear({ title, children, open }: CollapsibleYearProps) {
  return (
    <Collapsible className='border-t border-border/60 px-2 py-1.5' defaultOpen={open}>
      <CollapsibleTrigger className='flex w-full items-center justify-start gap-2 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted/30 data-[state=open]:[&_svg]:rotate-180'>
        <ChevronDownIcon
          className='text-muted-foreground/80 shrink-0 transition-transform duration-200'
          aria-hidden='true'
        />
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden px-3 py-1 text-sm transition-all'>
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Calendar21
