

import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";

const Button19 = () => {
  return (
    <Button variant="ghost" className="group">
      <FiArrowLeft className="transition-transform duration-180 ease-in-out group-hover:-translate-x-1" />
      Back
    </Button>
  );
};

export default Button19;
