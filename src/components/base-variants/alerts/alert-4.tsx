import { FiArrowRight } from "react-icons/fi";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { MdError } from "react-icons/md";
import { buttonVariants } from "@/components/ui/button";

const Alert4 = () => {
  return (
    <Alert className="flex items-center justify-between border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400 [&>svg]:translate-y-0">
      <MdError />
      <AlertTitle className="flex-1">You have a new message!</AlertTitle>
      <a
        href="#"
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className:
            "group h-7 rounded-lg  text-teal-600 hover:bg-teal-600/10 dark:text-teal-400 dark:hover:bg-teal-400/10",
        })}
      >
        Link
        <FiArrowRight className=" h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </Alert>
  );
};

export default Alert4;
