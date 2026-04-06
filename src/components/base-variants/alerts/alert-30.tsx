
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert30 = () => {
  return (
    <Alert className="bg-destructive dark:bg-destructive/80 border-none text-white">
      <MdError className="size-4" />
      <AlertTitle>Failed to apply updates</AlertTitle>
      <AlertDescription className="text-white/80">
        We couldn’t process your changes. Please refresh and try again.
      </AlertDescription>
    </Alert>
  );
};

export default Alert30;
