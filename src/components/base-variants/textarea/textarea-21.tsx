import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextArea21 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id}>Project Notes</Label>
      <Textarea
        id={id}
        className="bg-muted border-transparent shadow-none"
        placeholder="Write a quick note about your project..."
      />
    </div>
  );
};

export default TextArea21;
