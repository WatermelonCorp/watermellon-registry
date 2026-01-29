import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Plus, X, Sun, Moon } from 'lucide-react';

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
    const [isDark, setIsDark] = useState(false);

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
        <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#121214]' : 'bg-[#FEFEFE]'}`}>
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`mb-6 p-2.5 rounded-full transition-all active:scale-95 ${isDark ? 'bg-[#1C1C1F] text-yellow-400 border border-white/10' : 'bg-gray-100 text-gray-600 border border-black/5'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex flex-col gap-4 w-[390px] px-3 py-1.5">
                <LayoutGroup>
                    {days.map((day) => (
                        <motion.div
                            layout
                            key={day.id}
                            initial={false}
                            transition={springConfig}
                            className={`overflow-hidden rounded-[16px] transition-colors duration-300 border-[1.6px] ${
                                day.enabled 
                                    ? (isDark ? 'bg-[#1C1C1F] border-[#2C2C30] shadow-lg' : 'bg-white border-[#E6E6E9] shadow-sm') 
                                    : (isDark ? 'bg-[#161618] border-transparent' : 'bg-[#F6F5FA] border-transparent')
                            }`}
                        >
                            {/* Header */}
                            <motion.div layout transition={springConfig} className="flex items-center justify-between px-5 h-[56px]">
                                <span className={`text-[16px] font-semibold transition-colors ${isDark ? 'text-[#E1E1E6]' : 'text-[#68686F]'}`}>
                                    {day.label}
                                </span>

                                <button title='switch'
                                    onClick={() => toggleDay(day.id)}
                                    className={`relative w-12 h-7 rounded-full transition-colors shadow-sm duration-300 ${day.enabled ? (isDark ? 'bg-[#4B4B52]' : 'bg-[#515158]') : (isDark ? 'bg-[#2C2C30]' : 'bg-[#E5E4EE]')}`}
                                >
                                    <motion.div
                                        layout
                                        className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
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
                                                            <span className={`text-[13px] w-8 ${isDark ? 'text-[#7C7C85]' : 'text-[#ADACB3]'}`}>From</span>
                                                            <input
                                                                type="text"
                                                                value={slot.from}
                                                                onChange={(e) => updateSlotValue(day.id, slot.id, 'from', e.target.value)}
                                                                aria-label="Start time"
                                                                className={`flex-1 w-24 border-[1.6px] rounded-md px-2 py-1 text-[14px] font-medium focus:outline-none uppercase transition-colors ${
                                                                    isDark ? 'bg-[#121214] border-[#2C2C30] text-[#E1E1E6] focus:border-[#4B4B52]' : 'bg-[#FEFEFE] border-[#F0EFF3] text-[#6D6C71] focus:border-[#ADACB3]'
                                                                }`}
                                                            />

                                                            <span className={`text-[13px] ${isDark ? 'text-[#7C7C85]' : 'text-[#ADACB3]'}`}>To</span>
                                                            <input
                                                                type="text"
                                                                value={slot.to}
                                                                aria-label="End time"
                                                                onChange={(e) => updateSlotValue(day.id, slot.id, 'to', e.target.value)}
                                                                className={`flex-1 w-24 border-[1.6px] rounded-md px-2 py-1 text-[14px] font-medium focus:outline-none uppercase transition-colors ${
                                                                    isDark ? 'bg-[#121214] border-[#2C2C30] text-[#E1E1E6] focus:border-[#4B4B52]' : 'bg-[#FEFEFE] border-[#F0EFF3] text-[#6D6C71] focus:border-[#ADACB3]'
                                                                }`}
                                                            />
                                                        </div>
                                                        <button title='close'
                                                            onClick={() => removeSlot(day.id, slot.id)}
                                                            className={`p-2 transition-colors duration-300 rounded-md ${isDark ? 'text-[#7C7C85] bg-[#2C2C30] hover:bg-[#3A3A40] hover:text-[#E1E1E6]' : 'text-[#ADACB3] bg-[#F6F5FA] hover:bg-[#d1d0d4]/40 hover:text-[#9f9ea4]'}`}
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
                                                className={`flex items-center justify-center gap-2.5 w-full py-1.5 mt-1 border-[1.2px] rounded-md text-[14px] font-semibold transition-colors duration-300 ${
                                                    isDark ? 'bg-[#2C2C30] border-[#3A3A40] text-[#E1E1E6] hover:bg-[#3A3A40]' : 'bg-[#F6F5FA] border-[#F5F4F9] text-[#6E6D74] hover:bg-[#efeded]'
                                                }`}
                                            >
                                                <Plus size={16} className={isDark ? 'text-[#E1E1E6]' : 'text-[#6E6D74]'} />
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
        </div>
    );
};