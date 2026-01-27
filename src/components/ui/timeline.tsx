"use client"

import * as React from "react"
import { useState, useRef, useEffect, createContext, useContext, useMemo } from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"
import tunnel from "tunnel-rat"
import { cn } from "@/lib/utils"

/* ============================================================================
 * TYPES & INTERFACES
 * ========================================================================== */

export interface TimelineSlotData {
  id: string
  rowId: string
  startTime: string // "14:30"
  duration: number // minutes
  [key: string]: any // Additional custom data
}

export interface TimelineRowData {
  id: string
  label: string
  [key: string]: any // Additional custom data
}

export interface TimelineConfig {
  startHour: number
  endHour: number
  snapIntervalMinutes?: number
  columnWidth?: number
}

/* ============================================================================
 * CONTEXT
 * ========================================================================== */

type TimelineContextValue = {
  // Configuration
  config: TimelineConfig
  pixelsPerMinute: number
  timelineWidth: number

  // Refs
  timelineRef: React.RefObject<HTMLDivElement | null>
  columnRef: React.RefObject<HTMLDivElement | null>

  // Tunnel for drag preview
  dragPreviewTunnel: ReturnType<typeof tunnel>

  // Callbacks
  onSlotPositionChange?: (slotId: string, newTime: string, newRowId: string) => Promise<boolean>
  onValidateDrop?: (slotId: string, newTime: string, newRowId: string) => boolean
  onSlotClick?: (slotId: string) => void
}

const TimelineContext = createContext<TimelineContextValue | null>(null)

function useTimeline() {
  const context = useContext(TimelineContext)
  if (!context) {
    throw new Error("Timeline components must be used within TimelineProvider")
  }
  return context
}

/* ============================================================================
 * UTILITIES
 * ========================================================================== */

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

/* ============================================================================
 * TIMELINE PROVIDER
 * ========================================================================== */

interface TimelineProviderProps {
  children: React.ReactNode
  config: TimelineConfig
  percentageInView?: number
  onSlotPositionChange?: (slotId: string, newTime: string, newRowId: string) => Promise<boolean>
  onValidateDrop?: (slotId: string, newTime: string, newRowId: string) => boolean
  onSlotClick?: (slotId: string) => void
  style?: React.CSSProperties
  className?: string
}

export function TimelineProvider({
  children,
  config,
  percentageInView = 100,
  onSlotPositionChange,
  onValidateDrop,
  onSlotClick,
  style,
  className,
}: TimelineProviderProps) {
  const [viewportWidth, setViewportWidth] = useState(0)

  const timelineRef = useRef<HTMLDivElement>(null)
  const columnRef = useRef<HTMLDivElement>(null)

  // Create tunnel for drag preview (stable across renders)
  const dragPreviewTunnel = useMemo(() => tunnel(), [])

  const columnWidth = config.columnWidth || 112

  // Measure viewport
  useEffect(() => {
    const measure = () => {
      if (timelineRef.current) {
        setViewportWidth(timelineRef.current.clientWidth - columnWidth)
      }
    }

    measure()
    window.addEventListener("resize", measure)
    const timeout = setTimeout(measure, 100)

    return () => {
      window.removeEventListener("resize", measure)
      clearTimeout(timeout)
    }
  }, [columnWidth])

  // Calculate timeline dimensions
  const totalMinutes = (config.endHour - config.startHour) * 60
  const basePixelsPerMinute = viewportWidth > 0 ? viewportWidth / totalMinutes : 10
  const pixelsPerMinute = basePixelsPerMinute * (100 / percentageInView)
  const timelineWidth = totalMinutes * pixelsPerMinute

  const contextValue: TimelineContextValue = {
    config,
    pixelsPerMinute,
    timelineWidth,
    timelineRef,
    columnRef,
    dragPreviewTunnel,
    onSlotPositionChange,
    onValidateDrop,
    onSlotClick,
  }

  return (
    <TimelineContext.Provider value={contextValue}>
      <div
        data-slot="timeline-wrapper"
        style={
          {
            "--timeline-column-width": `${columnWidth}px`,
            "--timeline-width": `${timelineWidth}px`,
            "--timeline-pixels-per-minute": pixelsPerMinute,
            ...style,
          } as React.CSSProperties
        }
        className={cn("relative w-full", className)}
      >
        {children}
      </div>
    </TimelineContext.Provider>
  )
}

