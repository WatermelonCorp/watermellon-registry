import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Select15 = () => {
  return (
    <div className="w-full max-w-xs space-y-4">
      {/* Small Select */}
      <div className="space-y-1">
        <Select>
          <SelectTrigger 
            size="sm" 
            className="w-full !rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <SelectValue placeholder="System memory" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4} className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            <SelectGroup>
              <SelectLabel className="text-zinc-500 text-xs">Small Instance</SelectLabel>
              <SelectItem value="2gb" className="rounded-lg">2 GB RAM</SelectItem>
              <SelectItem value="4gb" className="rounded-lg">4 GB RAM</SelectItem>
              <SelectItem value="8gb" className="rounded-lg">8 GB RAM</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Default Select */}
      <div className="space-y-1">
        <Select>
          <SelectTrigger 
            className="w-full rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <SelectValue placeholder="Standard memory" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4} className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            <SelectGroup>
              <SelectLabel className="text-zinc-500">Standard Nodes</SelectLabel>
              <SelectItem value="16gb" className="rounded-lg">16 GB RAM</SelectItem>
              <SelectItem value="32gb" className="rounded-lg">32 GB RAM</SelectItem>
              <SelectItem value="64gb" className="rounded-lg">64 GB RAM</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Large Select */}
      <div className="space-y-1">
        <Select>
          <SelectTrigger 
            className="w-full !h-10 rounded-xl border-zinc-200 bg-white shadow-xs transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 px-3"
          >
            <SelectValue placeholder="High-performance memory" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4} className="rounded-xl border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            <SelectGroup>
              <SelectLabel className="text-zinc-500">Performance Cluster</SelectLabel>
              <SelectItem value="128gb" className="rounded-lg">128 GB RAM</SelectItem>
              <SelectItem value="256gb" className="rounded-lg">256 GB RAM</SelectItem>
              <SelectItem value="512gb" className="rounded-lg">512 GB RAM</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Select15;

