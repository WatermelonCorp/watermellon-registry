import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea2 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Your input</Label>
      <Textarea
        id={id}
        placeholder="Share your thoughts..."
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-sm shadow-sm focus-visible:ring-2"
      />
    </div>
  );
};

export default Textarea2;
