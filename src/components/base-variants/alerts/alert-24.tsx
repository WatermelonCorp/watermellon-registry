import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { GoAlertFill } from "react-icons/go";

const Alert24 = () => {
  return (
    <Alert className="border-none bg-yellow-600/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400">
      <GoAlertFill className="size-4" />
      <AlertTitle>Large file detected</AlertTitle>
      <AlertDescription className="text-yellow-600/80 dark:text-yellow-400/80">
        This file may take longer to upload. Consider optimizing it for a faster
        experience.
      </AlertDescription>
    </Alert>
  );
};

export default Alert24;
