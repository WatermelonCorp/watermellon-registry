import { useId } from "react";

import { FaLightbulb } from "react-icons/fa";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Textarea7 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Idea</Label>
      <div className="relative group">
        <div className="text-muted-foreground pointer-events-none absolute top-2.5 right-0 flex items-center justify-center pr-3 transition-colors duration-200 group-focus-within:text-yellow-500 peer-disabled:opacity-50">
          <FaLightbulb className="size-4" />
          <span className="sr-only">Idea</span>
        </div>
        <Textarea
          id={id}
          placeholder="Share your idea..."
          className="peer pr-9 focus-visible:border-primary"
        />
      </div>
    </div>
  );
};

export default Textarea7;
