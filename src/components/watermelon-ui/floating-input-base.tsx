import { cn } from "@/lib/utils";
import { useState } from "react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingInput({
  label,
  className,
  ...props
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        className={cn(
          "peer w-full px-4 py-3 border rounded-lg bg-input outline-none",
          "border-border focus:border-primary transition-colors",
          className
        )}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        {...props}
      />
      <label
        className={cn(
          "absolute left-4 top-3 text-muted-foreground transition-all duration-200 pointer-events-none",
          "peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-background peer-focus:px-1",
          "peer-focus:text-primary",
          (focused || hasValue) && "-top-2.5 left-3 text-xs bg-background px-1"
        )}
      >
        {label}
      </label>
    </div>
  );
}
