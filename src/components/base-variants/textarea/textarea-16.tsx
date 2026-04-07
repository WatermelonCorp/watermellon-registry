import { useId } from "react";
import { Textarea } from "@/components/ui/textarea";
const Textarea16 = () => {
  const id = useId();

  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative w-full max-w-sm rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-[input:is(:disabled)]:*:pointer-events-none">
      <label
        htmlFor={id}
        className="text-foreground block px-3 pt-1 text-xs font-medium"
      >
        Quick note
      </label>
      <Textarea
        id={id}
        placeholder="Write something short..."
        className="text-foreground placeholder:text-muted-foreground/70 flex min-h-14! w-full border-none px-3! py-0 py-1.5 text-sm focus-visible:ring-0 focus-visible:outline-none"
      />
    </div>
  );
};

export default Textarea16;
