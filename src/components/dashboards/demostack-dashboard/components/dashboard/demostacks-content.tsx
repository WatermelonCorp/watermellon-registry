'use client';

import { useMemo, useState, type ReactNode } from 'react';
import {
  Archive,
  ArrowDownWideNarrow,
  Copy,
  EllipsisVertical,
  ExternalLink,
  Filter,
  FolderInput,
  FolderPlus,
  Grid2X2,
  Info,
  List,
  Pencil,
  Plus,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { demostacks, type Demostack } from '../../data';
import { cn } from '@/lib/utils';

const demostackAuthors = [
  ...new Set(demostacks.map((demostack) => demostack.author)),
];

const sortLabels = {
  recent: 'Recent',
  ascending: 'Title A-Z',
  descending: 'Title Z-A',
} as const;

type SortMode = keyof typeof sortLabels;
type ViewMode = 'grid' | 'list';

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function DemostacksContent() {
  const [sort, setSort] = useState<SortMode>('recent');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>('grid');

  const visibleDemostacks = useMemo(() => {
    const filtered = selectedAuthors.length
      ? demostacks.filter((demostack) =>
          selectedAuthors.includes(demostack.author),
        )
      : demostacks;

    if (sort === 'ascending') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === 'descending') {
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }
    return filtered;
  }, [selectedAuthors, sort]);

  return (
    <TooltipProvider delayDuration={300}>
      <Tabs defaultValue="demostacks" className="min-w-0">
        <main className="w-full min-w-0 px-4 py-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Team Demostacks</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground rounded-full"
                    aria-label="About Team Demostacks"
                  >
                    <Info className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Demostacks shared with everyone in your workspace
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:flex-nowrap sm:justify-start sm:gap-4">
              <TabsList className="shadow-border h-10! gap-0 rounded-xl">
                <PrimaryTab value="demostacks">Demostacks</PrimaryTab>
                <PrimaryTab value="screenshots">Screenshots</PrimaryTab>
              </TabsList>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="shadow-primary rounded-xl">
                    Create
                    <Plus className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Plus />
                    New Demostack
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Plus />
                    New Screenshot
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="demostacks">
            <Tabs
              defaultValue="shared"
              className="mt-8 min-w-0 gap-6 sm:mt-10 sm:gap-8"
            >
              <DemostacksToolbar
                sort={sort}
                setSort={setSort}
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
                view={view}
                setView={setView}
              />
              <TabsContent value="shared">
                <DemostackCollection demos={visibleDemostacks} view={view} />
              </TabsContent>
              <TabsContent value="personal">
                <EmptyState
                  title="No personal Demostacks yet"
                  description="Demostacks visible only to you will appear here."
                />
              </TabsContent>
              <TabsContent value="archive">
                <EmptyState
                  title="Archive is empty"
                  description="Archived Demostacks will appear here."
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="screenshots">
            <EmptyState
              title="No screenshots yet"
              description="Create a screenshot to see it in this workspace."
              className="mt-10"
            />
          </TabsContent>
        </main>
      </Tabs>
    </TooltipProvider>
  );
}

function PrimaryTab({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className="data-active:bg-primary/10 data-active:text-primary flex-none rounded-lg px-3 data-active:shadow-none!"
    >
      {children}
    </TabsTrigger>
  );
}

type DemostacksToolbarProps = {
  sort: SortMode;
  setSort: (sort: SortMode) => void;
  selectedAuthors: string[];
  setSelectedAuthors: (authors: string[]) => void;
  view: ViewMode;
  setView: (view: ViewMode) => void;
};

