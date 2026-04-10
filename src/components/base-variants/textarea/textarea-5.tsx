import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea5 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Styled textarea</Label>
      <Textarea
        id={id}
        placeholder="Start typing..."
        className="focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:focus-visible:ring-emerald-500/40"
      />
    </div>
  );
};

export default Textarea5;
