import { useId, useState, type FormEvent } from "react";
import {
  RiCheckboxCircleFill,
  RiMailSendFill,
} from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";

export interface NewsletterMetric {
  label: string;
  value: string;
}

export interface Newsletter5Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  reassurance?: string;
  metrics?: NewsletterMetric[];
  onSubscribe?: (email: string) => void;
  className?: string;
}


function BackgroundGrid() {
  return (
    <div className="mask-radial-from-muted absolute inset-0 z-0 overflow-hidden rounded-4xl mask-radial-to-transparent mask-radial-at-center mask-size-[300px]">
      <div className="grid h-full w-full grid-cols-12 grid-rows-6">
        {Array.from({ length: 1000 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "border-border/50 bg-background/90 hover:bg-primary/20 aspect-square border transition-colors duration-300",
              index % 7 === 0 && "bg-primary/10",
              index % 17 === 0 && "bg-background/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function Newsletter5({
  eyebrow = "Signal Dispatch",
  title = "One useful product letter every Friday",
  description = "A concise read on launches, retention loops, design systems, and the small interface choices that make teams move with more clarity.",
  placeholder = "you@company.com",
  buttonText = "Subscribe",
  reassurance = "No spam, no daily drip campaigns, and no sponsored clutter.",
  onSubscribe,
  className,
}: Newsletter5Props) {
  const [email, setEmail] = useState("");
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubscribe?.(email);
    setEmail("");
  };

  return (
    <section
      className={cn(
        "bg-background flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8",
        className,
      )}
    >
      <Card className="border-border bg-muted relative w-full max-w-5xl overflow-hidden rounded-4xl px-4 py-6 shadow-[inset_0_10px_20px_10px_rgba(255,255,255,0.7),inset_0_-10px_20px_10px_rgba(0,0,0,0.05)] sm:px-8 lg:px-14 dark:shadow-[inset_0_-10px_20px_0_rgba(0,0,0,0.1),inset_0_10px_20px_0_rgba(255,255,255,0.05)]">
        <BackgroundGrid />

        <CardContent className="pointer-events-none relative z-10 grid min-h-96 grid-cols-1 gap-10 p-0 md:grid-cols-5 md:items-center">
          <div className="flex max-w-2xl flex-col justify-center gap-7 text-center md:col-span-3 md:text-left">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="bg-background/70 mx-auto h-9 w-fit gap-2 rounded-none border-none px-3 text-sm font-semibold backdrop-blur-2xl md:mx-0"
              >
                <RiMailSendFill className="text-primary size-5" />
                {eyebrow}
              </Badge>

              <div className="space-y-4">
                <h2 className="text-foreground text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {title}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed text-pretty sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <form
              className="pointer-events-auto mx-auto w-full max-w-xl space-y-3 md:mx-0"
              onSubmit={handleSubmit}
            >
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <div className="bg-background/70 flex flex-col items-center gap-0 rounded-none shadow-sm backdrop-blur-2xl sm:flex-row sm:gap-2">
                <Input
                  id={inputId}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={placeholder}
                  required
                  className="h-12 rounded-none border-0 bg-transparent px-4 text-base shadow-none focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="group mr-1 h-10 w-full shrink-0 rounded-none px-5 font-semibold shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)] transition-transform duration-200 active:scale-[0.96] sm:w-auto"
                >
                  {buttonText}
                  <FaArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>

              <p className="text-muted-foreground flex items-start gap-2 text-left text-sm leading-relaxed">
                <RiCheckboxCircleFill className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <span>{reassurance}</span>
              </p>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
