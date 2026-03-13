import { Button } from "@/components/ui/button";
import { Moon } from "@aliimam/icons";

export default function ButtonDemo() {
  return (
    <div className="flex gap-3">
      <Button 
        size={"icon"} 
        className="h-16 text-xl w-16 from-primary to-primary/85 text-primary-foreground border-2 border-foreground/10 bg-gradient-to-t shadow-xl shadow-primary/70 ring-4 ring-offset ring-background/30 transition-[filter] duration-200 hover:brightness-120 active:brightness-100"
      >
        <Moon strokeWidth={1.5} className="size-6" />
      </Button>
      <Button 
        className="h-16 text-xl px-12 from-primary to-primary/85 text-primary-foreground border-2 border-foreground/10 bg-gradient-to-t shadow-xl shadow-primary/70 ring-4 ring-offset ring-background/30 transition-[filter] duration-200 hover:brightness-120 active:brightness-100"
      >
       Soft Glow
      </Button>
    </div>
  );
}
