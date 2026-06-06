import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
export interface Footer6Link {
  label: string;
  href: string;
}

export interface Footer6LinkGroup {
  title: string;
  links: Footer6Link[];
}

export interface Footer6SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface Footer6Props {
  logo?: ReactNode;
  brandName?: string;
  tagLine?: string;
  headline?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  statusText?: string;
  statusTag?: string;
  brandSubtitle?: string;
  copyright?: string;
  linkGroups?: Footer6LinkGroup[];
  legalLinks?: Footer6Link[];
  socialLinks?: Footer6SocialLink[];
}

export const GridTick = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute flex size-4 items-center justify-center ${className}`}
    >
      <div className="absolute h-px w-full bg-black/20 dark:bg-white/25" />
      <div className="absolute h-full w-px bg-black/20 dark:bg-white/25" />
    </div>
  );
};

const GridRect = ({ className = ' ' }) => {
  return (
    <div
      className={`pointer-events-none absolute flex size-1 items-center justify-center ${className}`}
    >
      <div className="size-full rounded-none bg-black/20 dark:bg-white/25" />
    </div>
  );
};
const staggerContainer:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const techReveal:Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Footer6({
  logo,
  brandName = 'Watermelon Platform',
  tagLine = 'WATERMELON CORP',
  headline = 'Building the foundation for modular web architectures.',
  description = 'Watermelon Platform provides the leading ecosystem of high-performance developer tools, reusable components, and production-ready codebases.',
  inputPlaceholder = 'Enter your email',
  buttonText = 'Stay Updated',
  statusText = 'ENGINEERED FOR EXCEPTIONAL PERFORMANCE.',
  statusTag = 'WATERMELON CORP',
  brandSubtitle = 'The foundation layer for enterprise UI blocks. Fast, customizable, and production-ready.',
  copyright = '© 2026 Watermelon Labs, Inc. All rights reserved.',
  linkGroups = [],
  legalLinks = [],
  socialLinks = [],
}: Footer6Props) {
  const firstGroup = linkGroups[0];
  const remainingGroups = linkGroups.slice(1);

  return (
    <footer className="bg-background text-foreground relative w-full p-2 font-sans">
  

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="border-border/40 relative mx-auto w-full max-w-7xl border"
      >
        <GridTick className="-top-2 -left-2" />
        <GridTick className="-top-2 -right-2" />
        <GridTick className="-bottom-2 -left-2" />
        <GridTick className="-right-2 -bottom-2" />

        <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-14">
          <div className="border-border/40 relative col-span-8 flex flex-col border-r md:flex-row">
            <motion.div variants={techReveal} className="flex min-h-[300px] min-w-0 flex-1 flex-col gap-5 self-center overflow-clip p-5 sm:min-h-[340px] sm:gap-6 sm:p-6 md:items-start md:p-8 md:text-left lg:col-span-6 lg:items-start lg:py-12 lg:text-left">
              <div className="pointer-events-none absolute top-1/2 -left-20 z-0 h-80 w-80 -translate-y-1/2 opacity-20 select-none dark:opacity-10">
                <svg
                  className="text-muted-foreground h-full w-full"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeDasharray="1 5"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeDasharray="4 2"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="10"
                    y1="100"
                    x2="190"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                  />
                  <line
                    x1="100"
                    y1="10"
                    x2="100"
                    y2="190"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                  />
                  <circle
                    cx="100"
                    cy="30"
                    r="2.5"
                    fill="var(--color-primary)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="150"
                    cy="100"
                    r="1.5"
                    fill="var(--color-primary)"
                  />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col gap-4 md:items-center lg:items-start">
                {tagLine && (
                  <span className="text-primary block text-sm font-medium tracking-wide uppercase">
                    //&nbsp;&nbsp;{tagLine}
                  </span>
                )}
                <h2 className="text-foreground max-w-lg text-2xl leading-[1.15] font-light tracking-tight sm:text-3xl lg:text-4xl">
                  {headline}
                </h2>
                <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              <form
                className="relative z-10 mt-1 flex w-full max-w-md flex-col items-stretch sm:mt-2 sm:flex-row md:mx-auto lg:mx-0"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder={inputPlaceholder}
                  className="border-border/80 bg-background focus-visible:ring-primary focus-visible:border-primary h-12 min-h-12 min-w-0 flex-1 rounded-none border-y border-l px-4 font-sans text-sm focus-visible:ring-1"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-primary-foreground dark:text-background group flex h-12 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-none border-none px-6 font-semibold shadow-[inset_0_0_10px_0.5px_rgba(255,255,255,0.5)] transition-all active:scale-98 sm:w-auto"
                >
                  <span>{buttonText}</span>

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            </motion.div>

            <motion.div variants={techReveal} className="relative col-span-1 mr-0 px-5 pb-8 sm:px-6 md:mr-8 md:px-0 md:py-12 lg:col-span-2">
              {firstGroup && (
                <div className="flex flex-col gap-4">
                  <div className="border-l border-transparent pl-6">
                    <span className="text-primary text-xs font-medium uppercase">
                      //&nbsp;&nbsp;{firstGroup.title}
                    </span>
                  </div>

                  <div className="border-border/40 flex flex-col gap-3.5 border-l pl-6">
                    {firstGroup.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary block py-0.5 text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <GridTick className="-top-2 -right-2" />

            <GridTick className="-right-2 -bottom-2" />
          </div>

          <div className="relative px-5 py-8 sm:px-8 sm:py-12 lg:col-span-6">
            <div className="grid h-full grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-4">
              {remainingGroups.map((group) => (
                <motion.div key={group.title} variants={techReveal} className="flex flex-col gap-4">
                  <div className="border-l border-transparent pl-6">
                    <span className="text-primary text-xs font-medium uppercase">
                      //&nbsp;&nbsp;{group.title}
                    </span>
                  </div>

                  <div className="border-border/40 flex flex-col gap-3.5 border-l pl-6">
                    {group.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary block py-0.5 text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div variants={techReveal} className="border-border/40 dark:bg-card/50 bg-muted/50 relative grid grid-cols-14 border-y border-r backdrop-blur-[2px]">
          <GridRect className="-top-[2px] -left-[2px]" />
          <GridRect className="-top-[2px] -right-[3px]" />
          <GridRect className="-bottom-[2px] -left-[2px]" />
          <GridRect className="-right-[3px] -bottom-[2px]" />

          <div className="col-span-14 grid w-full grid-cols-1 gap-2 py-1 md:grid-cols-14 md:gap-4 lg:px-12">
            <div className="border-border/40 relative col-span-1 flex w-full items-center justify-center gap-2.5 border-b px-0 py-6 md:col-span-6 md:border-r md:border-b-0 md:py-8">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              <span className="text-primary text-center text-xs font-medium tracking-wide md:text-left">
                {statusText}
              </span>
              <GridRect className="-top-[2px] -right-[3px] hidden md:block" />
              <GridRect className="-right-[3px] -bottom-[2px] hidden md:block" />
            </div>
            <div
              className="col-span-1 flex items-center justify-center gap-1.5 md:col-span-4 md:justify-start"
              aria-hidden="true"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    backgroundColor:
                      i < 9 ? 'var(--primary)' : 'rgba(120,120,120,0.25)',
                  }}
                  animate={{
                    backgroundColor: [
                      'rgba(120,120,120,0.25)',
                      'var(--primary)',
                      'rgba(120,120,120,0.25)',
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.06,
                  }}
                  className="h-4 w-[3.5px] rounded-none"
                />
              ))}
            </div>

            {statusTag && (
              <span className="text-primary col-span-1 self-center text-center text-xs font-medium tracking-wide sm:pb-0 md:col-span-4 md:pr-2 md:text-right">
                [ {statusTag.toUpperCase()} ]
              </span>
            )}
          </div>
        </motion.div>

        <motion.div variants={techReveal} className="flex flex-col gap-7 px-5 py-7 sm:px-6 sm:py-8 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-12 lg:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:gap-5 justify-between ">
            <div className="flex items-center gap-3">
              {logo && (
                <div className="text-primary flex h-6 w-6 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                  {logo}
                </div>
              )}
              <span className="text-foreground min-w-0 text-lg font-medium">
                {brandName}
              </span>
            </div>

            {brandSubtitle && (
              <>
                <div className="hidden h-6 w-[1.5px] sm:block" />
                <p className="text-muted-foreground w-full max-w-[220px] text-xs leading-relaxed">
                  {brandSubtitle}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-5 md:flex-row md:items-center md:gap-8 lg:justify-end">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Separator
                orientation="vertical"
                className="my-auto hidden h-8 w-px md:block "
              />
              <p className="text-muted-foreground max-w-[220px] shrink-0 text-xs">
                {copyright}
              </p>
              <Separator
                orientation="vertical"
                className="my-auto hidden h-8 w-px sm:block"
              />
              {legalLinks.length > 0 && (
                <>
                  <div className="hidden h-4 w-[1px] sm:block" />
                  <div className="flex flex-wrap items-center gap-4">
                    {legalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex shrink-0 flex-col gap-2">
                <span className="text-primary text-xs font-medium tracking-wide uppercase md:text-right">
                  //&nbsp;&nbsp;Connect
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-md p-1.5 transition-all duration-200"
                    >
                      <div className="flex h-4 w-4 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                        {link.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
