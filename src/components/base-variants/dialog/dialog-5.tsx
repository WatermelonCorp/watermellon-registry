import { ChevronLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui//button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui//dialog'
import { ScrollArea } from '@/components/ui//scroll-area'

const Dialog5 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant='outline'
          className='rounded-xl border border-border/40 bg-white text-neutral-800 hover:bg-neutral-100 transition dark:bg-neutral-900 dark:text-neutral-100 dark:border-border/60 dark:hover:bg-neutral-800 shadow-sm font-medium px-5 py-2'
        >
          Sticky Header Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className='flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md rounded-xl border border-border/40 bg-white shadow-xl dark:bg-neutral-900 dark:border-border/60'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100'>Product Information</DialogTitle>
          <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
            <DialogDescription>
              <div className='p-6'>
                <div className='space-y-4 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100'>
                  <div className='space-y-1'>
                    <p>
                      <strong>Product Name:</strong> SuperTech 2000
                    </p>
                    <p>
                      The SuperTech 2000 is a high-performance device designed for tech enthusiasts and professionals
                      alike, offering superior functionality and innovative features.
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p>
                      <strong>Specifications:</strong>
                    </p>
                    <ul>
                      <li>Processor: 3.6GHz Octa-Core</li>
                      <li>Memory: 16GB RAM</li>
                      <li>Storage: 1TB SSD</li>
                      <li>Display: 15.6&rdquo; 4K UHD</li>
                      <li>Battery Life: 12 hours</li>
                      <li>Weight: 2.1kg</li>
                    </ul>
                  </div>
                  <div className='space-y-1'>
                    <p>
                      <strong>Key Features:</strong>
                    </p>
                    <ul>
                      <li>Ultra-fast processing speed for intensive tasks</li>
                      <li>Long battery life, perfect for on-the-go professionals</li>
                      <li>Sleek and portable design</li>
                      <li>Advanced cooling system</li>
                      <li>Excellent build quality for durability</li>
                    </ul>
                  </div>
                  <div className='space-y-1'>
                    <p>
                      <strong>Price:</strong>
                    </p>
                    <p>$2,499.99 (Includes 1-year warranty)</p>
                  </div>
                  <div className='space-y-1'>
                    <p>
                      <strong>Customer Reviews:</strong>
                    </p>
                    <p>
                      &rdquo;Absolutely fantastic device! The performance is exceptional, and it handles all of my
                      design software without any lag.&rdquo; - John D.
                    </p>
                    <p>
                      &rdquo;Best purchase I&apos;ve made in years. The display quality is stunning, and the battery
                      lasts all day.&rdquo; - Sarah L.
                    </p>
                    <p>
                      &rdquo;The SuperTech 2000 is a game-changer in the tech industry. Worth every penny!&rdquo; - Emma
                      W.
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p>
                      <strong>Return Policy:</strong>
                    </p>
                    <p>
                      If you&apos;re not satisfied with your purchase, we offer a 30-day return policy. Return the
                      product within 30 days of purchase for a full refund.
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p>
                      <strong>Warranty:</strong>
                    </p>
                    <p>
                      Comes with a standard 1-year warranty covering defects in materials and workmanship. Extended
                      warranty plans are available.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
            <div className="border-t border-border/30 dark:border-border/60 mt-2" />
            <DialogFooter className='flex-col-reverse items-stretch gap-2 px-6 pb-4 pt-4 bg-transparent sm:flex-row sm:items-center sm:justify-end'>
              <DialogClose>
                <Button
                  variant='ghost'
                  className='flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2 font-medium text-neutral-700 shadow-none transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800 sm:w-auto'
                >
                  <ChevronLeftIcon />
                  Back
                </Button>
              </DialogClose>
              <Button
                type='button'
                className='rounded-lg bg-linear-to-r from-blue-600 to-blue-400 px-7 py-2.5 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-500 dark:from-blue-500 dark:to-blue-400 dark:text-white dark:hover:from-blue-600 dark:hover:to-blue-500 sm:w-auto'
              >
                Read More
              </Button>
            </DialogFooter>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog5
