import { useState, useMemo } from "react";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiArrowRight,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Remote"
  | "Internship";

export interface Job {
  id: string | number;
  title: string;
  location: string;
  type: JobType;
  salaryRange: string;
  onApply?: (job: Job) => void;
}

export interface Career4Props {
  eyebrow?: string;
  heading: string;
  description?: string;
  jobs: Job[];
  footerLabel?: string;
  footerCTA?: string;
  onFooterCTA?: () => void;
  className?: string;
}
const DEFAULT_JOBS: Job[] = [
  {
    id: 1,
    title: "Talent Acquisition Specialist",
    location: "United States",
    type: "Full-time",
    salaryRange: "$100 - $120",
    onApply: (j) => alert(`Applying: ${j.title}`),
  },
  {
    id: 2,
    title: "Employer Branding Manager",
    location: "United States",
    type: "Full-time",
    salaryRange: "$100 - $120",
    onApply: (j) => alert(`Applying: ${j.title}`),
  },
  {
    id: 3,
    title: "HR Marketing Strategist",
    location: "United States",
    type: "Part-time",
    salaryRange: "$100 - $120",
    onApply: (j) => alert(`Applying: ${j.title}`),
  },
  {
    id: 4,
    title: "People & Culture Coordinator",
    location: "United Kingdom",
    type: "Full-time",
    salaryRange: "$100 - $120",
    onApply: (j) => alert(`Applying: ${j.title}`),
  },
  {
    id: 5,
    title: "Recruitment Marketing Lead",
    location: "United States",
    type: "Remote",
    salaryRange: "$100 - $120",
    onApply: (j) => alert(`Applying: ${j.title}`),
  },
];
interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  return (
    <div className="w-full px-3 py-0.5 sm:w-auto">
      <Select
        value={value || "all"}
        onValueChange={(v) => onChange(v === "all" ? "" : v)}
      >
        <SelectTrigger
          className={cn(
            "h-auto w-full border-none bg-transparent px-0 shadow-none focus:ring-0",
            "text-foreground text-sm font-medium focus-visible:ring-transparent",
          )}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{label}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function JobRow({ job, isLast }: { job: Job; isLast: boolean }) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center sm:gap-6",
        "transition-colors duration-150",
        !isLast && "border-border border-b",
      )}
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="text-foreground text-base leading-snug font-semibold tracking-tight">
          {job.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <MetaItem icon={<FiMapPin size={11} />} label={job.location} />
          <Dot />
          <MetaItem icon={<FiClock size={11} />} label={job.type} />
          <Dot />
          <MetaItem icon={<FiDollarSign size={11} />} label={job.salaryRange} />
        </div>
      </div>

      <button
        onClick={() => job.onApply?.(job)}
        className={cn(
          "mt-2 flex shrink-0 items-center gap-1.5 text-sm font-medium sm:mt-0",
          "text-foreground",
          "transition-all duration-150 hover:gap-2.5",
        )}
      >
        Apply
        <FiArrowRight
          size={14}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="text-muted-foreground flex items-center gap-1 text-xs leading-none">
      {icon}
      {label}
    </span>
  );
}

function Dot() {
  return <span className="text-foreground text-xs">•</span>;
}

export default function Career4({
  eyebrow = "Join our HR team",
  heading,
  description,
  jobs = DEFAULT_JOBS,
  footerLabel = "Looking for more opportunities?",
  footerCTA = "See all open roles",
  onFooterCTA,
  className,
}: Career4Props) {
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))],
    [jobs],
  );
  const types = useMemo(() => [...new Set(jobs.map((j) => j.type))], [jobs]);

  const filtered = useMemo(() => {
    let list = jobs;
    if (locationFilter)
      list = list.filter((j) => j.location === locationFilter);
    if (typeFilter) list = list.filter((j) => j.type === typeFilter);
    if (search)
      list = list.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase()),
      );
    if (sortBy === "Title A–Z")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "Title Z–A")
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [jobs, locationFilter, typeFilter, search, sortBy]);

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl px-4 py-16 sm:px-8 md:px-12 md:py-24",
        className,
      )}
    >
      <div className="mb-12 space-y-5 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5",
            "text-xs font-medium tracking-wide",
            "text-muted-foreground",
            "bg-muted",
            "border-border border",
          )}
        >
          <FiUsers size={12} />
          {eyebrow}
        </span>

        <h2 className="text-foreground text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl">
          {heading}
        </h2>

        {description && (
          <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="border-border mb-6 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="border-border divide-border flex w-full flex-col divide-y overflow-hidden rounded-lg border sm:w-auto sm:flex-row sm:divide-x sm:divide-y-0">
          <FilterDropdown
            label="All locations"
            options={locations}
            value={locationFilter}
            onChange={setLocationFilter}
          />
          <FilterDropdown
            label="All types"
            options={types}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <FilterDropdown
            label="Sort by"
            options={["Title A–Z", "Title Z–A"]}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2",
            "border-border border",
            "bg-muted",
            "w-full transition-all focus-within:ring-2 focus-within:ring-gray-300 sm:w-52 dark:focus-within:ring-gray-700",
          )}
        >
          <FiSearch size={13} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search roles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="placeholder:text-muted-foreground w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>
      </div>

      <div className="min-h-[180px]">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center text-sm">
            No roles match — try adjusting your filters.
          </p>
        ) : (
          filtered.map((job, i) => (
            <JobRow key={job.id} job={job} isLast={i === filtered.length - 1} />
          ))
        )}
      </div>

      <div className="border-border mt-4 space-y-2 border-t pt-8 text-center">
        <p className="text-muted-foreground text-sm">{footerLabel}</p>
        <button
          onClick={onFooterCTA}
          className="text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-gray-600"
        >
          {footerCTA}
          <FiArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
