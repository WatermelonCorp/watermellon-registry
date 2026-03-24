import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Plus, X } from 'lucide-react';

interface TimeSlot {
    id: string;
    from: string;
    to: string;
}

interface DayData {
    id: string;
    label: string;
    enabled: boolean;
    slots: TimeSlot[];
}

interface SlotPickerProps {
    days: DayData[];
    onUpdate?: (days: DayData[]) => void;
}

const springConfig = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1
} as const;

export const SlotPicker = ({ days: initialDays, onUpdate }: SlotPickerProps) => {
    const [days, setDays] = useState<DayData[]>(initialDays);


    const updateSlotValue = (dayId: string, slotId: string, field: 'from' | 'to', value: string) => {
        const newDays = days.map((day) => {
            if (day.id === dayId) {
                return {
                    ...day,
                    slots: day.slots.map((slot) =>
                        slot.id === slotId ? { ...slot, [field]: value } : slot
                    ),
                };
            }
            return day;
        });
        setDays(newDays);
        onUpdate?.(newDays);
    };

    const toggleDay = (id: string) => {
        const newDays = days.map((day) => {
            if (day.id === id) {
                const enabled = !day.enabled;
                const slots = enabled && day.slots.length === 0
                    ? [{ id: Math.random().toString(), from: '7:00 AM', to: '8:00 AM' }]
                    : day.slots;
                return { ...day, enabled, slots };
            }
            return day;
        });
        setDays(newDays);
        onUpdate?.(newDays);
    };

    const addSlot = (dayId: string) => {
        const newDays = days.map((day) => {
            if (day.id === dayId) {
                return {
                    ...day,
                    slots: [...day.slots, { id: Math.random().toString(), from: '9:00 AM', to: '10:00 AM' }]
                };
            }
            return day;
        });
        setDays(newDays);
        onUpdate?.(newDays);
    };

    const removeSlot = (dayId: string, slotId: string) => {
        const newDays = days.map((day) => {
            if (day.id === dayId) {
                const filteredSlots = day.slots.filter(s => s.id !== slotId);
                return {
                    ...day,
                    slots: filteredSlots,
                    enabled: filteredSlots.length > 0
                };
            }
            return day;
        });
        setDays(newDays);
        onUpdate?.(newDays);
    };

    return (
        <div className="flex flex-col gap-4 w-xs sm:w-sm px-3 py-1.5 theme-injected font-sans">
            <LayoutGroup>
                {days.map((day) => (
                    <motion.div
                        layout
                        key={day.id}
                        initial={false}
                        transition={springConfig}
                        className={`overflow-hidden rounded-3xl transition-colors duration-300 border-[1.6px] ${day.enabled
                            ? 'bg-card border-border shadow-sm'
                            : 'bg-muted border-transparent'
                            }`}
                    >
                        {/* Header */}
                        <motion.div layout transition={springConfig} className="flex items-center justify-between px-5 h-14">
                            <span className="font-sans text-[16px] font-semibold transition-colors text-foreground">
                                {day.label}
                            </span>

                            <button title='switch'
                                onClick={() => toggleDay(day.id)}
                                className={`relative w-12 h-7 rounded-full transition-colors shadow-sm duration-300 ${day.enabled ? 'bg-primary' : 'bg-input'}`}
                            >
                                <motion.div
                                    layout
                                    className="absolute top-1 left-1 w-5 h-5 bg-background rounded-full shadow-sm"
                                    animate={{ x: day.enabled ? 20 : 0 }}
                                    transition={springConfig}
                                />
                            </button>
                        </motion.div>

                        {/* Slots Area */}
                        <AnimatePresence>
                            {day.enabled && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={springConfig}
                                >
                                    <div className="px-5 pb-5 flex flex-col gap-3">
                                        <AnimatePresence mode="popLayout">
                                            {day.slots.map((slot) => (
                                                <motion.div
                                                    key={slot.id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                                    transition={springConfig}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <span className="font-sans text-[13px] w-8 text-muted-foreground">From</span>
                                                        <input
                                                            type="text"
                                                            value={slot.from}
                                                            onChange={(e) => updateSlotValue(day.id, slot.id, 'from', e.target.value)}
                                                            aria-label="Start time"
                                                            className="font-sans flex-1 w-24 border-[1.6px] rounded-md px-2 py-1 text-[14px] font-medium focus:outline-none uppercase transition-colors bg-input border-border text-foreground focus:border-ring"
                                                        />

                                                        <span className="font-sans text-[13px] text-muted-foreground">To</span>
                                                        <input
                                                            type="text"
                                                            value={slot.to}
                                                            aria-label="End time"
                                                            onChange={(e) => updateSlotValue(day.id, slot.id, 'to', e.target.value)}
                                                            className="font-sans flex-1 w-24 border-[1.6px] rounded-md px-2 py-1 text-[14px] font-medium focus:outline-none uppercase transition-colors bg-input border-border text-foreground focus:border-ring"
                                                        />
                                                    </div>
                                                    <button title='close'
                                                        onClick={() => removeSlot(day.id, slot.id)}
                                                        className="p-2 transition-colors duration-300 rounded-md text-muted-foreground bg-muted hover:bg-background hover:text-foreground"
                                                    >
                                                        <X strokeWidth={2} size={18} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        <motion.button
                                            layout
                                            transition={springConfig}
                                            onClick={() => addSlot(day.id)}
                                            className="font-sans flex items-center justify-center gap-2.5 w-full py-1.5 mt-1 border-[1.2px] rounded-md text-[14px] font-semibold transition-colors duration-300 bg-muted border-border text-muted-foreground hover:bg-background hover:text-foreground"
                                        >
                                            <Plus size={16} className="text-muted-foreground" />
                                            Add More
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </LayoutGroup>
        </div>
    );
};