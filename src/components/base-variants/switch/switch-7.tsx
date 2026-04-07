import { Switch } from "@/components/ui/switch";

const Switch7 = () => {
  return (
    <div className="flex items-center gap-3">
      <Switch aria-label="Small Switch" />
      <Switch
        aria-label="Medium switch"
        className="data-[size=default]:h-6 data-[size=default]:w-10 [&_span]:group-data-[size=default]/switch:size-5 data-[state=checked]:[&_span]:translate-x-4.5 data-[state=checked]:[&_span]:rtl:-translate-x-4.5"
      />
      <Switch
        aria-label="Large Switch"
        className="data-[size=default]:h-7 data-[size=default]:w-12 [&_span]:group-data-[size=default]/switch:size-6 data-[state=checked]:[&_span]:translate-x-5.5 data-[state=checked]:[&_span]:rtl:-translate-x-5.5"
      />
    </div>
  );
};

export default Switch7;
