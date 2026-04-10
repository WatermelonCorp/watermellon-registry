import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea10 = () => {
  const id = useId();

  return (
    <div className="relative w-full max-w-xs space-y-2">
      <Label
        htmlFor={id}
        className="bg-background text-foreground absolute top-0 left-2 z-10 block -translate-y-1/2 px-1 text-xs font-medium group-has-disabled:opacity-50"
      >
        Your message
      </Label>
      <Textarea
        id={id}
        placeholder="Type your message here..."
        className="!bg-background focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-sm shadow-sm focus-visible:ring-2"
      />
    </div>
  );
};

export default Textarea10;
