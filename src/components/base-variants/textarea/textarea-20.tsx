import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea20 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Project details</Label>
      <Textarea
        id={id}
        placeholder="Describe your project requirements..."
        className="focus-visible:ring-primary focus-visible:border-primary/50"
      />
      <p className="text-muted-foreground text-xs">
        Include key goals, constraints, or expectations.
      </p>
    </div>
  );
};

export default Textarea20;
