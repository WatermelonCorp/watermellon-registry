import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea15 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Fixed size Textarea</Label>
      <Textarea
        id={id}
        placeholder="Enter your response..."
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50 [resize:none]"
      />
    </div>
  );
};

export default Textarea15;
