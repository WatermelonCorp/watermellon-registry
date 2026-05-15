import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaArrowRight } from "react-icons/fa";

interface Contact7Props {
  heading: string;
  subheading: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  enquiryLabel: string;
  enquiryPlaceholder: string;
  enquiryOptions: { value: string; label: string }[];
  messageLabel: string;
  messagePlaceholder: string;
  agreementText: string;
  buttonText: string;
}

export function Contact7({
  heading,
  subheading,
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  phoneLabel,
  phonePlaceholder,
  messageLabel,
  messagePlaceholder,
  agreementText,
  buttonText,
}: Contact7Props) {
  return (
    <section className="bg-background relative isolate w-full overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="from-primary to-primary/60 aspect-[577/310] w-[36rem] bg-gradient-to-r opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="from-primary to-primary/60 aspect-[577/310] w-[36rem] bg-gradient-to-r opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <span className="bg-primary size-1.5 rounded-full" />
            {subheading}
          </div>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <div className="border-border/50 bg-card/40 rounded-3xl border p-6 shadow-sm backdrop-blur-xl sm:p-10 lg:p-8">
            <form className="grid gap-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="name"
                    className="text-foreground text-sm font-medium"
                  >
                    {nameLabel}
                  </Label>
                  <Input
                    id="name"
                    placeholder={namePlaceholder}
                    className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 h-12 rounded-xl px-4"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="email"
                    className="text-foreground text-sm font-medium"
                  >
                    {emailLabel}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 h-12 rounded-xl px-4"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-foreground text-sm font-medium"
                  >
                    {phoneLabel}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={phonePlaceholder}
                    className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 h-12 rounded-xl px-4"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label
                  htmlFor="message"
                  className="text-foreground text-sm font-medium"
                >
                  {messageLabel}
                </Label>
                <Textarea
                  id="message"
                  placeholder={messagePlaceholder}
                  className="bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 min-h-[150px] resize-none rounded-xl p-4"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="agreement" className="rounded-[4px]" />
                <Label
                  htmlFor="agreement"
                  className="text-muted-foreground text-sm font-normal"
                >
                  {agreementText}
                </Label>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="h-12 w-full max-w-sm gap-2 rounded-xl px-8 sm:w-auto"
                >
                  {buttonText}
                  <FaArrowRight className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
