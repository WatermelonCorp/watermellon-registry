import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export interface ContactFormFields {
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  namePlaceholder?: string;
  messagePlaceholder?: string;
  submitText?: string;
}

export interface NewsletterFields {
  heading?: string;
  description?: string;
  emailPlaceholder?: string;
  buttonText?: string;
}

export interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "primary" | "secondary" | "outline" | "muted";
}

export interface Contact6Props {
  form?: ContactFormFields;
  newsletter?: NewsletterFields;
  cards?: ContactCard[];
}

const getCardStyles = (variant?: ContactCard["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-primary text-primary-foreground border-transparent shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.2)]";
    case "secondary":
      return "bg-secondary text-secondary-foreground border-transparent shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.1),inset_0_-2px_4px_0_rgba(0,0,0,0.1)]";
    case "outline":
      return "bg-card text-card-foreground border ";
    case "muted":
    default:
      return "bg-muted/40 text-foreground border-transparent shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2),inset_0_-2px_4px_0_rgba(255,255,255,0.1)]";
  }
};

const getIconStyles = (variant?: ContactCard["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary-foreground";
    case "secondary":
      return "text-secondary-foreground";
    case "outline":
      return "text-primary";
    case "muted":
    default:
      return "text-primary";
  }
};

const getDescriptionStyles = (variant?: ContactCard["variant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary-foreground/80";
    case "secondary":
      return "text-secondary-foreground/80";
    case "outline":
      return "text-muted-foreground";
    case "muted":
    default:
      return "text-muted-foreground";
  }
};

export default function Contact6({
  form = {
    emailPlaceholder: "Work Email",
    phonePlaceholder: "Phone Number",
    namePlaceholder: "Full Name",
    messagePlaceholder: "How can our team assist you?",
    submitText: "Send Message",
  },
  newsletter = {
    heading: "Subscribe to Updates",
    description:
      "Get the latest insights, product updates, and news delivered straight to your inbox.",
    emailPlaceholder: "Your email address",
    buttonText: "Subscribe",
  },
  cards = [
    {
      icon: <MdPhone className="h-8 w-8" />,
      title: "+1 (555) 000-0000",
      description:
        "Available Mon-Fri, 9am - 6pm EST. Call us for immediate assistance.",
      variant: "secondary",
    },
    {
      icon: <MdEmail className="h-8 w-8" />,
      title: "hello@example.com",
      description:
        "Drop us an email anytime. We typically reply within 24 hours.",
      variant: "secondary",
    },
    {
      icon: <MdLocationOn className="h-8 w-8" />,
      title: "Headquarters",
      description:
        "123 Innovation Drive, Tech Valley, San Francisco, CA 94105.",
      variant: "secondary",
    },
  ],
}: Contact6Props) {
  return (
    <section className="w-full px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  type="email"
                  placeholder={form.emailPlaceholder}
                  className="bg-muted focus-visible:border-primary/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-transparent px-5 text-base shadow-none focus-visible:ring-2"
                />
                <Input
                  type="tel"
                  placeholder={form.phonePlaceholder}
                  className="bg-muted focus-visible:border-primary/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-transparent px-5 text-base shadow-none focus-visible:ring-2"
                />
              </div>
              <Input
                type="text"
                placeholder={form.namePlaceholder}
                className="bg-muted focus-visible:border-primary/50 focus-visible:ring-primary/20 h-14 rounded-2xl border-transparent px-5 text-base shadow-none focus-visible:ring-2"
              />
              <Textarea
                placeholder={form.messagePlaceholder}
                className="bg-muted focus-visible:border-primary/50 focus-visible:ring-primary/20 min-h-[160px] resize-none rounded-2xl border-transparent p-5 text-base shadow-none focus-visible:ring-2"
              />
              <div>
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-8 text-base font-medium shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] transition-all"
                >
                  {form.submitText}
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-primary text-primary-foreground flex flex-col justify-center rounded-3xl p-8 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] transition-all lg:col-span-2 lg:p-10">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                {newsletter.heading}
              </h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed md:text-base">
                {newsletter.description}
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={newsletter.emailPlaceholder}
                className="text-primary focus-visible:border-primary/10 focus-visible:ring-border/50 h-14 w-full rounded-full border-none bg-white px-6 text-base shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.1)] placeholder:text-zinc-700 dark:bg-white"
              />
              <Button className="h-14 w-full rounded-full bg-white/50 text-lg font-medium shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-xl">
                {newsletter.buttonText}
              </Button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              className={`rounded-3xl ${getCardStyles(card.variant)}`}
            >
              <CardContent className="flex h-full flex-col items-start justify-center p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className={`flex-shrink-0 ${getIconStyles(card.variant)}`}
                  >
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-bold lg:text-xl">{card.title}</h4>
                </div>
                <p
                  className={`text-sm leading-relaxed lg:text-base ${getDescriptionStyles(card.variant)}`}
                >
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
