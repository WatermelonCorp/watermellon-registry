
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Minus, Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { FaBell, FaCheck } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { BiSolidPencil } from 'react-icons/bi';

export type ReminderType = 'Notification' | 'Email';
export type TimeUnit = 'minutes' | 'hours' | 'days';

export interface Reminder {
  id: string;
  type: ReminderType;
  value: number;
  unit: TimeUnit;
}

const NumberRoller = ({ value }: { value: number }) => {
  const [prevValue, setPrevValue] = React.useState(value);
  const direction = value >= prevValue ? 1 : -1;

  React.useEffect(() => {
    setPrevValue(value);
  }, [value]);

  const variants = {
    initial: (d: number) => ({
      y: d * 5,
      opacity: 0,
      scale: 0,
      filter: 'blur(2px)',
    }),
    animate: { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (d: number) => ({
      y: d * -5,
      opacity: 0,
      scale: 0,
      filter: 'blur(2px)',
    }),
  };

  const strValue = value.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center overflow-hidden">
      {strValue.split('').map((char, i) => (
        <div key={i} className="relative flex items-center justify-center">
          <span className="invisible text-lg font-bold tabular-nums">
            {char}
          </span>
          <AnimatePresence custom={direction} initial={false}>
            <motion.span
              key={char}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="absolute font-sans text-lg font-bold tabular-nums text-foreground"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const AnimatedWord = ({ word }: { word: string }) => {
  return (
    <div className="relative flex items-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        {word.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.3,
              delay: i * 0.0175,
            }}
            className="inline-block font-sans font-semibold text-foreground"
          >
            {i === 0 ? char.toUpperCase() : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

interface EventRemindersProps {
  title: string;
  date: string;
  initialReminders?: Reminder[];
  onUpdate?: (reminders: Reminder[]) => void;
}

export const EventReminders: React.FC<EventRemindersProps> = ({
  title,
  date: initialDate,
  initialReminders = [],
}) => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [date, setDate] = useState(initialDate);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const basePill =
    'rounded-4xl border-[1.6px] border-border bg-card transition-colors';

  const softBtn =
    'rounded-4xl bg-muted p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground';

  const addReminder = () => {
    setReminders([
      ...reminders,
      {
        id: crypto.randomUUID(),
        type: 'Notification',
        value: 5,
        unit: 'minutes',
      },
    ]);
  };

  const removeReminder = (id: string) =>
    setReminders(reminders.filter((r) => r.id !== id));

  const updateReminder = (id: string, updates: Partial<Reminder>) =>
    setReminders(
      reminders.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    );

  const toggleUnit = (id: string, current: TimeUnit) => {
    const units: TimeUnit[] = ['minutes', 'hours', 'days'];
    const next = units[(units.indexOf(current) + 1) % units.length];
    updateReminder(id, { unit: next });
  };

  return (
    <div className="theme-injected flex min-h-full flex-col items-center justify-center bg-transparent p-4 font-sans antialiased">
      <motion.div
        layout
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.5,
        }}
        className="relative w-full max-w-100 rounded-[32px] border-2 border-border bg-card p-6 shadow-lg transition-colors"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-3 px-1">
          <div className="min-w-0 flex-1">
            <h2 className="leading-tight text-lg font-bold text-foreground sm:text-xl">
              {title}
            </h2>

            <AnimatePresence mode="wait">
              {isEditingDate ? (
                <motion.input
                  key="edit-date"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && setIsEditingDate(false)
                  }
                  autoFocus
                  className="mt-2 w-full rounded border-b-2 border-border bg-muted px-2 py-1 font-sans font-semibold text-foreground outline-none"
                />
              ) : (
                <motion.p
                  key="view-date"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 font-sans font-semibold text-muted-foreground"
                >
                  {date}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsEditingDate(!isEditingDate)}
            className="rounded-lg border-2 border-border bg-background p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {isEditingDate ? (
              <FaCheck size={20} />
            ) : (
              <BiSolidPencil size={20} />
            )}
          </button>
        </div>

        {/* List */}
        <div className="border-t border-dashed border-border pt-2">
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.5,
                  }}
                  className="space-y-3 border-b border-dashed border-border py-4"
                >
                  {/* Type */}
                  <motion.div
                    layout
                    onClick={() =>
                      updateReminder(reminder.id, {
                        type:
                          reminder.type === 'Notification'
                            ? 'Email'
                            : 'Notification',
                      })
                    }
                    className={`${basePill} flex cursor-pointer items-center justify-between px-4 py-2`}
                  >
                    <div className="flex items-center gap-3">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={reminder.type}
                          initial={{ y: 5, opacity: 0, filter: 'blur(4px)' }}
                          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                          exit={{ y: -5, opacity: 0, filter: 'blur(4px)' }}
                          transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.5,
                          }}
                        >
                          {reminder.type === 'Notification' ? (
                            <FaBell size={18} className="text-muted-foreground" />
                          ) : (
                            <MdEmail size={18} className="text-muted-foreground" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                      <AnimatedWord word={reminder.type} />
                    </div>
                    <div className="flex flex-col -space-y-1 text-muted-foreground">
                      <ChevronUp size={14} strokeWidth={3} />
                      <ChevronDown size={14} strokeWidth={3} />
                    </div>
                  </motion.div>

                  {/* Value + Unit */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 relative">
                    <div
                      className={`${basePill} flex flex-1 min-w-[120px] items-center justify-between px-2 py-1`}
                    >
                      <button
                        onClick={() =>
                          updateReminder(reminder.id, {
                            value: Math.max(1, reminder.value - 1),
                          })
                        }
                        className={softBtn}
                      >
                        <Minus size={16} />
                      </button>

                      <NumberRoller value={reminder.value} />

                      <button
                        onClick={() =>
                          updateReminder(reminder.id, {
                            value: reminder.value + 1,
                          })
                        }
                        className={softBtn}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <motion.div
                      layout
                      onClick={() => toggleUnit(reminder.id, reminder.unit)}
                      className={`${basePill} flex flex-[1.4] min-w-[120px] cursor-pointer items-center justify-between px-4 py-2`}
                    >
                      <AnimatedWord word={reminder.unit} />
                      <div className="flex flex-col -space-y-1 text-muted-foreground">
                        <ChevronUp size={14} strokeWidth={3} />
                        <ChevronDown size={14} strokeWidth={3} />
                      </div>
                    </motion.div>

                    <button
                      onClick={() => removeReminder(reminder.id)}
                      className="shrink-0 bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border rounded-full p-2.5 sm:p-3 transition-colors active:scale-95"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* Add Button */}
        <motion.button
          onClick={addReminder}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 font-sans font-semibold text-primary-foreground transition-colors hover:opacity-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Reminder
        </motion.button>
      </motion.div>
    </div>
  );
};
