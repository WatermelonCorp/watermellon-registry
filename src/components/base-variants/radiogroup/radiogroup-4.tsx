import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaBolt, FaUsers, FaCrown } from "react-icons/fa6";

const RadioGroup4 = () => {
  return (
    <RadioGroup defaultValue="starter" className="  max-w-md space-y-3">
      <label
        htmlFor="starter"
        className="group border-border has-[:checked]:border-primary has-[:checked]:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:-translate-y-0.5 hover:shadow-md has-[:checked]:shadow-md"
      >
        <RadioGroupItem
          value="starter"
          id="starter"
          className="data-[state=checked]:border-primary mt-1"
        />
        <div className="grid flex-1 gap-1">
          <div className="flex items-center justify-between">
            <span className="text-foreground flex items-center gap-2 text-sm font-medium">
              <FaBolt className="text-muted-foreground group-has-[:checked]:text-primary" />
              Starter
            </span>
            <span className="text-muted-foreground text-xs">Free</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Quick setup for personal productivity
          </p>
        </div>
      </label>

      <label
        htmlFor="team"
        className="group border-border has-[:checked]:border-primary has-[:checked]:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:-translate-y-0.5 hover:shadow-md has-[:checked]:shadow-md"
      >
        <RadioGroupItem
          value="team"
          id="team"
          className="data-[state=checked]:border-primary mt-1"
        />
        <div className="grid flex-1 gap-1">
          <div className="flex items-center justify-between">
            <span className="text-foreground flex items-center gap-2 text-sm font-medium">
              <FaUsers className="text-muted-foreground group-has-[:checked]:text-primary" />
              Team
            </span>
            <span className="text-foreground text-xs">₹799/mo</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Built for collaboration and shared workflows
          </p>
        </div>
      </label>

      <label
        htmlFor="premium"
        className="group border-border has-[:checked]:border-primary has-[:checked]:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:-translate-y-0.5 hover:shadow-md has-[:checked]:shadow-md"
      >
        <RadioGroupItem
          value="premium"
          id="premium"
          className="data-[state=checked]:border-primary mt-1"
        />
        <div className="grid flex-1 gap-1">
          <div className="flex items-center justify-between">
            <span className="text-foreground flex items-center gap-2 text-sm font-medium">
              <FaCrown className="text-muted-foreground group-has-[:checked]:text-primary" />
              Premium
            </span>
            <span className="text-foreground text-xs">Custom</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Full power with advanced controls and support
          </p>
        </div>
      </label>
    </RadioGroup>
  );
};

export default RadioGroup4;
