'use client'

import { Fragment, useMemo, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui//table'

type TeamMember = {
  dob: string
  email: string
  hireDate: string
  name: string
  role: string
}

type TeamRow = {
  budget: number
  department: string
  location: string
  members: readonly TeamMember[]
  nextMilestone: string
  teamId: string
  teamName: string
}

const data: readonly TeamRow[] = [
  {
    teamId: 'TEAM-01',
    teamName: 'Digital Marketing',
    department: 'Marketing',
    location: 'London',
    nextMilestone: 'Launch New Campaign',
    budget: 30000,
    members: [
      {
        name: 'Alice Johnson',
        role: 'Lead Strategist',
        email: 'alice.johnson@example.com',
        hireDate: '2020-01-15',
        dob: '1990-01-01'
      },
      {
        name: 'Bob Smith',
        role: 'Content Creator',
        email: 'bob.smith@example.com',
        hireDate: '2021-03-22',
        dob: '1992-05-15'
      },
      {
        name: 'Charlie Brown',
        role: 'SEO Specialist',
        email: 'charlie.brown@example.com',
        hireDate: '2022-07-30',
        dob: '1995-11-20'
      }
    ]
  },
  {
    teamId: 'TEAM-02',
    teamName: 'Product Development',
    department: 'Engineering',
    location: 'San Francisco',
    nextMilestone: 'Release Version 2.0',
    budget: 50000,
    members: [
      {
        name: 'David Wilson',
        role: 'Product Manager',
        email: 'david.wilson@example.com',
        hireDate: '2019-05-10',
        dob: '1988-02-25'
      },
      {
        name: 'Emma Johnson',
        role: 'UX Designer',
        email: 'emma.johnson@example.com',
        hireDate: '2020-08-15',
        dob: '1990-11-30'
      },
      {
        name: 'Frank Miller',
        role: 'QA Engineer',
        email: 'frank.miller@example.com',
        hireDate: '2021-01-20',
        dob: '1993-06-10'
      }
    ]
  },
  {
    teamId: 'TEAM-03',
    teamName: 'Sales Team',
    department: 'Sales',
    location: 'New York',
    nextMilestone: 'Close Q3 Deals',
    budget: 40000,
    members: [
      {
        name: 'Grace Lee',
        role: 'Sales Executive',
        email: 'grace.lee@example.com',
        hireDate: '2021-05-12',
        dob: '1995-03-22'
      },
      {
        name: 'Henry Davis',
        role: 'Account Manager',
        email: 'henry.davis@example.com',
        hireDate: '2020-11-01',
        dob: '1992-07-15'
      },
      {
        name: 'Ivy Garcia',
        role: 'Sales Analyst',
        email: 'ivy.garcia@example.com',
        hireDate: '2021-09-15',
        dob: '1994-02-10'
      }
    ]
  }
] as const

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

const DataTable9 = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const allSelected = selectedIds.length === data.length
  const someSelected = selectedIds.length > 0 && !allSelected

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? data.map((team) => team.teamId) : [])
  }

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(id) ? current : [...current, id]
      }

      return current.filter((item) => item !== id)
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <div className='w-60 sm:w-100 md:w-120 lg:w-160 2xl:w-220 mx-auto'>
      <div className='overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='w-10 bg-muted/20 font-medium' />
              <TableHead className='w-10 bg-muted/20 font-medium'>
                <Checkbox
                  checked={allSelected}
                  aria-checked={someSelected ? 'mixed' : allSelected}
                  onCheckedChange={(value) => toggleAll(!!value)}
                  aria-label='Select all teams'
                  className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                />
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Team Name
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Department
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Location
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Next Milestone
              </TableHead>
              <TableHead className='h-12 bg-muted/20 text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                Budget
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((team) => {
              const isExpanded = expandedIds.includes(team.teamId)
              const isSelected = selectedIdSet.has(team.teamId)

              return (
                <Fragment key={team.teamId}>
                  <TableRow
                    data-state={isSelected ? 'selected' : undefined}
                    className='hover:bg-muted/10 data-[state=selected]:bg-muted/20'
                  >
                    <TableCell className='w-10 py-0'>
                      <Button
                        className='size-7 text-muted-foreground hover:bg-background hover:text-foreground'
                        onClick={() => toggleExpanded(team.teamId)}
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded ? `Collapse details for ${team.teamName}` : `Expand details for ${team.teamName}`
                        }
                        size='icon'
                        variant='ghost'
                      >
                        {isExpanded ? (
                          <ChevronUpIcon className='size-4 opacity-60' aria-hidden='true' />
                        ) : (
                          <ChevronDownIcon className='size-4 opacity-60' aria-hidden='true' />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className='w-10 py-3.5'>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) => toggleRow(team.teamId, !!value)}
                        aria-label={`Select ${team.teamName}`}
                        className='after:hidden data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white dark:data-checked:border-sky-500 dark:data-checked:bg-sky-500 dark:data-checked:text-white'
                      />
                    </TableCell>
                    <TableCell className='py-3.5'>
                      <div className='font-medium'>{team.teamName}</div>
                    </TableCell>
                    <TableCell className='py-3.5 text-muted-foreground'>{team.department}</TableCell>
                    <TableCell className='py-3.5 text-muted-foreground'>{team.location}</TableCell>
                    <TableCell className='py-3.5'>{team.nextMilestone}</TableCell>
                    <TableCell className='py-3.5 font-medium'>{formatCurrency(team.budget)}</TableCell>
                  </TableRow>

                  {isExpanded ? (
                    <TableRow className='hover:bg-transparent'>
                      <TableCell colSpan={7} className='p-0'>
                        <Table className='bg-muted/5'>
                          <TableHeader className='border-b border-border/60'>
                            <TableRow className='bg-muted/10 hover:bg-muted/10'>
                              <TableHead className='w-20' />
                              <TableHead className='text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                                Member Name
                              </TableHead>
                              <TableHead className='text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                                Role
                              </TableHead>
                              <TableHead className='text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                                Email
                              </TableHead>
                              <TableHead className='text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                                Hire Date
                              </TableHead>
                              <TableHead className='text-[13px] font-medium tracking-[0.08em] text-muted-foreground'>
                                Date of Birth
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {team.members.map((member) => (
                              <TableRow key={member.email} className='hover:bg-muted/10'>
                                <TableCell />
                                <TableCell className='py-3.5 font-medium'>{member.name}</TableCell>
                                <TableCell className='py-3.5 text-muted-foreground'>{member.role}</TableCell>
                                <TableCell className='py-3.5 text-muted-foreground'>{member.email}</TableCell>
                                <TableCell className='py-3.5'>{member.hireDate}</TableCell>
                                <TableCell className='py-3.5'>{member.dob}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable9
