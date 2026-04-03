import { FaTrashAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const Button11 = () => {
  return (
    <Button className="text-destructive! border-destructive! bg-destructive/10 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40">
      <FaTrashAlt />
      Delete
    </Button>
  );
};

export default Button11;
