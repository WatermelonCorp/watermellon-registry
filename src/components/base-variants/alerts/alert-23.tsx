;
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FaCheckCircle } from "react-icons/fa";

const Alert23 = () => {
  return (
    <Alert className="border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
      <FaCheckCircle className="size-4" />
      <AlertTitle>Upload completed</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">
        Your file has been added successfully and is ready to use.
      </AlertDescription>
    </Alert>
  );
};

export default Alert23;
