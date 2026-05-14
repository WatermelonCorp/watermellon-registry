import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export interface FAQSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  categories: FAQCategory[];
  contactLabel?: string;
  contactEmail?: string;
}

interface CategoryTabProps {
  category: FAQCategory;
  isActive: boolean;
  onClick: () => void;
}

function CategoryTab({ category, isActive, onClick }: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      } `}
    >
      <span
        className={`text-xs ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
      >
        {category.icon}
      </span>
      {category.label}
    </button>
  );
}

export default function FAQ2({
  badge = "Need help?",
  title = "Frequently asked questions",
  subtitle = "Find quick answers about our pricing, onboarding, and performance tracking tools.",
  categories,
}: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id ?? "",
  );

  const currentItems =
    categories.find((c) => c.id === activeCategory)?.items ?? [];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
  };

  return (
    <section className="bg-background flex min-h-screen w-full flex-col items-center px-4 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-xl text-center md:mb-12">
        <p className="text-muted-foreground mb-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase">
          <span className="bg-muted-foreground inline-block h-1 w-1 rounded-full" />
          {badge}
        </p>

        <h1 className="text-foreground mb-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed md:text-base">
          {subtitle}
        </p>
      </div>

      <div className="mx-auto mb-8 w-full max-w-2xl">
        <div className="scrollbar-hide bg-muted mx-auto flex w-fit max-w-full items-center gap-1.5 overflow-x-auto rounded-full px-1 py-1.5">
          {categories.map((cat) => (
            <CategoryTab
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={() => handleCategoryChange(cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        {currentItems.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-2.5"
          >
            {currentItems.map((item, index) => (
              <AccordionItem
                key={`${activeCategory}-${index}`}
                value={`${activeCategory}-${index}`}
                className="border-border bg-muted/50 hover:bg-accent hover:border-border/80 data-[state=open]:bg-background overflow-hidden rounded-xl border transition-all duration-300 ease-in-out data-[state=open]:shadow-sm"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <AccordionTrigger className="group flex w-full items-center justify-between gap-4 px-5 py-3 text-left hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden">
                  <span className="text-muted-foreground group-hover:text-foreground group-data-[state=open]:text-foreground text-sm leading-snug font-medium transition-colors duration-200 md:text-base">
                    {item.question}
                  </span>
                  <span className="bg-muted text-muted-foreground group-hover:bg-muted-foreground/20 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300">
                    <FiPlus
                      size={12}
                      className="block group-data-[state=open]:hidden"
                    />
                    <FiMinus
                      size={12}
                      className="hidden group-data-[state=open]:block"
                    />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="bg-muted rounded-xl p-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground py-10 text-center text-sm">
            No questions in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
