import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea8 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Reason for request</Label>
      <Textarea
        id={id}
        aria-invalid
        placeholder="Explain your request..."
        className="border-destructive focus-visible:border-destructive"
      />
      <p className="text-destructive text-xs">This field can’t be empty.</p>
    </div>
  );
};

export default Textarea8;
