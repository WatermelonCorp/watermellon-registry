import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Dialog8: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-md">
          Terms & Conditions
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background sm:bg-background/95 flex max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1rem)] flex-col gap-0 overflow-hidden rounded-2xl border p-0 shadow-2xl sm:max-h-[70vh] sm:w-full sm:max-w-md sm:border-white/10 sm:backdrop-blur-xl">
        <DialogHeader className="bg-muted/20 shrink-0 border-b px-4 py-4 text-left sm:px-6">
          <DialogTitle className="text-xl font-bold tracking-tight">
            Terms and Conditions
          </DialogTitle>
        </DialogHeader>

        <div className="text-muted-foreground flex-1 overflow-y-auto px-4 py-5 text-sm sm:px-6">
          <div className="space-y-5">
            <section className="space-y-2">
              <h3 className="text-foreground text-base font-semibold">
                1. Introduction & Acceptance
              </h3>
              <p className="leading-relaxed">
                Welcome to Watermelon. These Terms and Conditions strictly
                govern your active use of the Watermelon platform, our
                development products, and all associated services. By accessing
                or using our services, you definitively acknowledge that you
                have read, fully understood, and agree to be bound by these
                complete terms.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-foreground text-base font-semibold">
                2. Licensing & Usage
              </h3>
              <p className="leading-relaxed">
                Subject to your absolute compliance with these strict Terms,
                Watermelon grants you a limited, non-exclusive,
                non-transferable, and highly revocable license to systematically
                access and use the platform for your personal or internal
                enterprise purposes. You may not blindly reproduce, blindly
                distribute, or mass-create derivative template works without
                explicit and verified written permission.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-foreground text-base font-semibold">
                3. User Obligations
              </h3>
              <ul className="marker:text-primary/70 list-disc space-y-1.5 pl-5">
                <li>
                  Systematically provide strictly accurate and completely
                  up-to-date registration profile information.
                </li>
                <li>
                  Mainstream the absolute security, confidentiality, and
                  rotational privacy of your credentials.
                </li>
                <li>
                  Avoid any strict usage that blatantly violates applicable
                  complex local or international jurisdictional laws.
                </li>
                <li>
                  Do not forcefully deploy any aggressive automated systems,
                  rogue bots, or continuous data scrapers on the active network
                  infrastructure.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-foreground text-base font-semibold">
                4. System Reliability
              </h3>
              <p className="leading-relaxed">
                Watermelon expressly shall not be aggressively liable for any
                indirect, incidental, special, highly consequential, or strict
                punitive damages rapidly resulting from your absolute access to
                or usage of, or sheer inability to consistently access or
                reliably use, the platform services.
              </p>
            </section>
          </div>
          <p className="bg-muted/30 text-foreground/80 mt-6 rounded-xl p-4 text-xs leading-relaxed">
            For highly complete enterprise licensing details and advanced
            liability strict limitations, please comprehensively read our full{' '}
            <a href="#" className="text-primary font-semibold hover:underline">
              Legal Master Agreement
            </a>
            .
          </p>
        </div>

        <DialogFooter className="bg-muted/40 mx-0 mb-0 shrink-0 flex-col-reverse items-stretch gap-2 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
          <DialogClose asChild>
            <Button variant="outline" className="h-9 w-full px-5 sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="h-9 w-full bg-blue-600 px-6 text-white hover:bg-blue-700 sm:w-auto"
            >
              I Agree
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog8;
