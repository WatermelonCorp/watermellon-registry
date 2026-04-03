import { GoAlertFill } from "react-icons/go";

import { Alert, AlertTitle } from "@/components/ui/alert";

const Alert14 = () => {
  return (
    <Alert variant="destructive">
      <GoAlertFill className="size-4" />
      <AlertTitle>Oops! Something didn’t work as expected.</AlertTitle>
    </Alert>
  );
};

export default Alert14;
