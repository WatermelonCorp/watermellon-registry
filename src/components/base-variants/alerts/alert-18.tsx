

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert18 = () => {
  return (
    <Alert className="border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400 bg-sky-600/10 dark:bg-sky-400/10">
      <MdError />
      <AlertTitle>Connect your tools</AlertTitle>
      <AlertDescription className="text-sky-600/80 dark:text-sky-400/80">
        Integrate your favorite apps to streamline your workflow.
      </AlertDescription>
    </Alert>
  );
};

export default Alert18;
