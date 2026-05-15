import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaExternalLinkAlt,
  FaBriefcase,
} from "react-icons/fa";

export type Department = string;

export interface JobListing {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salaryRange: string;
  department: Department;
  href?: string;
  tags?: string[];
}

export interface Career3Props {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  departments: Department[];
  jobs: JobListing[];
  exploreLabel?: string;
  exploreHref?: string;
  emptyMessage?: string;
}

interface JobCardProps {
  job: JobListing;
}

function JobCard({ job }: JobCardProps) {
  return (
    <div className="group bg-background flex flex-col overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0px_0px_0px_0.5px_rgba(0,0,0,0.05)] transition-all duration-300 dark:bg-zinc-900">
      <div className="bg-muted dark:bg-muted flex flex-1 flex-col gap-4 rounded-3xl px-5 pt-4 pb-5 shadow-[inset_0_1px_0px_0px_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(0,0,0,0.05),0px_0px_0px_1px_rgba(0,0,0,0.05),0px_1px_2px_-1px_rgba(0,0,0,0.03),0px_2px_4px_0px_rgba(0,0,0,0.04)] duration-300 dark:shadow-[inset_0_1px_0px_0px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-neutral-200 bg-white px-3 py-0.5 text-xs font-medium text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
            {job.type}
          </span>
          <span className="text-neutral-300 transition-colors duration-200 group-hover:text-neutral-600 dark:text-neutral-600 dark:group-hover:text-neutral-400">
            <FaExternalLinkAlt className="h-3 w-3" />
          </span>
        </div>

        <div className="flex flex-1 items-center gap-1.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
            <FaBriefcase className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-xl leading-snug font-semibold text-neutral-900 dark:text-neutral-50">
              {job.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {job.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 bg-white px-3 py-0.5 text-xs font-medium text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
            {job.salaryRange}
          </p>
          <p className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
            <FaMapMarkerAlt className="h-3 w-3 shrink-0" />
            {job.location}
          </p>
        </div>
        <a
          href={job.href ?? "#"}
          className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-neutral-100"
        >
          Details
        </a>
      </div>
    </div>
  );
}

export default function Career3({
  eyebrow = "Join our global team",
  heading,
  subheading,
  departments,
  jobs,
  exploreLabel = "Explore all positions",
  exploreHref = "#",
  emptyMessage = "No open roles in this department right now.",
}: Career3Props) {
  const [active, setActive] = useState<Department>(departments[0] ?? "");

  const filtered = jobs.filter((j) => j.department === active);

  return (
    <section className="mx-auto w-full h-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex  flex-col items-center text-center">
        <Badge
          variant="outline"
          className="mb-4 rounded-full border-neutral-200 bg-neutral-100 px-4 py-1 text-xs font-medium tracking-wide text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
        >
          {eyebrow}
        </Badge>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          {heading}
        </h1>

        {subheading && (
          <p className="mt-4 max-w-xl text-base text-neutral-500 sm:text-lg dark:text-neutral-400">
            {subheading}
          </p>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActive(dept)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:outline-none dark:focus-visible:ring-neutral-100 ${
                active === dept
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-neutral-50"
                  : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-neutral-400 dark:text-neutral-500">
            {emptyMessage}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-14 flex flex-col items-center gap-2">
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          Looking for more opportunities to grow?
        </p>
        <Button
          variant="link"
          asChild
          className="group h-auto gap-1.5 p-0 text-sm font-semibold text-neutral-900 hover:text-neutral-600 hover:no-underline dark:text-neutral-50 dark:hover:text-neutral-300"
        >
          <a href={exploreHref}>
            {exploreLabel}
            <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </Button>
      </div>
    </section>
  );
}
