import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

const RadioGroup3 = () => {
  return (
    <RadioGroup defaultValue="light" className="  space-y-2">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="light"
          id="theme-light"
          className="text-primary-foreground data-[state=checked]:bg-primary! data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground shadow-md"
        />
        <Label htmlFor="theme-light" className="flex items-center gap-2">
          <FaSun className="text-foreground" />
          Light Theme
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="dark"
          id="theme-dark"
          className="text-primary-foreground data-[state=checked]:bg-primary! data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground shadow-md"
        />
        <Label htmlFor="theme-dark" className="flex items-center gap-2">
          <FaMoon className="text-foreground" />
          Dark Theme
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="system"
          id="theme-system"
          className="text-primary-foreground data-[state=checked]:bg-primary! data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground shadow-md"
        />
        <Label htmlFor="theme-system" className="flex items-center gap-2">
          <FaDesktop className="text-foreground" />
          System Default
        </Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup3;
