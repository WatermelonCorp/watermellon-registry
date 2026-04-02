import { HiCheckCircle, HiXCircle } from "react-icons/hi";

import { Button } from "@/components/ui/button";

const Button18 = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 rounded-none flex items-center gap-2">
        Cancel
        <HiXCircle />
      </Button>

      <Button className="bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:hover:bg-green-400/20 dark:focus-visible:ring-green-400/40 rounded-none flex items-center gap-2">
        Confirm
        <HiCheckCircle />
      </Button>
    </div>
  );
};

export default Button18;
