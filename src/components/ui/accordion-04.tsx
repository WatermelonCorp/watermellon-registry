import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";


const items = [
  {
    id: "01",
    title: "Who am I?",
    content:
      "I’m Ali Imam — a designer and creative developer focused on building digital experiences that are minimal, meaningful, and timeless.",
  },
  {
    id: "02",
    title: "What do I design?",
    content:
      "I create clean, functional interfaces, brand systems, and digital products. My work blends simplicity with clarity and usability.",
  },
  {
    id: "03",
    title: "My design approach",
    content:
      "For me, design isn’t just visuals — it’s how something feels and works. I focus on clarity, detail, and storytelling in every project.",
  },
  {
    id: "04",
    title: "Beyond design",
    content:
      "I bridge design and development, turning ideas into interactive experiences with modern tools and technology.",
  },
  {
    id: "05",
    title: "What inspires me",
    content:
      "Minimalism, architecture, and everyday details. I believe great design is found in the small things we often overlook.",
  },
];

export default function Accordion02() {
  return (
    <div className="w-full mx-auto max-w-xl">
      <Accordion type="single" defaultValue="02" collapsible className="w-full space-y-2">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="border last:border-b rounded-xl ">
            <AccordionTrigger className="text-left m-1 data-[state=open]:rounded-b-none bg-primary/10 data-[state=open]:[&_svg]:rotate-180 data-[state=open]:[&_svg]:[#plus]:opacity-0 [&_svg]:[#plus]:[data-state=open]:opacity-0 duration-500 hover:no-underline cursor-pointer [data-slot=accordion-trigger] [&>svg]:hidden">
              <div className="flex flex-1 px-6 justify-between items-center gap-4">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <div className="relative">
                  <Plus
                    id="plus"
                    strokeWidth={2}
                    className={cn(
                      "h-6 w-6 shrink-0 transition-all duration-500",
                      "data-[state=open]:opacity-0 data-[state=closed]:opacity-100",
                      "data-[state=open]:rotate-180"
                    )}
                  />
                  <X
                    strokeWidth={2}
                    id="minus"
                    className={cn(
                      "absolute inset-0 opacity-100 transition-all duration-500",
                      "hover:opacity-100 [data-state=close]:opacity-100",
                      "data-[state=open]:rotate-180"
                    )}
                  />
                </div>

              </div>
            </AccordionTrigger>

            <AccordionContent className="p-6">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
