import { useState, type CSSProperties } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  ChevronsUpDown,
  Copy,
  EllipsisVertical,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { buttonVariants, Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { AddIcon } from "../../../assets/icons";
import type { EstimateLineItem, EstimateSection } from "../../../data";

type EstimatesContentProps = {
  sections: EstimateSection[];
};

type SortDirection = "none" | "ascending" | "descending";

type SortableRowData =
  | {
      type: "section";
      sectionId: string;
      number: string;
      label: string;
    }
  | {
      type: "item";
      sectionId: string;
      itemId: string;
      number: string;
      label: string;
    };

const columnCount = 10;
const estimateUnits = ["LS", "EA", "HR", "SF"] as const;
const tableHeaderClassName =
  "h-12 px-4 text-sm font-normal text-muted-foreground first:rounded-l-xl last:rounded-r-xl";
const tableCellClassName = "px-4 py-0";
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const matchingRowCollision: CollisionDetection = (args) => {
  const activeType = args.active.data.current?.type;
  const matchingContainers = args.droppableContainers.filter(
    (container) => container.data.current?.type === activeType,
  );

  return closestCenter({
    ...args,
    droppableContainers: matchingContainers,
  });
};

export function EstimatesContent({ sections }: EstimatesContentProps) {
  const [estimateSections, setEstimateSections] = useState(sections);
  const [collapsedSectionIds, setCollapsedSectionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("none");
  const [activeRow, setActiveRow] = useState<SortableRowData | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function toggleSection(sectionId: string) {
    setCollapsedSectionIds((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  function sortByName() {
    const nextDirection =
      sortDirection === "ascending" ? "descending" : "ascending";
    const multiplier = nextDirection === "ascending" ? 1 : -1;

    setEstimateSections((current) =>
      current.map((section) => ({
        ...section,
        items: [...section.items].sort(
          (a, b) => a.name.localeCompare(b.name) * multiplier,
        ),
      })),
    );
    setSortDirection(nextDirection);
  }

  function updateItemUnit(sectionId: string, itemId: string, unit: string) {
    setEstimateSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, unit } : item,
              ),
            }
          : section,
      ),
    );
  }

  function addLineItem(sectionId: string) {
    const newItem: EstimateLineItem = {
      id: crypto.randomUUID(),
      name: "New line item",
      quantity: 1,
      unit: "LS",
      unitCost: 0,
      marginPercent: 0,
    };

    setEstimateSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section,
      ),
    );
    setCollapsedSectionIds((current) => {
      const next = new Set(current);
      next.delete(sectionId);
      return next;
    });
    setSortDirection("none");
  }

  function duplicateLineItem(sectionId: string, itemId: string) {
    setEstimateSections((current) =>
      current.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        const itemIndex = section.items.findIndex(({ id }) => id === itemId);
        const sourceItem = section.items[itemIndex];
        if (!sourceItem) {
          return section;
        }

        const duplicate: EstimateLineItem = {
          ...sourceItem,
          id: crypto.randomUUID(),
          name: `${sourceItem.name} copy`,
        };
        const nextItems = [...section.items];
        nextItems.splice(itemIndex + 1, 0, duplicate);

        return { ...section, items: nextItems };
      }),
    );
    setSortDirection("none");
  }

  function deleteLineItem(sectionId: string, itemId: string) {
    setEstimateSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter(({ id }) => id !== itemId),
            }
          : section,
      ),
    );
    setSortDirection("none");
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveRow(event.active.data.current as SortableRowData);
  }

  function handleDragEnd(event: DragEndEvent) {
    const activeData = event.active.data.current as
      | SortableRowData
      | undefined;
    const overData = event.over?.data.current as SortableRowData | undefined;

    setActiveRow(null);

    if (!activeData || !overData || event.active.id === event.over?.id) {
      return;
    }

    if (activeData.type === "section" && overData.type === "section") {
      setEstimateSections((current) => {
        const oldIndex = current.findIndex(
          ({ id }) => id === activeData.sectionId,
        );
        const newIndex = current.findIndex(
          ({ id }) => id === overData.sectionId,
        );
        return arrayMove(current, oldIndex, newIndex);
      });
      setSortDirection("none");
      return;
    }

    if (
      activeData.type === "item" &&
      overData.type === "item" &&
      activeData.sectionId === overData.sectionId
    ) {
      setEstimateSections((current) =>
        current.map((section) => {
          if (section.id !== activeData.sectionId) {
            return section;
          }

          const oldIndex = section.items.findIndex(
            ({ id }) => id === activeData.itemId,
          );
          const newIndex = section.items.findIndex(
            ({ id }) => id === overData.itemId,
          );

          return {
            ...section,
            items: arrayMove(section.items, oldIndex, newIndex),
          };
        }),
      );
      setSortDirection("none");
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={matchingRowCollision}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragCancel={() => setActiveRow(null)}
      onDragEnd={handleDragEnd}
    >
      <Table
        className="min-w-[56rem] table-fixed text-sm sm:text-base"
      >
        <colgroup>
          <col className="w-[8%]" />
          <col className="w-[15%]" />
          <col className="w-[11%]" />
          <col className="w-[15%]" />
          <col className="w-[7%]" />
          <col className="w-[8%]" />
          <col className="w-[11%]" />
          <col className="w-[8%]" />
          <col className="w-[9%]" />
          <col className="w-[8%]" />
        </colgroup>
        <TableHeader className="[&_tr]:border-0">
          <TableRow className="bg-muted hover:bg-muted!">
            <TableHead className={tableHeaderClassName}>#</TableHead>
            <TableHead
              aria-sort={sortDirection}
              className={tableHeaderClassName}
            >
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2 h-8 px-2 font-normal text-muted-foreground hover:bg-transparent"
                onClick={sortByName}
                aria-label={`Sort by name ${
                  sortDirection === "ascending" ? "descending" : "ascending"
                }`}
              >
                Name
                <ChevronsUpDown className="size-4" />
              </Button>
            </TableHead>
            <TableHead className={tableHeaderClassName}>CSI Code</TableHead>
            <TableHead className={tableHeaderClassName}>Description</TableHead>
            <TableHead className={cn(tableHeaderClassName, "text-right")}>
              Qty
            </TableHead>
            <TableHead className={tableHeaderClassName}>Unit</TableHead>
            <TableHead className={cn(tableHeaderClassName, "text-right")}>
              Unit Cost
            </TableHead>
            <TableHead className={cn(tableHeaderClassName, "text-right")}>
              Margin
            </TableHead>
            <TableHead className={cn(tableHeaderClassName, "text-right")}>
              Profit
            </TableHead>
            <TableHead className={cn(tableHeaderClassName, "text-center")}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <SortableContext
          items={estimateSections.map(({ id }) => sectionSortableId(id))}
          strategy={verticalListSortingStrategy}
        >
          {estimateSections.map((section, sectionIndex) => (
            <SortableEstimateSection
              key={section.id}
              section={section}
              sectionIndex={sectionIndex}
              collapsed={collapsedSectionIds.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              onAddItem={() => addLineItem(section.id)}
              onUnitChange={(itemId, unit) =>
                updateItemUnit(section.id, itemId, unit)
              }
              onDuplicateItem={(itemId) =>
                duplicateLineItem(section.id, itemId)
              }
              onDeleteItem={(itemId) =>
                deleteLineItem(section.id, itemId)
              }
            />
          ))}
        </SortableContext>
      </Table>

      <DragOverlay dropAnimation={{ duration: 200, easing: "ease-out" }}>
        {activeRow ? <EstimateDragPreview row={activeRow} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
type SortableEstimateSectionProps = {
  section: EstimateSection;
  sectionIndex: number;
  collapsed: boolean;
  onToggle: () => void;
  onAddItem: () => void;
  onUnitChange: (itemId: string, unit: string) => void;
  onDuplicateItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
};

function SortableEstimateSection({
  section,
  sectionIndex,
  collapsed,
  onToggle,
  onAddItem,
  onUnitChange,
  onDuplicateItem,
  onDeleteItem,
}: SortableEstimateSectionProps) {
  const sectionNumber = sectionIndex + 1;
  const nextLineNumber = `${sectionNumber}.${section.items.length + 1}`;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sectionSortableId(section.id),
    data: {
      type: "section",
      sectionId: section.id,
      number: String(sectionNumber),
      label: section.name,
    } satisfies SortableRowData,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <TableBody
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-35")}
    >
      <TableRow
        aria-hidden="true"
        className="h-3 border-0 hover:bg-transparent!"
      >
        <TableCell className="p-0" colSpan={columnCount} />
      </TableRow>
      <TableRow
        className="cursor-pointer border-0 bg-muted/70 hover:bg-muted/70!"
        role="button"
        tabIndex={0}
        aria-expanded={!collapsed}
        aria-label={`${collapsed ? "Expand" : "Collapse"} ${
          section.name
        } section`}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (
            event.target === event.currentTarget &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            onToggle();
          }
        }}
      >
        <TableCell className="h-12 rounded-l-xl px-4 py-0">
          <span className="flex items-center gap-1">
            <button
              ref={setActivatorNodeRef}
              type="button"
              className="flex size-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
              {...attributes}
              {...listeners}
              onClick={(event) => event.stopPropagation()}
              aria-label={`Reorder ${section.name} section`}
            >
              <GripVertical className="size-5" />
            </button>
            <span className="font-medium tabular-nums">{sectionNumber}</span>
          </span>
        </TableCell>
        <TableCell
          className="h-12 rounded-r-xl px-4 py-0 font-semibold"
          colSpan={columnCount - 1}
        >
          <span className="flex items-center justify-between gap-4">
            <span className="truncate">{section.name}</span>
            <span
              className="flex size-6 shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  collapsed && "-rotate-90",
                )}
              />
            </span>
          </span>
        </TableCell>
      </TableRow>

      {!collapsed && (
        <SortableContext
          items={section.items.map(({ id }) =>
            itemSortableId(section.id, id),
          )}
          strategy={verticalListSortingStrategy}
        >
          {section.items.map((item, itemIndex) => (
            <SortableEstimateItemRow
              key={item.id}
              item={item}
              sectionId={section.id}
              number={`${sectionNumber}.${itemIndex + 1}`}
              onUnitChange={(unit) => onUnitChange(item.id, unit)}
              onDuplicate={() => onDuplicateItem(item.id)}
              onDelete={() => onDeleteItem(item.id)}
            />
          ))}
        </SortableContext>
      )}

      {!collapsed && (
        <TableRow className="h-16 hover:bg-transparent!">
          <TableCell
            className={cn(
              tableCellClassName,
              "font-medium text-muted-foreground tabular-nums",
            )}
          >
            {nextLineNumber}
          </TableCell>
          <TableCell className={tableCellClassName} colSpan={columnCount - 1}>
            <Button
              variant="link"
              size="sm"
              className="px-0"
              onClick={onAddItem}
            >
              Add line item
              <AddIcon className="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

type SortableEstimateItemRowProps = {
  item: EstimateLineItem;
  sectionId: string;
  number: string;
  onUnitChange: (unit: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

function SortableEstimateItemRow({
  item,
  sectionId,
  number,
  onUnitChange,
  onDuplicate,
  onDelete,
}: SortableEstimateItemRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: itemSortableId(sectionId, item.id),
    data: {
      type: "item",
      sectionId,
      itemId: item.id,
      number,
      label: item.name,
    } satisfies SortableRowData,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    zIndex: isDragging ? 2 : undefined,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(
        "h-16 hover:bg-transparent! has-aria-expanded:bg-transparent!",
        isDragging && "opacity-35",
      )}
    >
      <TableCell className={tableCellClassName}>
        <span className="flex items-center gap-1">
          <button
            ref={setActivatorNodeRef}
            type="button"
            className="flex size-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
            {...attributes}
            {...listeners}
            aria-label={`Reorder ${item.name} line item`}
          >
            <GripVertical className="size-5" />
          </button>
          <span className="font-medium tabular-nums">{number}</span>
        </span>
      </TableCell>
      <TableCell className={cn(tableCellClassName, "font-medium")}>
        {item.name}
      </TableCell>
      <TableCell className={cn(tableCellClassName, "text-muted-foreground")}>
        {item.csiCode ?? "Not set"}
      </TableCell>
      <TableCell
        className={cn(tableCellClassName, "truncate text-muted-foreground")}
        title={item.description}
      >
        {item.description ?? "No description"}
      </TableCell>
      <TableCell
        className={cn(tableCellClassName, "text-right tabular-nums")}
      >
        {item.quantity.toFixed(2)}
      </TableCell>
      <TableCell className={tableCellClassName}>
        <Select
          value={item.unit}
          onValueChange={(unit) => unit && onUnitChange(unit)}
        >
          <SelectTrigger
            size="sm"
            className="-mx-2 w-18 border-transparent bg-transparent shadow-none hover:bg-muted"
            aria-label={`Unit for ${item.name}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" className="min-w-20">
            {estimateUnits.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell
        className={cn(tableCellClassName, "text-right tabular-nums")}
      >
        {currencyFormatter.format(item.unitCost)}
      </TableCell>
      <TableCell
        className={cn(tableCellClassName, "text-right tabular-nums")}
      >
        {item.marginPercent}%
      </TableCell>
      <TableCell
        className={cn(
          tableCellClassName,
          "text-right font-medium tabular-nums",
        )}
      >
        {currencyFormatter.format(calculateProfit(item))}
      </TableCell>
      <TableCell className={cn(tableCellClassName, "text-center")}>
        <LineItemActions
          itemName={item.name}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}

function LineItemActions({
  itemName,
  onDuplicate,
  onDelete,
}: {
  itemName: string;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "rounded-full text-muted-foreground",
        )}
        aria-label={`Actions for ${itemName}`}
      >
        <EllipsisVertical className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>
          <Pencil />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>
          <Copy />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EstimateDragPreview({ row }: { row: SortableRowData }) {
  return (
    <div className="flex min-w-72 items-center gap-3 rounded-xl bg-card px-4 py-3 text-sm shadow-lg ring-1 ring-foreground/10">
      <GripVertical className="size-5 shrink-0 text-muted-foreground" />
      <span className="font-medium tabular-nums">{row.number}</span>
      <span className="truncate font-medium">{row.label}</span>
    </div>
  );
}

function sectionSortableId(sectionId: string) {
  return `section:${sectionId}`;
}

function itemSortableId(sectionId: string, itemId: string) {
  return `item:${sectionId}:${itemId}`;
}

function calculateProfit(item: EstimateLineItem) {
  const totalCost = item.quantity * item.unitCost;
  const marginRate = item.marginPercent / 100;

  if (marginRate <= 0 || marginRate >= 1) {
    return 0;
  }

  return totalCost / (1 - marginRate) - totalCost;
}
