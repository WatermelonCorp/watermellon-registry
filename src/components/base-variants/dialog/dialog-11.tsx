import { useId } from 'react';
import { Frown, Meh, Smile, Laugh, Angry } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const Dialog11 = () => {
  const id = useId();

  const ratings = [
    {
      value: '1',
      label: 'Very Dissatisfied',
      icon: <Angry size={22} strokeWidth={2} />,
    },
    {
      value: '2',
      label: 'Dissatisfied',
      icon: <Frown size={22} strokeWidth={2} />,
    },
    { value: '3', label: 'Neutral', icon: <Meh size={22} strokeWidth={2} /> },
    {
      value: '4',
      label: 'Satisfied',
      icon: <Smile size={22} strokeWidth={2} />,
    },
    {
      value: '5',
      label: 'Very Satisfied',
      icon: <Laugh size={22} strokeWidth={2} />,
    },
  ];

  const [selectedRating, setSelectedRating] = React.useState('3');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your feedback logic here
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-lg border border-blue-200 bg-blue-50 px-6 py-2 font-medium text-blue-700 shadow-[inset_2px_2px_8px_0_rgba(255,255,255,0.18),_inset_-2px_-2px_8px_0_rgba(37,99,235,0.10)] transition-all hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
          style={{
            boxShadow:
              'inset 2px 2px 8px 0 rgba(255,255,255,0.18), inset -2px -2px 8px 0 rgba(37,99,235,0.10), 0 2px 8px 0 rgba(37,99,235,0.08)',
          }}
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border-0 bg-white p-6 shadow-xl sm:max-w-md dark:bg-zinc-900">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Feedback
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            Help us improve by sharing your thoughts.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
          <fieldset className="mb-2 space-y-2 text-left">
            <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              How was your experience today?
            </legend>
            <RadioGroup
              className="mt-2 flex items-center justify-start gap-2"
              value={selectedRating}
              name="rating"
              onValueChange={setSelectedRating}
            >
              {ratings.map((rating) => (
                <label
                  key={`${id}-${rating.value}`}
                  className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all outline-none ${
                    selectedRating === rating.value
                      ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-100 dark:border-blue-500 dark:bg-blue-500/10 dark:ring-blue-500/20'
                      : 'border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800'
                  }`}
                  aria-checked={selectedRating === rating.value}
                >
                  <RadioGroupItem
                    id={`${id}-${rating.value}`}
                    value={rating.value}
                    className="peer sr-only"
                  />
                  <span
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                      selectedRating === rating.value
                        ? 'scale-110 text-blue-600 dark:text-blue-500'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {rating.icon}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </fieldset>
          <div className="grid gap-2 text-left">
            <Label
              htmlFor="feedback-message"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Additional comments
            </Label>
            <Textarea
              placeholder="Type your feedback here..."
              id="feedback-message"
              name="message"
              required
              className="w-full rounded-lg border-zinc-300 bg-white text-zinc-900 placeholder:text-xs focus:ring-2 focus:ring-zinc-400 sm:placeholder:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <p className="text-right text-xs text-zinc-400">0/500 characters</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="relative">
              <Checkbox
                id="consent"
                className="peer data-[state=checked]:border-blue-600 data-[state=checked]:bg-white data-[state=checked]:ring-2 data-[state=checked]:ring-blue-200"
              />
              <style>{`
                .peer[data-state="checked"] svg {
                  color: #2563eb !important;
                  stroke: #2563eb !important;
                }
              `}</style>
            </div>
            <Label
              htmlFor="consent"
              className="text-sm text-zinc-600 dark:text-zinc-300"
            >
              I consent to being contacted about my feedback
            </Label>
          </div>
          <DialogFooter className="gap-2 border-none bg-transparent shadow-none sm:justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full rounded-lg px-6 py-2.5 font-medium sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full rounded-lg border-0 bg-green-600 px-6 py-2.5 font-semibold text-white shadow-[inset_2px_2px_8px_0_rgba(255,255,255,0.18),_inset_-2px_-2px_8px_0_rgba(22,163,74,0.10)] transition-all duration-200 hover:bg-green-700 sm:w-auto"
              style={{
                boxShadow:
                  'inset 2px 2px 8px 0 rgba(255,255,255,0.18), inset -2px -2px 8px 0 rgba(22,163,74,0.10), 0 2px 8px 0 rgba(22,163,74,0.08)',
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog11;
