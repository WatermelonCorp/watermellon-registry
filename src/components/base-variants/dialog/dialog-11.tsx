
import { useId } from 'react'
import { Frown, Meh, Smile, Laugh, Angry } from 'lucide-react'

import { Button } from '@/components/ui//button'
import { Checkbox } from '@/components/ui//checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui//dialog'
import { Label } from '@/components/ui//label'
import { RadioGroup, RadioGroupItem } from '@/components/ui//radio-group'
import { Textarea } from '@/components/ui//textarea'
import React from 'react'


const Dialog11 = () => {
  const id = useId()

  const ratings = [
    { value: '1', label: 'Very Dissatisfied', icon: <Angry size={22} strokeWidth={2} /> },
    { value: '2', label: 'Dissatisfied', icon: <Frown size={22} strokeWidth={2} /> },
    { value: '3', label: 'Neutral', icon: <Meh size={22} strokeWidth={2} /> },
    { value: '4', label: 'Satisfied', icon: <Smile size={22} strokeWidth={2} /> },
    { value: '5', label: 'Very Satisfied', icon: <Laugh size={22} strokeWidth={2} /> }
  ]

  const [selectedRating, setSelectedRating] = React.useState('3')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your feedback logic here
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="rounded-lg px-6 py-2 font-medium bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 shadow-[inset_2px_2px_8px_0_rgba(255,255,255,0.18),_inset_-2px_-2px_8px_0_rgba(37,99,235,0.10)] border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all"
          style={{ boxShadow: 'inset 2px 2px 8px 0 rgba(255,255,255,0.18), inset -2px -2px 8px 0 rgba(37,99,235,0.10), 0 2px 8px 0 rgba(37,99,235,0.08)' }}
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-0 shadow-xl rounded-2xl p-8">
        <DialogHeader className="text-center mb-2">
          <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">We value your feedback</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2" onSubmit={handleSubmit}>
          <fieldset className="space-y-3">
            <legend className="text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-1">How was your experience today?</legend>
            <RadioGroup
              className="flex gap-2 justify-center items-center"
              value={selectedRating}
              name="rating"
              onValueChange={setSelectedRating}
            >
              {ratings.map(rating => (
                <label
                  key={`${id}-${rating.value}`}
                  className="relative w-12 h-12 aspect-square cursor-pointer rounded-full transition-colors outline-none"
                  style={{
                    display: 'inline-block',
                    border: selectedRating === rating.value ? '2px solid #2563eb' : '1px solid #d1d5db',
                    background: selectedRating === rating.value ? 'rgba(37,99,235,0.08)' : 'transparent',
                    boxShadow: selectedRating === rating.value ? '0 0 0 2px #bfdbfe' : undefined
                  }}
                  aria-checked={selectedRating === rating.value}
                >
                  <RadioGroupItem
                    id={`${id}-${rating.value}`}
                    value={rating.value}
                    className="sr-only peer"
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center transition-colors"
                    style={{ pointerEvents: 'none', color: selectedRating === rating.value ? '#2563eb' : undefined, transform: selectedRating === rating.value ? 'scale(1.15)' : undefined, fontWeight: selectedRating === rating.value ? 600 : undefined }}
                  >
                    {rating.icon}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </fieldset>
          <div className="grid gap-2">
            <Label htmlFor="feedback-message" className="text-zinc-700 dark:text-zinc-200">Additional comments</Label>
            <Textarea placeholder="Type your feedback here..." id="feedback-message" name="message" required className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-400 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900" />
            <p className="text-xs text-zinc-400 text-right">500/500 characters left</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Checkbox
                id="consent"
                className="peer data-[state=checked]:bg-white data-[state=checked]:border-blue-600 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-200"
              />
              <style>{`
                .peer[data-state="checked"] svg {
                  color: #2563eb !important;
                  stroke: #2563eb !important;
                }
              `}</style>
            </div>
            <Label htmlFor="consent" className="text-zinc-600 dark:text-zinc-300">I consent to being contacted about my feedback</Label>
          </div>
          <DialogFooter className="sm:justify-end gap-2 bg-transparent p-0 border-none shadow-none">
            <DialogClose>
              <Button variant="outline" className="rounded-lg px-6 py-2 font-medium">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="px-6 py-2 font-semibold bg-green-600 hover:bg-green-700 text-white border-0 transition-all duration-200 rounded-lg shadow-[inset_2px_2px_8px_0_rgba(255,255,255,0.18),_inset_-2px_-2px_8px_0_rgba(22,163,74,0.10)]"
              style={{ boxShadow: 'inset 2px 2px 8px 0 rgba(255,255,255,0.18), inset -2px -2px 8px 0 rgba(22,163,74,0.10), 0 2px 8px 0 rgba(22,163,74,0.08)' }}
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog11
