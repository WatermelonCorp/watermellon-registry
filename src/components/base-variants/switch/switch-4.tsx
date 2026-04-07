import { Switch } from "@/components/ui/switch";

const Switch4 = () => {
  return (
    <Switch
      aria-label="Destructive Switch"
      className="focus-visible:border-destructive to-destructive/60 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border-none bg-linear-to-r from-yellow-600 data-[size=default]:h-6 data-[size=default]:w-10 data-[state=checked]:from-blue-600 data-[state=checked]:to-indigo-700 [&_span]:!translate-x-0.25 [&_span]:group-data-[size=default]/switch:size-5 data-[state=checked]:[&_span]:!translate-x-4.75 data-[state=checked]:[&_span]:rtl:!-translate-x-4.75"
    />
  );
};

export default Switch4;
