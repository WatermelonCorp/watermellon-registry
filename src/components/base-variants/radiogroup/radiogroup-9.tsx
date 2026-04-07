import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup9 = () => {
  return (
    <RadioGroup defaultValue="warning" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="warning"
          id="color-warning"
          className="border-amber-500 text-amber-500 focus-visible:border-amber-500 focus-visible:ring-amber-500/20 dark:border-amber-400 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [&_svg]:fill-amber-500 [&_svg]:text-amber-500"
        />
        <Label htmlFor="color-warning">Warning</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="positive"
          id="color-positive"
          className="border-emerald-500 text-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-emerald-400 dark:text-emerald-400 dark:focus-visible:border-emerald-400 dark:focus-visible:ring-emerald-400/40 [&_svg]:fill-emerald-500 [&_svg]:text-emerald-500 dark:[&_svg]:fill-emerald-400"
        />
        <Label htmlFor="color-positive">Positive</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="neutral"
          id="color-neutral"
          className="border-indigo-500 text-indigo-500 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 dark:border-indigo-400 dark:text-indigo-400 dark:focus-visible:border-indigo-400 dark:focus-visible:ring-indigo-400/40 [&_svg]:fill-indigo-500 [&_svg]:text-indigo-500 dark:[&_svg]:fill-indigo-400"
        />
        <Label htmlFor="color-neutral">Neutral</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup9;
