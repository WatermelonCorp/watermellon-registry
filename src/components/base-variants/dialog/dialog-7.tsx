import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import { ScrollArea } from '@/components/ui/scroll-area';

const Dialog7: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-md">
          Fullscreen Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] flex-col justify-between gap-0 overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-[calc(100vw-2rem)]">
        <ScrollArea className="flex flex-col justify-between overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b px-6 py-6 text-2xl font-bold tracking-tight">
              Product Information
            </DialogTitle>
            <DialogDescription>
              <div className="p-6">
                <div className="text-muted-foreground [&_strong]:text-foreground space-y-6 text-base [&_strong]:font-semibold">
                  <div className="space-y-2">
                    <p>
                      <strong>Product Name:</strong> Watermelon UI Pro
                    </p>
                    <p className="leading-relaxed">
                      Watermelon UI Pro is a comprehensive, meticulously crafted
                      component library designed to accelerate your development
                      workflow and bring modern aesthetics to your Next.js
                      applications instantly.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>Included Assets:</strong>
                    </p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>80+ Ready-to-use Advanced Components</li>
                      <li>Fully Typed Next.js 14+ Integration</li>
                      <li>Premium Claymorphism Design System</li>
                      <li>Custom Framer Motion Animations</li>
                      <li>Lifetime Free Updates</li>
                      <li>Comprehensive Figma Master File</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>Why Choose Watermelon:</strong>
                    </p>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>
                        Built natively for perfectly responsive modern layouts
                      </li>
                      <li>
                        Easy customization through advanced Tailwind
                        configurations
                      </li>
                      <li>Pixel-perfect spacing and typography constants</li>
                      <li>
                        Accessible out of the box with ARIA support and keyboard
                        navigation
                      </li>
                      <li>
                        Modular structure for keeping your bundle sizes
                        absolutely minimal
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong>License Tier:</strong>
                    </p>
                    <p className="text-foreground text-lg font-medium">
                      $129.00{' '}
                      <span className="text-muted-foreground text-sm font-normal">
                        (Unlimited Team License)
                      </span>
                    </p>
                  </div>
                  <div className="space-y-4 border-t pt-6">
                    <p className="text-lg">
                      <strong>Developer Feedback:</strong>
                    </p>
                    <div className="space-y-4">
                      <blockquote className="border-l-2 pl-4 italic">
                        &rdquo;Absolutely fantastic UI kit! Integrating it into
                        our latest project saved us hundreds of hours and the
                        final result looks world-class.&rdquo; - Alex R.
                      </blockquote>
                      <blockquote className="border-l-2 pl-4 italic">
                        &rdquo;Best purchase I&apos;ve made for my agency. The
                        interactive elements feel so crisp and the code quality
                        is just pristine.&rdquo; - Sarah L.
                      </blockquote>
                      <blockquote className="border-l-2 pl-4 italic">
                        &rdquo;Watermelon UI is a total game-changer for modern
                        web aesthetics. Worth every cent!&rdquo; - David W.
                      </blockquote>
                    </div>
                  </div>
                  <div className="space-y-2 border-t pt-6">
                    <p>
                      <strong>Refund Guarantee:</strong>
                    </p>
                    <p className="leading-relaxed">
                      We offer a confident 14-day money-back guarantee. If
                      Watermelon doesn&apos;t dramatically improve your
                      team&apos;s workflow, just let us know for a simple,
                      no-questions-asked refund.
                    </p>
                  </div>
                  <div className="space-y-2 border-t pt-6">
                    <p>
                      <strong>Usage Terms:</strong>
                    </p>
                    <p className="leading-relaxed">
                      Licensed for unlimited personal and commercial projects.
                      Redistribution or reselling of the raw source code
                      components or templates is strictly prohibited.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
        <DialogFooter className="bg-muted/40 flex-row items-center justify-end gap-3 border-t p-6 pb-10">
          <DialogClose asChild>
            <Button variant="outline" className="gap-2">
              <ChevronLeftIcon className="h-4 w-4" />
              Back
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="mr-3 rounded-md border-none bg-blue-500 px-8 font-semibold text-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.2),inset_4px_4px_10px_rgba(255,255,255,0.4),6px_6px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500 hover:brightness-110 active:scale-95 active:shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.2),inset_2px_2px_5px_rgba(255,255,255,0.4),2px_2px_5px_rgba(0,0,0,0.1)]"
          >
            Read More
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog7;
