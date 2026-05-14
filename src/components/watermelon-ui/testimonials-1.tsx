import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    heading: '"Ship faster without chaos"',
    quote:
      "We went from scattered financial ops to a clean, structured workflow. The visibility alone helped us move faster without breaking things.",
    author: "Guillermo Rauch",
    role: "CEO",
    company: "@vercel",
    companyColor: "text-orange-400",
    avatarUrl: "https://github.com/rauchg.png",
  },
  {
    id: 2,
    heading: '"Built for real teams"',
    quote:
      "The onboarding was seamless, and the product just clicks. It fits naturally into how modern teams actually work.",
    author: "Lee Robinson",
    role: "VP of Developer Experience",
    company: "@vercel",
    companyColor: "text-orange-500",
    avatarUrl: "https://github.com/leerob.png",
  },
  {
    id: 3,
    heading: '"Clarity at scale"',
    quote:
      "As systems grow, things get messy. This gave us clarity across teams without adding complexity.",
    author: "Dan Abramov",
    role: "Software Engineer",
    company: "@meta",
    companyColor: "text-blue-500",
    avatarUrl: "https://github.com/gaearon.png",
  },
  {
    id: 4,
    heading: '"Actually enjoyable to use"',
    quote:
      "Most tools feel like a chore. This one doesn’t. It’s fast, predictable, and genuinely pleasant to work with.",
    author: "Kent C. Dodds",
    role: "Educator",
    company: "@kentcdodds",
    companyColor: "text-indigo-500",
    avatarUrl: "https://github.com/kentcdodds.png",
  },
  {
    id: 5,
    heading: '"Clean, thoughtful design"',
    quote:
      "The attention to detail is obvious. Everything feels intentional, from interactions to layout.",
    author: "Evan You",
    role: "Creator of Vue",
    company: "@vuejs",
    companyColor: "text-pink-500",
    avatarUrl: "https://github.com/yyx990803.png",
  },
  {
    id: 6,
    heading: '"Zero friction setup"',
    quote:
      "We integrated everything in minutes. No weird edge cases, no hacks — just worked out of the box.",
    author: "Theo Browne",
    role: "Founder",
    company: "@t3code",
    companyColor: "text-emerald-500",
    avatarUrl: "https://github.com/t3dotgg.png",
  },
  {
    id: 7,
    heading: '"Insights that matter"',
    quote:
      "The analytics aren’t just numbers — they actually help you make better decisions, faster.",
    author: "Addy Osmani",
    role: "Engineering Manager",
    company: "@google",
    companyColor: "text-purple-500",
    avatarUrl: "https://github.com/addyosmani.png",
  },
  {
    id: 8,
    heading: '"Reliable and simple"',
    quote:
      "No unnecessary complexity. It does what it promises, and it does it really well.",
    author: "Sindre Sorhus",
    role: "Open Source Developer",
    company: "@sindresorhus",
    companyColor: "text-rose-500",
    avatarUrl: "https://github.com/sindresorhus.png",
  },
];

export default function Testimonials1() {
  return (
    <section className=" bg-background w-full py-16 h-full items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 my-auto">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Trusted by teams who lead people
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Save hours every week, reduce complexity, and let your HR team focus
            on people — not processes.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="px-2 py-2">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-muted/50 flex h-full min-h-[320px] flex-col justify-between rounded-4xl p-6 ring-0 select-none">
                    <div>
                      <h3 className="text-foreground mb-2 text-2xl leading-tight font-medium md:text-2xl">
                        {testimonial.heading}
                      </h3>
                      <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed md:text-base">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Avatar className="border-border h-12 w-12 border">
                        <AvatarImage
                          src={testimonial.avatarUrl}
                          alt={testimonial.author}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {testimonial.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground font-medium">
                          {testimonial.author}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          {testimonial.role}{" "}
                          <span className={testimonial.companyColor}>
                            {testimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-10 flex w-full justify-center gap-2">
              <CarouselPrevious className="bg-muted hover:bg-muted/50 relative inset-0 size-10 rounded-xl border transition-colors" />
              <CarouselNext className="bg-muted hover:bg-muted/50 relative inset-0 size-10 rounded-xl transition-colors" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
