import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Textarea17 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Leave a reply</Label>
      <Textarea
        id={id}
        placeholder="Write your reply..."
        className="focus-visible:ring-primary focus-visible:border-primary/50 rounded-sm shadow-sm"
      />
      <Button
        size="sm"
        className="relative overflow-hidden rounded-sm shadow-[inset_0_1px_0px_0_rgba(255,255,255,0.3),inset_0_-1px_0px_0_rgba(0,0,0,0.3),0_1px_3px_0px_rgba(0,0,0,0.25)] text-shadow-2xs"
      >
        Post Reply
      </Button>
    </div>
  );
};

export default Textarea17;
