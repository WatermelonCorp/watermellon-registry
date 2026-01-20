"use client";

import * as React from "react";


export const DEFAULT_LOCALE = "en-US" as const;

function isNumericFormat(format?: FormatConfig): boolean {
  const kind = format?.kind;
  return (
    kind === "number" ||
    kind === "currency" ||
    kind === "percent" ||
    kind === "delta"
  );
}

function getAlignmentClass(
  align?: "left" | "right" | "center",
): string | undefined {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return undefined;
}

const DataTableContext = React.createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataTableContextValue<any> | undefined
>(undefined);

export function useDataTable<T extends object = RowData>() {
  const context = React.useContext(DataTableContext) as
    | DataTableContextValue<T>
    | undefined;
  if (!context) {
    throw new Error("useDataTable must be used within a DataTable");
  }
  return context;
}

export function DataTable<T extends object = RowData>({
  columns,
  data: rawData,
  rowIdKey,
  layout = "auto",
  defaultSort,
  sort: controlledSort,
  emptyMessage = "No data available",
  isLoading = false,
  maxHeight,
  id,
  onSortChange,
  className,
  locale,
  responseActions,
  onResponseAction,
  onBeforeResponseAction,
}: DataTableProps<T>) {
  // Default locale avoids SSR/client formatting mismatches.
  const resolvedLocale = locale ?? DEFAULT_LOCALE;

  const [internalSortBy, setInternalSortBy] = React.useState<
    ColumnKey<T> | undefined
  >(defaultSort?.by);
  const [internalSortDirection, setInternalSortDirection] = React.useState<
    "asc" | "desc" | undefined
  >(defaultSort?.direction);

  const sortBy = controlledSort?.by ?? internalSortBy;
  const sortDirection = controlledSort?.direction ?? internalSortDirection;

  const data = React.useMemo(() => {
    if (!sortBy || !sortDirection) return rawData;
    return sortData(rawData, sortBy, sortDirection, resolvedLocale);
  }, [rawData, sortBy, sortDirection, resolvedLocale]);

  const handleSort = React.useCallback(
    (key: ColumnKey<T>) => {
      let newDirection: "asc" | "desc" | undefined;

      if (sortBy === key) {
        if (sortDirection === "asc") {
          newDirection = "desc";
        } else if (sortDirection === "desc") {
          newDirection = undefined;
        } else {
          newDirection = "asc";
        }
      } else {
        newDirection = "asc";
      }

      const next = {
        by: newDirection ? key : undefined,
        direction: newDirection,
      } as const;

      if (controlledSort) {
        onSortChange?.(next);
      } else {
        setInternalSortBy(next.by);
        setInternalSortDirection(next.direction);
      }
    },
    [sortBy, sortDirection, controlledSort, onSortChange],
  );

  const contextValue: DataTableContextValue<T> = {
    columns,
    data,
    rowIdKey,
    sortBy,
    sortDirection,
    toggleSort: handleSort,
    id,
    isLoading,
    locale: resolvedLocale,
  };

  const sortAnnouncement = React.useMemo(() => {
    const col = columns.find((c) => c.key === sortBy);
    const label = col?.label ?? sortBy;
    return sortBy && sortDirection
      ? `Sorted by ${label}, ${sortDirection === "asc" ? "ascending" : "descending"}`
      : "";
  }, [columns, sortBy, sortDirection]);

  const normalizedFooterActions = React.useMemo(
    () => normalizeActionsConfig(responseActions),
    [responseActions],
  );

  return (
    <DataTableContext.Provider value={contextValue}>
      <div
        className={cn("@container w-full min-w-80", className)}
        data-tool-ui-id={id}
        data-slot="data-table"
        data-layout={layout}
      >
        <div
          className={cn(
            layout === "table"
              ? "block"
              : layout === "cards"
                ? "hidden"
                : "hidden @md:block",
          )}
        >
          <div className="relative">
            <div
              className={cn(
                "bg-card relative w-full overflow-clip overflow-y-auto rounded-lg border",
                "touch-pan-x",
                maxHeight && "max-h-[--max-height]",
              )}
              style={
                maxHeight
                  ? ({ "--max-height": maxHeight } as React.CSSProperties)
                  : undefined
              }
            >
              <DataTableErrorBoundary>
                <Table aria-busy={isLoading || undefined}>
                  {columns.length > 0 && (
                    <colgroup>
                      {columns.map((col) => (
                        <col
                          key={String(col.key)}
                          style={col.width ? { width: col.width } : undefined}
                        />
                      ))}
                    </colgroup>
                  )}
                  {isLoading ? (
                    <DataTableSkeleton />
                  ) : data.length === 0 ? (
                    <DataTableEmpty message={emptyMessage} />
                  ) : (
                    <DataTableContent />
                  )}
                </Table>
              </DataTableErrorBoundary>
            </div>
          </div>
        </div>

        <div
          className={cn(
            layout === "cards"
              ? ""
              : layout === "table"
                ? "hidden"
                : "@md:hidden",
          )}
          role="list"
          aria-label="Data table (mobile card view)"
          aria-describedby="mobile-table-description"
        >
          <div id="mobile-table-description" className="sr-only">
            Table data shown as expandable cards. Each card represents one row.
            {columns.length > 0 &&
              ` Columns: ${columns.map((c) => c.label).join(", ")}.`}
          </div>

          <DataTableErrorBoundary>
            {isLoading ? (
              <DataTableSkeletonCards />
            ) : data.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                {emptyMessage}
              </div>
            ) : (
              <div className="bg-card flex flex-col overflow-hidden rounded-2xl border shadow-xs">
                {data.map((row, i) => {
                  const keyVal = rowIdKey ? row[rowIdKey] : undefined;
                  const rowKey = keyVal != null ? String(keyVal) : String(i);
                  return (
                    <DataTableAccordionCard
                      key={rowKey}
                      row={row as unknown as DataTableRowData}
                      index={i}
                      isFirst={i === 0}
                    />
                  );
                })}
              </div>
            )}
          </DataTableErrorBoundary>
        </div>

        {sortAnnouncement && (
          <div className="sr-only" aria-live="polite">
            {sortAnnouncement}
          </div>
        )}

        {normalizedFooterActions ? (
          <div className="@container/actions mt-4">
            <ActionButtons
              actions={normalizedFooterActions.items}
              align={normalizedFooterActions.align}
              confirmTimeout={normalizedFooterActions.confirmTimeout}
              onAction={(id) => onResponseAction?.(id)}
              onBeforeAction={onBeforeResponseAction}
            />
          </div>
        ) : null}
      </div>
    </DataTableContext.Provider>
  );
}

function DataTableContent() {
  return (
    <>
      <DataTableHeader />
      <DataTableBody />
    </>
  );
}

