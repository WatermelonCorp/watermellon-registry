import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea13 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Generated output</Label>
      <Textarea
        id={id}
        className="read-only:bg-muted rounded-sm shadow-[inset_0_-1px_0_0px_rgba(0,0,0,0.04),inset_0_1px_0_0px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_-1px_0_1px_rgba(0,0,0,0.04),inset_0_1px_0px_0px_rgba(255,255,255,0.2)]"
        defaultValue="This content is generated and cannot be edited."
        placeholder="Output will appear here..."
        readOnly
      />
    </div>
  );
};

export default Textarea13;
