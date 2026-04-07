import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup2 = () => {
  return (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="monthly"
          id="monthly"
          className="border-primary focus-visible:border-primary border-dashed"
        />
        <Label htmlFor="monthly">Monthly Plan</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="quarterly"
          id="quarterly"
          className="border-primary focus-visible:border-primary border-dashed"
        />
        <Label htmlFor="quarterly">Quarterly Plan</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="yearly"
          id="yearly"
          className="border-primary focus-visible:border-primary border-dashed"
        />
        <Label htmlFor="yearly">Yearly Plan</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup2;
