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

const Dialog6 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline' className="shadow-md">Sticky Footer Dialog</Button>
      </DialogTrigger>
      <DialogContent className='flex max-h-[min(600px,80vh)] flex-col gap-0 p-4 sm:max-w-md [&_[data-slot=dialog-close]]:right-8'>
        <DialogHeader className='contents space-y-0 text-left'>
          <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
            <DialogTitle className='px-6 pt-6'>Product Information</DialogTitle>
            <DialogDescription>
              <div className='p-6'>
                <div className='[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold'>
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
          </ScrollArea>
        </DialogHeader>
        <DialogFooter className='flex-row items-center justify-end border-t px-6 pt-6 pb-6 bg-transparent mx-0.5'>
          <DialogClose>
            <Button variant='outline' className="rounded-full">
              <ChevronLeftIcon />
              Back
            </Button>
          </DialogClose>
          <Button
            type='button'
            className='claymorphism-action font-semibold px-7 py-2.5 rounded-full border-none transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900'
          >
            Read More
          </Button>
          <style>{`
            .claymorphism-action {
              border-radius: 9999px !important;
              background: #2563eb !important;
              color: #fff !important;
              box-shadow: 6px 6px 18px #b6c6e6, -6px -6px 18px #ffffff;
              border: none !important;
              padding: 0.75rem 2.25rem !important;
              font-weight: 600;
              transition: box-shadow 0.2s, background 0.2s;
            }
            .claymorphism-action:hover {
              background: #1d4ed8 !important;
              box-shadow: 4px 4px 12px #a0aec0, -4px -4px 12px #e0e7ef;
            }
            .dark .claymorphism-action {
              background: #2563eb !important;
              color: #fff !important;
              box-shadow: 4px 4px 16px #1e293b, -4px -4px 16px #334155;
            }
            .dark .claymorphism-action:hover {
              background: #3b82f6 !important;
              box-shadow: 2px 2px 8px #1e293b, -2px -2px 8px #334155;
            }
          `}</style>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog6
