'use client'

import { useMemo, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon, GripVerticalIcon } from 'lucide-react'

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Employee = {
  department: string
  dob: string
  employeeId: number
  firstName: string
  hireDate: string
  jobTitle: string
  lastName: string
  salary: number
}

type ColumnKey = 'department' | 'dob' | 'firstName' | 'hireDate' | 'jobTitle' | 'lastName' | 'salary'

type SortDirection = 'asc' | 'desc'

type SortConfig = {
  column: ColumnKey
  direction: SortDirection
}

type ColumnConfig = {
  key: ColumnKey
  label: string
}

const data: readonly Employee[] = [
  {
    employeeId: 1,
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    dob: '1990-01-01',
    hireDate: '2020-01-15',
    salary: 80000
  },
  {
    employeeId: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    jobTitle: 'Product Manager',
    department: 'Product',
    dob: '1985-05-20',
    hireDate: '2019-03-10',
    salary: 95000
  },
  {
    employeeId: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    jobTitle: 'UX Designer',
    department: 'Design',
    dob: '1992-07-30',
    hireDate: '2021-06-01',
    salary: 70000
  },
  {
    employeeId: 4,
    firstName: 'Bob',
    lastName: 'Brown',
    jobTitle: 'Data Analyst',
    department: 'Analytics',
    dob: '1988-11-15',
    hireDate: '2018-09-20',
    salary: 75000
  }
] as const

const defaultColumns: readonly ColumnConfig[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'department', label: 'Department' },
  { key: 'dob', label: 'Date of Birth' },
  { key: 'hireDate', label: 'Hire Date' },
  { key: 'salary', label: 'Salary' }
] as const

const formatCurrency = (salary: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(salary)

const renderValue = (employee: Employee, key: ColumnKey) => {
  switch (key) {
    case 'firstName':
      return <div className='font-medium'>{employee.firstName}</div>
    case 'lastName':
      return employee.lastName
    case 'jobTitle':
      return employee.jobTitle
    case 'department':
      return employee.department
    case 'dob':
      return employee.dob
    case 'hireDate':
      return employee.hireDate
    case 'salary':
      return formatCurrency(employee.salary)
  }
}

const DraggableHeader = ({
  column,
  direction,
  onToggleSort
}: {
  column: ColumnConfig
  direction?: SortDirection
  onToggleSort: (column: ColumnKey) => void
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.key
  })

  return (
    <TableHead
      ref={setNodeRef}
      className='relative h-12 bg-muted/20 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'
      style={{
        opacity: isDragging ? 0.85 : 1,
        transform: CSS.Transform.toString(transform),
        transition
      }}
      aria-sort={direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'}
    >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1'>
          <Button
            size='icon'
            variant='ghost'
            className='-ml-2 size-7 text-muted-foreground hover:bg-background hover:text-foreground'
            {...attributes}
            {...listeners}
            aria-label='Drag to reorder'
          >
            <GripVerticalIcon className='size-4 opacity-60' aria-hidden='true' />
          </Button>
          <span className='truncate'>{column.label}</span>
        </div>

        <Button
          size='icon'
          variant='ghost'
          className='group -mr-1 size-7 text-muted-foreground hover:bg-background hover:text-foreground'
          onClick={() => onToggleSort(column.key)}
          aria-label={`Sort by ${column.label}`}
        >
          {direction === 'asc' ? (
            <ChevronUpIcon className='size-4 opacity-60' aria-hidden='true' />
          ) : direction === 'desc' ? (
            <ChevronDownIcon className='size-4 opacity-60' aria-hidden='true' />
          ) : (
            <ChevronUpIcon className='size-4 opacity-0 group-hover:opacity-60' aria-hidden='true' />
          )}
        </Button>
      </div>
    </TableHead>
  )
}

const DataTable8 = () => {
  const [columnOrder, setColumnOrder] = useState<ColumnKey[]>(defaultColumns.map((column) => column.key))
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: 'firstName',
    direction: 'asc'
  })

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor))

  const orderedColumns = useMemo(
    () =>
      columnOrder
        .map((key) => defaultColumns.find((column) => column.key === key))
        .filter((column): column is ColumnConfig => Boolean(column)),
    [columnOrder]
  )

  const sortedData = useMemo(() => {
    const sorted = [...data]

    sorted.sort((left, right) => {
      const leftValue = left[sortConfig.column]
      const rightValue = right[sortConfig.column]

      const comparison =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue))

      return sortConfig.direction === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [sortConfig])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    setColumnOrder((current) => {
      const oldIndex = current.indexOf(active.id as ColumnKey)
      const newIndex = current.indexOf(over.id as ColumnKey)

      return arrayMove(current, oldIndex, newIndex)
    })
  }

  const toggleSort = (column: ColumnKey) => {
    setSortConfig((current) => {
      if (current.column === column) {
        return {
          column,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        }
      }

      return {
        column,
        direction: 'asc'
      }
    })
  }

  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/20 [&>th]:border-t-0'>
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                  {orderedColumns.map((column) => (
                    <DraggableHeader
                      key={column.key}
                      column={column}
                      direction={sortConfig.column === column.key ? sortConfig.direction : undefined}
                      onToggleSort={toggleSort}
                    />
                  ))}
                </SortableContext>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((employee) => (
                <TableRow key={employee.employeeId} className='hover:bg-muted/10'>
                  {orderedColumns.map((column) => (
                    <TableCell key={column.key} className='truncate py-3.5'>
                      {renderValue(employee, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  )
}

export default DataTable8
