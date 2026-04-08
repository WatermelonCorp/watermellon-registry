import React from 'react'
import { Button } from '@/components/ui//button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui//dialog'

const Dialog8: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-md">
          Terms & Conditions
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-h-[70vh] sm:max-w-md border sm:border-white/10 sm:bg-background/95 sm:backdrop-blur-xl">
        <DialogHeader className="border-b bg-muted/20 px-6 py-4 text-left shrink-0">
          <DialogTitle className="text-xl font-bold tracking-tight">
            Terms and Conditions
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-muted-foreground">
            <div className="space-y-5">
              <section className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">1. Introduction & Acceptance</h3>
                <p className="leading-relaxed">
                  Welcome to Watermelon. These Terms and Conditions strictly govern your active use of the Watermelon
                  platform, our development products, and all associated services. By accessing or using our services,
                  you definitively acknowledge that you have read, fully understood, and agree to be bound by these
                  complete terms.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">2. Licensing & Usage</h3>
                <p className="leading-relaxed">
                  Subject to your absolute compliance with these strict Terms, Watermelon grants you a limited, non-exclusive,
                  non-transferable, and highly revocable license to systematically access and use the platform for your
                  personal or internal enterprise purposes. You may not blindly reproduce, blindly distribute, or mass-create
                  derivative template works without explicit and verified written permission.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">3. User Obligations</h3>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-primary/70">
                  <li>Systematically provide strictly accurate and completely up-to-date registration profile information.</li>
                  <li>Mainstream the absolute security, confidentiality, and rotational privacy of your credentials.</li>
                  <li>Avoid any strict usage that blatantly violates applicable complex local or international jurisdictional laws.</li>
                  <li>Do not forcefully deploy any aggressive automated systems, rogue bots, or continuous data scrapers on the active network infrastructure.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">4. System Reliability</h3>
                <p className="leading-relaxed">
                  Watermelon expressly shall not be aggressively liable for any indirect, incidental, special, highly consequential,
                  or strict punitive damages rapidly resulting from your absolute access to or usage of, or sheer inability to consistently
                  access or reliably use, the platform services.
                </p>
              </section>
            </div>
            <p className="mt-6 rounded-xl bg-muted/30 p-4 text-xs leading-relaxed text-foreground/80">
              For highly complete enterprise licensing details and advanced liability strict limitations, please comprehensively
              read our full{' '}
              <a href="#" className="font-semibold text-primary hover:underline">
                Legal Master Agreement
              </a>
              .
            </p>
          </div>

        <DialogFooter className="flex-row items-center justify-end gap-3 border-t bg-muted/40 px-8 py-4 pb-8 shrink-0">
          <DialogClose asChild>
            <Button variant="outline" className="h-9 px-5">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" className="h-9 bg-blue-600 px-6 text-white hover:bg-blue-700">
              I Agree
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Dialog8