function DataTableEmpty({ message }: { message: string }) {
  const { columns } = useDataTable();

  return (
    <TableBody>
      <TableRow className="bg-card h-24 text-center">
        <TableCell colSpan={columns.length} role="status" aria-live="polite">
          {message}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

function DataTableSkeleton() {
  const { columns } = useDataTable();

  return (
    <>
      <DataTableHeader />
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            {columns.map((_, j) => (
              <TableCell key={j}>
                <div className="bg-muted/50 h-4 rounded motion-safe:animate-pulse" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

function DataTableSkeletonCards() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
          <div className="bg-muted/50 h-5 w-1/2 rounded motion-safe:animate-pulse" />
          <div className="bg-muted/50 h-4 w-3/4 rounded motion-safe:animate-pulse" />
          <div className="bg-muted/50 h-4 w-2/3 rounded motion-safe:animate-pulse" />
        </div>
      ))}
    </>
  );
}

function SortIcon({ state }: { state?: "asc" | "desc" }) {
  let char = "⇅";
  let className = "opacity-20";

  if (state === "asc") {
    char = "↑";
    className = "";
  }

  if (state === "desc") {
    char = "↓";
    className = "";
  }

  return (
    <span aria-hidden className={cn("min-w-4 shrink-0 text-center", className)}>
      {char}
    </span>
  );
}

function DataTableHeader() {
  const { columns } = useDataTable();

  return (
    <TooltipProvider delayDuration={300}>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {columns.map((column, columnIndex) => (
            <DataTableHead
              key={column.key}
              column={column}
              columnIndex={columnIndex}
              totalColumns={columns.length}
            />
          ))}
        </TableRow>
      </TableHeader>
    </TooltipProvider>
  );
}

interface DataTableHeadProps {
  column: Column;
  columnIndex?: number;
  totalColumns?: number;
}

function DataTableHead({
  column,
  columnIndex = 0,
  totalColumns = 1,
}: DataTableHeadProps) {
  const { sortBy, sortDirection, toggleSort, isLoading } = useDataTable();
  const isFirstColumn = columnIndex === 0;
  const isLastColumn = columnIndex === totalColumns - 1;

  const isSortable = column.sortable !== false;

  const isSorted = sortBy === column.key;
  const direction = isSorted ? sortDirection : undefined;
  const isDisabled = isLoading || !isSortable;

  const handleClick = () => {
    if (!isDisabled && toggleSort) {
      toggleSort(column.key);
    }
  };

  const displayText = column.abbr || column.label;
  const shouldShowTooltip = column.abbr || displayText.length > 15;
  const isNumericKind = isNumericFormat(column.format);
  const align =
    column.align ??
    (columnIndex === 0 ? "left" : isNumericKind ? "right" : "left");
  const alignClass = getAlignmentClass(align);
  const buttonAlignClass = cn(
    "min-w-0 gap-1 font-normal",
    align === "right" && "text-right",
    align === "center" && "text-center",
    align === "left" && "text-left",
  );
  const labelAlignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <TableHead
      scope="col"
      className={cn(
        alignClass,
        isFirstColumn && "pl-1",
        isLastColumn && "pr-1",
      )}
      style={column.width ? { width: column.width } : undefined}
      aria-sort={
        isSorted
          ? direction === "asc"
            ? "ascending"
            : "descending"
          : undefined
      }
    >
      <Button
        type="button"
        size="sm"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (isDisabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        disabled={isDisabled}
        variant="ghost"
        className={cn(
          buttonAlignClass,
          "w-fit min-w-10",
          isFirstColumn && "pl-4",
          isLastColumn && "pr-4",
        )}
        aria-label={
          `Sort by ${column.label}` +
          (isSorted && direction
            ? ` (${direction === "asc" ? "ascending" : "descending"})`
            : "")
        }
        aria-disabled={isDisabled || undefined}
      >
        {shouldShowTooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={cn("truncate", labelAlignClass)}>
                {column.abbr ? (
                  <abbr
                    title={column.label}
                    className={cn(
                      "cursor-help border-b border-dotted border-current no-underline",
                      labelAlignClass,
                    )}
                  >
                    {column.abbr}
                  </abbr>
                ) : (
                  <span className={labelAlignClass}>{column.label}</span>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{column.label}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className={cn("truncate", labelAlignClass)}>
            {column.label}
          </span>
        )}
        {isSortable && <SortIcon state={direction} />}
      </Button>
    </TableHead>
  );
}

function DataTableBody() {
  const { data, rowIdKey } = useDataTable<DataTableRowData>();
  const hasWarnedRowKeyRef = React.useRef(false);

  React.useEffect(() => {
    if (hasWarnedRowKeyRef.current) return;
    if (process.env.NODE_ENV !== "production" && !rowIdKey && data.length > 0) {
      hasWarnedRowKeyRef.current = true;
      console.warn(
        "[DataTable] Missing `rowIdKey` prop. Using array index as React key can cause reconciliation issues when data reorders (focus traps, animation glitches, incorrect state preservation). " +
          "Strongly recommended: Pass a `rowIdKey` prop that points to a unique identifier in your row data (e.g., 'id', 'uuid', 'symbol').\n" +
          'Example: <DataTable rowIdKey="id" columns={...} data={...} />',
      );
    }
  }, [rowIdKey, data.length]);

  return (
    <TableBody>
      {data.map((row, index) => {
        const keyVal = rowIdKey ? row[rowIdKey] : undefined;
        const rowKey = keyVal != null ? String(keyVal) : String(index);
        return <DataTableRow key={rowKey} row={row} />;
      })}
    </TableBody>
  );
}

interface DataTableRowProps {
  row: DataTableRowData;
  className?: string;
}

function DataTableRow({ row, className }: DataTableRowProps) {
  const { columns } = useDataTable();

  return (
    <TableRow className={className}>
      {columns.map((column, columnIndex) => (
        <DataTableCell
          key={column.key}
          value={row[column.key]}
          column={column}
          row={row}
          columnIndex={columnIndex}
        />
      ))}
    </TableRow>
  );
}

interface DataTableCellProps {
  value:
    | string
    | number
    | boolean
    | null
    | (string | number | boolean | null)[];
  column: Column;
  row: DataTableRowData;
  className?: string;
  columnIndex?: number;
}

function DataTableCell({
  value,
  column,
  row,
  className,
  columnIndex = 0,
}: DataTableCellProps) {
  const { locale } = useDataTable();
  const isNumericKind = isNumericFormat(column.format);
  const isNumericValue = typeof value === "number";
  const displayValue = renderFormattedValue({ value, column, row, locale });
  const align =
    column.align ??
    (columnIndex === 0
      ? "left"
      : isNumericKind || isNumericValue
        ? "right"
        : "left");
  const alignClass = getAlignmentClass(align);

  return (
    <TableCell className={cn("px-5 py-3", alignClass, className)}>
      {displayValue}
    </TableCell>
  );
}

function categorizeColumns(columns: Column[]) {
  const primary: Column[] = [];
  const secondary: Column[] = [];

  let visibleColumnCount = 0;
  columns.forEach((col) => {
    if (col.hideOnMobile) return;

    if (col.priority === "primary") {
      primary.push(col);
    } else if (col.priority === "secondary") {
      secondary.push(col);
    } else if (col.priority === "tertiary") {
      return;
    } else {
      if (visibleColumnCount < 2) {
        primary.push(col);
      } else {
        secondary.push(col);
      }
      visibleColumnCount++;
    }
  });

  return { primary, secondary };
}

interface DataTableAccordionCardProps {
  row: DataTableRowData;
  index: number;
  isFirst?: boolean;
}

function DataTableAccordionCard({
  row,
  index,
  isFirst = false,
}: DataTableAccordionCardProps) {
  const { columns, locale, rowIdKey } = useDataTable();

  const { primary, secondary } = React.useMemo(
    () => categorizeColumns(columns),
    [columns],
  );

  if (secondary.length === 0) {
    return (
      <SimpleCard row={row} columns={primary} index={index} isFirst={isFirst} />
    );
  }

  const primaryColumn = primary[0];
  const remainingPrimaryColumns = primary.slice(1);

  const stableRowId =
    getRowIdentifier(row, rowIdKey ? String(rowIdKey) : undefined) ||
    `${index}-${primaryColumn?.key ?? "row"}`;

  const headingId = `row-${stableRowId}-heading`;
  const detailsId = `row-${stableRowId}-details`;
  const remainingPrimaryDataIds = remainingPrimaryColumns.map(
    (col) => `row-${stableRowId}-${String(col.key)}`,
  );

  const primaryValue = primaryColumn
    ? String(row[primaryColumn.key] ?? "")
    : "";
  const rowLabel = `Row ${index + 1}: ${primaryValue}`;
  const accordionItemId = `row-${stableRowId}`;

  return (
    <Accordion
      type="single"
      collapsible
      className={cn(!isFirst && "border-t")}
      role="listitem"
      aria-label={rowLabel}
    >
      <AccordionItem value={accordionItemId} className="group border-0">
        <AccordionTrigger
          className="group-data-[state=closed]:hover:bg-accent/50 active:bg-accent/50 group-data-[state=open]:bg-muted w-full rounded-none px-4 py-3 hover:no-underline"
          aria-controls={detailsId}
          aria-label={`${rowLabel}. ${secondary.length > 0 ? "Expand for details" : ""}`}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {primaryColumn && (
              <div
                id={headingId}
                role="heading"
                aria-level={3}
                className="truncate"
                aria-label={`${primaryColumn.label}: ${row[primaryColumn.key]}`}
              >
                {renderFormattedValue({
                  value: row[primaryColumn.key],
                  column: primaryColumn,
                  row,
                  locale,
                })}
              </div>
            )}

            {remainingPrimaryColumns.length > 0 && (
              <div
                className="text-muted-foreground flex w-full flex-wrap gap-x-4 gap-y-0.5"
                role="group"
                aria-label="Summary information"
              >
                {remainingPrimaryColumns.map((col, idx) => (
                  <span
                    key={col.key}
                    id={remainingPrimaryDataIds[idx]}
                    className="flex min-w-0 gap-1 font-normal"
                    role="cell"
                    aria-label={`${col.label}: ${row[col.key]}`}
                  >
                    <span className="sr-only">{col.label}:</span>
                    <span aria-hidden="true">{col.label}:</span>
                    <span className="truncate">
                      {renderFormattedValue({
                        value: row[col.key],
                        column: col,
                        row,
                        locale,
                      })}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent
          className={"flex flex-col gap-4 px-4 pb-4"}
          id={detailsId}
          role="region"
          aria-labelledby={headingId}
        >
          {secondary.length > 0 && (
            <dl
              className={cn(
                "flex flex-col gap-2 pt-4",
                "motion-safe:group-data-[state=open]:animate-in motion-safe:group-data-[state=open]:fade-in-0",
                "motion-safe:group-data-[state=open]:slide-in-from-top-1",
                "motion-safe:group-data-[state=closed]:animate-out motion-safe:group-data-[state=closed]:fade-out-0",
                "motion-safe:group-data-[state=closed]:slide-out-to-top-1",
                "duration-150",
              )}
              role="list"
              aria-label="Additional data"
            >
              {secondary.map((col) => (
                <div
                  key={col.key}
                  className="flex items-start justify-between gap-4"
                  role="listitem"
                >
                  <dt
                    className="text-muted-foreground shrink-0"
                    id={`row-${stableRowId}-${String(col.key)}-label`}
                  >
                    {col.label}
                  </dt>
                  <dd
                    className={cn(
                      "text-foreground min-w-0 text-pretty wrap-break-word",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                    )}
                    role="cell"
                    aria-labelledby={`row-${stableRowId}-${String(col.key)}-label`}
                  >
                    {renderFormattedValue({
                      value: row[col.key],
                      column: col,
                      row,
                      locale,
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/**
 * Simple card with no accordion,   for when there are only primary columns
 */
function SimpleCard({
  row,
  columns,
  index,
  isFirst = false,
}: {
  row: DataTableRowData;
  columns: Column[];
  index: number;
  isFirst?: boolean;
}) {
  const { locale, rowIdKey } = useDataTable();
  const primaryColumn = columns[0];
  const otherColumns = columns.slice(1);

  const stableRowId =
    getRowIdentifier(row, rowIdKey ? String(rowIdKey) : undefined) ||
    `${index}-${primaryColumn?.key ?? "row"}`;

  const primaryValue = primaryColumn
    ? String(row[primaryColumn.key] ?? "")
    : "";
  const rowLabel = `Row ${index + 1}: ${primaryValue}`;

  return (
    <div
      className={cn("flex flex-col gap-2 p-4", !isFirst && "border-t")}
      role="listitem"
      aria-label={rowLabel}
    >
      {primaryColumn && (
        <div
          role="heading"
          aria-level={3}
          aria-label={`${primaryColumn.label}: ${row[primaryColumn.key]}`}
        >
          {renderFormattedValue({
            value: row[primaryColumn.key],
            column: primaryColumn,
            row,
            locale,
          })}
        </div>
      )}

      {otherColumns.map((col) => (
        <div
          key={col.key}
          className="flex items-start justify-between gap-4"
          role="group"
        >
          <span
            className="text-muted-foreground"
            id={`row-${stableRowId}-${String(col.key)}-label`}
          >
            {col.label}:
          </span>
          <span
            className={cn(
              "min-w-0 wrap-break-word",
              col.align === "right" && "text-right",
              col.align === "center" && "text-center",
            )}
            role="cell"
            aria-labelledby={`row-${stableRowId}-${String(col.key)}-label`}
          >
            {renderFormattedValue({
              value: row[col.key],
              column: col,
              row,
              locale,
            })}
          </span>
        </div>
      ))}
    </div>
  );
}


export function DataTableErrorBoundary(
  props: Omit<ToolUIErrorBoundaryProps, "componentName">,
) {
  const { children, ...rest } = props;
  return (
    <ToolUIErrorBoundary componentName="DataTable" {...rest}>
      {children}
    </ToolUIErrorBoundary>
  );
}




export interface ToolUIErrorBoundaryProps {
  componentName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ToolUIErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ToolUIErrorBoundary extends React.Component<
  ToolUIErrorBoundaryProps,
  ToolUIErrorBoundaryState
> {
  constructor(props: ToolUIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ToolUIErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[${this.props.componentName}] render error:`, error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="border-destructive text-destructive rounded-lg border p-4">
            <p className="font-semibold">
              {this.props.componentName} failed to render
            </p>
            <p className="text-sm">{this.state.error?.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}



type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export type FormatConfig =
  | { kind: "text" }
  | {
      kind: "number";
      decimals?: number;
      unit?: string;
      compact?: boolean;
      showSign?: boolean;
    }
  | { kind: "currency"; currency: string; decimals?: number }
  | {
      kind: "percent";
      decimals?: number;
      showSign?: boolean;
      basis?: "fraction" | "unit";
    }
  | { kind: "date"; dateFormat?: "short" | "long" | "relative" }
  | {
      kind: "delta";
      decimals?: number;
      upIsPositive?: boolean;
      showSign?: boolean;
    }
  | {
      kind: "status";
      statusMap: Record<string, { tone: Tone; label?: string }>;
    }
  | { kind: "boolean"; labels?: { true: string; false: string } }
  | { kind: "link"; hrefKey?: string; external?: boolean }
  | { kind: "badge"; colorMap?: Record<string, Tone> }
  | { kind: "array"; maxVisible?: number };

interface DeltaValueProps {
  value: number;
  options?: Extract<FormatConfig, { kind: "delta" }>;
}

export function DeltaValue({ value, options }: DeltaValueProps) {
  const decimals = options?.decimals ?? 2;
  const upIsPositive = options?.upIsPositive ?? true;
  const showSign = options?.showSign ?? true;

  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const isGood = upIsPositive ? isPositive : isNegative;
  const isBad = upIsPositive ? isNegative : isPositive;

  const colorClass = isGood
    ? "text-green-700 dark:text-green-500"
    : isBad
      ? "text-destructive"
      : "text-muted-foreground";

  const formatted = value.toFixed(decimals);
  const display = showSign && !isNegative ? `+${formatted}` : formatted;

  const arrow = isPositive ? "↑" : isNegative ? "↓" : "";

  return (
    <span className={cn("tabular-nums", colorClass)}>
      {display}
      {!isNeutral && <span className="ml-0.5">{arrow}</span>}
    </span>
  );
}

interface StatusBadgeProps {
  value: string;
  options?: Extract<FormatConfig, { kind: "status" }>;
}

export function StatusBadge({ value, options }: StatusBadgeProps) {
  const config = options?.statusMap?.[value] ?? {
    tone: "neutral" as Tone,
    label: value,
  };
  const label = config.label ?? value;

  const variant =
    config.tone === "danger"
      ? "destructive"
      : config.tone === "neutral"
        ? "outline"
        : "secondary";

  return (
    <Badge
      variant={variant}
      className={cn(
        "border",
        config.tone === "warning" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-100",
        config.tone === "success" &&
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-100",
        config.tone === "info" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-100",
        config.tone === "danger" &&
          "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-100",
      )}
    >
      {label}
    </Badge>
  );
}

interface CurrencyValueProps {
  value: number;
  options?: Extract<FormatConfig, { kind: "currency" }>;
  locale?: string;
}

export function CurrencyValue({ value, options, locale }: CurrencyValueProps) {
  const currency = options?.currency ?? "USD";
  const decimals = options?.decimals ?? 2;

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return <span className="tabular-nums">{formatted}</span>;
}

interface PercentValueProps {
  value: number;
  options?: Extract<FormatConfig, { kind: "percent" }>;
}

export function PercentValue({ value, options }: PercentValueProps) {
  const decimals = options?.decimals ?? 2;
  const showSign = options?.showSign ?? false;
  const basis = options?.basis ?? "fraction";

  const numeric = basis === "fraction" ? value * 100 : value;
  const absoluteFormatted = Math.abs(numeric).toFixed(decimals);
  const signed =
    numeric > 0 && showSign
      ? `+${absoluteFormatted}`
      : numeric < 0
        ? `-${absoluteFormatted}`
        : absoluteFormatted;

  return <span className="tabular-nums">{signed}%</span>;
}

interface DateValueProps {
  value: string;
  options?: Extract<FormatConfig, { kind: "date" }>;
  locale?: string;
}

export function DateValue({ value, options, locale }: DateValueProps) {
  const dateFormat = options?.dateFormat ?? "short";
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return <span>Invalid date</span>;
  }

  let formatted: string;

  if (dateFormat === "relative") {
    formatted = getRelativeTime(date, locale);
  } else if (dateFormat === "long") {
    formatted = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } else {
    formatted = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }

  const title = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return (
    <span className="tabular-nums" title={title}>
      {formatted}
    </span>
  );
}

function getRelativeTime(date: Date, locale?: string): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} ${mins === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

interface BooleanValueProps {
  value: boolean;
  options?: Extract<FormatConfig, { kind: "boolean" }>;
}

export function BooleanValue({ value, options }: BooleanValueProps) {
  const labels = options?.labels ?? { true: "Yes", false: "No" };
  const label = value ? labels.true : labels.false;
  const variant = value ? "secondary" : "outline";

  return <Badge variant={variant}>{label}</Badge>;
}

interface LinkValueProps {
  value: string;
  options?: Extract<FormatConfig, { kind: "link" }>;
  row?: Record<
    string,
    string | number | boolean | null | (string | number | boolean | null)[]
  >;
}

export function LinkValue({ value, options, row }: LinkValueProps) {
  const href =
    options?.hrefKey && row ? String(row[options.hrefKey] ?? "") : value;
  const external = options?.external ?? false;

  if (!href) {
    return <span>{value}</span>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-accent-foreground inline-block max-w-full break-words underline underline-offset-2 hover:opacity-90"
      aria-label={external ? `${value} (opens in a new tab)` : undefined}
      onClick={(e) => e.stopPropagation()}
    >
      {value}
      {external && (
        <span className="ml-1 inline-block" aria-label="Opens in new tab">
          ↗
        </span>
      )}
    </a>
  );
}

interface NumberValueProps {
  value: number;
  options?: Extract<FormatConfig, { kind: "number" }>;
  locale?: string;
}

export function NumberValue({ value, options, locale }: NumberValueProps) {
  const decimals = options?.decimals ?? 0;
  const unit = options?.unit ?? "";
  const compact = options?.compact ?? false;
  const showSign = options?.showSign ?? false;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? "compact" : "standard",
  }).format(value);

  const display = showSign && value > 0 ? `+${formatted}` : formatted;

  return (
    <span className="tabular-nums">
      {display}
      {unit}
    </span>
  );
}

interface BadgeValueProps {
  value: string;
  options?: Extract<FormatConfig, { kind: "badge" }>;
}

export function BadgeValue({ value, options }: BadgeValueProps) {
  const tone = options?.colorMap?.[value] ?? "neutral";

  const variant =
    tone === "danger"
      ? "destructive"
      : tone === "neutral"
        ? "outline"
        : "secondary";

  return (
    <Badge
      variant={variant}
      className={cn(
        "border",
        tone === "warning" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-100",
        tone === "success" &&
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-100",
        tone === "info" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-100",
        tone === "danger" &&
          "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-100",
      )}
    >
      {value}
    </Badge>
  );
}

interface ArrayValueProps {
  value: (string | number | boolean | null)[] | string;
  options?: Extract<FormatConfig, { kind: "array" }>;
}

export function ArrayValue({ value, options }: ArrayValueProps) {
  const maxVisible = options?.maxVisible ?? 3;
  const items: (string | number | boolean | null)[] = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",").map((s) => s.trim())
      : [];

  if (items.length === 0) {
    return <span className="text-muted">—</span>;
  }

  const visible = items.slice(0, maxVisible);
  const remaining = items.length - maxVisible;

  const hidden = items.slice(maxVisible);

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {visible.map((item, i) => (
        <span
          key={i}
          className="bg-muted text-muted-foreground inline-flex items-center rounded-md px-2 py-0.5"
        >
          {item === null ? "null" : String(item)}
        </span>
      ))}
      {remaining > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-muted-foreground cursor-default">
              +{remaining} more
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {hidden
              .map((item) => (item === null ? "null" : String(item)))
              .join(", ")}
          </TooltipContent>
        </Tooltip>
      )}
    </span>
  );
}

interface RenderFormattedValueParams {
  value:
    | string
    | number
    | boolean
    | null
    | (string | number | boolean | null)[];
  column: { format?: FormatConfig };
  row?: Record<
    string,
    string | number | boolean | null | (string | number | boolean | null)[]
  >;
  locale?: string;
}

export function renderFormattedValue({
  value,
  column,
  row,
  locale,
}: RenderFormattedValueParams): React.ReactNode {
  if (value == null || value === "") {
    return <span className="text-muted">—</span>;
  }

  const fmt = column.format;

  switch (fmt?.kind) {
    case "delta":
      return <DeltaValue value={Number(value)} options={fmt} />;
    case "status":
      return <StatusBadge value={String(value)} options={fmt} />;
    case "currency":
      return (
        <CurrencyValue value={Number(value)} options={fmt} locale={locale} />
      );
    case "percent":
      return <PercentValue value={Number(value)} options={fmt} />;
    case "date":
      return <DateValue value={String(value)} options={fmt} locale={locale} />;
    case "boolean":
      return <BooleanValue value={Boolean(value)} options={fmt} />;
    case "link":
      return <LinkValue value={String(value)} options={fmt} row={row} />;
    case "number":
      return (
        <NumberValue value={Number(value)} options={fmt} locale={locale} />
      );
    case "badge":
      return <BadgeValue value={String(value)} options={fmt} />;
    case "array":
      return (
        <ArrayValue
          value={Array.isArray(value) ? value : String(value)}
          options={fmt}
        />
      );
    case "text":
    default:
      return String(value);
  }
}


import * as TooltipPrimitive from "@radix-ui/react-tooltip"


function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }


import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";


const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        warning:
          "border-transparent bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 [a&]:hover:bg-amber-500/20 dark:[a&]:hover:bg-amber-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };


export type ActionsProp = ActionsConfig | Action[];

const NEGATORY_ACTION_IDS = new Set([
  "cancel",
  "dismiss",
  "skip",
  "no",
  "reset",
  "close",
  "decline",
  "reject",
  "back",
  "later",
  "not-now",
  "maybe-later",
]);

function inferVariant(action: Action): Action {
  if (action.variant) return action;
  if (NEGATORY_ACTION_IDS.has(action.id)) {
    return { ...action, variant: "ghost" };
  }
  return action;
}

export function normalizeActionsConfig(
  actions?: ActionsProp,
): ActionsConfig | null {
  if (!actions) return null;

  const rawItems = Array.isArray(actions) ? actions : (actions.items ?? []);

  if (rawItems.length === 0) {
    return null;
  }

  const items = rawItems.map(inferVariant);

  return Array.isArray(actions)
    ? { items }
    : {
        items,
        align: actions.align,
        confirmTimeout: actions.confirmTimeout,
      };
}

import type { ReactNode } from "react";

/**
 * Tool UI conventions:
 * - Serializable schemas are JSON-safe (no callbacks/ReactNode/`className`).
 * - Schema: `SerializableXSchema`
 * - Parser: `parseSerializableX(input: unknown)`
 * - Actions: `responseActions`, `onResponseAction`, `onBeforeResponseAction`
 * - Root attrs: `data-tool-ui-id` + `data-slot`
 */

/**
 * Schema for tool UI identity.
 *
 * Every tool UI should have a unique identifier that:
 * - Is stable across re-renders
 * - Is meaningful (not auto-generated)
 * - Is unique within the conversation
 *
 * Format recommendation: `{component-type}-{semantic-identifier}`
 * Examples: "data-table-expenses-q3", "option-list-deploy-target"
 */
export const ToolUIIdSchema = z.string().min(1);

export type ToolUIId = z.infer<typeof ToolUIIdSchema>;

/**
 * Primary role of a Tool UI surface in a chat context.
 */
export const ToolUIRoleSchema = z.enum([
  "information",
  "decision",
  "control",
  "state",
  "composite",
]);

export type ToolUIRole = z.infer<typeof ToolUIRoleSchema>;

export const ToolUIReceiptOutcomeSchema = z.enum([
  "success",
  "partial",
  "failed",
  "cancelled",
]);

export type ToolUIReceiptOutcome = z.infer<typeof ToolUIReceiptOutcomeSchema>;

/**
 * Optional receipt metadata: a durable summary of an outcome.
 */
export const ToolUIReceiptSchema = z.object({
  outcome: ToolUIReceiptOutcomeSchema,
  summary: z.string().min(1),
  identifiers: z.record(z.string(), z.string()).optional(),
  at: z.string().datetime(),
});

export type ToolUIReceipt = z.infer<typeof ToolUIReceiptSchema>;

/**
 * Base schema for Tool UI payloads (id + optional role/receipt).
 */
export const ToolUISurfaceSchema = z.object({
  id: ToolUIIdSchema,
  role: ToolUIRoleSchema.optional(),
  receipt: ToolUIReceiptSchema.optional(),
});

export type ToolUISurface = z.infer<typeof ToolUISurfaceSchema>;

export const ActionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  /**
   * Canonical narration the assistant can use after this action is taken.
   *
   * Example: "I exported the table as CSV." / "I opened the link in a new tab."
   */
  sentence: z.string().optional(),
  confirmLabel: z.string().optional(),
  variant: z
    .enum(["default", "destructive", "secondary", "ghost", "outline"])
    .optional(),
  icon: z.custom<ReactNode>().optional(),
  loading: z.boolean().optional(),
  disabled: z.boolean().optional(),
  shortcut: z.string().optional(),
});

export type Action = z.infer<typeof ActionSchema>;

export const ActionButtonsPropsSchema = z.object({
  actions: z.array(ActionSchema).min(1),
  align: z.enum(["left", "center", "right"]).optional(),
  confirmTimeout: z.number().positive().optional(),
  className: z.string().optional(),
});

export const SerializableActionSchema = ActionSchema.omit({ icon: true });
export const SerializableActionsSchema = ActionButtonsPropsSchema.extend({
  actions: z.array(SerializableActionSchema),
}).omit({ className: true });

export interface ActionsConfig {
  items: Action[];
  align?: "left" | "center" | "right";
  confirmTimeout?: number;
}

export const SerializableActionsConfigSchema = z.object({
  items: z.array(SerializableActionSchema).min(1),
  align: z.enum(["left", "center", "right"]).optional(),
  confirmTimeout: z.number().positive().optional(),
});

export type SerializableActionsConfig = z.infer<
  typeof SerializableActionsConfigSchema
>;

export type SerializableAction = z.infer<typeof SerializableActionSchema>;


import { z } from "zod";

const AlignEnum = z.enum(["left", "right", "center"]);
const PriorityEnum = z.enum(["primary", "secondary", "tertiary"]);
const LayoutEnum = z.enum(["auto", "table", "cards"]);

const formatSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("text") }),
  z.object({
    kind: z.literal("number"),
    decimals: z.number().optional(),
    unit: z.string().optional(),
    compact: z.boolean().optional(),
    showSign: z.boolean().optional(),
  }),
  z.object({
    kind: z.literal("currency"),
    currency: z.string(),
    decimals: z.number().optional(),
  }),
  z.object({
    kind: z.literal("percent"),
    decimals: z.number().optional(),
    showSign: z.boolean().optional(),
    basis: z.enum(["fraction", "unit"]).optional(),
  }),
  z.object({
    kind: z.literal("date"),
    dateFormat: z.enum(["short", "long", "relative"]).optional(),
  }),
  z.object({
    kind: z.literal("delta"),
    decimals: z.number().optional(),
    upIsPositive: z.boolean().optional(),
    showSign: z.boolean().optional(),
  }),
  z.object({
    kind: z.literal("status"),
    statusMap: z.record(
      z.string(),
      z.object({
        tone: z.enum(["success", "warning", "danger", "info", "neutral"]),
        label: z.string().optional(),
      }),
    ),
  }),
  z.object({
    kind: z.literal("boolean"),
    labels: z
      .object({
        true: z.string(),
        false: z.string(),
      })
      .optional(),
  }),
  z.object({
    kind: z.literal("link"),
    hrefKey: z.string().optional(),
    external: z.boolean().optional(),
  }),
  z.object({
    kind: z.literal("badge"),
    colorMap: z
      .record(
        z.string(),
        z.enum(["success", "warning", "danger", "info", "neutral"]),
      )
      .optional(),
  }),
  z.object({
    kind: z.literal("array"),
    maxVisible: z.number().optional(),
  }),
]);

export const serializableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  abbr: z.string().optional(),
  sortable: z.boolean().optional(),
  align: AlignEnum.optional(),
  width: z.string().optional(),
  truncate: z.boolean().optional(),
  priority: PriorityEnum.optional(),
  hideOnMobile: z.boolean().optional(),
  format: formatSchema.optional(),
});

const JsonPrimitiveSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

/**
 * Schema for serializable row data.
 *
 * Supports:
 * - Primitives: string, number, boolean, null
 * - Arrays of primitives: string[], number[], boolean[], or mixed primitive arrays
 *
 * Does NOT support:
 * - Functions
 * - Class instances (Date, Map, Set, etc.)
 * - Plain objects (use format configs instead)
 *
 * @example
 * Valid row data:
 * ```json
 * {
 *   "name": "Widget",
 *   "price": 29.99,
 *   "active": true,
 *   "tags": ["electronics", "featured"],
 *   "metrics": [1.2, 3.4, 5.6],
 *   "flags": [true, false, true],
 *   "mixed": ["label", 42, true]
 * }
 * ```
 */
export const serializableDataSchema = z.record(
  z.string(),
  z.union([JsonPrimitiveSchema, z.array(JsonPrimitiveSchema)]),
);

/**
 * Zod schema for validating DataTable payloads from LLM tool calls.
 *
 * This schema validates the serializable parts of a DataTable:
 * - id: Unique identifier for this tool UI in the conversation
 * - columns: Column definitions (keys, labels, formatting, etc.)
 * - data: Data rows (primitives only - no functions or class instances)
 * - layout: Optional layout override ('auto' | 'table' | 'cards')
 *
 * Non-serializable props like `onSortChange`, `className`, and `isLoading`
 * must be provided separately in your React component.
 *
 * @example
 * ```ts
 * const result = SerializableDataTableSchema.safeParse(llmResponse)
 * if (result.success) {
 *   // result.data contains validated id, columns, and data
 * }
 * ```
 */
export const SerializableDataTableSchema = z.object({
  id: ToolUIIdSchema,
  role: ToolUIRoleSchema.optional(),
  receipt: ToolUIReceiptSchema.optional(),
  columns: z.array(serializableColumnSchema),
  data: z.array(serializableDataSchema),
  layout: LayoutEnum.optional(),
});

/**
 * Type representing the serializable parts of a DataTable payload.
 *
 * This type includes only JSON-serializable data that can come from LLM tool calls:
 * - Column definitions (format configs, alignment, labels, etc.)
 * - Row data (primitives: strings, numbers, booleans, null, string arrays)
 *
 * Excluded from this type:
 * - Event handlers (`onSortChange`, `onResponseAction`)
 * - React-specific props (`className`, `isLoading`, `responseActions`)
 *
 * @example
 * ```ts
 * const payload: SerializableDataTable = {
 *   id: "data-table-expenses",
 *   columns: [
 *     { key: "name", label: "Name" },
 *     { key: "price", label: "Price", format: { kind: "currency", currency: "USD" } }
 *   ],
 *   data: [
 *     { name: "Widget", price: 29.99 }
 *   ]
 * }
 * ```
 */
export type SerializableDataTable = z.infer<typeof SerializableDataTableSchema>;

/**
 * Validates and parses a DataTable payload from unknown data (e.g., LLM tool call result).
 *
 * This function:
 * 1. Validates the input against the `SerializableDataTableSchema`
 * 2. Throws a descriptive error if validation fails
 * 3. Returns typed serializable props ready to pass to the `<DataTable>` component
 *
 * The returned props are **serializable only** - you must provide client-side props
 * separately (onSortChange, isLoading, className, responseActions, onResponseAction).
 *
 * @param input - Unknown data to validate (typically from an LLM tool call)
 * @returns Validated and typed DataTable serializable props (id, columns, data)
 * @throws Error with validation details if input is invalid
 *
 * @example
 * ```tsx
 * function MyToolUI({ result }: { result: unknown }) {
 *   const serializableProps = parseSerializableDataTable(result)
 *
 *   return (
 *     <DataTable
 *       {...serializableProps}
 *       responseActions={[{ id: "export", label: "Export" }]}
 *       onResponseAction={(id) => console.log(id)}
 *     />
 *   )
 * }
 * ```
 */
export function parseSerializableDataTable(
  input: unknown,
): Pick<
  DataTableProps<RowData>,
  "id" | "role" | "receipt" | "columns" | "data" | "layout"
> {
  const { id, role, receipt, columns, data, layout } = parseWithSchema(
    SerializableDataTableSchema,
    input,
    "DataTable",
  );
  return {
    id,
    role,
    receipt,
    columns: columns as unknown as Column<RowData>[],
    data: data as RowData[],
    layout,
  };
}


function formatZodPath(path: Array<string | number | symbol>): string {
  if (path.length === 0) return "root";
  return path
    .map((segment) =>
      typeof segment === "number" ? `[${segment}]` : String(segment),
    )
    .join(".");
}

/**
 * Format Zod errors into a compact `path: message` string.
 */
export function formatZodError(error: z.ZodError): string {
  const parts = error.issues.map((issue) => {
    const path = formatZodPath(issue.path);
    return `${path}: ${issue.message}`;
  });

  return Array.from(new Set(parts)).join("; ");
}

/**
 * Parse unknown input and throw a readable error.
 */
export function parseWithSchema<T>(
  schema: z.ZodType<T>,
  input: unknown,
  name: string,
): T {
  const res = schema.safeParse(input);
  if (!res.success) {
    throw new Error(`Invalid ${name} payload: ${formatZodError(res.error)}`);
  }
  return res.data;
}


export interface ActionButtonsProps {
  actions: Action[];
  onAction: (actionId: string) => void | Promise<void>;
  onBeforeAction?: (actionId: string) => boolean | Promise<boolean>;
  confirmTimeout?: number;
  align?: "left" | "center" | "right";
  className?: string;
}

export function ActionButtons({
  actions,
  onAction,
  onBeforeAction,
  confirmTimeout = 3000,
  align = "right",
  className,
}: ActionButtonsProps) {
  const { actions: resolvedActions, runAction } = useActionButtons({
    actions,
    onAction,
    onBeforeAction,
    confirmTimeout,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        "@sm/actions:flex-row @sm/actions:flex-wrap @sm/actions:items-center @sm/actions:gap-2",
        align === "left" && "@sm/actions:justify-start",
        align === "center" && "@sm/actions:justify-center",
        align === "right" && "@sm/actions:justify-end",
        className,
      )}
    >
      {resolvedActions.map((action) => {
        const label = action.currentLabel;
        const variant = action.variant || "default";

        return (
          <Button
            key={action.id}
            variant={variant}
            onClick={() => runAction(action.id)}
            disabled={action.isDisabled}
            className={cn(
              "rounded-full px-4!",
              "justify-center",
              "min-h-11 w-full text-base",
              "@sm/actions:min-h-0 @sm/actions:w-auto @sm/actions:px-3 @sm/actions:py-2 @sm/actions:text-sm",
              action.isConfirming &&
                "ring-destructive ring-2 ring-offset-2 motion-safe:animate-pulse",
            )}
            aria-label={
              action.shortcut ? `${label} (${action.shortcut})` : label
            }
          >
            {action.isLoading && (
              <svg
                className="mr-2 h-4 w-4 motion-safe:animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {action.icon && !action.isLoading && (
              <span className="mr-2">{action.icon}</span>
            )}
            {label}
            {action.shortcut && !action.isLoading && (
              <kbd className="border-border bg-muted ml-2.5 hidden rounded-lg border px-2 py-0.5 font-mono text-xs font-medium sm:inline-block">
                {action.shortcut}
              </kbd>
            )}
          </Button>
        );
      })}
    </div>
  );
}


"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type UseActionButtonsOptions = {
  actions: Action[];
  onAction: (actionId: string) => void | Promise<void>;
  onBeforeAction?: (actionId: string) => boolean | Promise<boolean>;
  confirmTimeout?: number;
};

export type UseActionButtonsResult = {
  actions: Array<
    Action & {
      currentLabel: string;
      isConfirming: boolean;
      isExecuting: boolean;
      isDisabled: boolean;
      isLoading: boolean;
    }
  >;
  runAction: (actionId: string) => Promise<void>;
  confirmingActionId: string | null;
  executingActionId: string | null;
};

export function useActionButtons(
  options: UseActionButtonsOptions,
): UseActionButtonsResult {
  const {
    actions,
    onAction,
    onBeforeAction,
    confirmTimeout = 3000,
  } = options;

  const [confirmingActionId, setConfirmingActionId] = useState<string | null>(
    null,
  );
  const [executingActionId, setExecutingActionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!confirmingActionId) return;
    const id = setTimeout(() => setConfirmingActionId(null), confirmTimeout);
    return () => clearTimeout(id);
  }, [confirmingActionId, confirmTimeout]);

  useEffect(() => {
    if (!confirmingActionId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setConfirmingActionId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmingActionId]);

  const runAction = useCallback(
    async (actionId: string) => {
      const action = actions.find((a) => a.id === actionId);
      if (!action) return;

      const isAnyActionExecuting = executingActionId !== null;
      if (action.disabled || action.loading || isAnyActionExecuting) {
        return;
      }

      if (action.confirmLabel && confirmingActionId !== action.id) {
        setConfirmingActionId(action.id);
        return;
      }

      if (onBeforeAction) {
        const shouldProceed = await onBeforeAction(action.id);
        if (!shouldProceed) {
          setConfirmingActionId(null);
          return;
        }
      }

      try {
        setExecutingActionId(action.id);
        await onAction(action.id);
      } finally {
        setExecutingActionId(null);
        setConfirmingActionId(null);
      }
    },
    [actions, confirmingActionId, executingActionId, onAction, onBeforeAction],
  );

  const resolvedActions = useMemo(
    () =>
      actions.map((action) => {
        const isConfirming = confirmingActionId === action.id;
        const isThisActionExecuting = executingActionId === action.id;
        const isLoading = action.loading || isThisActionExecuting;
        const isDisabled =
          action.disabled || (executingActionId !== null && !isThisActionExecuting);
        const currentLabel =
          isConfirming && action.confirmLabel
            ? action.confirmLabel
            : action.label;

        return {
          ...action,
          currentLabel,
          isConfirming,
          isExecuting: isThisActionExecuting,
          isDisabled,
          isLoading,
        };
      }),
    [actions, confirmingActionId, executingActionId],
  );

  return {
    actions: resolvedActions,
    runAction,
    confirmingActionId,
    executingActionId,
  };
}


/**
 * JSON primitive type that can be serialized.
 */
type JsonPrimitive = string | number | boolean | null;

/**
 * Valid row value types for serializable DataTable data.
 *
 * Supports:
 * - Primitives: string, number, boolean, null
 * - Arrays of primitives: string[], number[], boolean[], or mixed primitive arrays
 *
 * For complex data (objects with href/label, etc.), use column format configs
 * instead of putting objects in row data.
 *
 * @example
 * ```ts
 * // 👍 Good: Use primitives and primitive arrays
 * const row = {
 *   name: "Widget",
 *   price: 29.99,
 *   tags: ["electronics", "featured"],
 *   metrics: [1.2, 3.4, 5.6]
 * }
 *
 * // 🚫 Bad: Don't put objects in row data
 * const row = {
 *   link: { href: "/path", label: "Click" }  // Use format: { kind: 'link' } instead
 * }
 * ```
 */
export type RowPrimitive = JsonPrimitive | JsonPrimitive[];
export type DataTableRowData = Record<string, RowPrimitive>;
export type RowData = Record<string, unknown>;
export type ColumnKey<T extends object> = Extract<keyof T, string>;

export type FormatFor<V> = V extends number
  ? Extract<FormatConfig, { kind: "number" | "currency" | "percent" | "delta" }>
  : V extends boolean
    ? Extract<FormatConfig, { kind: "boolean" | "status" | "badge" }>
    : V extends (string | number | boolean | null)[]
      ? Extract<FormatConfig, { kind: "array" }>
      : V extends string
        ? Extract<
            FormatConfig,
            { kind: "text" | "link" | "date" | "badge" | "status" }
          >
        : Extract<FormatConfig, { kind: "text" }>;

/**
 * Column definition for DataTable
 *
 * @remarks
 * **Important:** Columns are sortable by default (opt-out pattern).
 * Set `sortable: false` explicitly to disable sorting for specific columns.
 */
export interface Column<
  T extends object = DataTableRowData,
  K extends ColumnKey<T> = ColumnKey<T>,
> {
  /** Unique identifier that maps to a key in the row data */
  key: K;
  /** Display text for the column header */
  label: string;
  /** Abbreviated label for narrow viewports */
  abbr?: string;
  /** Whether column is sortable. Default: true (opt-out pattern) */
  sortable?: boolean;
  /** Text alignment for column cells */
  align?: "left" | "right" | "center";
  /** Optional fixed width (CSS value) */
  width?: string;
  /** Enable text truncation with ellipsis */
  truncate?: boolean;
  /** Mobile display priority (primary = always visible, secondary = expandable, tertiary = hidden) */
  priority?: "primary" | "secondary" | "tertiary";
  /** Completely hide column on mobile viewports */
  hideOnMobile?: boolean;
  /** Formatting configuration for cell values */
  format?: FormatFor<T[K]>;
}

/**
 * Serializable props that can come from LLM tool calls or be JSON-serialized.
 *
 * These props contain only primitive values, arrays, and plain objects -
 * no functions, class instances, or other non-serializable values.
 *
 * @example
 * ```tsx
 * const serializableProps: DataTableSerializableProps = {
 *   columns: [...],
 *   data: [...],
 *   rowIdKey: "id",
 *   defaultSort: { by: "price", direction: "desc" }
 * }
 * ```
 */
export interface DataTableSerializableProps<T extends object = RowData> {
  /**
   * Unique identifier for this tool UI instance in the conversation.
   *
   * Used for:
   * - Assistant referencing ("the table above")
   * - Receipt generation (linking actions to their source)
   * - Narration context
   *
   * Should be stable across re-renders, meaningful, and unique within the conversation.
   *
   * @example "data-table-expenses-q3", "search-results-repos"
   */
  id: ToolUIId;
  /** Optional surface role metadata (serializable) */
  role?: ToolUIRole;
  /** Optional receipt metadata for consequential outcomes (serializable) */
  receipt?: ToolUIReceipt;
  /** Column definitions */
  columns: Column<T>[];
  /** Row data (primitives only - no functions or class instances) */
  data: T[];
  /**
   * Layout mode for the component.
   * - 'auto' (default): Container queries choose table/cards
   * - 'table': Force table layout
   * - 'cards': Force stacked card layout
   */
  layout?: "auto" | "table" | "cards";
  /**
   * Key in row data to use as unique identifier for React keys
   *
   * **Strongly recommended:** Always provide this for dynamic data to prevent
   * reconciliation issues (focus traps, animation glitches, incorrect state preservation)
   * when data reorders. Falls back to array index if omitted (only acceptable for static mock data).
   *
   * @example rowIdKey="id" or rowIdKey="uuid"
   */
  rowIdKey?: ColumnKey<T>;
  /**
   * Uncontrolled initial sort state (table manages its own sort state internally)
   *
   * **Sorting cycle:** Clicking column headers cycles through tri-state:
   * 1. none (unsorted) → 2. asc → 3. desc → 4. none (back to unsorted)
   *
   * @example
   * ```tsx
   * // Start with descending price sort
   * <DataTable defaultSort={{ by: "price", direction: "desc" }} />
   * ```
   */
  defaultSort?: { by?: ColumnKey<T>; direction?: "asc" | "desc" };
  /**
   * Controlled sort state (use with onSortChange from client props)
   *
   * When provided, you must also provide `onSortChange` to handle sort updates.
   * The table will cycle through: none → asc → desc → none.
   *
   * @example
   * ```tsx
   * const [sort, setSort] = useState({ by: "price", direction: "desc" })
   * <DataTable sort={sort} onSortChange={setSort} />
   * ```
   */
  sort?: { by?: ColumnKey<T>; direction?: "asc" | "desc" };
  /** Empty state message */
  emptyMessage?: string;
  /** Max table height with vertical scroll (CSS value) */
  maxHeight?: string;
  /**
   * BCP47 locale for formatting and sorting (e.g., 'en-US', 'de-DE', 'ja-JP')
   *
   * Defaults to 'en-US' to ensure consistent server/client rendering.
   * Pass explicit locale for internationalization.
   *
   * @example
   * ```tsx
   * <DataTable locale="de-DE" /> // German formatting
   * <DataTable locale="ja-JP" /> // Japanese formatting
   * <DataTable />               // Uses 'en-US' default
   * ```
   */
  locale?: string;
}

/**
 * Client-side React-only props that cannot be serialized.
 *
 * These props contain functions, component state, or other React-specific values
 * that must be provided by your React code (not from LLM tool calls).
 *
 * @example
 * ```tsx
 * const clientProps: DataTableClientProps = {
 *   isLoading: false,
 *   className: "my-table",
 *   onSortChange: (next) => setSort(next),
 *   responseActions: [{ id: "export", label: "Export" }],
 *   onResponseAction: (id) => console.log(id)
 * }
 * ```
 */
export interface DataTableClientProps<T extends object = RowData> {
  /** Show loading skeleton */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /**
   * Sort change handler for controlled mode (required if sort is provided)
   *
   * **Tri-state cycle behavior:**
   * - Click unsorted column: `{ by: "column", direction: "asc" }`
   * - Click asc column: `{ by: "column", direction: "desc" }`
   * - Click desc column: `{ by: "column", direction: undefined }` (returns to unsorted)
   * - Click different column: `{ by: "newColumn", direction: "asc" }`
   *
   * @example
   * ```tsx
   * const [sort, setSort] = useState<{ by?: string; direction?: "asc" | "desc" }>({})
   *
   * <DataTable
   *   sort={sort}
   *   onSortChange={(next) => {
   *     console.log("Sort changed:", next)
   *     setSort(next)
   *   }}
   * />
   * ```
   */
  onSortChange?: (next: {
    by?: ColumnKey<T>;
    direction?: "asc" | "desc";
  }) => void;
  /** Optional response actions rendered below the table */
  responseActions?: ActionsProp;
  onResponseAction?: (actionId: string) => void | Promise<void>;
  onBeforeResponseAction?: (actionId: string) => boolean | Promise<boolean>;
}

/**
 * Complete props for the DataTable component.
 *
 * Combines serializable props (can come from LLM tool calls) with client-side
 * React-only props. This separation makes the boundary explicit and prevents
 * accidental serialization of non-serializable values.
 *
 * @see {@link DataTableSerializableProps} for props that can be JSON-serialized
 * @see {@link DataTableClientProps} for React-only props
 * @see {@link parseSerializableDataTable} for parsing LLM tool call results
 *
 * @example
 * ```tsx
 * // From LLM tool call
 * const serializableProps = parseSerializableDataTable(llmResult)
 *
 * // Combine with React-specific props
 * <DataTable
 *   {...serializableProps}
 *   onSortChange={setSort}
 *   responseActions={[{ id: "export", label: "Export" }]}
 *   onResponseAction={(id) => handleAction(id)}
 *   isLoading={loading}
 * />
 * ```
 */
export interface DataTableProps<T extends object = RowData>
  extends DataTableSerializableProps<T>, DataTableClientProps<T> {}

export interface DataTableContextValue<T extends object = RowData> {
  columns: Column<T>[];
  data: T[];
  rowIdKey?: ColumnKey<T>;
  sortBy?: ColumnKey<T>;
  sortDirection?: "asc" | "desc";
  toggleSort?: (key: ColumnKey<T>) => void;
  id?: string;
  isLoading?: boolean;
  locale?: string;
}

/**
 * Sort an array of objects by a key
 */
export function sortData<T, K extends Extract<keyof T, string>>(
  data: T[],
  key: K,
  direction: "asc" | "desc",
  locale?: string,
): T[] {
  const get = (obj: T, k: K): unknown => (obj as Record<string, unknown>)[k];
  const collator = new Intl.Collator(locale, {
    numeric: true,
    sensitivity: "base",
  });
  return [...data].sort((a, b) => {
    const aVal = get(a, key);
    const bVal = get(b, key);

    // Handle nulls
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    // Type-specific comparison
    // Numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }
    // Dates (Date instances)
    if (aVal instanceof Date && bVal instanceof Date) {
      const diff = aVal.getTime() - bVal.getTime();
      return direction === "asc" ? diff : -diff;
    }
    // Booleans: false < true
    if (typeof aVal === "boolean" && typeof bVal === "boolean") {
      const diff = aVal === bVal ? 0 : aVal ? 1 : -1;
      return direction === "asc" ? diff : -diff;
    }
    // Arrays: compare length
    if (Array.isArray(aVal) && Array.isArray(bVal)) {
      const diff = aVal.length - bVal.length;
      return direction === "asc" ? diff : -diff;
    }
    // Strings that look like numbers -> numeric compare
    if (typeof aVal === "string" && typeof bVal === "string") {
      const numA = parseNumericLike(aVal);
      const numB = parseNumericLike(bVal);
      if (numA != null && numB != null) {
        const diff = numA - numB;
        return direction === "asc" ? diff : -diff;
      }
      // ISO-like date strings
      if (/^\d{4}-\d{2}-\d{2}/.test(aVal) && /^\d{4}-\d{2}-\d{2}/.test(bVal)) {
        const da = new Date(aVal).getTime();
        const db = new Date(bVal).getTime();
        const diff = da - db;
        return direction === "asc" ? diff : -diff;
      }
    }

    // Fallback: locale-aware string compare with numeric collation
    const aStr = String(aVal);
    const bStr = String(bVal);
    const comparison = collator.compare(aStr, bStr);
    return direction === "asc" ? comparison : -comparison;
  });
}

/**
 * Return a human-friendly identifier for a row using common keys
 *
 * Accepts any JSON-serializable primitive or array of primitives.
 * Arrays are converted to comma-separated strings.
 */
export function getRowIdentifier(
  row: Record<
    string,
    string | number | boolean | null | (string | number | boolean | null)[]
  >,
  identifierKey?: string,
): string {
  const candidate =
    (identifierKey ? row[identifierKey] : undefined) ??
    (row as Record<string, unknown>).name ??
    (row as Record<string, unknown>).title ??
    (row as Record<string, unknown>).id;

  if (candidate == null) {
    return "";
  }

  // Handle arrays by joining them
  if (Array.isArray(candidate)) {
    return candidate.map((v) => (v === null ? "null" : String(v))).join(", ");
  }

  return String(candidate).trim();
}

/**
 * Parse a string that represents a numeric value, handling various formats:
 * - Currency symbols: $, €, £, ¥, etc.
 * - Percent symbols: %
 * - Accounting negatives: (1234) → -1234
 * - Thousands/decimal separators: 1,234.56 or 1.234,56
 * - Compact notation: 2.8T (trillion), 1.5M (million), 500K (thousand)
 * - Byte suffixes: 768B (bytes), 1.5KB, 2GB, 1TB
 *
 * Note: Single "B" is disambiguated - integers < 1024 are bytes, otherwise billions.
 *
 * @param input - String to parse
 * @returns Parsed number or null if unparseable
 *
 * @example
 * parseNumericLike("$1,234.56") // 1234.56
 * parseNumericLike("2.8T") // 2800000000000
 * parseNumericLike("768B") // 768
 * parseNumericLike("50%") // 50
 * parseNumericLike("(1234)") // -1234
 */
export function parseNumericLike(input: string): number | null {
  // Normalize whitespace (spaces, NBSPs, thin spaces)
  let s = input.replace(/[\u00A0\u202F\s]/g, "").trim();
  if (!s) return null;

  // Accounting negatives: (1234) -> -1234
  s = s.replace(/^\((.*)\)$/g, "-$1");

  // Strip common currency and percent symbols
  s = s.replace(/[\%$€£¥₩₹₽₺₪₫฿₦₴₡₲₵₸]/g, "");

  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  if (lastComma !== -1 && lastDot !== -1) {
    // Decide decimal by whichever occurs last
    const decimalSep = lastComma > lastDot ? "," : ".";
    const thousandSep = decimalSep === "," ? "." : ",";
    s = s.split(thousandSep).join("");
    s = s.replace(decimalSep, ".");
  } else if (lastComma !== -1) {
    // Only comma present
    const frac = s.length - lastComma - 1;
    if (frac === 2 || frac === 3) s = s.replace(/,/g, ".");
    else s = s.replace(/,/g, "");
  } else if (lastDot !== -1) {
    // Only dot present; if multiple dots, treat as thousands and strip
    if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
  }

  // Handle compact notation (K, M, B, T, P, G) and byte suffixes (KB, MB, GB, TB, PB)
  const compactMatch = s.match(/^([+-]?\d+\.?\d*|\d*\.\d+)([KMBTPG]B?|B)$/i);
  if (compactMatch) {
    const baseNum = Number(compactMatch[1]);
    if (Number.isNaN(baseNum)) return null;

    const suffix = compactMatch[2].toUpperCase();

    // Disambiguate single "B" (bytes vs billions)
    // If whole number < 1024, treat as bytes. Otherwise, billions.
    if (suffix === "B") {
      const isLikelyBytes = Number.isInteger(baseNum) && baseNum < 1024;
      return isLikelyBytes ? baseNum : baseNum * 1e9;
    }

    const multipliers: Record<string, number> = {
      K: 1e3,
      KB: 1024, // Kilo: metric vs binary
      M: 1e6,
      MB: 1024 ** 2, // Mega
      G: 1e9,
      GB: 1024 ** 3, // Giga
      T: 1e12,
      TB: 1024 ** 4, // Tera
      P: 1e15,
      PB: 1024 ** 5, // Peta
    };

    return baseNum * (multipliers[suffix] ?? 1);
  }

  if (/^[+-]?(?:\d+\.?\d*|\d*\.\d+)$/.test(s)) {
    const n = Number(s);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";


function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:scale-y-[-1]",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="group data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-y-clip overflow-x-visible text-sm"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-4",
          "group-data-[state=open]:animate-in group-data-[state=open]:fade-in-0",
          "group-data-[state=closed]:animate-out group-data-[state=closed]:fade-out-0",
          "duration-200",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };



const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        homeCTA: "rounded-full px-6 py-3 text-lg w-fit text-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };



function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}


function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}


export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
};
