
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert26 = () => {
  return (
    <Alert className="bg-primary text-primary-foreground border-none">
      <MdError className="size-4" />
      <AlertTitle>Updating your settings</AlertTitle>
      <AlertDescription className="text-primary-foreground/80">
        Your changes will only take effect once you click "Save changes."
      </AlertDescription>
    </Alert>
  );
};

export default Alert26;
