import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Faq4Props {
  badge?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  faqs: FaqItem[];
  className?: string;
}

export function Faq4({
  badge,
  title,
  description,
  buttonText,
  buttonHref,
  faqs,
  className,
}: Faq4Props) {
  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      className={cn("mx-auto w-full max-w-5xl px-4 py-16 md:py-24", className)}
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          {badge && (
            <div className="bg-primary/10 text-primary border-primary/20 mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              {badge}
            </div>
          )}
          <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-base md:text-lg">
              {description}
            </p>
          )}
        </div>
        {buttonText && buttonHref && (
          <div className="mb-2 shrink-0 md:mb-0">
            <Button asChild size="lg" className="rounded-full">
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>

      <Accordion type="single" collapsible className="w-full">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            {leftFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-muted/50 data-[state=open]:ring-primary data-[state=open]:bg-primary/10 dark:data-[state=open]:bg-primary/20 rounded-2xl border-none px-6 transition-all duration-300 data-[state=open]:ring-2"
              >
                <AccordionTrigger className="group flex items-center justify-between py-5 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden">
                  <span className="text-foreground pr-4 text-left text-base font-medium">
                    {faq.question}
                  </span>
                  <div className="text-muted-foreground flex shrink-0 items-center justify-center">
                    <FaChevronDown className="block h-4 w-4 rotate-180 transition-transform group-data-[state=open]:rotate-0" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {rightFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-muted/50 data-[state=open]:ring-primary data-[state=open]:bg-primary/10 dark:data-[state=open]:bg-primary/20 rounded-2xl border-none px-6 transition-all duration-300 data-[state=open]:ring-2"
              >
                <AccordionTrigger className="group flex items-center justify-between py-5 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden">
                  <span className="text-foreground pr-4 text-left text-base font-medium">
                    {faq.question}
                  </span>
                  <div className="text-muted-foreground flex shrink-0 items-center justify-center">
                    <FaChevronDown className="block h-4 w-4 rotate-180 transition-transform group-data-[state=open]:rotate-0" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </div>
      </Accordion>
    </section>
  );
}
