'use client'

import { useState } from 'react'

import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type FileTreeItem =
  | {
      name: string
      type: 'file'
      children?: never
    }
  | {
      children: readonly FileTreeItem[]
      name: string
      type: 'folder'
    }

const fileTree: readonly FileTreeItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'sections',
        type: 'folder',
        children: [
          { name: 'hero.tsx', type: 'file' },
          { name: 'features.tsx', type: 'file' },
          { name: 'pricing.tsx', type: 'file' }
        ]
      },
      { name: 'layout.tsx', type: 'file' }
    ]
  },
  {
    name: 'content',
    type: 'folder',
    children: [{ name: 'copy.md', type: 'file' }]
  },
  {
    name: 'styles',
    type: 'folder',
    children: [{ name: 'tokens.css', type: 'file' }]
  },
  {
    name: 'site.config.ts',
    type: 'file'
  }
] as const

type FileTreeProps = {
  item: FileTreeItem
  level: number
}

const FileTree = ({ item, level }: FileTreeProps) => {
  if (item.type === 'file') {
    return (
      <div
        className='flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground outline-none'
        style={{ paddingLeft: `${level === 0 ? 1.75 : 3.25}rem` }}
      >
        <FileIcon className='size-4 shrink-0' />
        <span>{item.name}</span>
      </div>
    )
  }

  return <FolderTree item={item} level={level} />
}

type FolderTreeProps = {
  item: Extract<FileTreeItem, { type: 'folder' }>
  level: number
}

const FolderTree = ({ item, level }: FolderTreeProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className='flex flex-col gap-1'
      style={{ paddingLeft: `${level === 0 ? 0 : 1.5}rem` }}
    >
      <CollapsibleTrigger className='flex items-center gap-2 rounded-md px-2 py-1 text-sm outline-none hover:bg-muted/40'>
        <ChevronRightIcon className={`size-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
        {open ? (
          <FolderOpenIcon className='size-4 shrink-0 text-muted-foreground' />
        ) : (
          <FolderIcon className='size-4 shrink-0 text-muted-foreground' />
        )}
        <span>{item.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className='flex flex-col gap-1'>
        {item.children.map((child) => (
          <FileTree key={`${item.name}-${child.name}`} item={child} level={level + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

const Collapsible2 = () => {
  return (
    <div className='flex w-full max-w-56 flex-col gap-2 rounded-lg border border-border/70 bg-background p-2 shadow-sm'>
      {fileTree.map((item) => (
        <FileTree key={item.name} item={item} level={0} />
      ))}
    </div>
  )
}

export default Collapsible2
