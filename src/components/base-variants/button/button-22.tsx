import { FcGoogle } from "react-icons/fc";
import { FaXTwitter, FaGithub, FaFacebook } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

const Button22 = () => {
  return (
    <div className="flex w-full max-w-56 flex-col justify-center gap-4">
      <Button
        variant="outline"
        className="!border-red-500 !text-red-600 bg-red-600/5 flex items-center gap-2"
      >
        <FcGoogle className="size-5" />
        <span className="flex flex-1 justify-center">Continue with Google</span>
      </Button>

      <Button
        variant="outline"
        className="border-black text-black bg-black/5 dark:border-white dark:text-white flex items-center gap-2"
      >
        <FaXTwitter className="size-5" />
        <span className="flex flex-1 justify-center">Continue with X</span>
      </Button>

      <Button
        variant="outline"
        className="!border-blue-600 !text-blue-600 bg-blue-600/5 flex items-center gap-2"
      >
        <FaFacebook className="size-5 text-[#0866fe]" />
        <span className="flex flex-1 justify-center">
          Continue with Facebook
        </span>
      </Button>

      <Button
        variant="outline"
        className="border-black text-black bg-black/5 dark:border-white dark:text-white flex items-center gap-2"
      >
        <FaGithub className="size-5" />
        <span className="flex flex-1 justify-center">Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default Button22;
