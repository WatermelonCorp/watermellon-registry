

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert17 = () => {
  return (
    <Alert>
      <MdError className="size-4" />
      <AlertTitle>Complete your profile</AlertTitle>
      <AlertDescription>
        Add your information to personalize your experience.
      </AlertDescription>
    </Alert>
  );
};

export default Alert17;
