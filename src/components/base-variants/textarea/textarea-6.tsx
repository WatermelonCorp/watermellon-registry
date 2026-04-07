import { useId } from "react";

import { FaPen } from "react-icons/fa";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Textarea6 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>Write a note</Label>
      <div className="group relative">
        <div className="text-muted-foreground pointer-events-none absolute top-2.5 left-0 flex origin-bottom items-center justify-center pl-3 transition-transform duration-200 group-focus-within:rotate-12 peer-disabled:opacity-50">
          <FaPen className="size-4" />
          <span className="sr-only">Note</span>
        </div>
        <Textarea
          id={id}
          placeholder="Jot down your thoughts..."
          className="peer pl-9"
        />
      </div>
    </div>
  );
};

export default Textarea6;
