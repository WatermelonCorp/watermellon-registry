import { useId } from "react";
import { Textarea } from "@/components/ui/textarea";
const Textarea16 = () => {
  const id = useId();

  return (
    <div className="border-input bg-transparent focus-within:border-primary/50 focus-within:ring-primary/20 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative w-full max-w-sm rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-[input:is(:disabled)]:*:pointer-events-none overflow-hidden ">
      <label
        htmlFor={id}
        className="text-foreground block px-3 pt-1 text-xs font-medium bg-transparent dark:bg-input/30"
      >
        Quick note
      </label>
      <Textarea
        id={id}
        placeholder="Write something short..."
        className="text-foreground placeholder:text-muted-foreground/70 flex min-h-14! w-full border-none px-3! py-0 py-1.5 text-sm focus-visible:ring-0 focus-visible:outline-none rounded-none"
      />
    </div>
  );
};

export default Textarea16;
