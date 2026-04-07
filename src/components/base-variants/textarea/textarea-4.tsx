import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea4 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>
        Issue description <span className="text-destructive">*</span>
      </Label>
      <Textarea
        id={id}
        placeholder="Describe the issue you're facing..."
        required
        className=""
      />
    </div>
  );
};

export default Textarea4;
