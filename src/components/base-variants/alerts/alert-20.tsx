

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert20 = () => {
  return (
    <Alert className="border-yellow-600 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400 bg-yellow-600/10 dark:bg-yellow-400/10">
      <MdError />
      <AlertTitle>Your connection is unstable</AlertTitle>
      <AlertDescription className="text-yellow-600/80 dark:text-yellow-400/80">
        Check your internet connection to avoid interruptions.
      </AlertDescription>
    </Alert>
  );
};

export default Alert20;
