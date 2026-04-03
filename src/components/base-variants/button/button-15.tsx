import { Button } from "@/components/ui/button";
import { IoCopy } from "react-icons/io5";

const Button15 = () => {
  return (
    <div className="flex h-12  items-center overflow-hidden rounded-lg border px-1">
      <p className="text-muted-foreground max-w-56 truncate overflow-hidden px-1 text-sm">
        https://watermelon-base-ui.com/
      </p>
      <Button
        size="icon"
        className="rounded-lg bg-blue-600 text-white hover:bg-blue-600/90 focus-visible:ring-blue-600/20 dark:bg-blue-400/60 dark:focus-visible:ring-blue-400/40"
      >
        <IoCopy />
        <span className="sr-only">Copy</span>
      </Button>
    </div>
  );
};

export default Button15;
