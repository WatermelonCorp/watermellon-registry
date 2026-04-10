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

const Dialog6 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="shadow-sm">
          Sticky Footer Dialog
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/40 dark:border-border/60 flex max-h-[min(650px,90vh)] flex-col gap-0 overflow-hidden rounded-xl border bg-white p-0 shadow-xl sm:max-w-md dark:bg-neutral-900 [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:right-6 [&_[data-slot=dialog-close]]:bg-white/50 [&_[data-slot=dialog-close]]:backdrop-blur-sm dark:[&_[data-slot=dialog-close]]:bg-neutral-900/50">
        {/* Scrollable Content (Header + Body) */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <DialogHeader className="border-border/30 dark:border-border/60 border-b px-6 py-4 pr-14 text-left">
            <DialogTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Security Audit Report
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <DialogDescription className="text-neutral-600 dark:text-neutral-400">
              <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100">
                <div className="space-y-1">
                  <p>
                    <strong>Assessment Summary:</strong>
                  </p>
                  <p>
                    Our latest comprehensive security audit completed on October
                    5, 2026, revealed zero critical vulnerabilities. However,
                    several moderate network configuration warnings require your
                    attention.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>1. Authentication Mechanisms</strong>
                  </p>
                  <p>
                    Multi-factor authentication (MFA) enforcement is active for
                    92% of administrative accounts. We recommend strictly
                    enforcing MFA policies for the remaining legacy accounts
                    within 14 days.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>2. Data Encryption</strong>
                  </p>
                  <p>
                    All data at rest is now encrypted using AES-256 standards.
                    Transit encryption utilizing TLS 1.3 is fully operational
                    across all public-facing endpoints without any fallback to
                    older protocols.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>3. Access Controls</strong>
                  </p>
                  <p>
                    Role-Based Access Control (RBAC) schemas are properly
                    segregated. However, 3 development-tier service accounts
                    have overly permissive access to production databases.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>4. Third-Party Dependencies</strong>
                  </p>
                  <p>
                    Automated scanning detected 4 outdated npm packages with
                    known, medium-severity CVEs. The engineering team has been
                    notified to bump these dependencies in the next sprint.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>5. Incident Response Readiness</strong>
                  </p>
                  <p>
                    Simulated penetration tests indicated a rapid identification
                    and mitigation response time averaging 14 minutes, well
                    below our 30-minute SLA threshold.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong>Recommendation:</strong>
                  </p>
                  <p>
                    Please review the attached detailed artifacts and action the
                    remediations for the service accounts and outdated packages
                    by the end of Q4.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </div>
        </ScrollArea>

        {/* Sticky Footer */}
        <DialogFooter className="border-border/30 dark:border-border/60 z-10 m-0 flex-col-reverse items-stretch gap-2 border-t bg-neutral-50/50 p-4 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pb-6 dark:bg-neutral-900/50">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium shadow-none sm:w-auto"
            >
              <ChevronLeftIcon className="size-4" />
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="claymorphism-action w-full rounded-full border-none px-7 py-2.5 font-semibold focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none sm:w-auto dark:focus:ring-offset-neutral-900"
          >
            Export PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Dialog6;
