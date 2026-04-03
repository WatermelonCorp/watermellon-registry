
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FaCheckCircle } from "react-icons/fa";

const Alert27 = () => {
  return (
    <Alert className="border-none bg-green-600 text-white dark:bg-green-400">
      <FaCheckCircle className="size-4" />
      <AlertTitle>Preferences saved</AlertTitle>
      <AlertDescription className="text-white/80">
        Your settings have been updated and applied successfully.
      </AlertDescription>
    </Alert>
  );
};

export default Alert27;
