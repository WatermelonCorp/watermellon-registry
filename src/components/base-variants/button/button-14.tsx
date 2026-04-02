import { FaDownload } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

const Button14 = () => {
  return (
    <Button className="border-primary border-dashed shadow-none bg-primary/10 text-foreground">
      <FaDownload />
      Download
    </Button>
  );
};

export default Button14;
