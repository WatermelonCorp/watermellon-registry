import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqCategory {
  title: string;
  description?: React.ReactNode;
  items: FaqItem[];
}

export interface Faq5Props {
  categories: FaqCategory[];
  className?: string;
}

export function Faq5({ categories, className }: Faq5Props) {
  return (
    <section
      className={cn(
        "bg-background text-foreground w-full py-16 sm:px-10 md:py-24",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 md:gap-24 md:px-6 lg:px-8">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="flex flex-col gap-4 lg:sticky lg:top-8 lg:col-span-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {category.title}
              </h2>
              {category.description && (
                <div className="text-muted-foreground text-base leading-relaxed md:text-lg">
                  {category.description}
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIdx) => (
                  <AccordionItem
                    key={itemIdx}
                    value={`item-${idx}-${itemIdx}`}
                    className="border-border/80 border-b"
                  >
                    <AccordionTrigger className="hover:text-primary py-5 text-left text-lg font-medium transition-colors hover:no-underline md:text-xl">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed md:text-lg lg:pr-12">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
