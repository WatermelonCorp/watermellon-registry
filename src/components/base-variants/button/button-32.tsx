import { IoShareOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";

const Button32 = () => {
  return (
    <Button variant="outline" className="   rounded-md px-2 h-10.5">
      <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
        <IoShareOutline />
      </span>
      Post
    </Button>
  );
};

export default Button32;
