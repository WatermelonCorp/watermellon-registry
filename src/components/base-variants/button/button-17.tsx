import { IoWarning } from "react-icons/io5";

import { Button } from "@/components/ui/button";

const Button17 = () => {
  return (
    <Button className="bg-yellow-600/10 text-yellow-600 hover:bg-yellow-600/20 focus-visible:ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:hover:bg-yellow-400/20 dark:focus-visible:ring-yellow-400/40">
      <IoWarning />
      Warning
    </Button>
  );
};

export default Button17;
