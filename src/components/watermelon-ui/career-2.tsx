"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { FaMapMarkerAlt, FaClock, FaDollarSign } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Career2JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";

export interface Career2Category {
  /** Display label shown in the tab. */
  label: string;
  /** Unique value used for filtering. */
  value: string;
}

export interface Career2Job {
  /** Unique identifier. */
  id: string;
  /** Job title. */
  title: string;
  /** Short description of the role. */
  description: string;
  /** Category value this job belongs to (matches Career2Category.value). */
  category: string;
  /** Country or city where the role is based. */
  location: string;
  /** Emoji flag or country code to display alongside the location. */
  locationFlag?: string;
  /** Employment type. */
  type: Career2JobType;
  /** Salary or compensation range (e.g. "$100k – $140k"). */
  salaryRange?: string;
  /** Link to the application / job detail page. */
  href?: string;
}

/** Bottom call-to-action banner. */
export interface Career2Cta {
  /** Primary text / sentence in the CTA. */
  text: string;
  /** Label for the link / action. */
  linkLabel: string;
  /** Destination URL. */
  href?: string;
}

export interface Career2Props {
  /** Small eyebrow badge above the heading. */
  badge?: string;
  /** Main section heading. */
  heading?: string;
  /** Accent/highlight portion of the heading (rendered separately). */
  headingAccent?: string;
  /** Supporting description beneath the heading. */
  description?: string;
  /** Category filter tabs. */
  categories?: Career2Category[];
  /** List of job openings. */
  jobs?: Career2Job[];
  /** Bottom CTA banner configuration. */
  className?: string;
  /**
   * Optional link renderer — use this to integrate with Next.js `<Link>`
   * or any router's anchor component.
   */
  renderLink?: (props: {
    href: string;
    label: string;
    children: ReactNode;
    className?: string;
  }) => ReactNode;
}

const defaultCategories: Career2Category[] = [
  { label: "Banking", value: "banking" },
  { label: "Investments", value: "investments" },
  { label: "Fintech", value: "fintech" },
];

const defaultJobs: Career2Job[] = [
  {
    id: "eng-manager",
    title: "Engineering Manager",
    description: "Lead a team of engineers and deliver great experiences.",
    category: "banking",
    location: "Germany",
    locationFlag: "🇩🇪",
    type: "Full-time",
    salaryRange: "$100k – $120k",
    href: "#",
  },
  {
    id: "ui-ux-designer",
    title: "Fintech ui/UX Designer",
    description: "Design intuitive banking apps for better user trust.",
    category: "banking",
    location: "United States",
    locationFlag: "🇺🇸",
    type: "Full-time",
    salaryRange: "$100k – $120k",
    href: "#",
  },
  {
    id: "blockchain-engineer",
    title: "Blockchain Solutions Engineer",
    description: "Develop scalable blockchain solutions for finance.",
    category: "banking",
    location: "Brazil",
    locationFlag: "🇧🇷",
    type: "Full-time",
    salaryRange: "$100k – $120k",
    href: "#",
  },
  {
    id: "portfolio-analyst",
    title: "Portfolio Risk Analyst",
    description: "Model risk exposure and guide investment strategies.",
    category: "investments",
    location: "United Kingdom",
    locationFlag: "🇬🇧",
    type: "Full-time",
    salaryRange: "$90k – $115k",
    href: "#",
  },
  {
    id: "quant-researcher",
    title: "Quantitative Researcher",
    description: "Build statistical models to uncover alpha opportunities.",
    category: "investments",
    location: "Singapore",
    locationFlag: "🇸🇬",
    type: "Full-time",
    salaryRange: "$120k – $160k",
    href: "#",
  },
  {
    id: "payments-engineer",
    title: "Payments Infrastructure Engineer",
    description: "Architect real-time payment rails for global scale.",
    category: "fintech",
    location: "Remote",
    locationFlag: "🌍",
    type: "Full-time",
    salaryRange: "$110k – $140k",
    href: "#",
  },
  {
    id: "compliance-officer",
    title: "Regulatory Compliance Officer",
    description: "Ensure our products meet global financial regulations.",
    category: "fintech",
    location: "Netherlands",
    locationFlag: "🇳🇱",
    type: "Contract",
    salaryRange: "$80k – $100k",
    href: "#",
  },
];

