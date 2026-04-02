import { IoSaveSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Button16 = () => {
  return (
    <Button className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400/20 dark:focus-visible:ring-blue-400/40">
      <IoSaveSharp />
      Save
    </Button>
  );
};

export default Button16;
