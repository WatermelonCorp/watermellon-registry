import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  date?: string;
}

export interface Faq1Props {
  badge?: string;
  title: React.ReactNode;
  faqs: FaqItem[];
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
}

export function Faq1({
  badge,
  title,
  faqs,

  className,
}: Faq1Props) {
  return (
    <section
      className={cn('mx-auto w-full max-w-4xl px-4 py-16 md:py-24', className)}
    >
      <div className="mb-12 flex flex-col items-center text-center">
        {badge && (
          <span className="bg-muted text-foreground mb-6 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
            {badge}
          </span>
        )}
        <h2 className="text-foreground max-w-2xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl md:leading-tight">
          {title}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full gap-2">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="bg-muted/50 rounded-none border border-dashed border-none px-6"
          >
            <AccordionTrigger className="group flex items-center py-6 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden">
              <span className="text-foreground pr-4 text-left text-base font-medium md:text-lg">
                {faq.question}
              </span>
              <div className="text-muted-foreground ml-auto flex shrink-0 items-center justify-center">
                <FaPlus className="block h-4 w-4 group-data-[state=open]:hidden" />
                <FaMinus className="hidden h-4 w-4 group-data-[state=open]:block" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-6">
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {faq.answer}
              </p>
              {faq.date && (
                <div className="text-muted-foreground/70 mt-4 text-sm font-medium">
                  {faq.date}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
