import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-lg font-medium",
        "bg-primary text-primary-foreground",
        "hover:shadow-lg transition-shadow duration-300",
        "group",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div
        className={cn(
          "absolute inset-0 -translate-x-full",
          "bg-linear-to-r from-transparent via-white/20 to-transparent",
          "group-hover:translate-x-full transition-transform duration-700"
        )}
      />
    </button>
  );
}
