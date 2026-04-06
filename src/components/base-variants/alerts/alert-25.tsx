
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert25 = () => {
  return (
    <Alert className="bg-destructive/10 text-destructive border-none">
      <MdError className="size-4" />
      <AlertTitle>Action could not be completed</AlertTitle>
      <AlertDescription className="text-destructive/80">
        We ran into an issue while processing your request. Please try again
        shortly.
      </AlertDescription>
    </Alert>
  );
};

export default Alert25;
