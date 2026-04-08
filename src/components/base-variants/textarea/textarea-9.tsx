import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea9 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between gap-1">
        <Label htmlFor={id}>Additional notes</Label>
        <span className="text-muted-foreground text-xs">Optional</span>
      </div>
      <Textarea
        id={id}
        placeholder="Add any extra details..."
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50"
      />
    </div>
  );
};

export default Textarea9;
