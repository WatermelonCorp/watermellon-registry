'use client';

import {
  useState,
  useRef,
  useEffect,
  type FC,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { BiSolidPencil } from 'react-icons/bi';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableChipProps {
  defaultLabel?: string;
  showThemeToggle?: boolean;
  onChange?: (value: string) => void;
}

export const EditableChip: FC<EditableChipProps> = ({
  defaultLabel = 'Watchlist',
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState<string>(defaultLabel);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [isEditing]);

  const handleSave = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    const finalValue = label.trim() === '' ? 'Untitled' : label;
    setLabel(finalValue);
    setIsEditing(false);
    onChange?.(finalValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="theme-injected flex flex-col items-center justify-center bg-transparent p-4 font-sans">
      <motion.div layout>
        <div
          className={cn(
            `relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-4xl border border-border bg-card py-1 pr-1 select-none transition-all duration-300 ease-in-out`,
            isEditing && 'gap-8 ring-2 ring-ring',
          )}
        >
          <motion.input
            layout="position"
            key="input"
            ref={inputRef}
            type="text"
            value={label}
            readOnly={!isEditing}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLabel(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && handleSave(e)
            }

            onClick={(e: MouseEvent) => e.stopPropagation()}
            className="ml-4 w-32 border-none bg-transparent text-lg font-medium text-foreground capitalize outline-none selection:bg-primary/20"
          />

          <AnimatePresence mode="popLayout">
            {isEditing ? (
              <motion.button
                key="done"
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
                layout="position"
                onClick={handleSave}
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.4,
                }}
                className="rounded-4xl bg-primary p-1 text-primary-foreground transition-colors"
              >
                <Check size={26} />
              </motion.button>
            ) : (
              <motion.button
                key="edit"
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0 }}
                layout="position"
                onClick={handleEdit}
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.4,
                }}
                className="rounded-4xl bg-muted p-1 text-muted-foreground transition-colors hover:bg-background"
              >
                <BiSolidPencil size={26} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
