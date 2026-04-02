
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert29 = () => {
  return (
    <Alert className="border-none bg-blue-600 text-white dark:bg-blue-400">
      <MdError className="size-4" />
      <AlertTitle>Profile visibility enabled</AlertTitle>
      <AlertDescription className="text-white/80">
        Your profile can be seen by others, including your basic details and
        activity.
      </AlertDescription>
    </Alert>
  );
};

export default Alert29;
