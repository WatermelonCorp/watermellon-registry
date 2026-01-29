import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShimmerButton({
  children,
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 rounded-lg",
        "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
        "font-medium text-sm overflow-hidden",
        "hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500",
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          animation: "shimmer 2s infinite",
        }}
      />
      <span className="relative z-10">{children}</span>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  );
}