/* ============================================================================
 * TIMELINE (Main Container with DnD)
 * ========================================================================== */

interface TimelineProps {
  slots: TimelineSlotData[]
  rows: TimelineRowData[]
  children: React.ReactNode
  className?: string
}

export function Timeline({ slots, rows, children, className }: TimelineProps) {
  const { config, pixelsPerMinute, timelineRef, dragPreviewTunnel, onSlotPositionChange, onValidateDrop } =
    useTimeline()

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const snapInterval = config.snapIntervalMinutes || 15
  const columnWidth = config.columnWidth || 112

  // Snapping utilities
  const snapToInterval = (minutes: number): number => {
    return Math.round(minutes / snapInterval) * snapInterval
  }

  const getSnappedDelta = (deltaX: number): number => {
    const deltaMinutes = deltaX / pixelsPerMinute
    const snappedDeltaMinutes = Math.round(deltaMinutes / snapInterval) * snapInterval
    return snappedDeltaMinutes * pixelsPerMinute
  }

  const calculateNewTime = (originalTime: string, deltaX: number): string => {
    const originalMinutes = timeToMinutes(originalTime)
    const deltaMinutes = Math.round(deltaX / pixelsPerMinute)
    const newMinutes = originalMinutes + deltaMinutes
    const snappedMinutes = snapToInterval(newMinutes)
    const clampedMinutes = Math.max(config.startHour * 60, Math.min((config.endHour - 1) * 60, snappedMinutes))
    return minutesToTime(clampedMinutes)
  }

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left + timelineRef.current.scrollLeft,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition(null)
  }

  // Calculate mouse time
  const mouseTime = mousePosition
    ? minutesToTime(Math.floor((mousePosition.x - columnWidth) / pixelsPerMinute) + config.startHour * 60)
    : null

  // Drag handlers
  const [localActiveSlot, setLocalActiveSlot] = useState<string | null>(null)
  const [localOverRow, setLocalOverRow] = useState<string | null>(null)
  const [localDraggedTime, setLocalDraggedTime] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(true)

  const handleDragStart = (event: any) => {
    setLocalActiveSlot(event.active.id)
  }

  const handleDragOver = (event: any) => {
    if (event.over) {
      setLocalOverRow(event.over.id)
    } else {
      setLocalOverRow(null)
      setLocalDraggedTime(null)
    }
  }

  const handleDragMove = (event: any) => {
    const { over, active, delta } = event

    if (over) {
      const slot = slots.find((s: TimelineSlotData) => s.id === active.id)
      if (slot) {
        const newTime = calculateNewTime(slot.startTime, delta.x)
        setLocalDraggedTime(newTime)

        // Validate with host
        const valid = onValidateDrop ? onValidateDrop(active.id, newTime, over.id) : true
        setIsValid(valid)
      }
    }
  }

  const handleDragCancel = () => {
    // Clean up all drag state when drag is cancelled (e.g., ESC key)
    setLocalActiveSlot(null)
    setLocalOverRow(null)
    setLocalDraggedTime(null)
    setIsValid(true)
  }

  const handleDragEnd = async (event: any) => {
    const { active, over, delta } = event

    setLocalActiveSlot(null)
    setLocalOverRow(null)
    setLocalDraggedTime(null)
    setIsValid(true)

    if (over) {
      const slot = slots.find((s: TimelineSlotData) => s.id === active.id)
      if (!slot) return

      const newTime = calculateNewTime(slot.startTime, delta.x)
      const newRowId = over.id

      // Validate
      if (onValidateDrop && !onValidateDrop(active.id, newTime, newRowId)) {
        return
      }

      // Check if anything changed
      if (slot.rowId === newRowId && slot.startTime === newTime) {
        return
      }

      // Call position change handler
      if (onSlotPositionChange) {
        await onSlotPositionChange(active.id, newTime, newRowId)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="relative w-full">
        {/* Mouse time indicator */}
        {mousePosition && mouseTime && !localActiveSlot && (
          <TimelineMouseIndicator mouseX={mousePosition.x} time={mouseTime} />
        )}

        <div
          ref={timelineRef}
          data-slot="timeline-grid"
          className={cn("relative overflow-auto border bg-background", className)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                slots,
                rows,
                activeSlotId: localActiveSlot,
                overRowId: localOverRow,
                draggedNewTime: localDraggedTime,
                isValidDrop: isValid,
                getSnappedDelta,
                _showDropRegion: !!(localActiveSlot && localDraggedTime),
                _dropRegionTime: localDraggedTime,
              })
            }
            return child
          })}
        </div>

        {/* Drag overlay - receives content from tunnel */}
        <DragOverlay dropAnimation={null}>
          {localActiveSlot &&
            (() => {
              const activeSlot = slots.find((s: TimelineSlotData) => s.id === localActiveSlot)
              if (!activeSlot) return null

              console.log("📺 DragOverlay rendering for slot:", activeSlot.id)

              return (
                <div
                  data-slot="timeline-drag-overlay"
                  style={{
                    width: `${Math.max(activeSlot.duration * pixelsPerMinute, 60)}px`,
                    height: "54px",
                    position: "relative",
                  }}
                >
                  {/* Receive tunneled content from the active slot */}
                  <dragPreviewTunnel.Out />
                </div>
              )
            })()}
        </DragOverlay>
      </div>
    </DndContext>
  )
}

