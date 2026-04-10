import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup7 = () => {
  return (
    <RadioGroup defaultValue="beginner" className="flex items-center gap-4">
      <div className="border-border bg-card flex items-center gap-2 rounded-sm border px-4 py-2 shadow-sm">
        <RadioGroupItem value="beginner" id="beginner" />
        <Label htmlFor="beginner">Beginner</Label>
      </div>
      <div className="border-border bg-card flex items-center gap-2 rounded-sm border px-4 py-2 shadow-sm">
        <RadioGroupItem value="Advanced" id="advanced" />
        <Label htmlFor="intermediate">Advanced</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup7;
