import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioGroup1 = () => {
  return (
    <RadioGroup defaultValue="email" className="  space-y-2">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="email"
          id="email"
          className="border-border data-[state=checked]:border-primary rounded-lg border"
        />
        <Label htmlFor="email">Email Notifications</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="sms"
          id="sms"
          className="border-border data-[state=checked]:border-primary rounded-lg border"
        />
        <Label htmlFor="sms">SMS Notifications</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="push"
          id="push"
          className="border-border data-[state=checked]:border-primary rounded-lg border"
        />
        <Label htmlFor="push">Push Notifications</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup1;
