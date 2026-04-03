import { Button } from "@/components/ui/button";
import { FaBell } from "react-icons/fa6";

const Button38 = () => {
  return (
    <Button variant="outline" size="icon" className="relative">
      <FaBell />
      <span className="absolute -top-0.5 -right-0.5 size-2 animate-bounce rounded-full bg-sky-600 dark:bg-sky-400" />
      <span className="sr-only">Notifications</span>
    </Button>
  );
};

export default Button38;
