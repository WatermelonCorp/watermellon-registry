import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea3 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Add details</Label>
      <Textarea
        id={id}
        placeholder="Write your response..."
        className="rounded-sm shadow-sm"
      />
      <p className="text-muted-foreground text-right text-xs">
        This helps us understand your input better.
      </p>
    </div>
  );
};

export default Textarea3;
