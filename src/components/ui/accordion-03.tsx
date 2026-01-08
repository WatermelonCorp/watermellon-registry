import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/primary-button";

const items = [
  {
    id: "01",
    title: "Who am I?",
    img: "/templates/dalim-www.jpg",
    content:
      "I’m Ali Imam — a multidisciplinary designer and creative developer crafting thoughtful digital experiences with purpose and precision.",
  },
  {
    id: "02",
    title: "What do I design?",
    img: "/templates/dalim-ui.jpg",
    content:
      "I design intuitive interfaces, visual identities, and digital products that connect clarity with emotion — always guided by simplicity and usability.",
  },
  {
    id: "03",
    title: "My design approach",
    img: "/templates/dalim-icons.jpg",
    content:
      "Every project begins with understanding. I combine logic, emotion, and craft to create experiences that feel effortless and meaningful.",
  },
  {
    id: "04",
    title: "Philosophy & values",
    img: "/templates/dalim-agency.jpg",
    content:
      "Design should be timeless — not trendy. I value honesty in visuals, restraint in detail, and intention in every decision I make.",
  },
  {
    id: "05",
    title: "Beyond design",
    img: "/templates/dalim-fonts.jpg",
    content:
      "Outside of work, I explore photography, motion, and creative coding — all ways to see and shape the world differently.",
  },
];


export default function Accordion03() {
  return (
    <div className="w-full border mx-auto max-w-3xl">
      <Accordion type="single" defaultValue="02" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem className="relative" value={item.id} key={item.id}>
            <AccordionTrigger className="pl-6 hover:no-underline [&>svg]:hidden">
              <h1 className="text-lg md:text-xl font-semibold">{item.title}</h1>
            </AccordionTrigger>
            <AccordionContent className="space-y-6 text-muted-foreground w-full h-full md:h-full grid md:grid-cols-2">
              <div className="px-6 space-y-6">
                <p> {item.content}</p>
                <Button>View More</Button>
              </div>
              <img
                className="h-full md:border-l border-t md:border-t-0 md:absolute md:w-1/2 object-cover right-0 top-0"
                src={item.img}
                alt={item.img}
                aria-hidden="true"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
