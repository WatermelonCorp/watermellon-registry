import { FiAlertTriangle } from "react-icons/fi";

import { Button } from "@/components/ui/button";

const Button30 = () => {
  return (
    <Button
      size="icon"
      className="from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]"
    >
      <FiAlertTriangle className="size-5" />
      <span className="sr-only">Error</span>
    </Button>
  );
};

export default Button30;
