import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Button35 = () => {
  return (
    <Button className="from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]">
      <IoTrashOutline />
      Delete
    </Button>
  );
};

export default Button35;