/* ============================================================================
 * TIMELINE HEADER
 * ========================================================================== */

interface TimelineHeaderProps {
  className?: string
  columnLabel?: React.ReactNode
}

export function TimelineHeader({ className, columnLabel = "Row" }: TimelineHeaderProps) {
  const { config, pixelsPerMinute, columnRef } = useTimeline()

  // Generate hour markers
  const hourMarkers = []
  for (let hour = config.startHour; hour < config.endHour; hour++) {
    hourMarkers.push({
      hour,
      label: `${hour}:00`,
      position: (hour - config.startHour) * 60 * pixelsPerMinute,
    })
  }

  return (
    <div data-slot="timeline-header" className={cn("sticky top-0 z-10 bg-background border-b", className)}>
      <div className="flex h-12">
        <div
          ref={columnRef}
          data-slot="timeline-header-column"
          className="sticky left-0 w-[var(--timeline-column-width)] bg-background border-r flex items-center px-4 font-semibold text-sm z-1"
        >
          {columnLabel}
        </div>
        <div data-slot="timeline-header-markers" className="relative flex-1">
          {hourMarkers.map(marker => (
            <div
              key={marker.hour}
              data-slot="timeline-hour-marker"
              className="absolute top-0 bottom-0 flex items-center pl-2 text-xs text-muted-foreground"
              style={{ left: `${marker.position}px` }}
            >
              {marker.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
 * TIMELINE ROW
 * ========================================================================== */

interface TimelineRowProps {
  row: TimelineRowData
  slots: TimelineSlotData[]
  children: (slot: TimelineSlotData) => React.ReactNode
  renderRowHeader?: (row: TimelineRowData) => React.ReactNode
  renderDropGhost?: (slot: TimelineSlotData, newTime: string, isValid: boolean) => React.ReactNode
  className?: string
  asChild?: boolean
}

export function TimelineRow({
  row,
  slots,
  children,
  renderRowHeader,
  className,
  asChild,
  ...props
}: TimelineRowProps & any) {
  const { config, pixelsPerMinute, timelineWidth } = useTimeline()
  const Comp = asChild ? Slot : "div"

  const { setNodeRef, isOver } = useDroppable({
    id: row.id,
  })

  const rowSlots = slots.filter((s: TimelineSlotData) => s.rowId === row.id)

  // Check if this row has invalid drop (from props passed by Timeline)
  const isValidDrop = props.isValidDrop !== false
  const isHovered = isOver || props.overRowId === row.id // Try BOTH

  // Generate grid markers
  const hourMarkers = []
  for (let hour = config.startHour; hour <= config.endHour; hour++) {
    hourMarkers.push({
      hour,
      position: (hour - config.startHour) * 60 * pixelsPerMinute,
    })
  }

  const quarterHourMarkers = []
  const totalMinutes = (config.endHour - config.startHour) * 60
  for (let minutes = 15; minutes < totalMinutes; minutes += 15) {
    if (minutes % 60 !== 0) {
      quarterHourMarkers.push({
        position: minutes * pixelsPerMinute,
      })
    }
  }

  return (
    <Comp
      ref={setNodeRef}
      data-slot="timeline-row"
      data-state={isHovered ? (isValidDrop ? "hover-valid" : "hover-invalid") : "idle"}
      className={cn(
        "flex border-b h-12",
        isHovered && isValidDrop && "ring-2 ring-inset ring-blue-500",
        isHovered && !isValidDrop && "ring-2 ring-inset ring-red-500",
        className,
      )}
    >
      {/* Row label column */}
      <div
        data-slot="timeline-row-label"
        className="sticky left-0 w-[var(--timeline-column-width)] bg-inherit border-r flex items-center px-0 z-[5]"
      >
        {renderRowHeader ? renderRowHeader(row) : row.label}
      </div>

      {/* Timeline grid */}
      <div data-slot="timeline-row-grid" className="relative flex-1" style={{ width: `${timelineWidth}px` }}>
        {/* Grid lines */}
        {quarterHourMarkers.map((marker, idx) => (
          <div
            key={`quarter-${idx}`}
            data-slot="timeline-grid-line-quarter"
            className="absolute top-0 bottom-0 w-px bg-border/30"
            style={{ left: `${marker.position}px` }}
          />
        ))}
        {hourMarkers.map(marker => (
          <div
            key={marker.hour}
            data-slot="timeline-grid-line-hour"
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: `${marker.position}px` }}
          />
        ))}

        {/* Slots */}
        {rowSlots.map((slot: TimelineSlotData) => {
          const slotElement = children(slot)
          // Clone the element to inject activeSlotId prop
          return (
            <React.Fragment key={slot.id}>
              {React.isValidElement(slotElement)
                ? React.cloneElement(slotElement, { activeSlotId: props.activeSlotId } as any)
                : slotElement}
            </React.Fragment>
          )
        })}

        {/* Drop ghost - shows where slot will land if dropped in this row */}
        {isHovered && props.draggedNewTime && props.activeSlotId && (
          <TimelineDropGhost
            activeSlotId={props.activeSlotId}
            allSlots={slots}
            newTime={props.draggedNewTime}
            isValid={isValidDrop}
            pixelsPerMinute={pixelsPerMinute}
            config={config}
          />
        )}
      </div>
    </Comp>
  )
}

/* ============================================================================
 * TIMELINE SLOT (Draggable)
 * ========================================================================== */

interface TimelineSlotProps {
  slot: TimelineSlotData
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export function TimelineSlot({ slot, children, className, asChild, ...props }: TimelineSlotProps & any) {
  const timeline = useTimeline()
  const { config, pixelsPerMinute, onSlotClick, dragPreviewTunnel } = timeline
  const Comp = asChild ? Slot : "div"

  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: slot.id,
  })

  const startMinutes = timeToMinutes(slot.startTime)
  const left = (startMinutes - config.startHour * 60) * pixelsPerMinute
  const width = slot.duration * pixelsPerMinute

  // Get activeSlotId from Timeline component via props (passed through TimelineRow)
  const activeSlotIdFromTimeline = props.activeSlotId
  const isActiveSlot = activeSlotIdFromTimeline === slot.id

  // When dragging, show slot at its snapped target position (not at cursor)
  // The DragOverlay will show what you're dragging at cursor position
  const style =
    transform && props.getSnappedDelta
      ? {
        left: `${left}px`,
        width: `${Math.max(width, 60)}px`,
        top: 0,
        bottom: 0,
        transform: `translate3d(${props.getSnappedDelta(transform.x)}px, ${transform.y}px, 0)`,
      }
      : {
        left: `${left}px`,
        width: `${Math.max(width, 60)}px`,
        top: 0,
        bottom: 0,
      }

  const slotContent = (
    <Comp
      data-slot="timeline-slot"
      data-state={isDragging ? "dragging" : "idle"}
      data-active={isActiveSlot}
      className={cn(
        "absolute inset-1 rounded cursor-move transition-all overflow-hidden",
        isDragging ? "opacity-40 shadow-sm ring-2 ring-foreground/50" : "shadow-md",
        onSlotClick && "cursor-pointer hover:ring-2 hover:ring-foreground/30",
        className,
      )}
      onClick={(e: React.MouseEvent) => {
        if (onSlotClick && !isDragging) {
          e.stopPropagation()
          onSlotClick(slot.id)
        }
      }}
      style={
        {
          "--slot-start-time": slot.startTime,
          "--slot-duration": `${slot.duration}min`,
        } as React.CSSProperties
      }
    >
      {children}
    </Comp>
  )

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="absolute" style={style}>
      {/* Always render slot content normally */}
      {slotContent}

      {/* When active and dragging, ALSO send content through tunnel for DragOverlay */}
      {isActiveSlot && isDragging && (
        <>
          {console.log("🚇 Sending content through tunnel for slot:", slot.id)}
          <dragPreviewTunnel.In>
            <Comp
              data-slot="timeline-slot-preview"
              className={cn(
                "rounded cursor-move overflow-hidden shadow-lg",
                "h-full w-full", // Ensure it fills container
                className,
              )}
              style={
                {
                  "--slot-start-time": slot.startTime,
                  "--slot-duration": `${slot.duration}min`,
                } as React.CSSProperties
              }
            >
              {children}
            </Comp>
          </dragPreviewTunnel.In>
        </>
      )}
    </div>
  )
}

/* ============================================================================
 * TIMELINE SLOT PRIMITIVES (for content composition)
 * ========================================================================== */

interface TimelineSlotLabelProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

export function TimelineSlotLabel({ asChild, className, ...props }: TimelineSlotLabelProps) {
  const Comp = asChild ? Slot : "div"
  return <Comp data-slot="timeline-slot-label" className={cn("font-medium truncate text-xs", className)} {...props} />
}

interface TimelineSlotContentProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

export function TimelineSlotContent({ asChild, className, ...props }: TimelineSlotContentProps) {
  const Comp = asChild ? Slot : "div"
  return <Comp data-slot="timeline-slot-content" className={cn("text-xs", className)} {...props} />
}

/* ============================================================================
 * TIMELINE INDICATORS
 * ========================================================================== */

function TimelineMouseIndicator({ mouseX, time }: { mouseX: number; time: string }) {
  return (
    <div
      data-slot="timeline-mouse-indicator"
      className="absolute top-0 bottom-0 pointer-events-none z-20"
      style={{ left: `${mouseX}px` }}
    >
      <div className="absolute top-0 bottom-0 w-px bg-accent left-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-md">
        {time}
      </div>
    </div>
  )
}

interface TimelineDropRegionProps {
  startTime: string
  duration: number
}

export function TimelineDropRegion({ startTime, duration }: TimelineDropRegionProps) {
  const { config, pixelsPerMinute } = useTimeline()
  const columnWidth = config.columnWidth || 112

  const startMinutes = timeToMinutes(startTime)
  const endMinutes = startMinutes + duration
  const endTime = minutesToTime(endMinutes)

  const startPosition = (startMinutes - config.startHour * 60) * pixelsPerMinute + columnWidth
  const endPosition = (endMinutes - config.startHour * 60) * pixelsPerMinute + columnWidth
  const width = endPosition - startPosition

  return (
    <div
      data-slot="timeline-drop-region"
      className="absolute top-0 bottom-0 pointer-events-none z-[12]"
      style={{ left: `${startPosition}px`, width: `${width}px` }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1.5 rounded text-sm font-semibold whitespace-nowrap shadow-md">
        {startTime} - {endTime}
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-accent" />
      <div className="absolute top-0 bottom-0 right-0 w-0.5 bg-accent" />
      <div className="absolute inset-0 bg-accent/[0.07]" />
    </div>
  )
}

interface TimelineCurrentTimeProps {
  className?: string
  nowLabel?: string
}

export function TimelineCurrentTime({ className, nowLabel = "Now" }: TimelineCurrentTimeProps) {
  const { config, pixelsPerMinute } = useTimeline()
  const columnWidth = config.columnWidth || 112

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const position = (currentMinutes - config.startHour * 60) * pixelsPerMinute + columnWidth

  // Only show if within timeline range
  if (currentMinutes < config.startHour * 60 || currentMinutes > config.endHour * 60) {
    return null
  }

  return (
    <div
      data-slot="timeline-current-time"
      className={cn("absolute top-0 bottom-0 w-0.5 bg-secondary pointer-events-none z-[15]", className)}
      style={{ left: `${position}px` }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-secondary text-foreground px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-md z-50">
        {nowLabel}: {minutesToTime(currentMinutes)}
      </div>
    </div>
  )
}

/* ============================================================================
 * TIMELINE GRID (for custom layouts)
 * ========================================================================== */

interface TimelineGridProps {
  children: React.ReactNode
  className?: string
}

export function TimelineGrid({ children, className, ...props }: TimelineGridProps & any) {
  const { timelineWidth } = useTimeline()

  // Get active slot data for drop region and ghost preview
  const activeSlot =
    props._showDropRegion && props.slots ? props.slots.find((s: TimelineSlotData) => s.id === props.activeSlotId) : null

  return (
    <div
      data-slot="timeline-grid-container"
      className={cn("relative", className)}
      style={{ minWidth: `${timelineWidth + 200}px` }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, props)
        }
        return child
      })}

      {/* Drop region highlight */}
      {props._showDropRegion && props._dropRegionTime && activeSlot && (
        <TimelineDropRegion startTime={props._dropRegionTime} duration={activeSlot.duration} />
      )}
    </div>
  )
}

/* ============================================================================
 * DROP GHOST (Shows where slot will land)
 * ========================================================================== */

function TimelineDropGhost({
  activeSlotId,
  allSlots,
  newTime,
  isValid,
  config,
  pixelsPerMinute,
}: {
  activeSlotId: string
  allSlots: TimelineSlotData[]
  newTime: string
  isValid: boolean
  config: TimelineConfig
  pixelsPerMinute: number
}) {
  const slot = allSlots.find(s => s.id === activeSlotId)
  if (!slot) return null

  const startMinutes = timeToMinutes(newTime)
  const left = (startMinutes - config.startHour * 60) * pixelsPerMinute
  const width = slot.duration * pixelsPerMinute

  if (!isValid) return null

  return (
    <div
      data-slot="timeline-drop-ghost"
      className={cn("absolute rounded-md pointer-events-none", "bg-foreground/20")}
      style={{
        left: `${left}px`,
        width: `${Math.max(width, 60)}px`,
        top: "2px",
        bottom: "2px",
        zIndex: 100,
      }}
    />
  )
}

/* ============================================================================
 * EXPORTS
 * ========================================================================== */

export { useTimeline, TimelineMouseIndicator }