'use client'

import { useState } from 'react'

import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
import { Input } from '@/components/ui//input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui//select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui//table'

type PersonStatus = 'active' | 'inactive' | 'pending'

type Person = {
  email: string
  firstName: string
  id: string
  lastName: string
  progress: number
  status: PersonStatus
}

type PersonField = Exclude<keyof Person, 'id'>

const initialData: readonly Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
    progress: 75
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'inactive',
    progress: 45
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    status: 'active',
    progress: 90
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice.brown@example.com',
    status: 'pending',
    progress: 60
  },
  {
    id: '5',
    firstName: 'Charlie',
    lastName: 'Wilson',
    email: 'charlie.wilson@example.com',
    status: 'active',
    progress: 80
  }
] as const

const DataTable13 = () => {
  const [data, setData] = useState<Person[]>([...initialData])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allSelected = data.length > 0 && selectedIds.length === data.length
  const someSelected = selectedIds.length > 0 && !allSelected

  const updateCell = <K extends PersonField>(id: string, field: K, value: Person[K]) => {
    setData((current) =>
      current.map((person) => (person.id === id ? { ...person, [field]: value } : person))
    )
  }

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? data.map((person) => person.id) : [])
  }

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(id) ? current : [...current, id]
      }

      return current.filter((item) => item !== id)
    })
  }

  const refreshData = () => {
    setData([...initialData])
    setSelectedIds([])
  }

  return (
    <div className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto space-y-4'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <Table className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
          <TableHeader>
            <TableRow>
              <TableHead className='h-12 w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all rows'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                First Name
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Last Name
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Email
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Status
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Progress
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((person) => {
                const isSelected = selectedIds.includes(person.id)

                return (
                  <TableRow
                    key={person.id}
                    data-state={isSelected ? 'selected' : undefined}
                    className='hover:bg-muted/10 data-[state=selected]:bg-muted/20'
                  >
                    <TableCell className='py-3.5'>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) => toggleRow(person.id, !!value)}
                        aria-label={`Select ${person.firstName} ${person.lastName}`}
                        className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <Input
                        value={person.firstName}
                        onChange={(event) => updateCell(person.id, 'firstName', event.target.value)}
                        className='h-8 rounded-md border-0 bg-transparent px-1 focus-visible:bg-background focus-visible:ring-1'
                        aria-label='Editable first name'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <Input
                        value={person.lastName}
                        onChange={(event) => updateCell(person.id, 'lastName', event.target.value)}
                        className='h-8 rounded-md border-0 bg-transparent px-1 focus-visible:bg-background focus-visible:ring-1'
                        aria-label='Editable last name'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <Input
                        value={person.email}
                        onChange={(event) => updateCell(person.id, 'email', event.target.value)}
                        className='h-8 rounded-md border-0 bg-transparent px-1 focus-visible:bg-background focus-visible:ring-1'
                        aria-label='Editable email'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <Select
                        value={person.status}
                        onValueChange={(value) => updateCell(person.id, 'status', value as PersonStatus)}
                      >
                        <SelectTrigger
                          className='h-8 rounded-md border-0 bg-transparent px-1 focus:bg-background focus:ring-1'
                          aria-label='Editable status'
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='active'>Active</SelectItem>
                          <SelectItem value='inactive'>Inactive</SelectItem>
                          <SelectItem value='pending'>Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='flex items-center gap-2'>
                        <Input
                          type='number'
                          min='0'
                          max='100'
                          value={person.progress.toString()}
                          onChange={(event) => {
                            const nextValue = Number(event.target.value)
                            const safeValue = Number.isNaN(nextValue) ? person.progress : Math.max(0, Math.min(100, nextValue))
                            updateCell(person.id, 'progress', safeValue)
                          }}
                          className='h-8 w-20 rounded-md border-0 bg-transparent px-1 focus-visible:bg-background focus-visible:ring-1'
                          aria-label='Editable progress'
                        />
                        <span className='text-sm text-muted-foreground'>%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='text-muted-foreground flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-background px-4 py-3 text-sm shadow-sm max-md:flex-col'>
        <div>{data.length} rows total</div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' size='sm' onClick={refreshData}>
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DataTable13
