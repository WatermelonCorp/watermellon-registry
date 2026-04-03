import { Button } from "@/components/ui/button";
import { FaBan } from "react-icons/fa";

const Button5 = () => {
  return (
    <Button disabled>
      <FaBan className="size-4" />
      Disabed
    </Button>
  );
};

export default Button5;
