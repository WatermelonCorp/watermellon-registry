import { Switch } from "@/components/ui/switch";

const Switch5 = () => {
  return (
    <div className="flex items-center gap-3">
      <Switch
        className="focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 data-[state=checked]:[&_span]:bg-destructive dark:data-[state=checked]:[&_span]:bg-destructive data-[state=checked]:border-destructive data-[state=checked]:[&_span]:border-background data-[state=checked]:bg-destructive/10 [&_span]:border"
        aria-label="Destructive Switch"
        defaultChecked
      />
      <Switch
        className="data-[state=checked]:[&_span]:border-background focus-visible:border-teal-600 focus-visible:ring-teal-600/20 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600/10 dark:focus-visible:border-teal-400 dark:focus-visible:ring-teal-400/40 dark:data-[state=checked]:border-teal-400 dark:data-[state=checked]:bg-teal-400/20 [&_span]:border data-[state=checked]:[&_span]:bg-teal-600 dark:data-[state=checked]:[&_span]:bg-teal-400"
        aria-label="Success outline Switch"
        defaultChecked
      />
      <Switch
        className="data-[state=checked]:[&_span]:border-background focus-visible:border-blue-600 focus-visible:ring-blue-600/20 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600/10 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40 dark:data-[state=checked]:border-blue-400 dark:data-[state=checked]:bg-blue-400/20 [&_span]:border data-[state=checked]:[&_span]:bg-blue-600 dark:data-[state=checked]:[&_span]:bg-blue-400"
        aria-label="Info outline Switch"
        defaultChecked
      />
      <Switch
        className="data-[state=checked]:[&_span]:border-background focus-visible:border-yellow-600 focus-visible:ring-yellow-600/20 data-[state=checked]:border-yellow-600 data-[state=checked]:bg-yellow-400/20 dark:focus-visible:border-yellow-400 dark:focus-visible:ring-yellow-400/40 dark:data-[state=checked]:border-yellow-400 dark:data-[state=checked]:bg-yellow-600/20 [&_span]:border data-[state=checked]:[&_span]:bg-yellow-600 dark:data-[state=checked]:[&_span]:bg-yellow-400"
        aria-label="Warning outline Switch"
        defaultChecked
      />
    </div>
  );
};

export default Switch5;
