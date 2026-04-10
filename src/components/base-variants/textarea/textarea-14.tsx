import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea14 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Live input</Label>
      <Textarea
        id={id}
        placeholder="Start typing and it will expand..."
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50 field-sizing-content max-h-30 min-h-0 resize-none rounded-sm py-1.75 shadow-sm"
      />
    </div>
  );
};

export default Textarea14;
