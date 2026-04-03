
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { GoAlertFill } from "react-icons/go";

const Alert28 = () => {
  return (
    <Alert className="border-none bg-yellow-600 text-white dark:bg-yellow-400">
      <GoAlertFill className="size-4" />
      <AlertTitle>Incomplete setup</AlertTitle>
      <AlertDescription className="text-white/80">
        A few required fields are still empty. Fill them in to continue
        smoothly.
      </AlertDescription>
    </Alert>
  );
};

export default Alert28;
