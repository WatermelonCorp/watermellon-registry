import { useId } from "react";

import { Textarea } from "@/components/ui/textarea";

const Textarea11 = () => {
  const id = useId();

  return (
    <div className="group relative w-full max-w-sm space-y-2">
      <label
        htmlFor={id}
        className="origin-start text-muted-foreground/70 group-focus-within:text-foreground absolute top-0 block translate-y-2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:-translate-y-1/2 group-focus-within:scale-95 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium"
      >
        <span className="bg-background inline-flex px-1">Project summary</span>
      </label>
      <Textarea
        id={id}
        placeholder=" "
        className="!bg-background focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-sm shadow-sm"
      />
    </div>
  );
};

export default Textarea11;
