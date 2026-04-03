import { FcGoogle } from "react-icons/fc";
import { FaXTwitter, FaGithub, FaFacebook } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

const Button21 = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button variant="outline" size="icon" aria-label="Continue with Google">
        <FcGoogle className="size-5" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Continue with X">
        <FaXTwitter className="size-5 text-black dark:text-white" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Continue with Facebook">
        <FaFacebook className="size-5 text-[#1877F2]" />
      </Button>

      <Button variant="outline" size="icon" aria-label="Continue with GitHub">
        <FaGithub className="size-5 text-black dark:text-white" />
      </Button>
    </div>
  );
};

export default Button21;
