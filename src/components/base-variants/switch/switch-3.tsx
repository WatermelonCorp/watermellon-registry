import { Switch } from "@/components/ui/switch";

const Switch3 = () => {
  return (
    <div className="flex items-center gap-3">
      <Switch
        className="focus-visible:border-destructive focus-visible:ring-destructive/20 data-[state=checked]:bg-destructive dark:focus-visible:ring-destructive/40"
        aria-label="Destructive Switch"
        defaultChecked
      />
      <Switch
        className="focus-visible:border-ring-teal-600 dark:focus-visible:border-ring-teal-400 focus-visible:ring-teal-600/20 data-[state=checked]:bg-teal-600 dark:focus-visible:ring-teal-400/40 dark:data-[state=checked]:bg-teal-400"
        aria-label="Success Switch"
        defaultChecked
      />
      <Switch
        className="focus-visible:border-ring-blue-600 dark:focus-visible:border-ring-blue-400 focus-visible:ring-blue-600/20 data-[state=checked]:bg-blue-600 dark:focus-visible:ring-blue-400/40 dark:data-[state=checked]:bg-blue-400"
        aria-label="Info Switch"
        defaultChecked
      />
      <Switch
        className="focus-visible:border-ring-amber-600 dark:focus-visible:border-ring-amber-400 focus-visible:ring-amber-600/20 data-[state=checked]:bg-amber-600 dark:focus-visible:ring-amber-400/40 dark:data-[state=checked]:bg-amber-400"
        aria-label="Warning Switch"
        defaultChecked
      />
    </div>
  );
};

export default Switch3;