function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: Career2Category;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
        "focus-visible:ring-ring/50 outline-none focus-visible:ring-2",
        isActive
          ? "bg-muted text-foreground border-border border shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
      )}
    >
      {category.label}
    </button>
  );
}

function MetaPill({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-muted-foreground inline-flex items-center gap-1.5 text-xs",
        className,
      )}
    >
      <span className="text-muted-foreground/70 shrink-0">{icon}</span>
      {label}
    </span>
  );
}

function JobCard({
  job,
  renderLink,
}: {
  job: Career2Job;
  renderLink?: Career2Props["renderLink"];
}) {
  const href = job.href ?? "#";
  const ariaLabel = `Apply for ${job.title}`;

  const applyButton = (
    <Button
      variant="outline"
      size="sm"
      className="pointer-events-none h-8 shrink-0 rounded-lg px-4 text-xs font-medium"
      tabIndex={-1}
      aria-hidden="true"
    >
      Apply
    </Button>
  );

  const inner = (
    <div
      className={cn(
        "group bg-muted flex flex-col gap-3 rounded-2xl px-5 py-4",
        "shadow-[inset_0_1px_2px_0px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(0,0,0,0.05),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] transition-all duration-300 dark:shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]",
        "sm:flex-row sm:items-center sm:gap-4",
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-col">
          <h3 className="text-foreground group-hover:text-foreground/80 text-sm leading-snug font-semibold transition-colors sm:text-xl">
            {job.title}
          </h3>
          <p className="text-muted-foreground line-clamp-1 text-xs sm:text-sm">
            {job.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
          <MetaPill
            icon={
              job.locationFlag ? (
                <span className="text-sm leading-none">{job.locationFlag}</span>
              ) : (
                <FaMapMarkerAlt className="size-3" />
              )
            }
            label={job.location}
          />

          <span className="bg-border size-1 rounded-full" aria-hidden="true" />

          <MetaPill icon={<FaClock className="size-3" />} label={job.type} />

          {job.salaryRange && (
            <>
              <span
                className="bg-border size-1 rounded-full"
                aria-hidden="true"
              />
              <MetaPill
                icon={<FaDollarSign className="size-3" />}
                label={job.salaryRange}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 justify-end sm:justify-center">
        {applyButton}
      </div>
    </div>
  );

  if (renderLink) {
    return renderLink({
      href,
      label: ariaLabel,
      children: inner,
      className: "block",
    });
  }

  return (
    <a href={href} aria-label={ariaLabel} className="block">
      {inner}
    </a>
  );
}

function EmptyState() {
  return (
    <div className="border-border bg-muted/30 flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
      <span className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full">
        <MdWorkOutline className="size-5" />
      </span>
      <p className="text-foreground text-sm font-medium">
        No openings in this category
      </p>
      <p className="text-muted-foreground max-w-xs text-xs">
        We don't have any open roles here right now. Check back soon or explore
        another category.
      </p>
    </div>
  );
}

export default function Career2({
  badge = "Join our finance team",
  heading = "Exciting roles in",
  headingAccent = "modern finance",
  description = "Drive innovation in secure banking and digital payments.",
  categories = defaultCategories,
  jobs = defaultJobs,
  className,
  renderLink,
}: Career2Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.value ?? "",
  );

  const filteredJobs = jobs.filter((j) => j.category === activeCategory);

  return (
    <section className={cn("bg-background w-full py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          {badge && (
            <Badge
              variant="outline"
              className="text-muted-foreground mb-4 rounded-full px-3 py-1 text-xs font-medium"
            >
              {badge}
            </Badge>
          )}

          {(heading || headingAccent) && (
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
              {heading && headingAccent ? " " : ""}
              {headingAccent && (
                <span className="text-foreground">{headingAccent}</span>
              )}
            </h2>
          )}

          {description && (
            <p className="text-muted-foreground mt-3 max-w-md text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>

        {categories.length > 0 && (
          <div
            className="border-border bg-muted/40 mx-auto mb-6 flex w-fit items-center justify-center gap-1 rounded-xl border p-1"
            role="tablist"
            aria-label="Job categories"
          >
            {categories.map((cat) => (
              <CategoryTab
                key={cat.value}
                category={cat}
                isActive={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} renderLink={renderLink} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
}

export { Career2 };