function DemostacksToolbar({
  sort,
  setSort,
  selectedAuthors,
  setSelectedAuthors,
  view,
  setView,
}: DemostacksToolbarProps) {
  function toggleAuthor(author: string, checked: boolean) {
    setSelectedAuthors(
      checked
        ? [...selectedAuthors, author]
        : selectedAuthors.filter((item) => item !== author),
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 border-b lg:flex-row lg:items-end lg:justify-between">
      <TabsList variant="line">
        <WorkspaceTab value="shared" icon={Users}>
          <span className="sm:hidden">Team</span>
          <span className="hidden sm:inline">Shared with Team</span>
        </WorkspaceTab>
        <WorkspaceTab value="personal" icon={UserRound}>
          Personal
        </WorkspaceTab>
        <WorkspaceTab value="archive" icon={Archive}>
          Archive
        </WorkspaceTab>
      </TabsList>

      <div className="flex w-full flex-wrap items-center gap-2 pb-3 lg:w-auto lg:gap-3 lg:pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="bg-card text-muted-foreground shadow-border mr-auto rounded-xl border-0"
            >
              <ArrowDownWideNarrow className="size-5" />
              {sortLabels[sort]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuRadioGroup
              value={sort}
              onValueChange={(value) => setSort(value as SortMode)}
            >
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              {Object.entries(sortLabels).map(([value, label]) => (
                <DropdownMenuRadioItem key={value} value={value}>
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                'bg-card text-muted-foreground shadow-border rounded-xl border-0',
                selectedAuthors.length && 'bg-muted',
              )}
              aria-label="Filter by creator"
            >
              <Filter className="size-5" />
              <span className="hidden sm:inline">Filter</span>
              {selectedAuthors.length > 0 && (
                <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs">
                  {selectedAuthors.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filter by creator</DropdownMenuLabel>
              {demostackAuthors.map((author) => (
                <DropdownMenuCheckboxItem
                  key={author}
                  checked={selectedAuthors.includes(author)}
                  onCheckedChange={(checked) => toggleAuthor(author, checked)}
                >
                  {author}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
            {selectedAuthors.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedAuthors([])}>
                  Clear filters
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon-lg"
              className="bg-card text-muted-foreground shadow-border rounded-xl border-0"
              aria-label="Folder options"
            >
              <FolderPlus className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>
              <FolderPlus />
              New folder
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderInput />
              Manage folders
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon-lg"
          className={cn(
            'bg-card text-muted-foreground shadow-border rounded-xl border-0',
            view === 'list' && 'bg-muted',
          )}
          aria-label={view === 'grid' ? 'Use list view' : 'Use grid view'}
          onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
        >
          {view === 'grid' ? (
            <List className="size-5" />
          ) : (
            <Grid2X2 className="size-5" />
          )}
        </Button>
      </div>
    </div>
  );
}

function WorkspaceTab({
  value,
  icon: Icon,
  children,
}: {
  value: string;
  icon: typeof Users;
  children: ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className="data-active:text-primary data-active:after:bg-primary px-2 text-sm sm:px-4 sm:text-base"
    >
      <Icon className="size-4 sm:size-5" />
      {children}
    </TabsTrigger>
  );
}

function DemostackCollection({
  demos,
  view,
}: {
  demos: Demostack[];
  view: ViewMode;
}) {
  if (!demos.length) {
    return (
      <EmptyState
        title="No matching Demostacks"
        description="Clear or change the active creator filters."
      />
    );
  }

  return (
    <section
      className={cn(
        view === 'grid'
          ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4'
          : 'space-y-3',
      )}
    >
      {demos.map((demostack) => (
        <article
          key={demostack.id}
          className={cn(
            'group min-w-0 cursor-pointer',
            view === 'list' &&
              'hover:bg-muted/40 flex w-full max-w-full items-center gap-3 overflow-hidden rounded-2xl border p-3 transition sm:gap-4',
          )}
        >
          <div
            className={cn(
              'relative aspect-video overflow-hidden rounded-2xl border',
              view === 'list' && 'w-2/5 max-w-44 shrink-0',
            )}
          >
            <img
              src={demostack.image}
              alt=""
              width={1280}
              height={720}
              className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
            />
          </div>

          <div
            className={cn(
              'min-w-0 space-y-2',
              view === 'grid' ? 'mt-4' : 'flex-1',
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="group-hover:text-primary truncate font-medium transition-colors">
                  {demostack.title}
                </h3>
              </div>
              <CardMenu title={demostack.title} />
            </div>
            <div className="text-muted-foreground flex min-w-0 items-center gap-2 text-xs">
              <Avatar size="sm" className="shrink-0">
                <AvatarImage src={demostack.avatar} alt={demostack.author} />
                <AvatarFallback>{getInitials(demostack.author)}</AvatarFallback>
              </Avatar>
              <span className="truncate">{demostack.author}</span>
              <span aria-hidden>·</span>
              <time className="shrink-0" dateTime="2026-03-02">
                Mar 02
              </time>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function CardMenu({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground rounded-full"
          aria-label={`More options for ${title}`}
        >
          <EllipsisVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem>
          <ExternalLink />
          Open
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FolderInput />
          Move to folder
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Archive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-muted/40 flex min-h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 text-center',
        className,
      )}
    >
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
